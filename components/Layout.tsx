
import React from 'react';
import { FormStep } from '../types';
import { 
  LayoutGrid, 
  Building2, 
  FileLock2, 
  Users, 
  Briefcase, 
  CreditCard, 
  FileText, 
  HardHat, 
  Globe, 
  ShieldAlert,
  ClipboardList,
  PenTool
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentStep: FormStep;
  onStepClick: (step: FormStep) => void;
}

const steps = [
  { id: FormStep.IDENTIFICATION, label: 'Identification', icon: LayoutGrid },
  // Fix: Changed FormStep.ENTREPRISE to FormStep.GENERAL_ENTREPRISE
  { id: FormStep.GENERAL_ENTREPRISE, label: 'L\'Entreprise', icon: Building2 },
  { id: FormStep.ADMIN_FISCAL, label: 'Admin & Fiscal', icon: FileLock2 },
  // Fix: Changed FormStep.DIRIGEANTS to FormStep.PROMOTEUR_DIRIGEANTS
  { id: FormStep.PROMOTEUR_DIRIGEANTS, label: 'Dirigeants', icon: Users },
  // Fix: Changed FormStep.PATRIMOINE to FormStep.PATRIMOINE_MOYENS
  { id: FormStep.PATRIMOINE_MOYENS, label: 'Patrimoine', icon: Briefcase },
  { id: FormStep.FINANCES_JURIDIQUE, label: 'Finances & Juridique', icon: CreditCard },
  // Fix: Changed FormStep.DESCRIPTION_PROJET to FormStep.PROJET_DESCRIPTION
  { id: FormStep.PROJET_DESCRIPTION, label: 'Description Projet', icon: FileText },
  // Fix: Changed FormStep.INVESTISSEMENTS to FormStep.PROGRAMME_INVESTISSEMENT
  { id: FormStep.PROGRAMME_INVESTISSEMENT, label: 'Investissements', icon: HardHat },
  // Fix: Changed FormStep.MARCHE_STRATEGIE to FormStep.DONNEES_MARCHE
  { id: FormStep.DONNEES_MARCHE, label: 'Marché & Stratégie', icon: Globe },
  // Fix: Changed FormStep.ENVIRONNEMENT to FormStep.QUALITE_ENVIRONNEMENT
  { id: FormStep.QUALITE_ENVIRONNEMENT, label: 'Qualité & Env.', icon: ShieldAlert },
  // Fix: Changed FormStep.CHECKLIST to FormStep.CHECKLIST_DOCUMENTS
  { id: FormStep.CHECKLIST_DOCUMENTS, label: 'Pièces Jointes', icon: ClipboardList },
  // Fix: Changed FormStep.DECLARATION to FormStep.DECLARATION_FINALE
  { id: FormStep.DECLARATION_FINALE, label: 'Déclaration', icon: PenTool },
];

export const Layout: React.FC<LayoutProps> = ({ children, currentStep, onStepClick }) => {
  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      {/* SIDEBAR */}
      <aside className="w-80 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen overflow-y-auto z-20">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black text-xl shadow-xl shadow-slate-200">
              F
            </div>
            <div>
              <h1 className="font-black text-lg text-slate-900 leading-none uppercase tracking-tighter">FPI RDC</h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Crédit Digital</p>
            </div>
          </div>

          <nav className="space-y-1">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isPast = currentStep > step.id;
              
              return (
                <button
                  key={step.id}
                  onClick={() => onStepClick(step.id)}
                  className={`w-full group flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 relative ${
                    isActive 
                      ? 'bg-slate-900 text-white shadow-2xl shadow-slate-300' 
                      : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                    isActive ? 'bg-blue-600' : isPast ? 'bg-green-100 text-green-600' : 'bg-slate-100 group-hover:bg-slate-200'
                  }`}>
                    <Icon size={16} />
                  </div>
                  <span className={`text-[11px] font-black uppercase tracking-wide text-left ${isActive ? 'text-white' : 'text-slate-500'}`}>
                    {step.label}
                  </span>
                  
                  {isActive && (
                    <div className="absolute right-4 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)]" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-8 pt-0">
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Support En Ligne</span>
            </div>
            <p className="text-[10px] text-slate-400 font-bold leading-relaxed uppercase tracking-tighter">
              Délai moyen de réponse :<br/>15 minutes
            </p>
          </div>
        </div>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 overflow-x-hidden">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-10 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Demande n° 2024-FPI-882</span>
            <div className="h-4 w-px bg-slate-100" />
            <span className="bg-blue-50 text-blue-600 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">Brouillon Automatique</span>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-slate-900 transition-colors">Aide</button>
            <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-200">Enregistrer</button>
          </div>
        </header>

        <div className="p-10 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
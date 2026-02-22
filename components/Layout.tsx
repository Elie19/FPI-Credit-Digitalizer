
import React from 'react';
import { FormStep } from '../types';
import { 
  LayoutGrid, 
  Building2, 
  Users, 
  Briefcase, 
  CreditCard, 
  FileText, 
  HardHat, 
  Globe, 
  ShieldAlert,
  ClipboardList,
  PenTool,
  Landmark,
  Leaf
} from 'lucide-react';
import { ThemeToggle } from './ui/ThemeToggle';

interface LayoutProps {
  children: React.ReactNode;
  currentStep: FormStep;
  onStepClick: (step: FormStep) => void;
  dossierNumber?: string;
  pdfButton?: React.ReactNode;
}

const steps = [
  { id: FormStep.IDENTIFICATION, label: 'Identification', icon: LayoutGrid },
  { id: FormStep.SECTION_A, label: 'L\'Entreprise', icon: Building2 },
  { id: FormStep.ADMIN_FISCAL, label: 'Personnel & Org.', icon: Users },
  { id: FormStep.PATRIMOINE_MOYENS, label: 'Patrimoine', icon: Briefcase },
  { id: FormStep.FINANCES_JURIDIQUE, label: 'Finances & Juridique', icon: CreditCard },
  { id: FormStep.PROJET_DESCRIPTION, label: 'Description Projet', icon: FileText },
  { id: FormStep.DONNEES_MARCHE, label: 'Marché & Stratégie', icon: Globe },
  { id: FormStep.QUALITE_ENVIRONNEMENT, label: 'Qualité & Prod.', icon: ShieldAlert },
  { id: FormStep.GARANTIES_OFFERTES, label: 'Garanties', icon: Landmark },
  { id: FormStep.EVALUATION_ENVIRONNEMENTALE, label: 'Impact Environnemental', icon: Leaf },
  { id: FormStep.CHECKLIST_DOCUMENTS, label: 'Pièces Jointes', icon: ClipboardList },
  { id: FormStep.DECLARATION_FINALE, label: 'Déclaration', icon: PenTool },
];

export const Layout: React.FC<LayoutProps> = ({ children, currentStep, onStepClick, dossierNumber, pdfButton }) => {
  return (
    <div className="min-h-screen flex bg-background text-foreground transition-colors duration-300">
      {/* SIDEBAR */}
      <aside className="w-80 bg-card border-r border-border flex flex-col sticky top-0 h-screen overflow-y-auto z-20 transition-colors duration-300">
        <div className="p-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center font-black text-xl shadow-xl shadow-slate-200 dark:shadow-none">
                C
              </div>
              <div>
                <h1 className="font-black text-lg text-foreground leading-none uppercase tracking-tighter">Crédit Digital</h1>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">Plateforme de Financement</p>
              </div>
            </div>
            <ThemeToggle />
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
                      ? (step.id === FormStep.EVALUATION_ENVIRONNEMENTALE ? 'bg-emerald-900 dark:bg-emerald-100 text-white dark:text-emerald-900 shadow-2xl shadow-emerald-200/50 dark:shadow-none' : 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-2xl shadow-slate-300/50 dark:shadow-none')
                      : 'text-slate-400 dark:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                    isActive ? (step.id === FormStep.EVALUATION_ENVIRONNEMENTALE ? 'bg-emerald-600 dark:bg-emerald-500' : 'bg-blue-600 dark:bg-blue-500') : isPast ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
                  }`}>
                    <Icon size={16} />
                  </div>
                  <span className={`text-[11px] font-black uppercase tracking-wide text-left ${isActive ? 'text-white dark:text-slate-900' : 'text-slate-500 dark:text-slate-400'}`}>
                    {step.label}
                  </span>
                  
                  {isActive && (
                    <div className={`absolute right-4 w-1.5 h-1.5 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)] ${step.id === FormStep.EVALUATION_ENVIRONNEMENTALE ? 'bg-emerald-400' : 'bg-blue-500'}`} />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-8 pt-0">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-slate-900 dark:text-slate-100 uppercase tracking-widest">Support En Ligne</span>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold leading-relaxed uppercase tracking-tighter">
              Délai moyen de réponse :<br/>15 minutes
            </p>
          </div>
        </div>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 overflow-x-hidden">
        <header className="h-20 bg-card/80 backdrop-blur-md border-b border-border px-10 flex items-center justify-between sticky top-0 z-10 transition-colors duration-300">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Demande n° {dossierNumber || 'GÉNÉRATION...'}</span>
            <div className="h-4 w-px bg-border" />
            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${currentStep === FormStep.EVALUATION_ENVIRONNEMENTALE ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`}>Brouillon Automatique</span>
          </div>
          <div className="flex items-center gap-6">
            {pdfButton}
            <button className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Aide</button>
            <button className={`${currentStep === FormStep.EVALUATION_ENVIRONNEMENTALE ? 'bg-emerald-900 dark:bg-emerald-100 hover:bg-emerald-700 dark:hover:bg-emerald-200 text-white dark:text-emerald-900 shadow-emerald-200/50 dark:shadow-none' : 'bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900'} px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-200 dark:shadow-none transition-all hover:-translate-y-0.5`}>Enregistrer</button>
          </div>
        </header>

        <div className="p-10 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

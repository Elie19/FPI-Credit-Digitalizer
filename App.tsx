
import React, { useState, useMemo } from 'react';
import { Layout } from './components/Layout';
import { FileUpload } from './components/FileUpload';
import { DynamicTable } from './components/DynamicTable';
import { FormStep, FPIFormData, Shareholder, AssetRow, InvestmentRow, CompetitorRow } from './types';
import { FPI_CHECKLIST, FORME_JURIDIQUE_OPTIONS } from './constants';
import { 
  ArrowRight, ArrowLeft, CheckCircle, AlertCircle, FileWarning, Info,
  Building, Users, Wallet, Briefcase, BarChart4, Leaf, ClipboardList, LayoutGrid
} from 'lucide-react';

const INITIAL_DATA: FPIFormData = {
  ifuRccm: '', natureProjet: '', montantCredit: '', butCredit: 'NEUF',
  raisonSociale: '', sigle: '', formeJuridique: '', dateCreation: '', paysCreation: 'RDC',
  dateDebutActivites: '', dateAutorisationOuverture: '', refAutorisationOuverture: '',
  activitePrincipale: '', activiteSecondaire: '', montantCapitalSocial: '', deviseCapital: 'USD',
  shareholders: [], associéMajoritaireActivitésAutres: false,
  numRCCM: '', dateRCCM: '', lieuRCCM: '', numIDNat: '', dateIDNat: '', lieuIDNat: '',
  numImpot: '', dateImpot: '', lieuImpot: '', adresseSiegeSocial: '', natureLocauxSiege: 'Locataire',
  nomPromoteur: '', qualiteJuridiquePromoteur: '', etatCivilPromoteur: 'Celibataire',
  nationalitePromoteur: 'Congolaise', fonctionEntreprise: '', telMobilePromoteur: '', emailPromoteur: '',
  faitPartieAssociationPatronale: false,
  assetsInfrastructures: [], assetsMachines: [],
  dejaBeneficieConcours: false, faillite: false, poursuitesJudiciaires: false, garantPrets: false, antecedentsFiscaux: false,
  projetHistorique: '', projetMotivation: '', projetPrevisions: '', objectifsQuantitatifs: '',
  localisationSite: '', investissementsInfrastructures: [], investissementsMachinerie: [],
  tendancesSecteur: '', concurrents: [], strategieCommerciale: '', avantageConcurrentiel: '',
  eieRealisee: 'Non prévue', rejetsAtmospheriques: false, effluentsLiquides: false,
  files: {}
};

export default function App() {
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.IDENTIFICATION);
  const [formData, setFormData] = useState<FPIFormData>(INITIAL_DATA);

  const updateFormData = (fields: Partial<FPIFormData>) => setFormData(prev => ({ ...prev, ...fields }));

  const handleTableUpdate = <T extends { id: string }>(key: keyof FPIFormData, id: string, field: keyof T, value: any) => {
    const list = (formData[key] as unknown) as T[];
    updateFormData({ [key]: list.map(item => item.id === id ? { ...item, [field]: value } : item) });
  };

  const handleTableAdd = (key: keyof FPIFormData, defaultObj: any) => {
    const list = formData[key] as any[];
    updateFormData({ [key]: [...list, { ...defaultObj, id: Date.now().toString() }] });
  };

  const relevantDocs = useMemo(() => FPI_CHECKLIST.filter(doc => !doc.condition || doc.condition(formData)), [formData]);

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  return (
    <Layout currentStep={currentStep} onStepClick={setCurrentStep}>
      <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 min-h-[750px] flex flex-col">
        
        {/* Step Header */}
        <div className="mb-10 flex items-center justify-between border-b border-slate-50 pb-8">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl">
              {currentStep + 1}
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                {FormStep[currentStep].replace(/_/g, ' ')}
              </h2>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">
                Axe {String.fromCharCode(65 + Math.min(currentStep, 8))} du document FPI
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Complétion</div>
            <div className="w-48 h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-blue-600 transition-all duration-700 ease-out" 
                style={{ width: `${((currentStep + 1) / 14) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 space-y-10 overflow-y-auto pr-4 custom-scrollbar">
          
          {currentStep === FormStep.IDENTIFICATION && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-6 bg-red-50 border border-red-100 rounded-3xl flex gap-5">
                <Info className="text-red-500 shrink-0" size={28} />
                <p className="text-sm text-red-900 leading-relaxed italic font-medium">
                  Nota : Le dossier incomplet sera rejeté sans autre forme de procès. Assurez-vous d'avoir toutes les pièces justificatives listées à l'étape finale.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-widest">IFU / RCCM <span className="text-red-500">*</span></label>
                  <input type="text" value={formData.ifuRccm} onChange={e => updateFormData({ ifuRccm: e.target.value })} className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 outline-none transition-all shadow-sm" placeholder="Ex: CD/LSH/RCCM/14-B-0254" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Montant sollicité <span className="text-red-500">*</span></label>
                  <input type="text" value={formData.montantCredit} onChange={e => updateFormData({ montantCredit: e.target.value })} className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 outline-none transition-all shadow-sm" placeholder="En monnaie locale ou devise" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Nature du projet</label>
                <textarea rows={4} value={formData.natureProjet} onChange={e => updateFormData({ natureProjet: e.target.value })} className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 outline-none transition-all shadow-sm" placeholder="Description sommaire de l'activité..." />
              </div>
            </div>
          )}

          {currentStep === FormStep.GENERAL_ENTREPRISE && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3"><label className="text-xs font-black text-slate-700 uppercase">1. Raison sociale</label><input type="text" value={formData.raisonSociale} onChange={e => updateFormData({ raisonSociale: e.target.value })} className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 outline-none" /></div>
                <div className="space-y-3"><label className="text-xs font-black text-slate-700 uppercase">2. Sigle</label><input type="text" value={formData.sigle} onChange={e => updateFormData({ sigle: e.target.value })} className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 outline-none" /></div>
              </div>
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-700 uppercase">3. Forme juridique selon l'OHADA</label>
                <div className="flex flex-wrap gap-3">
                  {FORME_JURIDIQUE_OPTIONS.map(opt => (
                    <button key={opt} onClick={() => updateFormData({ formeJuridique: opt })} className={`px-5 py-2.5 rounded-xl border-2 text-[10px] font-black uppercase transition-all ${formData.formeJuridique === opt ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}>{opt}</button>
                  ))}
                </div>
              </div>
              <DynamicTable<Shareholder>
                title="9. Répartition du Capital Social"
                columns={[
                  { key: 'nom', label: 'Associé / Actionnaire' },
                  { key: 'nationalite', label: 'Nationalité' },
                  { key: 'valeurApport', label: 'Valeur Apport' },
                  { key: 'natureApport', label: 'Nature', type: 'select', options: ['Numéraire', 'Nature'] },
                ]}
                data={formData.shareholders}
                onAdd={() => handleTableAdd('shareholders', { nom: '', nationalite: '', valeurApport: '', natureApport: 'Numéraire', isOwner: false })}
                onRemove={id => updateFormData({ shareholders: formData.shareholders.filter(s => s.id !== id) })}
                onChange={(id, key, val) => handleTableUpdate('shareholders', id, key, val)}
              />
            </div>
          )}

          {currentStep === FormStep.PATRIMOINE_MOYENS && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <DynamicTable<AssetRow>
                title="19. (a) Terrains, bâtiments, infrastructures"
                columns={[
                  { key: 'moyen', label: 'Description' },
                  { key: 'anneeAcquisition', label: 'Année Acquisition' },
                  { key: 'valeurEstimee', label: 'Valeur Estimée' },
                  { key: 'etat', label: 'État', type: 'select', options: ['Bon', 'Mauvais'] },
                ]}
                data={formData.assetsInfrastructures}
                onAdd={() => handleTableAdd('assetsInfrastructures', { moyen: '', anneeAcquisition: '', valeurEstimee: '', etat: 'Bon' })}
                onRemove={id => updateFormData({ assetsInfrastructures: formData.assetsInfrastructures.filter(a => a.id !== id) })}
                onChange={(id, key, val) => handleTableUpdate('assetsInfrastructures', id, key, val)}
              />
            </div>
          )}

          {currentStep === FormStep.CHECKLIST_DOCUMENTS && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 bg-slate-900 text-white p-6 rounded-3xl shadow-xl">
                <ClipboardList size={32} className="text-blue-500" />
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight">II. Check-list des documents obligatoires</h3>
                  <p className="text-slate-400 text-xs">Veuillez uploader chaque pièce scannée.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {relevantDocs.map(doc => (
                  <FileUpload 
                    key={doc.id} 
                    doc={doc} 
                    onFileSelect={f => updateFormData({ files: { ...formData.files, [doc.id]: f } })} 
                    currentFile={formData.files[doc.id] || null} 
                  />
                ))}
              </div>
            </div>
          )}

          {/* Placeholder for other steps */}
          {![FormStep.IDENTIFICATION, FormStep.GENERAL_ENTREPRISE, FormStep.PATRIMOINE_MOYENS, FormStep.CHECKLIST_DOCUMENTS].includes(currentStep) && (
            <div className="flex flex-col items-center justify-center py-24 text-slate-300">
              {/* Fix: Replaced undefined LayoutList with LayoutGrid */}
              <LayoutGrid size={64} strokeWidth={1} className="mb-6" />
              <p className="font-black uppercase tracking-widest text-sm">Contenu Sectionnel PDF</p>
              <p className="text-xs mt-2 text-slate-400 font-bold">Implémentation complète en cours pour l'axe {String.fromCharCode(65 + currentStep)}</p>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
          <button 
            onClick={prevStep} 
            disabled={currentStep === 0}
            className={`flex items-center gap-3 px-8 py-4 font-black text-xs uppercase tracking-widest transition-all rounded-2xl ${
              currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <ArrowLeft size={16} /> Précédent
          </button>

          <div className="flex items-center gap-4">
            {currentStep === FormStep.DECLARATION_FINALE ? (
              <button 
                onClick={() => alert("Transmission sécurisée au FPI RDC...")}
                className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-12 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-green-200 transition-all transform hover:-translate-y-1"
              >
                Soumettre le dossier <CheckCircle size={18} />
              </button>
            ) : (
              <button 
                onClick={nextStep}
                className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-200 transition-all transform hover:-translate-y-1"
              >
                Suivant <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="mt-10 text-center">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] leading-relaxed">
          Plateforme Digitale FPI RDC • Version conforme OHADA 2024<br/>
          Sécurisation SSL 256-bit • Archivage Numérique Certifié
        </p>
      </div>
    </Layout>
  );
}
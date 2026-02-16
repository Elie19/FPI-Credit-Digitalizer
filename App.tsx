
import React, { useState, useMemo } from 'react';
import { Layout } from './components/Layout';
import { FileUpload } from './components/FileUpload';
import { DynamicTable } from './components/DynamicTable';
import { FormStep, FPIFormData, Shareholder, AssetRow, InvestmentRow, PersonnelRow } from './types';
import { FPI_CHECKLIST, FORME_JURIDIQUE_OPTIONS } from './constants';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle, 
  FileWarning, 
  Info,
  ChevronRight,
  ClipboardCheck,
  Building2,
  Users,
  Briefcase,
  TrendingUp,
  Leaf
} from 'lucide-react';

const INITIAL_DATA: FPIFormData = {
  ifuRccm: '', natureProjet: '', montantCredit: '', butCredit: 'NEUF',
  raisonSociale: '', sigle: '', formeJuridique: '', dateCreation: '', paysCreation: 'RDC',
  dateDebutActivites: '', dateAutorisationOuverture: '', refAutorisationOuverture: '',
  activitePrincipale: '', activiteSecondaire: '', montantCapitalSocial: '', deviseCapital: 'USD',
  shareholders: [], associéMajoritaireActivitésAutres: false,
  numRCCM: '', dateRCCM: '', lieuRCCM: '', numIDNat: '', dateIDNat: '', lieuIDNat: '',
  numImpot: '', dateImpot: '', lieuImpot: '', adresseSiegeSocial: '', natureLocauxSiege: 'Locataire',
  adresseSiegeExploitation: '', natureLocauxExploitation: 'Locataire',
  telFixe: '', telMobile: '', fax: '', email: '', siteWeb: '', boitePostale: '', bankRefs: [],
  nomPromoteur: '', qualiteJuridiquePromoteur: '', etatCivilPromoteur: 'Celibataire',
  nationalitePromoteur: 'Congolaise', fonctionEntreprise: '', telFixePromoteur: '',
  telMobilePromoteur: '', emailPromoteur: '', adresseDomicilePromoteur: '', natureLocauxDomicile: 'Locataire',
  formationsExperiences: '', faitPartieAssociationPatronale: false, aperçuHistoriqueEntreprise: '',
  assetsInfrastructures: [], assetsMachines: [], stocks: [],
  statsProduction: { annee1: '', annee2: '', annee3: '', perspectives: '' },
  dejaBeneficieConcours: false, faillite: false, poursuites: false, garantPrets: false, antecedentsFiscaux: false,
  projetHistorique: '', projetMotivation: '', projetPrevisions: '', objectifsQuantitatifs: '',
  investissementsInfrastructures: [], investissementsMachinerie: [], investissementsLogistique: [],
  autofinancementSources: '', autofinancementEmprunt: false,
  tendancesSecteur: '', tauxCroissanceMarche: 'Moyen', perspectivesMarche: 'Moyennes', concurrents: [],
  strategieCommerciale: '', marchésVisés: '', avantageConcurrentiel: '',
  isoCertified: false, assuréIncendie: false, milieuSensible: '',
  eieRealisee: 'Non prévue', rejetsAtmospheriques: false, effluentsLiquides: false, nuisancesSonores: false,
  files: {}
};

export default function App() {
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.IDENTIFICATION);
  const [formData, setFormData] = useState<FPIFormData>(INITIAL_DATA);

  const updateFormData = (fields: Partial<FPIFormData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

  const handleTableChange = <T extends { id: string }>(key: keyof FPIFormData, id: string, field: keyof T, value: any) => {
    // Fix: Cast to unknown first before casting to T[] to avoid overlap errors with union type
    const list = (formData[key] as unknown) as T[];
    updateFormData({
      [key]: list.map(item => item.id === id ? { ...item, [field]: value } : item)
    });
  };

  const handleTableAdd = (key: keyof FPIFormData, defaultObj: any) => {
    const list = formData[key] as any[];
    updateFormData({ [key]: [...list, { ...defaultObj, id: Date.now().toString() }] });
  };

  const handleTableRemove = (key: keyof FPIFormData, id: string) => {
    const list = formData[key] as any[];
    updateFormData({ [key]: list.filter(item => item.id !== id) });
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  return (
    <Layout currentStep={currentStep} onStepClick={setCurrentStep}>
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 min-h-[700px] flex flex-col">
        
        {/* Step Info */}
        <div className="mb-10 flex items-center justify-between border-b border-slate-50 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner">
              {currentStep + 1}
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                {FormStep[currentStep].replace(/_/g, ' ')}
              </h2>
              <p className="text-slate-500 text-sm font-medium">Saisie conforme au document original FPI</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Progression</span>
            <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-500" 
                style={{ width: `${((currentStep + 1) / (Object.keys(FormStep).length / 2)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          
          {/* STEP 0: IDENTIFICATION (Page 2) */}
          {currentStep === FormStep.IDENTIFICATION && (
            <div className="space-y-6">
              <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4">
                <Info className="text-blue-500 shrink-0" size={24} />
                <p className="text-sm text-blue-800 leading-relaxed italic">
                  Ce formulaire est à remplir obligatoirement par le promoteur du projet. Un dossier incomplet sera rejeté sans autre forme de procès.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-600 uppercase tracking-wider flex items-center gap-2">
                    IFU / RCCM <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={formData.ifuRccm} 
                    onChange={e => updateFormData({ ifuRccm: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all"
                    placeholder="Identification Unique"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-600 uppercase tracking-wider">
                    Montant du crédit sollicité <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={formData.montantCredit} 
                    onChange={e => updateFormData({ montantCredit: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-blue-500 outline-none"
                    placeholder="Ex: 500,000 USD"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-600 uppercase tracking-wider">Nature du projet</label>
                <textarea 
                  rows={4}
                  value={formData.natureProjet}
                  onChange={e => updateFormData({ natureProjet: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-blue-500 outline-none"
                  placeholder="Décrivez brièvement le projet..."
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-600 uppercase tracking-wider">But du crédit</label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {['NEUF', 'EXTENSION', 'RENFORCEMENT', 'MODERNISATION', 'AUTRE'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => updateFormData({ butCredit: opt as any })}
                      className={`px-4 py-3 rounded-xl border-2 text-xs font-bold transition-all ${
                        formData.butCredit === opt 
                        ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-100' 
                        : 'border-slate-50 bg-slate-50 text-slate-500 hover:border-slate-200'
                      }`}
                    >
                      {opt === 'NEUF' ? 'Activité Neuve' : opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 1: ENTREPRISE (Page 3) */}
          {currentStep === FormStep.ENTREPRISE && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-600 uppercase tracking-wider">Raison sociale / Dénomination</label>
                  <input type="text" value={formData.raisonSociale} onChange={e => updateFormData({ raisonSociale: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-600 uppercase tracking-wider">Sigle</label>
                  <input type="text" value={formData.sigle} onChange={e => updateFormData({ sigle: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-600 uppercase tracking-wider">Forme juridique (OHADA)</label>
                <div className="flex flex-wrap gap-2">
                  {FORME_JURIDIQUE_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      onClick={() => updateFormData({ formeJuridique: opt })}
                      className={`px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase transition-all ${
                        formData.formeJuridique === opt 
                        ? 'bg-slate-900 border-slate-900 text-white' 
                        : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <DynamicTable<Shareholder>
                title="9. Répartition du Capital"
                columns={[
                  { key: 'nom', label: 'Associé / Actionnaire' },
                  { key: 'nationalite', label: 'Nationalité' },
                  { key: 'valeurApport', label: 'Valeur Apport' },
                  { key: 'natureApport', label: 'Nature', type: 'select', options: ['Numéraire', 'Nature'] },
                ]}
                data={formData.shareholders}
                onAdd={() => handleTableAdd('shareholders', { nom: '', nationalite: '', valeurApport: '', natureApport: 'Numéraire', isOwner: false })}
                onRemove={(id) => handleTableRemove('shareholders', id)}
                onChange={(id, key, val) => handleTableChange('shareholders', id, key, val)}
              />

              <div className="p-5 bg-red-50 border-l-4 border-red-500 rounded-r-2xl flex gap-4">
                <FileWarning className="text-red-500 shrink-0" size={24} />
                <div>
                  <h5 className="text-xs font-black text-red-900 uppercase mb-1">Documents requis à cette étape</h5>
                  <p className="text-[11px] text-red-700 leading-relaxed italic">
                    Joindre en annexe une copie des statuts sociaux, de l'organigramme et du CV complet pour l'associé majoritaire et le gérant.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: PATRIMOINE (Page 7) */}
          {currentStep === FormStep.PATRIMOINE && (
            <div className="space-y-8">
              <div className="bg-slate-900 text-white p-6 rounded-2xl flex items-center justify-between shadow-xl">
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight">B. Patrimoine et Moyens d'Exploitation</h3>
                  <p className="text-slate-400 text-xs">Inventaire des actifs actuels de l'entreprise</p>
                </div>
                <Briefcase size={32} className="text-blue-500" />
              </div>

              <DynamicTable<AssetRow>
                title="19. (a) Terrains, bâtiments, infrastructures"
                columns={[
                  { key: 'moyen', label: 'Moyen' },
                  { key: 'anneeAcquisition', label: 'Année Acquisition' },
                  { key: 'valeurEstimee', label: 'Valeur Estimée' },
                  { key: 'etat', label: 'État', type: 'select', options: ['Bon', 'Mauvais'] },
                ]}
                data={formData.assetsInfrastructures}
                onAdd={() => handleTableAdd('assetsInfrastructures', { moyen: '', anneeAcquisition: '', valeurEstimee: '', etat: 'Bon' })}
                onRemove={(id) => handleTableRemove('assetsInfrastructures', id)}
                onChange={(id, key, val) => handleTableChange('assetsInfrastructures', id, key, val)}
              />

              <DynamicTable<AssetRow>
                title="19. (b) Machines, équipements, matériels roulants"
                columns={[
                  { key: 'moyen', label: 'Moyen' },
                  { key: 'anneeAcquisition', label: 'Année Acquisition' },
                  { key: 'valeurEstimee', label: 'Valeur Estimée' },
                  { key: 'etat', label: 'État', type: 'select', options: ['Bon', 'Mauvais'] },
                ]}
                data={formData.assetsMachines}
                onAdd={() => handleTableAdd('assetsMachines', { moyen: '', anneeAcquisition: '', valeurEstimee: '', etat: 'Bon' })}
                onRemove={(id) => handleTableRemove('assetsMachines', id)}
                onChange={(id, key, val) => handleTableChange('assetsMachines', id, key, val)}
              />
            </div>
          )}

          {/* STEP 10: CHECKLIST (Page 41) */}
          {currentStep === FormStep.CHECKLIST && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-200">
                <ClipboardCheck size={32} className="text-blue-600" />
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight">II. Check-list des documents obligatoires</h3>
                  <p className="text-slate-500 text-xs">Cochez et joignez les documents demandés par le FPI.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FPI_CHECKLIST.map(doc => (
                  <FileUpload 
                    key={doc.id} 
                    doc={doc} 
                    onFileSelect={(f) => updateFormData({ files: { ...formData.files, [doc.id]: f } })} 
                    currentFile={formData.files[doc.id] || null} 
                  />
                ))}
              </div>
            </div>
          )}

          {/* Fallback for steps not explicitly detailed in this snippet */}
          {![FormStep.IDENTIFICATION, FormStep.ENTREPRISE, FormStep.PATRIMOINE, FormStep.CHECKLIST].includes(currentStep) && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-300">
              <AlertCircle size={48} className="mb-4" />
              <p className="font-black uppercase tracking-widest text-sm">Contenu en cours de saisie</p>
              <p className="text-xs mt-2 text-slate-400">Section logicielle pour la page {currentStep + 2} du PDF FPI</p>
            </div>
          )}
        </div>

        {/* Navigation Footer */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
          <button 
            onClick={prevStep} 
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-6 py-3 font-black text-xs uppercase tracking-widest transition-all ${
              currentStep === 0 ? 'opacity-0' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <ArrowLeft size={16} /> Précédent
          </button>

          <div className="flex items-center gap-4">
            {currentStep === FormStep.DECLARATION ? (
              <button 
                onClick={() => alert("Soumission finale du dossier au FPI...")}
                className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-green-100 transition-all transform hover:-translate-y-1"
              >
                Soumettre ma demande <CheckCircle size={16} />
              </button>
            ) : (
              <button 
                onClick={nextStep}
                className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-100 transition-all transform hover:-translate-y-1"
              >
                Suivant <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      <p className="mt-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-relaxed">
        Système de Gestion des Demandes de Crédit - FPI RDC<br/>
        Plateforme Numérique Certifiée conforme OHADA / SYSCOHADA
      </p>
    </Layout>
  );
}
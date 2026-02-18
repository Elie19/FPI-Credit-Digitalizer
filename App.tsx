
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { FormStep, FPIFormData } from './types';
import { SectionA } from './components/sections/SectionA';
import { SectionB } from './components/sections/SectionB';
import { SectionC } from './components/sections/SectionC';
import { SectionD } from './components/sections/SectionD';
import { SectionE } from './components/sections/SectionE';
import { SectionF } from './components/sections/SectionF';
import { SectionG } from './components/sections/SectionG';
import { SectionH } from './components/sections/SectionH';
import { SectionI } from './components/sections/SectionI';
import { SectionChecklist } from './components/sections/SectionChecklist';
import { SectionDeclaration } from './components/sections/SectionDeclaration';
import { SectionIdentification } from './components/sections/SectionIdentification';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

// INITIALISATION AVEC VALEURS PAR DÉFAUT VIDES
const INITIAL_DATA: FPIFormData = {
  ifuRccm: '', natureProjet: '', montantCredit: '', butCredit: 'NEUF',
  nationalitePromoteur: 'Congolaise',
  raisonSociale: '', sigle: '', formeJuridique: '', dateCreation: '', paysCreation: 'RDC',
  dateDebutActivites: '', dateAutorisationOuverture: '', refAutorisationOuverture: '',
  activitePrincipale: '', activiteSecondaire: '', montantCapitalSocial: '', deviseCapital: 'USD',
  shareholders: [], actionnaireActivitesAutres: false,
  numRCCM: '', dateRCCM: '', lieuRCCM: '', numIDNat: '', dateIDNat: '', lieuIDNat: '',
  numImpot: '', dateImpot: '', lieuImpot: '', 
  adresseSiegeSocial: '', natureLocauxSiege: 'Locataire',
  adresseSiegeExploitation: '', natureLocauxExploitation: 'Locataire',
  telFixe: '', boitePostale: '', telMobile: '', email: '', fax: '', siteInternet: '',
  terrainsBatiments: [], machinesEquipements: [], stocks: [],
  prodStatsAnnee1: '', prodStatsAnnee2: '', prodStatsAnnee3: '', perspectivesAvenir: '',
  personnelCle: [], sousTraitance: false, detailsSousTraitance: '',
  faillite: false, poursuites: false, garantPrets: false, antecedentsFiscaux: false,
  dejaBeneficieConcours: false, historiquePrets: [],
  
  // Section E
  projetHistorique: '', projetMotivation: '', projetPrevisions: '', objectifsQuantitatifs: '', 
  localisationSite: '', natureLocauxSite: 'Propriétaire', 
  voiesAccesSite: [], voiesEvacuation: [], connexionReseaux: false, detailsReseaux: [],
  zonesLocalisation: [], investisDejaTerrains: [], investisDejaMachines: [], investisDejaStocks: [],
  investisNouveauInfra: [], investisNouveauMachines: [], investisNouveauTaxes: [], investisNouveauStocks: [],
  schemaFinancemInfra: [], schemaFinancemMachines: [], schemaFinancemTaxes: [], schemaFinancemStocks: [],
  autofinancementSources: '', autofinanceEmprunte: false, detailsEmpruntAutofin: [],
  autofinanceSubventionne: false, detailsSubventionAutofin: [], planningRealisation: [],
  modeFinancementDominant: 'Dette senior', dureeFinancement: 'Moyen terme', modaliteRemboursement: 'Annuités',

  // Section F
  tendancesSecteur: '', croissanceMarche: 'Moyen', perspectivesEvolution: 'Moyennes', 
  avantageGeographique: 'Neutre', reductionCoutsLocale: 'Neutre', avantageTechnologique: 'Neutre',
  resilienceEconomique: 'Neutre', resilienceSectorielle: 'Neutre', reglementationSecteur: false,
  concurrentsLocaux: [], concurrentsImportes: [], partMarcheOffreurs: '', swotConcurrents: [],
  estimationConsommateurs: [], marchesVises: '', produitsEnvisages: [], ententesClienteles: '',
  avantagesProduits: [], prixVenteMarche: [], circuitsDistribution: [], actionsPromotion: [],

  // Section G
  supplyCycle: [], processProduction: '', productionNorms: [], chosenTechnology: [], installedCapacity: [],
  permisObtenus: 'Neutre', contratIngenierie: 'Neutre', contratConstruction: 'Neutre', garantieAchevement: 'Neutre',
  soliditeContratExploitation: 'N/A', competencesExploitant: 'N/A', risqueVolatilitePrix: 'Non applicable',
  risqueVolumeAppro: 'Non applicable', risqueReserves: 'Non applicable', moyensDistribution: '',
  qualityMechanisms: [], unitCostStructure: [], personnelExistant: [], personnelNouveau: [], personnelGerant: [],
  strategieRecrutement: '',

  // Section H init
  annexesGaranties: {
    titrePropriete: false,
    rapportExpertise: false,
    photosSite: false
  },

  // Section I init
  isoCertifie: false,
  assuranceIncendie: false,
  secteursEligibilite: [],
  milieuxSensibles: [],
  activitesEnvironnementImmediat: '',
  vocationZoneImplantation: '',
  etudeImpactStatus: 'Neutre',
  consultationPubliqueStatus: 'Neutre',
  suiviEnvironnemental: false,
  suiviEnvironnementalForme: '',
  impactAtmospherique: { exists: false, details: '', technologies: '' },
  impactEffluents: { exists: false, details: '', debit: '', etatMilieu: 'Non pollué / pas d\'usage spécifique', technologies: '' },
  impactSonore: { exists: false, niveau: '', normes: 'Pas de normes', technologies: '' },
  impactSolsEau: { exists: false, polluants: '' },
  impactDechetsDangereux: { exists: false, substances: '', traitement: '' },
  impactQuantiteProduite: { exists: false, quantite: '', devenir: '' },
  impactPaysagePatrimoine: { exists: false, autorisation: '', impacts: '' },
  impactFauneFlore: { exists: false, nature: '', risques: '' },
  beneficesEnvironnementaux: { exists: false, types: [], details: '' },
  impactSocialHumain: { exists: false, types: [], nbPersonnes: 'Moins d\'une centaine', mesures: '' },
  fraisOuverturePayes: false,

  impactEnvironnement: false,
  checklistDocuments: {},
  declarationNom: '',
  declarationFonction: '',
  declarationLieu: '',
  declarationDate: '',
  declarationAcceptee: false,
  files: {}
};

export default function App() {
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.IDENTIFICATION);
  const [formData, setFormData] = useState<FPIFormData>(INITIAL_DATA);

  const updateData = (fields: Partial<FPIFormData>) => setFormData(prev => ({ ...prev, ...fields }));

  const renderSection = () => {
    switch (currentStep) {
      case FormStep.IDENTIFICATION:
        return <SectionIdentification formData={formData} updateData={updateData} />;
      case FormStep.SECTION_A:
        return <SectionA formData={formData} updateData={updateData} />;
      case FormStep.SECTION_B:
      case FormStep.PATRIMOINE_MOYENS:
        return <SectionB formData={formData} updateData={updateData} />;
      case FormStep.SECTION_C:
      case FormStep.ADMIN_FISCAL:
        return <SectionC formData={formData} updateData={updateData} />;
      case FormStep.SECTION_D:
      case FormStep.FINANCES_JURIDIQUE:
        return <SectionD formData={formData} updateData={updateData} />;
      case FormStep.SECTION_E:
      case FormStep.PROJET_DESCRIPTION:
        return <SectionE formData={formData} updateData={updateData} />;
      case FormStep.SECTION_F:
      case FormStep.DONNEES_MARCHE:
        return <SectionF formData={formData} updateData={updateData} />;
      case FormStep.SECTION_G:
      case FormStep.QUALITE_ENVIRONNEMENT:
        return <SectionG formData={formData} updateData={updateData} />;
      case FormStep.SECTION_H:
      case FormStep.GARANTIES_OFFERTES:
        return <SectionH formData={formData} updateData={updateData} />;
      case FormStep.SECTION_I:
      case FormStep.EVALUATION_ENVIRONNEMENTALE:
        return <SectionI formData={formData} updateData={updateData} />;
      case FormStep.CHECKLIST_DOCUMENTS:
        return <SectionChecklist formData={formData} updateData={updateData} />;
      case FormStep.DECLARATION_FINALE:
        return <SectionDeclaration formData={formData} updateData={updateData} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center py-32 text-slate-300 bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-200">
            <p className="font-black uppercase tracking-widest text-sm">Section en cours de développement</p>
            <p className="text-xs mt-2 font-medium opacity-50">L'architecture modulaire permet d'ajouter ce contenu facilement.</p>
          </div>
        );
    }
  };

  const TOTAL_STEPS = Object.keys(FormStep).length / 2; // Approximatif si enums doublés
  const progress = Math.round(((currentStep + 1) / 14) * 100);

  return (
    <Layout currentStep={currentStep} onStepClick={setCurrentStep}>
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 md:p-12 min-h-[800px] flex flex-col relative overflow-hidden transition-colors duration-300">
        
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-50 dark:border-slate-800 pb-8 relative z-10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl flex items-center justify-center font-black text-2xl shadow-2xl shadow-slate-200 dark:shadow-none">
              {currentStep === FormStep.IDENTIFICATION ? 'ID' :
               currentStep === FormStep.SECTION_A ? 'A' :
               currentStep === FormStep.SECTION_B ? 'B' :
               currentStep === FormStep.SECTION_C ? 'C' : 
               currentStep === FormStep.SECTION_D ? 'D' : 
               currentStep === FormStep.SECTION_E ? 'E' : 
               currentStep === FormStep.SECTION_F ? 'F' : 
               currentStep === FormStep.SECTION_G ? 'G' : 
               currentStep === FormStep.SECTION_H ? 'H' : 
               currentStep === FormStep.SECTION_I ? 'I' : 
               currentStep === FormStep.CHECKLIST_DOCUMENTS ? 'J' : 
               currentStep === FormStep.DECLARATION_FINALE ? 'K' : currentStep}
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">
                {FormStep[currentStep]?.replace(/_/g, ' ')}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <span className={`w-2 h-2 rounded-full animate-pulse ${currentStep >= FormStep.SECTION_I ? 'bg-emerald-500' : 'bg-green-500'}`} />
                <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
                  Formulaire Officiel FPI
                </p>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-64">
            <div className="flex justify-between text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase mb-2">
              <span>Progression du dossier</span>
              <span>{progress}%</span>
            </div>
            <div className="h-3 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
              <div 
                className={`h-full bg-gradient-to-r transition-all duration-700 ease-out rounded-full ${currentStep >= FormStep.SECTION_I ? 'from-emerald-500 to-teal-500' : 'from-blue-600 to-indigo-600'}`}
                style={{ width: `${progress}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 relative z-10">
          {renderSection()}
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between relative z-10">
          <button 
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(prev => prev - 1)}
            className={`flex items-center gap-3 px-8 py-4 font-black text-[10px] uppercase tracking-[0.2em] transition-all rounded-2xl ${
              currentStep === 0 
                ? 'opacity-0 pointer-events-none' 
                : 'text-slate-400 dark:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <ArrowLeft size={16} /> Précédent
          </button>
          
          <button 
            onClick={() => setCurrentStep(prev => (prev < 13 ? prev + 1 : prev))}
            className={`group flex items-center gap-4 px-10 py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl transition-all transform hover:-translate-y-1 active:translate-y-0 ${
              currentStep >= FormStep.SECTION_I ? 'bg-emerald-900 dark:bg-emerald-100 hover:bg-emerald-700 dark:hover:bg-emerald-200 shadow-emerald-200/50 dark:shadow-none' : 'bg-slate-900 dark:bg-slate-100 hover:bg-blue-600 dark:hover:bg-slate-200 shadow-slate-300/50 dark:shadow-none'
            } text-white dark:text-slate-900`}
          >
            {currentStep === 13 ? 'Soumettre le dossier' : 'Étape Suivante'}
            {currentStep === 13 ? <CheckCircle2 size={18} /> : <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </div>
      </div>
    </Layout>
  );
}

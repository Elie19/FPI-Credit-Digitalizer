
// --- ENUMS & TYPES UTILITAIRES ---
export type BooleanChoice = boolean;
export type OwnershipType = 'Propriétaire' | 'Locataire';
export type AssetCondition = 'Bon' | 'Mauvais';
export type Currency = 'USD' | 'CDF' | 'EUR';

export type Level = 'Élevé' | 'Moyen' | 'Faible' | 'Élevées' | 'Moyennes' | 'Faibles' | 'Non' | 'Non applicable' | 'N/A';
export type StatusLevel = 'Oui' | 'En cours' | 'Non' | 'Non applicable' | 'Neutre';
export type Resilience = 'Oui, sans difficulté' | 'Oui, avec difficulté' | 'Non' | 'Neutre';
export type Advantage = 'Oui' | 'Non' | 'Neutre';
export type StepStatus = 'Réalisée' | 'Prévue et non réalisée' | 'Non prévue' | 'Neutre';

// --- INTERFACES POUR TABLEAUX DYNAMIQUES ---
export interface Shareholder {
  id: string;
  nom: string;
  nationalite: string;
  valeurApport: string;
  natureApport: 'Numéraire' | 'Nature';
  adresseNatureDomicile: string;
}

export interface AssetRow {
  id: string;
  moyen: string;
  anneeAcquisition: string;
  valeurEstimee: string;
  etat: AssetCondition;
  garantie?: string;
  capacite?: string;
}

export interface StockRow {
  id: string;
  moyen: string;
  quantite: string;
  valeurMoyenne: string;
  dateValorisation: string;
  condition: AssetCondition;
  paysOrigine?: string;
  prix?: string;
}

export interface PersonnelRow {
  id: string;
  noms: string;
  poste: string;
  taches: string;
  dateEngagement: string;
}

export interface LoanHistoryRow {
  id: string;
  objetPret: string;
  montantTotal: string;
  encours: string;
}

// Spécifiques Section E
export interface InfrastructureRow {
  id: string;
  item: string;
  designation: string;
  quantite: string;
  prixUnitaire: string;
  valeurCIF: string;
  provenance: 'Loc' | 'Imp';
  exoneration: 'Exo' | 'N/Exo';
}

export interface FinancingRow {
  id: string;
  item: string;
  designation: string;
  partPromoteur: string;
  creditInstitution: string;
}

export interface SiteAccessRow {
  id: string;
  voie: string;
  etat: AssetCondition;
  actions: string;
}

export interface RealizationTaskRow {
  id: string;
  tache: string;
  acteur: string;
  duree: string;
  montant: string;
  source: string;
}

export interface SelfFinancingLoanRow {
  id: string;
  source: string;
  garantie: string;
  montant: string;
  taux: string;
  maturite: string;
}

// Spécifiques Section F
export interface CompetitorRow {
  id: string;
  producteur: string;
  paysOrigine: string;
  produit: string;
  niveauProduction: string;
  capaciteProduction: string;
  caracteristiques: string;
  prixVente: string;
}

export interface ImportedCompetitorRow {
  id: string;
  produit: string;
  paysOrigine: string;
  quantite: string;
  caracteristiques: string;
  prixVente: string;
}

export interface CompetitorSwotRow {
  id: string;
  forces: string;
  faiblesses: string;
}

export interface ConsumerEstimationRow {
  id: string;
  produit: string;
  estimation: string;
}

export interface ProductTypeRow {
  id: string;
  produit: string;
  caracteristiques: string;
  avantage?: string;
  prixMarche?: string;
}

export interface DistributionChannelRow {
  id: string;
  circuit: string;
  noms: string;
  adresses: string;
  contacts: string;
  ententes: string;
}

export interface PromotionActivityRow {
  id: string;
  activite: string;
  objectifs: string;
  taches: string;
  cout: string;
  delais: string;
}

// Spécifiques Section G
export interface SupplyCycleRow {
  id: string;
  matiere: string;
  paysOrigine: string;
  quantite: string;
  cycleAppro: string;
}

export interface ProductionNormRow {
  id: string;
  matiere: string;
  quantite: string;
  part: string;
  tauxPerte: string;
}

export interface TechnologyRow {
  id: string;
  technologie: string;
  disponibilite: string;
  avantagesInconvenients: string;
  cycleVie: string;
  transfertTechnique: string;
  formation: string;
}

export interface CapacityRow {
  id: string;
  composante: string;
  capaciteInstallee: string;
}

export interface QualityMechanismRow {
  id: string;
  matiere: string;
  mecanismes: string;
}

export interface UnitCostRow {
  id: string;
  produit: string;
  unite: string;
  structurePrix: string;
}

export interface DetailedPersonnelRow {
  id: string;
  nombre: string;
  remuneration: string;
  fonction: string;
  qualification: string;
  categorie: string;
  nationalite: string;
  avantagesSociaux: string;
}

// Spécifiques Section H
export interface SelectedGuaranteeDocs {
  titrePropriete: boolean;
  rapportExpertise: boolean;
  photosSite: boolean;
}

export interface RequiredDoc {
  id: string;
  category: string;
  label: string;
  formats: string[];
  maxSizeMB: number;
  required: boolean;
  condition?: (data: CreditFormData) => boolean;
  code?: string;
  section?: string;
}

// --- STATE GLOBAL ---
export interface CreditFormData {
  ifuRccm: string;
  natureProjet: string;
  montantCredit: string;
  butCredit: string;
  butCreditAutre?: string;
  nationalitePromoteur: string;
  dossierNumber: string;
  submissionDate: string;

  // SECTION A
  raisonSociale: string;
  sigle: string;
  formeJuridique: string;
  dateCreation: string;
  paysCreation: string;
  dateDebutActivites: string;
  dateAutorisationOuverture: string;
  refAutorisationOuverture: string;
  activitePrincipale: string;
  activiteSecondaire: string;
  montantCapitalSocial: string;
  deviseCapital: Currency;
  shareholders: Shareholder[];
  actionnaireActivitesAutres: BooleanChoice;
  detailsActivitesAutres?: string;
  numRCCM: string; dateRCCM: string; lieuRCCM: string;
  numIDNat: string; dateIDNat: string; lieuIDNat: string;
  numImpot: string; dateImpot: string; lieuImpot: string;
  adresseSiegeSocial: string;
  natureLocauxSiege: OwnershipType;
  adresseSiegeExploitation: string;
  natureLocauxExploitation: OwnershipType;
  telFixe: string; boitePostale: string;
  telMobile: string; email: string;
  fax: string; siteInternet: string;

  // SECTION B
  terrainsBatiments: AssetRow[];
  machinesEquipements: AssetRow[];
  stocks: StockRow[];
  prodStatsAnnee1: string; prodStatsAnnee2: string; prodStatsAnnee3: string;
  perspectivesAvenir: string;

  // SECTION C
  personnelCle: PersonnelRow[];
  sousTraitance: BooleanChoice;
  detailsSousTraitance?: string;

  // SECTION D
  dejaBeneficieConcours: BooleanChoice;
  historiquePrets: LoanHistoryRow[];
  faillite: BooleanChoice; detailsFaillite?: string;
  poursuites: BooleanChoice; detailsPoursuites?: string;
  garantPrets: BooleanChoice; detailsGarant?: string;
  antecedentsFiscaux: BooleanChoice; detailsAntecedents?: string;

  // SECTION E: PROJET & FINANCEMENT
  projetHistorique: string;
  projetMotivation: string;
  projetPrevisions: string;
  objectifsQuantitatifs: string;
  localisationSite: string;
  natureLocauxSite: OwnershipType;
  voiesAccesSite: SiteAccessRow[];
  voiesEvacuation: SiteAccessRow[];
  connexionReseaux: BooleanChoice;
  detailsReseaux: SiteAccessRow[];
  zonesLocalisation: string[];
  zonesLocalisationAutre?: string;

  investisDejaTerrains: AssetRow[];
  investisDejaMachines: AssetRow[];
  investisDejaStocks: StockRow[];

  investisNouveauInfra: InfrastructureRow[];
  investisNouveauMachines: InfrastructureRow[];
  investisNouveauTaxes: InfrastructureRow[];
  investisNouveauStocks: InfrastructureRow[];

  schemaFinancemInfra: FinancingRow[];
  schemaFinancemMachines: FinancingRow[];
  schemaFinancemTaxes: FinancingRow[];
  schemaFinancemStocks: FinancingRow[];

  autofinancementSources: string;
  autofinanceEmprunte: BooleanChoice;
  detailsEmpruntAutofin: SelfFinancingLoanRow[];
  autofinanceSubventionne: BooleanChoice;
  detailsSubventionAutofin: any[];

  planningRealisation: RealizationTaskRow[];
  modeFinancementDominant: 'Dette senior' | 'Dette subordonnée' | 'Capital';
  dureeFinancement: 'Court terme' | 'Moyen terme' | 'Long terme' | 'Indéterminée';
  modaliteRemboursement: 'Annuités' | 'Annuités avec différé' | 'In fine' | 'Dividendes';

  // SECTION F: MARCHE & STRATEGIE
  tendancesSecteur: string;
  croissanceMarche: Level;
  perspectivesEvolution: Level;
  avantageGeographique: Advantage;
  reductionCoutsLocale: Advantage;
  avantageTechnologique: Advantage;
  resilienceEconomique: Resilience;
  resilienceSectorielle: Resilience;
  reglementationSecteur: BooleanChoice;
  detailsReglementation?: string;

  concurrentsLocaux: CompetitorRow[];
  concurrentsImportes: ImportedCompetitorRow[];
  partMarcheOffreurs: string;
  swotConcurrents: CompetitorSwotRow[];
  estimationConsommateurs: ConsumerEstimationRow[];
  marchesVises: string;
  produitsEnvisages: ProductTypeRow[];
  ententesClienteles: string;
  avantagesProduits: ProductTypeRow[];
  prixVenteMarche: ProductTypeRow[];
  circuitsDistribution: DistributionChannelRow[];
  actionsPromotion: PromotionActivityRow[];

  // SECTION G: TECHNIQUE & RH
  supplyCycle: SupplyCycleRow[];
  processProduction: string;
  productionNorms: ProductionNormRow[];
  chosenTechnology: TechnologyRow[];
  installedCapacity: CapacityRow[];
  permisObtenus: StatusLevel;
  contratIngenierie: StatusLevel;
  contratConstruction: StatusLevel;
  garantieAchevement: StatusLevel;
  soliditeContratExploitation: Level;
  competencesExploitant: Level;
  risqueVolatilitePrix: Level;
  risqueVolumeAppro: Level;
  risqueReserves: Level;
  moyensDistribution: string;
  qualityMechanisms: QualityMechanismRow[];
  unitCostStructure: UnitCostRow[];
  personnelExistant: DetailedPersonnelRow[];
  personnelNouveau: DetailedPersonnelRow[];
  personnelGerant: DetailedPersonnelRow[];
  strategieRecrutement: string;

  // SECTION H: GARANTIES
  annexesGaranties: SelectedGuaranteeDocs;

  // SECTION I: EVALUATION ENVIRONNEMENTALE
  isoCertifie: boolean;
  assuranceIncendie: boolean;
  secteursEligibilite: string[];
  milieuxSensibles: string[];
  activitesEnvironnementImmediat: string;
  vocationZoneImplantation: string;
  etudeImpactStatus: StepStatus;
  consultationPubliqueStatus: StepStatus;
  suiviEnvironnemental: boolean;
  suiviEnvironnementalForme: string;
  impactAtmospherique: { exists: boolean; details: string; technologies: string };
  impactEffluents: { exists: boolean; details: string; debit: string; etatMilieu: string; technologies: string };
  impactSonore: { exists: boolean; niveau: string; normes: string; technologies: string };
  impactSolsEau: { exists: boolean; polluants: string };
  impactDechetsDangereux: { exists: boolean; substances: string; traitement: string };
  impactQuantiteProduite: { exists: boolean; quantite: string; devenir: string };
  impactPaysagePatrimoine: { exists: boolean; autorisation: string; impacts: string };
  impactFauneFlore: { exists: boolean; nature: string; risques: string };
  beneficesEnvironnementaux: { exists: boolean; types: string[]; details: string };
  impactSocialHumain: { exists: boolean; types: string[]; nbPersonnes: string; mesures: string };
  fraisOuverturePayes: boolean;

  impactEnvironnement: boolean;
  checklistDocuments: Record<number, boolean>;
  declarationNom: string;
  declarationFonction: string;
  declarationLieu: string;
  declarationDate: string;
  declarationAcceptee: boolean;
  files: Record<string, File | null>;
}

export enum FormStep {
  IDENTIFICATION = 0,
  SECTION_A = 1,
  ADMIN_FISCAL = 2,
  PATRIMOINE_MOYENS = 3,
  FINANCES_JURIDIQUE = 4,
  PROJET_DESCRIPTION = 5,
  DONNEES_MARCHE = 6,
  QUALITE_ENVIRONNEMENT = 7,
  GARANTIES_OFFERTES = 8,
  EVALUATION_ENVIRONNEMENTALE = 9,
  CHECKLIST_DOCUMENTS = 10,
  DECLARATION_FINALE = 11
}

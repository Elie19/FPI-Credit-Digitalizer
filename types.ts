
export type DocumentStatus = 'pending' | 'uploaded' | 'error';

export interface RequiredDoc {
  id: string;
  label: string;
  description?: string;
  formats: string[];
  maxSizeMB: number;
  condition?: (data: any) => boolean;
  required: boolean;
  category: string;
}

// Tableaux Dynamiques (Grilles PDF)
export interface Shareholder { id: string; nom: string; nationalite: string; valeurApport: string; natureApport: string; adresse: string; isOwner: boolean; }
export interface AssetRow { id: string; moyen: string; anneeAcquisition: string; valeurEstimee: string; etat: 'Bon' | 'Mauvais'; }
export interface StockRow { id: string; moyen: string; paysOrigine?: string; quantite: string; prix: string; dateValorisation: string; condition: 'Bonne' | 'Mauvaise'; }
export interface PersonnelRow { id: string; noms: string; poste: string; taches: string; dateEngagement: string; remuneration?: string; qualification?: string; categorie?: string; nationalite?: string; avantages?: string; }
export interface BankRef { id: string; banque: string; intituleCompte: string; numeroCompte: string; devise: string; }
export interface LoanRow { id: string; objet: string; montantTotal: string; encours: string; banque: string; }
export interface InvestmentRow { id: string; item: string; designation: string; quantite: string; prixUnitaire: string; valeurCIF: string; provenance: 'Loc' | 'Imp'; exonere: 'Exo' | 'N/Exo'; entreprisePromotrice: string; creditFPI: string; }
export interface MarketCompetitor { id: string; producteur: string; pays: string; produit: string; niveauProduction: string; capacite: string; caracteristiques: string; prix: string; }

export interface FPIFormData {
  // Page 2: INFOS DEMANDE
  ifuRccm: string;
  natureProjet: string;
  montantCredit: string;
  butCredit: 'NEUF' | 'EXTENSION' | 'RENFORCEMENT' | 'MODERNISATION' | 'AUTRE';
  butCreditAutre?: string;

  // Page 3-4: RENSEIGNEMENTS GÉNÉRAUX
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
  deviseCapital: string;
  shareholders: Shareholder[];
  associéMajoritaireActivitésAutres: boolean;
  detailsAutresActivites?: string;

  // Page 4: ADMIN & FISCAL
  numRCCM: string; dateRCCM: string; lieuRCCM: string;
  numIDNat: string; dateIDNat: string; lieuIDNat: string;
  numImpot: string; dateImpot: string; lieuImpot: string;
  adresseSiegeSocial: string; natureLocauxSiege: 'Proprietaire' | 'Locataire';
  adresseSiegeExploitation: string; natureLocauxExploitation: 'Proprietaire' | 'Locataire';

  // Page 5: CONTACTS & BANQUES
  telFixe: string; telMobile: string; fax: string; email: string; siteWeb: string; boitePostale: string;
  bankRefs: BankRef[];

  // Page 5-6: PROMOTEUR
  nomPromoteur: string; qualiteJuridiquePromoteur: string; etatCivilPromoteur: string;
  nationalitePromoteur: string; fonctionEntreprise: string; nomConjoint?: string;
  // Added promoter contact fields missing from original interface
  telFixePromoteur: string;
  telMobilePromoteur: string;
  emailPromoteur: string;
  adresseDomicilePromoteur: string; natureLocauxDomicile: string;
  formationsExperiences: string; faitPartieAssociationPatronale: boolean;
  aperçuHistoriqueEntreprise: string;

  // Page 7-11: PATRIMOINE
  assetsInfrastructures: AssetRow[];
  assetsMachines: AssetRow[];
  stocks: StockRow[];
  statsProduction: { annee1: string; annee2: string; annee3: string; perspectives: string; };

  // Page 12-13: FINANCES & JURIDIQUE
  dejaBeneficieConcours: boolean; detailsConcours?: string;
  faillite: boolean; poursuites: boolean; garantPrets: boolean; antecedentsFiscaux: boolean;

  // Page 14-22: PROJET & INVESTISSEMENTS
  projetHistorique: string; projetMotivation: string; projetPrevisions: string; objectifsQuantitatifs: string;
  investissementsInfrastructures: InvestmentRow[];
  investissementsMachinerie: InvestmentRow[];
  investissementsLogistique: InvestmentRow[];
  autofinancementSources: string; autofinancementEmprunt: boolean;

  // Page 23-27: MARCHÉ
  tendancesSecteur: string; tauxCroissanceMarche: string; perspectivesMarche: string;
  concurrents: MarketCompetitor[];
  strategieCommerciale: string; marchésVisés: string; avantageConcurrentiel: string;

  // Page 32-40: ENVIRONNEMENT
  isoCertified: boolean; assuréIncendie: boolean; milieuSensible: string;
  eieRealisee: 'Réalisée' | 'Prévue' | 'Non prévue';
  rejetsAtmospheriques: boolean; effluentsLiquides: boolean; nuisancesSonores: boolean;
  
  // Checklist
  files: Record<string, File | null>;
}

export enum FormStep {
  IDENTIFICATION = 0,
  ENTREPRISE = 1,
  ADMIN_FISCAL = 2,
  DIRIGEANTS = 3,
  PATRIMOINE = 4,
  FINANCES_JURIDIQUE = 5,
  DESCRIPTION_PROJET = 6,
  INVESTISSEMENTS = 7,
  MARCHE_STRATEGIE = 8,
  ENVIRONNEMENT = 9,
  CHECKLIST = 10,
  DECLARATION = 11
}
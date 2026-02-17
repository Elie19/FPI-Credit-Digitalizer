
export type DocumentStatus = 'pending' | 'uploaded' | 'error';

export interface RequiredDoc {
  id: string;
  category: string;
  label: string;
  formats: string[];
  maxSizeMB: number;
  condition?: (data: FPIFormData) => boolean;
  required: boolean;
}

// Structures de Tableaux PDF
export interface Shareholder { id: string; nom: string; nationalite: string; valeurApport: string; natureApport: string; adresse: string; isOwner: boolean; }
export interface AssetRow { id: string; moyen: string; anneeAcquisition: string; valeurEstimee: string; etat: 'Bon' | 'Mauvais'; }
export interface PersonnelRow { id: string; noms: string; poste: string; taches: string; dateEngagement: string; }
export interface BankRef { id: string; banque: string; intituleCompte: string; numeroCompte: string; devise: string; }
export interface InvestmentRow { id: string; item: string; designation: string; quantite: string; prixUnitaire: string; valeurCIF: string; provenance: 'Loc' | 'Imp'; exonere: 'Exo' | 'N/Exo'; entreprisePromotrice: string; creditFPI: string; }
export interface CompetitorRow { id: string; producteur: string; pays: string; produit: string; niveauProduction: string; capacite: string; caracteristiques: string; prix: string; }

export interface FPIFormData {
  // Page 2: INFOS DEMANDE
  ifuRccm: string; natureProjet: string; montantCredit: string;
  butCredit: 'NEUF' | 'EXTENSION' | 'RENFORCEMENT' | 'MODERNISATION' | 'AUTRE';
  butCreditAutre?: string;

  // Page 3-5: AXE A - RENSEIGNEMENTS GÉNÉRAUX
  raisonSociale: string; sigle: string; formeJuridique: string;
  dateCreation: string; paysCreation: string; dateDebutActivites: string;
  dateAutorisationOuverture: string; refAutorisationOuverture: string;
  activitePrincipale: string; activiteSecondaire: string;
  montantCapitalSocial: string; deviseCapital: string;
  shareholders: Shareholder[];
  associéMajoritaireActivitésAutres: boolean; detailsAutresActivites?: string;
  
  // Admin
  numRCCM: string; dateRCCM: string; lieuRCCM: string;
  numIDNat: string; dateIDNat: string; lieuIDNat: string;
  numImpot: string; dateImpot: string; lieuImpot: string;
  adresseSiegeSocial: string; natureLocauxSiege: 'Proprietaire' | 'Locataire';
  
  // Page 5-6: PROMOTEUR
  nomPromoteur: string; qualiteJuridiquePromoteur: string; etatCivilPromoteur: string;
  nationalitePromoteur: string; fonctionEntreprise: string; nomConjoint?: string;
  telMobilePromoteur: string; emailPromoteur: string;
  faitPartieAssociationPatronale: boolean; nomAssociationPatronale?: string;

  // Page 7-11: AXE B - PATRIMOINE
  assetsInfrastructures: AssetRow[];
  assetsMachines: AssetRow[];
  
  // Page 12-13: AXE D - FINANCES & JURIDIQUE
  dejaBeneficieConcours: boolean; detailsConcoursBanque?: string;
  faillite: boolean; poursuitesJudiciaires: boolean; garantPrets: boolean; antecedentsFiscaux: boolean;

  // Page 14-22: AXE E - DESCRIPTION PROJET & INVESTISSEMENTS
  projetHistorique: string; projetMotivation: string; projetPrevisions: string;
  objectifsQuantitatifs: string; localisationSite: string;
  investissementsInfrastructures: InvestmentRow[];
  investissementsMachinerie: InvestmentRow[];
  
  // Page 23-27: AXE F - MARCHÉ
  tendancesSecteur: string; concurrents: CompetitorRow[];
  strategieCommerciale: string; avantageConcurrentiel: string;
  
  // Page 32-40: AXE I - ENVIRONNEMENT
  eieRealisee: 'Réalisée' | 'Prévue' | 'Non prévue';
  rejetsAtmospheriques: boolean; effluentsLiquides: boolean;
  
  // Files
  files: Record<string, File | null>;
}

export enum FormStep {
  IDENTIFICATION = 0,
  GENERAL_ENTREPRISE = 1,
  ADMIN_FISCAL = 2,
  PROMOTEUR_DIRIGEANTS = 3,
  PATRIMOINE_MOYENS = 4,
  STRUCTURE_ORG = 5,
  FINANCES_JURIDIQUE = 6,
  PROJET_DESCRIPTION = 7,
  PROGRAMME_INVESTISSEMENT = 8,
  DONNEES_MARCHE = 9,
  PLAN_EXPLOITATION = 10,
  QUALITE_ENVIRONNEMENT = 11,
  CHECKLIST_DOCUMENTS = 12,
  DECLARATION_FINALE = 13
}

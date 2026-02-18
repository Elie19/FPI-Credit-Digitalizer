
import { RequiredDoc } from './types';

export const FPI_CHECKLIST: RequiredDoc[] = [
  { id: '1', category: 'Légal', label: "Copie des statuts sociaux de l'entreprise", formats: ['.pdf'], maxSizeMB: 10, required: true },
  { id: '2', category: 'Organisation', label: "Organigramme de l'entreprise", formats: ['.pdf', '.png'], maxSizeMB: 5, required: true },
  { id: '3', category: 'Légal', label: "Copie de l'autorisation d'ouverture", formats: ['.pdf'], maxSizeMB: 5, required: true },
  { id: '4', category: 'Personnel', label: "CV complet des associés majoritaires et gérants", formats: ['.pdf'], maxSizeMB: 10, required: true },
  { id: '5', category: 'Identification', label: "Copie du RCCM", formats: ['.pdf'], maxSizeMB: 5, required: true },
  { id: '6', category: 'Identification', label: "Copie de l'Identification Nationale", formats: ['.pdf'], maxSizeMB: 5, required: true },
  { id: '7', category: 'Fiscal', label: "Copie de la Notification du numéro d'impôt", formats: ['.pdf'], maxSizeMB: 5, required: true },
  { id: '8', category: 'Fiscal', label: "Copie des attestations fiscales", formats: ['.pdf'], maxSizeMB: 5, required: true },
  { id: '9', category: 'Bancaire', label: "Copie de l'attestation bancaire", formats: ['.pdf'], maxSizeMB: 5, required: true },
  { id: '15', category: 'Financier', label: "États financiers OHADA certifiés (3 ans)", formats: ['.pdf'], maxSizeMB: 20, required: true },
  { id: '19', category: 'Propriété', label: "Titres de propriété / Contrat de bail du site", formats: ['.pdf'], maxSizeMB: 15, required: true },
  { id: '25', category: 'Projet', label: "Copie du Business Plan", formats: ['.pdf'], maxSizeMB: 50, required: true },
  { id: '36', category: 'Légal', label: "Copie de la déclaration sur l'honneur", formats: ['.pdf'], maxSizeMB: 5, required: true },
  { id: '37', category: 'Paiement', label: "Reçu de paiement des frais d'ouverture", formats: ['.pdf', '.jpg'], maxSizeMB: 5, required: true },
  { id: '38', category: 'Légal', label: "Copie de la lettre de demande de prêt", formats: ['.pdf'], maxSizeMB: 5, required: true },
  { id: 'visa', category: 'Étranger', label: "Visa d'établissement / Carte de résidence", formats: ['.pdf'], maxSizeMB: 5, required: true, condition: (d) => d.nationalitePromoteur !== 'Congolaise' }
];

export const FORME_JURIDIQUE_OPTIONS = [
  'GIE', 'SAAG', 'SACA', 'SARL', 'SARLU', 'SAS', 'SAU', 'SCS', 'SNC', 'SP', 'Entreprise individuelle / Établissement'
];

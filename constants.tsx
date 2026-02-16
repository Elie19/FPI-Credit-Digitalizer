
import { RequiredDoc } from './types';

export const FORME_JURIDIQUE_OPTIONS = [
  'GIE', 'SAAG', 'SACA', 'SARL', 'SARLU', 'SAS', 'SAU', 'SCS', 'SNC', 'SP', 'Entreprise individuelle'
];

export const FPI_CHECKLIST: RequiredDoc[] = [
  { id: '1', category: 'Administratif', label: "Copie des statuts sociaux de l'entreprise", formats: ['.pdf'], maxSizeMB: 10, required: true },
  { id: '2', category: 'Administratif', label: "Organigramme de l'entreprise", formats: ['.pdf', '.png', '.jpg'], maxSizeMB: 5, required: true },
  { id: '3', category: 'Administratif', label: "Copie de l'autorisation d'ouverture de l'entreprise", formats: ['.pdf'], maxSizeMB: 5, required: true },
  { id: '4', category: 'Personnel', label: "CV complet de chacun des associés majoritaires et gérant(s)", formats: ['.pdf'], maxSizeMB: 10, required: true },
  { id: '5', category: 'Identification', label: "Copie du RCCM", formats: ['.pdf', '.jpg'], maxSizeMB: 5, required: true },
  { id: '6', category: 'Identification', label: "Copie de l'Identification Nationale", formats: ['.pdf', '.jpg'], maxSizeMB: 5, required: true },
  { id: '7', category: 'Identification', label: "Copie de la Notification du numéro d'impôt", formats: ['.pdf', '.jpg'], maxSizeMB: 5, required: true },
  { id: '8', category: 'Fiscal', label: "Copie des attestations fiscales", formats: ['.pdf'], maxSizeMB: 10, required: true },
  { id: '9', category: 'Bancaire', label: "Copie de l'attestation bancaire", formats: ['.pdf'], maxSizeMB: 5, required: true },
  { id: '15', category: 'Financier', label: "États financiers certifiés des trois(3) derniers exercices (format OHADA)", formats: ['.pdf'], maxSizeMB: 20, required: true },
  { id: '19', category: 'Propriété', label: "Copie des titres de propriété / contrat de bail du site", formats: ['.pdf'], maxSizeMB: 15, required: true },
  { id: '25', category: 'Projet', label: "Copie du business plan", formats: ['.pdf'], maxSizeMB: 50, required: true },
  { id: '36', category: 'Légal', label: "Copie de la déclaration sur l'honneur du demandeur de crédit", formats: ['.pdf'], maxSizeMB: 5, required: true },
  { id: '37', category: 'Paiement', label: "Copie du reçu/bordereau de paiement des frais d'ouverture", formats: ['.pdf', '.jpg'], maxSizeMB: 5, required: true },
  { id: '38', category: 'Légal', label: "Copie de la lettre de demande de prêt", formats: ['.pdf'], maxSizeMB: 5, required: true },
];

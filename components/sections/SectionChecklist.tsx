
import React from 'react';
import { FPIFormData } from '../../types';
import { FileCheck, AlertCircle } from 'lucide-react';
import { FormSectionWrapper } from '../ui/FormSectionWrapper';

interface SectionChecklistProps {
  formData: FPIFormData;
  updateData: (fields: Partial<FPIFormData>) => void;
}

export const CHECKLIST_ITEMS = [
  "Copie des statuts sociaux de l'entreprise",
  "Organigramme de l'entreprise",
  "Copie de l'autorisation d'ouverture de l'entreprise",
  "Curriculum vitae complet de chacun des associés majoritaires et gérant(s)",
  "Copie du RCCM",
  "Copie de l'Identification Nationale",
  "Copie de la Notification du numéro d'impôt",
  "Copie des attestations fiscales",
  "Copie de l'attestation bancaire",
  "Curriculum vitae complet de la personne ayant qualité d'engager l'entreprise",
  "Copie de la carte d'identité du promoteur en cours de validité",
  "Copie des récents PV des réunions, AGO/AGE",
  "Copie des contrats/factures d'achat des pièces d'équipements déjà acquis du patrimoine de l'entreprise",
  "Curriculum vitae complet des membres du personnel clé de l'entreprise",
  "Etats financiers/documents comptables certifiés des trois(3) derniers exercices (sous format OHADA)",
  "Copie des Contrats de prêt si l'entreprise a déjà bénéficié de concours financiers",
  "Copie des Échéanciers de remboursement de prêt si l'entreprise a déjà bénéficié de concours financiers",
  "Copie des permis spéciaux vous permettant d'exercer vos activités ou d'implanter votre projet",
  "Copie des titres de propriété des terrains et bâtiments du site d'implantation éventuelle du projet",
  "Copie des Plans d'occupation/croquis des infrastructures du site d'implantation du projet",
  "Facture pro-forma des différentes dépenses et frais d'investissement",
  "Devis quantitatifs et estimatifs certifiés de tous travaux de génie civil/plan d'installation dans le cadre du projet",
  "Factures pro-forma/spécification techniques de deux (2) fournisseurs des équipements à acquérir",
  "Factures pro-forma des matières premières et intrants de deux (2) fournisseurs différents",
  "Copie du business plan pour l'appréciation de la pérennité économique et financière du projet",
  "Tableau de compte de résultat prévisionnel (conforme au SYSCOHADA)",
  "Tableau des charges d'exploitation prévisionnelle (conforme au SYSCOHADA)",
  "Tableau des comptes d'exploitation prévisionnelle (conforme au SYSCOHADA)",
  "Tableau des ressources-emplois (conforme au SYSCOHADA)",
  "Tableau de l'échéancier de cash-flow (conforme au SYSCOHADA)",
  "Tableau indicatif prévisionnel de remboursement du prêt sollicité",
  "Tableau prévisionnel d'amortissement des équipements",
  "Bilan prévisionnel",
  "Budget de trésorerie sur douze (12) mois de la première année d'exploitation",
  "Copie des certificats d'enregistrement des biens donnés en garantie ainsi que les rapports indépendants d'expertise immobilière y relatifs",
  "Copie de la déclaration sur l'honneur du demandeur de crédit",
  "Copie du reçu/bordereau obligatoire de paiement des frais d'ouverture dossier",
  "Copie de la lettre de demande de prêt"
];

export const SectionChecklist: React.FC<SectionChecklistProps> = ({ formData, updateData }) => {
  const toggleItem = (index: number) => {
    const current = formData.checklistDocuments || {};
    updateData({
      checklistDocuments: {
        ...current,
        [index]: !current[index]
      }
    });
  };

  return (
    <FormSectionWrapper 
      title="Checklist Documents" 
      subtitle="Veuillez cocher les documents que vous avez préparés pour votre dossier."
      icon={FileCheck}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CHECKLIST_ITEMS.map((item, index) => (
          <div 
            key={index}
            onClick={() => toggleItem(index)}
            className={`group flex items-start gap-4 p-5 rounded-3xl border-2 transition-all cursor-pointer ${
              formData.checklistDocuments?.[index] 
                ? 'bg-slate-900 dark:bg-slate-100 border-slate-900 dark:border-slate-100 text-white dark:text-slate-900 shadow-xl scale-[1.02]' 
                : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
              formData.checklistDocuments?.[index]
                ? 'bg-white dark:bg-slate-900 border-white dark:border-slate-900'
                : 'border-slate-200 dark:border-slate-700 group-hover:border-slate-300 dark:group-hover:border-slate-600'
            }`}>
              {formData.checklistDocuments?.[index] && (
                <div className="w-3 h-3 bg-slate-900 dark:bg-slate-100 rounded-sm" />
              )}
            </div>
            <div className="flex-1">
              <span className={`text-[10px] font-black uppercase tracking-wider mb-1 block opacity-50`}>
                Document {index + 1}
              </span>
              <p className={`text-xs font-bold leading-tight ${
                formData.checklistDocuments?.[index] ? 'text-white dark:text-slate-900' : 'text-slate-900 dark:text-white'
              }`}>
                {item}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 bg-amber-50 dark:bg-amber-900/20 rounded-[2.5rem] border border-amber-100 dark:border-amber-900/30 flex items-start gap-5 shadow-sm">
        <AlertCircle className="w-7 h-7 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
        <div>
          <h4 className="text-amber-900 dark:text-amber-300 font-black text-sm uppercase tracking-wider mb-2">Note Importante</h4>
          <p className="text-amber-800/80 dark:text-amber-400/80 text-xs font-medium leading-relaxed">
            L'absence de l'un de ces documents peut retarder le traitement de votre demande de crédit. 
            Assurez-vous que toutes les copies sont lisibles et certifiées conformes si nécessaire.
          </p>
        </div>
      </div>
    </FormSectionWrapper>
  );
};

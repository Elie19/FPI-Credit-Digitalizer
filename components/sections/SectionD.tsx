
import React from 'react';
import { FPIFormData, LoanHistoryRow } from '../../types';
import { EditableTable } from '../common/EditableTable';
import { RequiredDocumentUpload } from '../common/RequiredDocumentUpload';
import { 
  CreditCard, 
  ShieldAlert, 
  Scale, 
  History, 
  AlertCircle,
  Gavel,
  BadgeAlert
} from 'lucide-react';
import { FormSectionWrapper } from '../ui/FormSectionWrapper';
import { FormRadioGroup } from '../ui/FormRadioGroup';
import { FormTextarea } from '../ui/FormTextarea';

interface SectionProps {
  formData: FPIFormData;
  updateData: (fields: Partial<FPIFormData>) => void;
}

export const SectionD: React.FC<SectionProps> = ({ formData, updateData }) => {
  
  const handleLoanUpdate = (id: string, key: keyof LoanHistoryRow, val: any) => {
    updateData({
      historiquePrets: formData.historiquePrets.map(l => l.id === id ? { ...l, [key]: val } : l)
    });
  };

  const addLoan = () => {
    updateData({
      historiquePrets: [...formData.historiquePrets, { id: Date.now().toString(), objetPret: '', montantTotal: '', encours: '' }]
    });
  };

  const handleFileChange = (key: string, file: File | null) => {
    updateData({ files: { ...formData.files, [key]: file } });
  };

  const QuestionRow = ({ 
    label, 
    value, 
    onChange, 
    detailValue, 
    onDetailChange, 
    icon: Icon 
  }: { 
    label: string; 
    value: boolean; 
    onChange: (v: boolean) => void;
    detailValue?: string;
    onDetailChange: (v: string) => void;
    icon: any;
  }) => (
    <div className="p-8 bg-white dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-800 rounded-[2.5rem] shadow-sm space-y-8 transition-all hover:border-slate-100 dark:hover:border-slate-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500 dark:text-slate-400">
            <Icon size={24} />
          </div>
          <p className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-tight leading-tight max-w-lg">
            {label}
          </p>
        </div>
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl self-start md:self-center border border-slate-200 dark:border-slate-700">
          {[
            { v: true, l: 'Oui' },
            { v: false, l: 'Non' }
          ].map(opt => (
            <button
              key={String(opt.v)}
              type="button"
              onClick={() => onChange(opt.v)}
              className={`px-8 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                value === opt.v 
                  ? 'bg-white dark:bg-slate-100 text-slate-900 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              {opt.l}
            </button>
          ))}
        </div>
      </div>
      {value && (
        <div className="animate-in slide-in-from-top-4 duration-300">
          <FormTextarea
            label="Détails :"
            value={detailValue}
            onChange={e => onDetailChange(e.target.value)}
            placeholder="Veuillez fournir les détails ici..."
          />
        </div>
      )}
    </div>
  );

  return (
    <FormSectionWrapper 
      title="D. RENSEIGNEMENTS FINANCIERS ET JURIDIQUES" 
      subtitle="Historique bancaire et antécédents juridiques"
      icon={CreditCard}
    >
      {/* 23. ÉTATS FINANCIERS OHADA */}
      <div className="space-y-8">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 font-black text-[10px]">23</div>
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">États Financiers Certifiés</h4>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 p-10 rounded-[3rem] space-y-8 shadow-sm">
          <div className="flex items-start gap-6">
            <AlertCircle className="text-blue-600 dark:text-blue-400 shrink-0 mt-1" size={24} />
            <p className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-tight leading-relaxed">
              Exigence Réglementaire : Joindre obligatoirement, sous format OHADA, les états financiers / documents comptables certifiés des trois (3) derniers exercices.
            </p>
          </div>
          
          <RequiredDocumentUpload 
            id="etats_financiers" 
            label="États Financiers (3 ans)" 
            description="Format OHADA certifié"
            required={true}
            currentFile={formData.files['etats_financiers'] || null}
            onFileSelect={(f) => handleFileChange('etats_financiers', f)}
          />
        </div>
      </div>

      {/* 24. CONCOURS FINANCIERS ANTERIEURS */}
      <div className="space-y-10 pt-12 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-8 h-8 bg-slate-900 dark:bg-slate-100 rounded-lg flex items-center justify-center text-white dark:text-slate-900 font-black text-[10px]">24</div>
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Antécédents de Concours Financiers</h4>
        </div>

        <div className="space-y-10">
          <FormRadioGroup 
            label="L’entreprise ou un de ses associés/actionnaires ont-ils déjà bénéficié de concours financiers d’une institution financière/Banque ?"
            value={formData.dejaBeneficieConcours}
            onChange={v => updateData({ dejaBeneficieConcours: v })}
            options={[
              { value: true, label: 'Oui' },
              { value: false, label: 'Non' }
            ]}
          />

          {formData.dejaBeneficieConcours && (
            <div className="space-y-12 animate-in slide-in-from-top-6 duration-500">
              <EditableTable<LoanHistoryRow>
                title="Tableau des Prêts et Engagements"
                columns={[
                  { key: 'objetPret', label: 'Objet du prêt' },
                  { key: 'montantTotal', label: 'Montant Total' },
                  { key: 'encours', label: 'Encours actuel' },
                ]}
                data={formData.historiquePrets}
                onAdd={addLoan}
                onRemove={(id) => updateData({ historiquePrets: formData.historiquePrets.filter(l => l.id !== id) })}
                onChange={handleLoanUpdate}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8 border-t border-slate-100 dark:border-slate-800">
                <RequiredDocumentUpload 
                  id="contrats_pret" 
                  label="Contrats de Prêt" 
                  description="Copies des contrats et échéanciers"
                  required={true}
                  currentFile={formData.files['contrats_pret'] || null}
                  onFileSelect={(f) => handleFileChange('contrats_pret', f)}
                />
                
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 p-8 rounded-[2.5rem] flex items-start gap-6 shadow-sm">
                  <BadgeAlert className="text-amber-500 dark:text-amber-400 shrink-0 mt-1" size={24} />
                  <div>
                    <p className="text-xs font-black text-amber-800 dark:text-amber-300 uppercase tracking-widest mb-2">Rappel Important</p>
                    <p className="text-[10px] font-bold text-amber-700/80 dark:text-amber-400/80 uppercase tracking-tight leading-relaxed">
                      Veuillez mentionner une personne de référence auprès de l'institution concernée dans les détails du projet (Section E).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 25. QUESTIONS JURIDIQUES & FISCALES */}
      <div className="space-y-10 pt-12 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-8 h-8 bg-red-50 dark:bg-red-900/30 rounded-lg flex items-center justify-center text-red-600 dark:text-red-400 font-black text-[10px]">25</div>
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Questions Complémentaires</h4>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <QuestionRow
            icon={ShieldAlert}
            label="(a) Avez-vous déjà fait faillite ou préparez-vous actuellement une demande aux termes de la réglementation nationale sur la faillite ?"
            value={formData.faillite}
            onChange={v => updateData({ faillite: v })}
            detailValue={formData.detailsFaillite}
            onDetailChange={v => updateData({ detailsFaillite: v })}
          />

          <QuestionRow
            icon={Scale}
            label="(b) Est-ce que vous-même ou votre entreprise avez déjà fait l’objet des poursuites judiciaires ou affaires judiciaires en instance ?"
            value={formData.poursuites}
            onChange={v => updateData({ poursuites: v })}
            detailValue={formData.detailsPoursuites}
            onDetailChange={v => updateData({ detailsPoursuites: v })}
          />

          <QuestionRow
            icon={History}
            label="(c) Êtes-vous actuellement garant d’un ou de plusieurs prêts ?"
            value={formData.garantPrets}
            onChange={v => updateData({ garantPrets: v })}
            detailValue={formData.detailsGarant}
            onDetailChange={v => updateData({ detailsGarant: v })}
          />

          <QuestionRow
            icon={Gavel}
            label="(d) Est-ce que vous-même ou votre entreprise avez déjà eu des antécédents avec l’administration fiscale ?"
            value={formData.antecedentsFiscaux}
            onChange={v => updateData({ antecedentsFiscaux: v })}
            detailValue={formData.detailsAntecedents}
            onDetailChange={v => updateData({ detailsAntecedents: v })}
          />
        </div>
      </div>
    </FormSectionWrapper>
  );
};


import React from 'react';
import { CreditFormData, PersonnelRow } from '../../types';
import { EditableTable } from '../common/EditableTable';
import { Users, Network, AlertCircle, FileUser } from 'lucide-react';
import { FormSectionWrapper } from '../ui/FormSectionWrapper';
import { FormRadioGroup } from '../ui/FormRadioGroup';
import { FormTextarea } from '../ui/FormTextarea';
import { RequiredDocumentUpload } from '../common/RequiredDocumentUpload';

interface SectionProps {
  formData: CreditFormData;
  updateData: (fields: Partial<CreditFormData>) => void;
}

export const SectionC: React.FC<SectionProps> = ({ formData, updateData }) => {
  const handleFileChange = (key: string, file: File | null) => {
    updateData({ files: { ...formData.files, [key]: file } });
  };

  const handleTableUpdate = (id: string, key: keyof PersonnelRow, val: any) => {
    updateData({
      personnelCle: formData.personnelCle.map(p => p.id === id ? { ...p, [key]: val } : p)
    });
  };

  const handleAdd = () => {
    updateData({
      personnelCle: [...formData.personnelCle, { id: Date.now().toString(), noms: '', poste: '', taches: '', dateEngagement: '' }]
    });
  };

  return (
    <FormSectionWrapper 
      title="C. STRUCTURE ORGANISATIONNELLE" 
      icon={Users}
    >
      {/* Item 21 */}
      <div className="space-y-8">
        <div className="flex items-start gap-6 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 p-8 rounded-[2.5rem] shadow-sm">
          <AlertCircle className="text-red-500 dark:text-red-400 shrink-0 mt-1" size={24} />
          <div>
            <h5 className="text-xs font-black text-red-800 dark:text-red-300 uppercase tracking-widest mb-2">21. Personnel Clé</h5>
            <p className="text-[10px] font-bold text-red-600/80 dark:text-red-400/80 uppercase tracking-tight leading-relaxed">
              Veuillez lister le personnel clé et joindre leurs CVs ci-dessous.
            </p>
          </div>
        </div>

        <EditableTable<PersonnelRow>
          title="Énumération du personnel"
          columns={[
            { key: 'noms', label: 'Noms' },
            { key: 'poste', label: 'Poste occupé' },
            { key: 'taches', label: 'Tâches précises' },
            { key: 'dateEngagement', label: "Date d'engagement", type: 'date' },
          ]}
          data={formData.personnelCle}
          onAdd={handleAdd}
          onRemove={(id) => updateData({ personnelCle: formData.personnelCle.filter(p => p.id !== id) })}
          onChange={handleTableUpdate}
        />

        <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-6">
          <div className="flex items-center gap-4">
            <FileUser className="text-slate-400" size={24} />
            <h5 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Curriculum Vitae du Personnel Clé</h5>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formData.personnelCle.map((p, idx) => (
              p.noms && (
                <RequiredDocumentUpload 
                  key={p.id}
                  id={`cv_personnel_${p.id}`} 
                  label={`CV - ${p.noms}`} 
                  description={p.poste}
                  required={true}
                  currentFile={formData.files[`cv_personnel_${p.id}`] || null}
                  onFileSelect={(f) => handleFileChange(`cv_personnel_${p.id}`, f)}
                />
              )
            ))}
            {formData.personnelCle.filter(p => p.noms).length === 0 && (
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Ajoutez du personnel dans le tableau pour voir les options d'upload.</p>
            )}
          </div>
        </div>
      </div>

      {/* Item 22 */}
      <div className="space-y-8 pt-12 border-t border-slate-100 dark:border-slate-800">
        <FormRadioGroup 
          label="22. Sous-traitance d'activités ?"
          value={formData.sousTraitance}
          onChange={val => updateData({ sousTraitance: val })}
          options={[
            { value: true, label: 'Oui' },
            { value: false, label: 'Non' }
          ]}
        />

        {formData.sousTraitance && (
          <div className="animate-in slide-in-from-top-4 duration-300">
            <FormTextarea 
              label="Préciser lesquelles :"
              value={formData.detailsSousTraitance}
              onChange={(e) => updateData({ detailsSousTraitance: e.target.value })}
              placeholder="Décrivez les activités sous-traitées..."
            />
          </div>
        )}
      </div>
    </FormSectionWrapper>
  );
};

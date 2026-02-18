
import React from 'react';
import { FPIFormData, PersonnelRow } from '../../types';
import { EditableTable } from '../common/EditableTable';
import { Users, Network, AlertCircle } from 'lucide-react';
import { FormSectionWrapper } from '../ui/FormSectionWrapper';
import { FormRadioGroup } from '../ui/FormRadioGroup';
import { FormTextarea } from '../ui/FormTextarea';

interface SectionProps {
  formData: FPIFormData;
  updateData: (fields: Partial<FPIFormData>) => void;
}

export const SectionC: React.FC<SectionProps> = ({ formData, updateData }) => {
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
              Joindre en annexe un curriculum vitae complet pour chacune de ces personnes.
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

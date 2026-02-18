import React from 'react';
import { FPIFormData } from '../../types';
import { LayoutGrid } from 'lucide-react';
import { FormSectionWrapper } from '../ui/FormSectionWrapper';
import { FormInput } from '../ui/FormInput';
import { FormRadioGroup } from '../ui/FormRadioGroup';

interface SectionProps {
  formData: FPIFormData;
  updateData: (fields: Partial<FPIFormData>) => void;
}

export const SectionIdentification: React.FC<SectionProps> = ({ formData, updateData }) => {
  const butCreditOptions = [
    { value: 'NEUF', label: 'Installation/activité industrielle neuve ou d’un projet industriel nouveau' },
    { value: 'EXTENSION', label: 'Extension d’une installation/activité industrielle déjà existante' },
    { value: 'RENFORCEMENT', label: 'Renforcement des capacités d’une installation/activité industrielle déjà existante' },
    { value: 'MODERNISATION', label: 'Modernisation d’une installation/activité industrielle déjà existante' },
    { value: 'AUTRE', label: 'Autre / A préciser :' },
  ];

  return (
    <FormSectionWrapper 
      title="INFORMATIONS CONCERNANT LA DEMANDE" 
      subtitle="Champs à remplir par le demandeur"
      icon={LayoutGrid}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormInput 
            label="IFU/RCCM"
            value={formData.ifuRccm}
            onChange={e => updateData({ ifuRccm: e.target.value })}
            placeholder="Entrez votre numéro IFU ou RCCM"
          />
          <FormInput 
            label="Nature du projet"
            value={formData.natureProjet}
            onChange={e => updateData({ natureProjet: e.target.value })}
            placeholder="Décrivez brièvement la nature du projet"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormInput 
            label="Montant du crédit (en Monnaie)"
            value={formData.montantCredit}
            onChange={e => updateData({ montantCredit: e.target.value })}
            placeholder="Ex: 500.000 USD"
          />
        </div>

        <div className="space-y-6">
          <FormRadioGroup 
            label="But du crédit :"
            value={formData.butCredit}
            onChange={v => updateData({ butCredit: v })}
            options={butCreditOptions}
          />
          
          {formData.butCredit === 'AUTRE' && (
            <div className="animate-in slide-in-from-top-4 duration-300">
              <FormInput 
                label="Précisez l'autre but du crédit"
                value={formData.butCreditAutre || ''}
                onChange={e => updateData({ butCreditAutre: e.target.value })}
                placeholder="Détails..."
              />
            </div>
          )}
        </div>
      </div>
    </FormSectionWrapper>
  );
};

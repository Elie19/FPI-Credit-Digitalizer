
import React from 'react';
import { FPIFormData, Shareholder } from '../../types';
import { EditableTable } from '../common/EditableTable';
import { RequiredDocumentUpload } from '../common/RequiredDocumentUpload';
import { Building2, MapPin, FileText } from 'lucide-react';
import { FormInput } from '../ui/FormInput';
import { FormSelect } from '../ui/FormSelect';
import { FormSectionWrapper } from '../ui/FormSectionWrapper';
import { FormRadioGroup } from '../ui/FormRadioGroup';

interface SectionProps {
  formData: FPIFormData;
  updateData: (fields: Partial<FPIFormData>) => void;
}

const FORME_JURIDIQUE_OPTIONS = ['SARL', 'SA', 'SAS', 'Ets', 'Autre'];
const DEVISE_OPTIONS = ['USD', 'CDF', 'EUR'];

export const SectionA: React.FC<SectionProps> = ({ formData, updateData }) => {
  
  const handleFileChange = (key: string, file: File | null) => {
    updateData({ files: { ...formData.files, [key]: file } });
  };

  const handleShareholderUpdate = (id: string, key: keyof Shareholder, val: any) => {
    updateData({
      shareholders: formData.shareholders.map(s => s.id === id ? { ...s, [key]: val } : s)
    });
  };

  const addShareholder = () => {
    updateData({
      shareholders: [...formData.shareholders, { 
        id: Date.now().toString(), 
        nom: '', nationalite: '', valeurApport: '', natureApport: 'Numéraire', adresseNatureDomicile: '' 
      }]
    });
  };

  return (
    <FormSectionWrapper 
      title="A. RENSEIGNEMENTS GÉNÉRAUX" 
      subtitle="Identification & Structure de l'entreprise"
      icon={Building2}
    >
      {/* 1. IDENTITÉ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormInput 
          label="1. Raison Sociale"
          value={formData.raisonSociale}
          onChange={e => updateData({ raisonSociale: e.target.value })}
          placeholder="Nom de l'entreprise..."
        />
        <FormInput 
          label="2. Sigle"
          value={formData.sigle}
          onChange={e => updateData({ sigle: e.target.value })}
          placeholder="Abréviation..."
        />
      </div>

      {/* 3. FORME JURIDIQUE & DATES */}
      <div className="p-8 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-8 shadow-inner">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormSelect 
            label="3. Forme Juridique"
            value={formData.formeJuridique}
            onChange={e => updateData({ formeJuridique: e.target.value })}
            options={FORME_JURIDIQUE_OPTIONS}
          />
          <FormInput 
            label="4. Date Création"
            type="date"
            value={formData.dateCreation}
            onChange={e => updateData({ dateCreation: e.target.value })}
          />
          <FormInput 
            label="Pays"
            value={formData.paysCreation}
            onChange={e => updateData({ paysCreation: e.target.value })}
            placeholder="RDC"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-slate-200 dark:border-slate-800">
           <RequiredDocumentUpload 
             id="statuts" 
             label="Statuts Sociaux" 
             description="Copie certifiée conforme"
             required={true}
             currentFile={formData.files['statuts'] || null}
             onFileSelect={(f) => handleFileChange('statuts', f)}
           />
           <RequiredDocumentUpload 
             id="organigramme" 
             label="Organigramme" 
             description="Organigramme hiérarchique détaillé"
             required={true}
             currentFile={formData.files['organigramme'] || null}
             onFileSelect={(f) => handleFileChange('organigramme', f)}
           />
        </div>
      </div>

      {/* 9. CAPITAL SOCIAL & ACTIONNAIRES */}
      <div className="space-y-8">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">9. Capital Social & Répartition</h4>
        </div>
        
        <div className="flex gap-6">
          <FormInput 
            label="Montant du Capital"
            type="number"
            className="flex-1"
            value={formData.montantCapitalSocial}
            onChange={e => updateData({ montantCapitalSocial: e.target.value })}
            placeholder="0.00"
          />
          <FormSelect 
            label="Devise"
            className="w-40"
            value={formData.deviseCapital}
            onChange={e => updateData({ deviseCapital: e.target.value as any })}
            options={DEVISE_OPTIONS}
          />
        </div>

        <EditableTable<Shareholder>
          title="Actionnaires / Associés"
          subtitle="Détail de la répartition du capital"
          columns={[
            { key: 'nom', label: 'Nom / Raison Sociale' },
            { key: 'nationalite', label: 'Nationalité' },
            { key: 'valeurApport', label: 'Valeur Apport', type: 'number' },
            { key: 'natureApport', label: 'Nature', type: 'select', options: ['Numéraire', 'Nature'] },
            { key: 'adresseNatureDomicile', label: 'Adresse & Statut (Prop/Loc)' },
          ]}
          data={formData.shareholders}
          onAdd={addShareholder}
          onRemove={(id) => updateData({ shareholders: formData.shareholders.filter(s => s.id !== id) })}
          onChange={handleShareholderUpdate}
        />
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 p-6 rounded-3xl flex items-center gap-4">
          <FileText className="text-blue-500 dark:text-blue-400" size={24} />
          <p className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-tight">
            N'oubliez pas de joindre le CV complet de l'associé majoritaire et du gérant.
          </p>
        </div>
      </div>

      {/* 11-14. IMMATRICULATIONS & ADRESSE */}
      <div className="space-y-8 pt-12 border-t border-slate-100 dark:border-slate-800">
        <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-3">
          <MapPin size={20} className="text-slate-400" /> Localisation & Fiscalité
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <FormInput 
              label="11. Numéro RCCM"
              value={formData.numRCCM}
              onChange={e => updateData({ numRCCM: e.target.value })}
            />
            <RequiredDocumentUpload 
              id="rccm_doc" 
              label="Copie RCCM" 
              required={true}
              currentFile={formData.files['rccm_doc'] || null}
              onFileSelect={(f) => handleFileChange('rccm_doc', f)}
            />
          </div>

          <div className="space-y-6">
            <FormInput 
              label="13. Numéro Impôt"
              value={formData.numImpot}
              onChange={e => updateData({ numImpot: e.target.value })}
            />
            <RequiredDocumentUpload 
              id="impot_doc" 
              label="Preuve Numéro Impôt" 
              required={true}
              currentFile={formData.files['impot_doc'] || null}
              onFileSelect={(f) => handleFileChange('impot_doc', f)}
            />
          </div>
        </div>

        <div className="space-y-8 pt-6">
          <FormInput 
            label="14. Adresse Siège Social"
            value={formData.adresseSiegeSocial}
            onChange={e => updateData({ adresseSiegeSocial: e.target.value })}
            placeholder="Adresse complète..."
          />
          
          <FormRadioGroup 
            label="Nature des locaux :"
            value={formData.natureLocauxSiege}
            onChange={val => updateData({ natureLocauxSiege: val })}
            options={[
              { value: 'Propriétaire', label: 'Propriétaire' },
              { value: 'Locataire', label: 'Locataire' }
            ]}
          />
        </div>
      </div>
    </FormSectionWrapper>
  );
};

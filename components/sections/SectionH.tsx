
import React from 'react';
import { FPIFormData } from '../../types';
import { RequiredDocumentUpload } from '../common/RequiredDocumentUpload';
import { 
  ShieldCheck, 
  FileText, 
  Camera, 
  CheckCircle2, 
  AlertCircle,
  Landmark
} from 'lucide-react';
import { FormSectionWrapper } from '../ui/FormSectionWrapper';

interface SectionProps {
  formData: FPIFormData;
  updateData: (fields: Partial<FPIFormData>) => void;
}

export const SectionH: React.FC<SectionProps> = ({ formData, updateData }) => {
  
  const handleFileChange = (key: string, file: File | null) => {
    updateData({ files: { ...formData.files, [key]: file } });
  };

  const toggleDoc = (key: keyof typeof formData.annexesGaranties) => {
    updateData({
      annexesGaranties: {
        ...formData.annexesGaranties,
        [key]: !formData.annexesGaranties[key]
      }
    });
  };

  const CheckboxItem = ({ 
    label, 
    checked, 
    onChange, 
    icon: Icon 
  }: { 
    label: string, 
    checked: boolean, 
    onChange: () => void,
    icon: any
  }) => (
    <div 
      onClick={onChange}
      className={`group flex items-center gap-4 p-6 rounded-2xl border-2 transition-all cursor-pointer ${
        checked 
          ? 'border-slate-900 dark:border-slate-100 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-xl translate-x-1' 
          : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-200 dark:hover:border-slate-700'
      }`}
    >
      <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
        checked 
          ? 'bg-blue-500 border-blue-500' 
          : 'border-slate-200 dark:border-slate-700 group-hover:border-slate-400 dark:group-hover:border-slate-500'
      }`}>
        {checked && <CheckCircle2 size={14} className="text-white" />}
      </div>
      <Icon size={18} className={checked ? 'text-blue-300 dark:text-blue-600' : 'text-slate-400'} />
      <span className={`text-[10px] font-black uppercase tracking-widest leading-tight ${checked ? 'text-white dark:text-slate-900' : ''}`}>
        {label}
      </span>
    </div>
  );

  return (
    <FormSectionWrapper 
      title="H. GARANTIES OFFERTES" 
      subtitle="Sécurisation du financement & Sûretés réelles"
      icon={Landmark}
    >
      {/* 60. DOCUMENTS ANNEXES */}
      <div className="space-y-12">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <ShieldCheck className="text-slate-400" size={24} />
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">60. Pièces Jointes pour Garanties</h4>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-10 rounded-[3rem] border border-blue-100 dark:border-blue-900/30 space-y-10 shadow-sm">
          <div className="flex items-start gap-4">
            <AlertCircle className="text-blue-600 dark:text-blue-400 shrink-0 mt-1" size={24} />
            <p className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-tight leading-relaxed">
              Joindre en annexe pour chacune de garantie proposée les documents (si disponible) ci-après : (Cocher les cases concernées)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CheckboxItem 
              label="Titre de propriété valide (Certificat d’enregistrement)"
              checked={formData.annexesGaranties.titrePropriete}
              onChange={() => toggleDoc('titrePropriete')}
              icon={FileText}
            />
            <CheckboxItem 
              label="Rapport d’expertise immobilière (Expert/Cabinet assermenté)"
              checked={formData.annexesGaranties.rapportExpertise}
              onChange={() => toggleDoc('rapportExpertise')}
              icon={ShieldCheck}
            />
            <CheckboxItem 
              label="Images/Photos de l’enceinte et des différentes façades"
              checked={formData.annexesGaranties.photosSite}
              onChange={() => toggleDoc('photosSite')}
              icon={Camera}
            />
          </div>
        </div>

        {/* UPLOAD FIELDS CONDITIIONNELLEMENT AFFICHÉS */}
        <div className="grid grid-cols-1 gap-8 animate-in slide-in-from-top-4 duration-500">
          {formData.annexesGaranties.titrePropriete && (
            <RequiredDocumentUpload 
              id="certificat_enregistrement" 
              label="Certificat d'Enregistrement" 
              description="Titre de propriété valide et certifié"
              required={true}
              currentFile={formData.files['certificat_enregistrement'] || null}
              onFileSelect={(f) => handleFileChange('certificat_enregistrement', f)}
            />
          )}

          {formData.annexesGaranties.rapportExpertise && (
            <RequiredDocumentUpload 
              id="rapport_expertise_garantie" 
              label="Rapport d'Expertise" 
              description="Cabinet agréé par l'Ordre des Experts Immobiliers"
              required={true}
              currentFile={formData.files['rapport_expertise_garantie'] || null}
              onFileSelect={(f) => handleFileChange('rapport_expertise_garantie', f)}
            />
          )}

          {formData.annexesGaranties.photosSite && (
            <RequiredDocumentUpload 
              id="photos_garantie" 
              label="Dossier Photographique" 
              description="Vues d'ensemble et façades des bâtiments"
              required={true}
              currentFile={formData.files['photos_garantie'] || null}
              onFileSelect={(f) => handleFileChange('photos_garantie', f)}
            />
          )}
        </div>

        {!Object.values(formData.annexesGaranties).some(v => v) && (
          <div className="flex flex-col items-center justify-center py-16 text-slate-300 dark:text-slate-700 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-[3rem]">
            <p className="text-xs font-black uppercase tracking-widest">Aucune garantie sélectionnée</p>
            <p className="text-[10px] font-medium opacity-50 mt-2">Cochez les cases ci-dessus pour débloquer les téléchargements</p>
          </div>
        )}
      </div>

      {/* RAPPEL FINAL */}
      <div className="p-10 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-[3rem] shadow-2xl flex items-center gap-10">
        <div className="w-20 h-20 bg-blue-600 dark:bg-blue-500 rounded-3xl flex items-center justify-center shrink-0 shadow-lg">
          <CheckCircle2 size={40} className="text-white" />
        </div>
        <div>
          <h5 className="text-sm font-black uppercase tracking-widest mb-2">Dossier de garantie complet</h5>
          <p className="text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-tight leading-relaxed max-w-xl">
            La qualité des garanties offertes est un élément prépondérant dans l'analyse de votre dossier. Assurez-vous de fournir des copies lisibles et à jour.
          </p>
        </div>
      </div>
    </FormSectionWrapper>
  );
};

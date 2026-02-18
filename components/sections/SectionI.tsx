
import React from 'react';
import { FPIFormData, StepStatus } from '../../types';
import { RequiredDocumentUpload } from '../common/RequiredDocumentUpload';
import { 
  Leaf, 
  ShieldCheck, 
  Wind, 
  Droplets, 
  Volume2, 
  Users, 
  Trees, 
  AlertCircle,
  FileText,
  CreditCard
} from 'lucide-react';
import { FormSectionWrapper } from '../ui/FormSectionWrapper';
import { FormRadioGroup } from '../ui/FormRadioGroup';
import { FormTextarea } from '../ui/FormTextarea';
import { FormInput } from '../ui/FormInput';
import { FormCheckboxGroup } from '../ui/FormCheckboxGroup';
import { FormSelect } from '../ui/FormSelect';

interface SectionProps {
  formData: FPIFormData;
  updateData: (fields: Partial<FPIFormData>) => void;
}

export const SectionI: React.FC<SectionProps> = ({ formData, updateData }) => {
  
  const handleFileChange = (key: string, file: File | null) => {
    updateData({ files: { ...formData.files, [key]: file } });
  };

  const StatusSelector = ({ label, value, onChange }: { label: string, value: StepStatus, onChange: (v: StepStatus) => void }) => (
    <div className="space-y-4 p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 shadow-inner">
      <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{label}</label>
      <div className="flex flex-wrap gap-3">
        {['Réalisée', 'Prévue et non réalisée', 'Non prévue'].map(opt => (
          <button
            key={opt}
            onClick={() => onChange(opt as StepStatus)}
            className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
              value === opt 
                ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-xl scale-105' 
                : 'bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  const SECTEURS = [
    { value: "Industries de transformation (y. c. papetières)", label: "Industries de transformation (y. c. papetières)", color: "emerald" as const },
    { value: "Hydrocarbures et pétrochimie", label: "Hydrocarbures et pétrochimie", color: "emerald" as const },
    { value: "Barrages et équipements hydroélectriques", label: "Barrages et équipements hydroélectriques", color: "emerald" as const },
    { value: "Production et transport d’énergie", label: "Production et transport d’énergie", color: "emerald" as const },
    { value: "BTP et infrastructures (génie civil notamment)", label: "BTP et infrastructures (génie civil notamment)", color: "emerald" as const },
    { value: "Agriculture", label: "Agriculture", color: "emerald" as const }
  ];

  const MILIEUX = [
    { value: "Milieux marins remarquables (récifs coralliens, zone de frai, etc.)", label: "Milieux marins remarquables (récifs coralliens, zone de frai, etc.)", color: "amber" as const },
    { value: "Milieux insulaires", label: "Milieux insulaires", color: "amber" as const },
    { value: "Zones côtières remarquables (marais, mangroves...)", label: "Zones côtières remarquables (marais, mangroves...)", color: "amber" as const },
    { value: "Zones menacées par la désertification ou la déforestation", label: "Zones menacées par la désertification ou la déforestation", color: "amber" as const },
    { value: "Zones soumises à l’érosion", label: "Zones soumises à l’érosion", color: "amber" as const },
    { value: "Aires protégées (patrimoine de l’Humanité), parcs nationaux", label: "Aires protégées (patrimoine de l’Humanité), parcs nationaux", color: "amber" as const },
    { value: "Zones classées au titre d’une convention internationale", label: "Zones classées au titre d’une convention internationale", color: "amber" as const },
    { value: "Zones d’intérêt culturel, historique ou archéologique", label: "Zones d’intérêt culturel, historique ou archéologique", color: "amber" as const },
    { value: "Zones d’intérêt paysager majeur (terres vierges)", label: "Zones d’intérêt paysager majeur (terres vierges)", color: "amber" as const },
    { value: "Zones à biodiversité élevée", label: "Zones à biodiversité élevée", color: "amber" as const },
    { value: "Forêts tropicales", label: "Forêts tropicales", color: "amber" as const },
    { value: "Zones d’intérêt pour des groupes de population vulnérables", label: "Zones d’intérêt pour des groupes de population vulnérables", color: "amber" as const }
  ];

  return (
    <FormSectionWrapper 
      title="I. ÉVALUATION ENVIRONNEMENTALE ET SOCIALE" 
      subtitle="Impacts, durabilité et conformité réglementaire"
      icon={Leaf}
    >
      {/* 61-62. CERTIFICATIONS & ASSURANCE */}
      <div className="space-y-12">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <ShieldCheck className="text-slate-400" size={24} />
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">61-62. Certifications et Assurances</h4>
        </div>
        
        <div className="grid grid-cols-1 gap-10">
          <div className="space-y-6">
            <FormRadioGroup 
              label="61. Le produit concerné est-il certifié ISO pour l'exportation ?"
              value={formData.isoCertifie}
              onChange={v => updateData({ isoCertifie: v })}
              options={[
                { value: true, label: 'Oui' },
                { value: false, label: 'Non' }
              ]}
            />
            {formData.isoCertifie && (
              <div className="animate-in slide-in-from-top-4 duration-300">
                <RequiredDocumentUpload 
                  id="certif_iso" 
                  label="Copie du document de certification ISO" 
                  required={true}
                  currentFile={formData.files['certif_iso'] || null}
                  onFileSelect={(f) => handleFileChange('certif_iso', f)}
                />
              </div>
            )}
          </div>
          <div className="space-y-6">
            <FormRadioGroup 
              label="62. Les installations sont-elles assurées contre le risque d'incendie ?"
              value={formData.assuranceIncendie}
              onChange={v => updateData({ assuranceIncendie: v })}
              options={[
                { value: true, label: 'Oui' },
                { value: false, label: 'Non' }
              ]}
            />
            {formData.assuranceIncendie && (
              <div className="animate-in slide-in-from-top-4 duration-300">
                <RequiredDocumentUpload 
                  id="assurance_incendie" 
                  label="Copie du document d'assurance" 
                  required={true}
                  currentFile={formData.files['assurance_incendie'] || null}
                  onFileSelect={(f) => handleFileChange('assurance_incendie', f)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 63-64. CRITERES D'ELIGIBILITE */}
      <div className="space-y-12 pt-12 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <AlertCircle className="text-slate-400" size={24} />
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">63-64. Instruction Environnementale Approfondie</h4>
        </div>
        
        <div className="space-y-10">
          <FormCheckboxGroup
            label="63. Secteurs d'activité concernés par le projet :"
            options={SECTEURS}
            selectedValues={formData.secteursEligibilite}
            onChange={next => updateData({ secteursEligibilite: next })}
          />

          <FormCheckboxGroup
            label="64. Localisation dans un milieu sensible :"
            options={MILIEUX}
            selectedValues={formData.milieuxSensibles}
            onChange={next => updateData({ milieuxSensibles: next })}
            columns={3}
          />
        </div>
      </div>

      {/* 65-68. ÉTUDES ET CONSULTATIONS */}
      <div className="space-y-12 pt-12 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <FileText className="text-slate-400" size={24} />
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">65-68. Études et Suivi Environnemental</h4>
        </div>
        
        <div className="grid grid-cols-1 gap-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <FormTextarea 
              label="65 (a). Activités actuelles environnement immédiat"
              value={formData.activitesEnvironnementImmediat}
              onChange={e => updateData({ activitesEnvironnementImmediat: e.target.value })}
              placeholder="Décrivez les activités limitrophes..."
            />
            <FormInput 
              label="65 (b). Vocation générale de la zone du site"
              value={formData.vocationZoneImplantation}
              onChange={e => updateData({ vocationZoneImplantation: e.target.value })}
              placeholder="Ex: Agricole, minière, résidentielle..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <StatusSelector 
              label="66. Étude d’impact sur l’environnement (EIE)"
              value={formData.etudeImpactStatus}
              onChange={v => updateData({ etudeImpactStatus: v })}
            />
            <div className="space-y-6">
              <StatusSelector 
                label="67. Consultation publique des populations"
                value={formData.consultationPubliqueStatus}
                onChange={v => updateData({ consultationPubliqueStatus: v })}
              />
              {formData.consultationPubliqueStatus === 'Réalisée' && (
                <div className="animate-in slide-in-from-top-4 duration-300">
                  <RequiredDocumentUpload 
                    id="conclusions_consultation" 
                    label="Conclusions de la consultation" 
                    required={true}
                    currentFile={formData.files['conclusions_consultation'] || null}
                    onFileSelect={(f) => handleFileChange('conclusions_consultation', f)}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <FormRadioGroup 
              label="68. Le projet fera-t-il l’objet d’un suivi environnemental ?"
              value={formData.suiviEnvironnemental}
              onChange={v => updateData({ suiviEnvironnemental: v })}
              options={[
                { value: true, label: 'Oui' },
                { value: false, label: 'Non' }
              ]}
            />
            {formData.suiviEnvironnemental && (
              <div className="animate-in slide-in-from-top-4 duration-300">
                <FormTextarea 
                  label="Forme du suivi environnemental :"
                  value={formData.suiviEnvironnementalForme}
                  onChange={e => updateData({ suiviEnvironnementalForme: e.target.value })}
                  placeholder="Détails du plan de gestion environnemental..."
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 70. IMPACTS DÉTAILLÉS */}
      <div className="space-y-12 pt-12 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <Trees className="text-slate-400" size={24} />
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">70. Analyse Détaillée des Impacts</h4>
        </div>
        
        <div className="grid grid-cols-1 gap-12">
          
          {/* 70.1 AIR */}
          <div className="p-10 rounded-[3rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 space-y-8 shadow-sm">
            <div className="flex items-center gap-4">
              <Wind className="text-emerald-600 dark:text-emerald-400" size={28} />
              <h5 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">70.1 Rejets Atmosphériques</h5>
            </div>
            <FormRadioGroup 
              label="Le projet génère-t-il des rejets dans l'air ?"
              value={formData.impactAtmospherique.exists}
              onChange={v => updateData({ impactAtmospherique: { ...formData.impactAtmospherique, exists: v } })}
              options={[
                { value: true, label: 'Oui' },
                { value: false, label: 'Non' }
              ]}
            />
            {formData.impactAtmospherique.exists && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-top-4 duration-300">
                <FormTextarea 
                  label="Préciser les émissions et normes :"
                  value={formData.impactAtmospherique.details}
                  onChange={e => updateData({ impactAtmospherique: { ...formData.impactAtmospherique, details: e.target.value } })}
                />
                <FormTextarea 
                  label="Technologies d'atténuation :"
                  value={formData.impactAtmospherique.technologies}
                  onChange={e => updateData({ impactAtmospherique: { ...formData.impactAtmospherique, technologies: e.target.value } })}
                />
              </div>
            )}
          </div>

          {/* 70.2 EAU */}
          <div className="p-10 rounded-[3rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 space-y-8 shadow-sm">
            <div className="flex items-center gap-4">
              <Droplets className="text-blue-600 dark:text-blue-400" size={28} />
              <h5 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">70.2 Effluents Liquides</h5>
            </div>
            <FormRadioGroup 
              label="Le projet génère-t-il des effluents liquides ?"
              value={formData.impactEffluents.exists}
              onChange={v => updateData({ impactEffluents: { ...formData.impactEffluents, exists: v } })}
              options={[
                { value: true, label: 'Oui' },
                { value: false, label: 'Non' }
              ]}
            />
            {formData.impactEffluents.exists && (
              <div className="space-y-8 animate-in slide-in-from-top-4 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormTextarea 
                    label="Impacts et caractéristiques :"
                    value={formData.impactEffluents.details}
                    onChange={e => updateData({ impactEffluents: { ...formData.impactEffluents, details: e.target.value } })}
                  />
                  <div className="space-y-6">
                    <FormInput 
                      label="Débit maximal prévisionnel (l/h) :"
                      value={formData.impactEffluents.debit}
                      onChange={e => updateData({ impactEffluents: { ...formData.impactEffluents, debit: e.target.value } })}
                    />
                    <FormSelect 
                      label="État actuel du milieu récepteur :"
                      value={formData.impactEffluents.etatMilieu}
                      onChange={e => updateData({ impactEffluents: { ...formData.impactEffluents, etatMilieu: e.target.value } })}
                      options={['Très pollué', 'Pollué', 'Non pollué / potable', 'Non pollué / pas d\'usage spécifique']}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 70.3 BRUIT */}
          <div className="p-10 rounded-[3rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 space-y-8 shadow-sm">
            <div className="flex items-center gap-4">
              <Volume2 className="text-amber-600 dark:text-amber-400" size={28} />
              <h5 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">70.3 Nuisances Sonores</h5>
            </div>
            <FormRadioGroup 
              label="Le projet génère-t-il des nuisances sonores ?"
              value={formData.impactSonore.exists}
              onChange={v => updateData({ impactSonore: { ...formData.impactSonore, exists: v } })}
              options={[
                { value: true, label: 'Oui' },
                { value: false, label: 'Non' }
              ]}
            />
            {formData.impactSonore.exists && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-top-4 duration-300">
                <FormInput 
                  label="Niveau sonore prévisionnel (dB) :"
                  value={formData.impactSonore.niveau}
                  onChange={e => updateData({ impactSonore: { ...formData.impactSonore, niveau: e.target.value } })}
                />
                <FormSelect 
                  label="Normes appliquées :"
                  value={formData.impactSonore.normes}
                  onChange={e => updateData({ impactSonore: { ...formData.impactSonore, normes: e.target.value } })}
                  options={['Normes du pays', 'Normes Banque Mondiale', 'Pas de normes']}
                />
              </div>
            )}
          </div>

          {/* 70.10 SOCIAL */}
          <div className="p-10 rounded-[3rem] bg-emerald-900 dark:bg-emerald-950 text-white space-y-10 shadow-xl">
            <div className="flex items-center gap-4">
              <Users className="text-emerald-300" size={28} />
              <h5 className="text-sm font-black uppercase tracking-widest">70.10 Impacts Social et Humain</h5>
            </div>
            <FormRadioGroup 
              label="Le projet génère-t-il des impacts sociaux ?"
              className="text-emerald-100"
              value={formData.impactSocialHumain.exists}
              onChange={v => updateData({ impactSocialHumain: { ...formData.impactSocialHumain, exists: v } })}
              options={[
                { value: true, label: 'Oui' },
                { value: false, label: 'Non' }
              ]}
            />
            {formData.impactSocialHumain.exists && (
              <div className="space-y-10 animate-in slide-in-from-top-4 duration-300">
                <div className="space-y-6">
                  <label className="text-[10px] font-black text-emerald-300 uppercase tracking-widest">Nature des impacts générés :</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['Déplacements de population', 'Expropriations', 'Modifications modes de vie'].map(t => (
                      <label key={t} className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                        formData.impactSocialHumain.types.includes(t) 
                          ? 'border-white bg-emerald-800 dark:bg-emerald-900 shadow-md' 
                          : 'border-emerald-800 dark:border-emerald-900 hover:border-emerald-700'
                      }`}>
                        <input 
                          type="checkbox" 
                          className="hidden" 
                          checked={formData.impactSocialHumain.types.includes(t)}
                          onChange={() => {
                            const next = formData.impactSocialHumain.types.includes(t) 
                              ? formData.impactSocialHumain.types.filter(x => x !== t) 
                              : [...formData.impactSocialHumain.types, t];
                            updateData({ impactSocialHumain: { ...formData.impactSocialHumain, types: next } });
                          }}
                        />
                        <span className="text-[10px] font-black uppercase tracking-tight">{t}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <FormSelect 
                    label="Nombre de personnes concernées :"
                    className="bg-emerald-800 dark:bg-emerald-900 border-none text-white"
                    value={formData.impactSocialHumain.nbPersonnes}
                    onChange={e => updateData({ impactSocialHumain: { ...formData.impactSocialHumain, nbPersonnes: e.target.value } })}
                    options={['Moins d\'une centaine', 'Entre 100 et 1000', 'Entre 1000 et 10.000', 'Plus de 10.000']}
                  />
                  <FormTextarea 
                    label="Mesures d'atténuation prévues :"
                    className="bg-emerald-800 dark:bg-emerald-900 border-none text-white"
                    value={formData.impactSocialHumain.mesures}
                    onChange={e => updateData({ impactSocialHumain: { ...formData.impactSocialHumain, mesures: e.target.value } })}
                    placeholder="Détails pour les populations vulnérables..."
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 71. FRAIS D'OUVERTURE */}
      <div className="space-y-12 pt-12 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <CreditCard className="text-slate-400" size={24} />
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">71. Frais de Dossier</h4>
        </div>
        <div className="bg-slate-900 dark:bg-slate-100 p-10 rounded-[3rem] shadow-2xl space-y-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <FileText size={32} />
              </div>
              <h6 className="text-sm font-black text-white dark:text-slate-900 uppercase tracking-widest">Avez-vous payé les frais d'ouverture du dossier au FPI ?</h6>
            </div>
            <FormRadioGroup 
              value={formData.fraisOuverturePayes}
              onChange={v => updateData({ fraisOuverturePayes: v })}
              options={[
                { value: true, label: 'Oui' },
                { value: false, label: 'Non' }
              ]}
            />
          </div>
          {formData.fraisOuverturePayes && (
            <div className="animate-in slide-in-from-top-4 duration-300">
              <RequiredDocumentUpload 
                id="recu_paiement_fpi" 
                label="Copie du reçu / bordereau de paiement" 
                required={true}
                currentFile={formData.files['recu_paiement_fpi'] || null}
                onFileSelect={(f) => handleFileChange('recu_paiement_fpi', f)}
              />
            </div>
          )}
        </div>
      </div>
    </FormSectionWrapper>
  );
};

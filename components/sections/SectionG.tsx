import React from 'react';
import { 
  FPIFormData, 
  SupplyCycleRow, 
  ProductionNormRow, 
  TechnologyRow, 
  CapacityRow, 
  QualityMechanismRow, 
  UnitCostRow, 
  DetailedPersonnelRow 
} from '../../types';
import { EditableTable, Column } from '../common/EditableTable';
import { RequiredDocumentUpload } from '../common/RequiredDocumentUpload';
import { 
  Settings, 
  Activity, 
  Users, 
  ShieldCheck, 
  Factory, 
  FileText, 
  BadgeAlert
} from 'lucide-react';
import { FormSectionWrapper } from '../ui/FormSectionWrapper';
import { FormRadioGroup } from '../ui/FormRadioGroup';
import { FormTextarea } from '../ui/FormTextarea';

interface SectionProps {
  formData: FPIFormData;
  updateData: (fields: Partial<FPIFormData>) => void;
}

export const SectionG: React.FC<SectionProps> = ({ formData, updateData }) => {
  
  const handleFileChange = (key: string, file: File | null) => {
    updateData({ files: { ...formData.files, [key]: file } });
  };

  const updateTable = <T extends { id: string }>(key: keyof FPIFormData, id: string, field: keyof T, val: any) => {
    const list = (formData[key] as unknown) as T[];
    updateData({ [key]: list.map(item => item.id === id ? { ...item, [field]: val } : item) });
  };

  const addRow = (key: keyof FPIFormData, template: any) => {
    const list = (formData[key] as unknown) as any[];
    updateData({ [key]: [...list, { ...template, id: Date.now().toString() }] });
  };

  const removeRow = (key: keyof FPIFormData, id: string) => {
    const list = (formData[key] as unknown) as any[];
    updateData({ [key]: list.filter(item => item.id !== id) });
  };

  const PERSONNEL_COLUMNS: Column<DetailedPersonnelRow>[] = [
    { key: 'nombre', label: 'Nombre', width: '80px' },
    { key: 'remuneration', label: 'Rémunération' },
    { key: 'fonction', label: 'Fonction' },
    { key: 'qualification', label: 'Qualification' },
    { key: 'categorie', label: 'Catégorie' },
    { key: 'nationalite', label: 'Nationalité' },
    { key: 'avantagesSociaux', label: 'Avantages' },
  ];

  return (
    <FormSectionWrapper 
      title="G. TECHNIQUE, PRODUCTION ET RESSOURCES HUMAINES" 
      subtitle="Cycle d'exploitation, ingénierie et capital humain"
      icon={Settings}
    >
      {/* 52. PROCESSUS DE PRODUCTION */}
      <div className="space-y-12">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <Factory className="text-slate-400" size={24} />
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">52. Processus de Production</h4>
        </div>
        
        <EditableTable<SupplyCycleRow>
          title="(i) Cycle d’approvisionnement des matières premières"
          columns={[
            { key: 'matiere', label: "Matière première et intrant" },
            { key: 'paysOrigine', label: "Pays d'origine" },
            { key: 'quantite', label: "Quantité" },
            { key: 'cycleAppro', label: "Cycle d'approvisionnement" },
          ]}
          data={formData.supplyCycle}
          onAdd={() => addRow('supplyCycle', { matiere: '', paysOrigine: '', quantite: '', cycleAppro: '' })}
          onRemove={(id) => removeRow('supplyCycle', id)}
          onChange={(id, k, v) => updateTable('supplyCycle', id, k, v)}
        />

        <FormTextarea 
          label="52 (ii). Description du processus de production :"
          value={formData.processProduction}
          onChange={e => updateData({ processProduction: e.target.value })}
          placeholder="Détaillez les étapes de fabrication..."
        />

        <EditableTable<ProductionNormRow>
          title="Norme de production"
          columns={[
            { key: 'matiere', label: "Matière première et intrant" },
            { key: 'quantite', label: "Quantité" },
            { key: 'part', label: "Part (%)" },
            { key: 'tauxPerte', label: "Taux de perte (%)" },
          ]}
          data={formData.productionNorms}
          onAdd={() => addRow('productionNorms', { matiere: '', quantite: '', part: '', tauxPerte: '' })}
          onRemove={(id) => removeRow('productionNorms', id)}
          onChange={(id, k, v) => updateTable('productionNorms', id, k, v)}
        />

        <EditableTable<TechnologyRow>
          title="Technologie choisie"
          columns={[
            { key: 'technologie', label: "Technologie" },
            { key: 'disponibilite', label: "Disponibilité" },
            { key: 'avantagesInconvenients', label: "Avantages/Inconvénients" },
            { key: 'cycleVie', label: "Cycle de vie" },
            { key: 'transfertTechnique', label: "Transfert/Techniques" },
            { key: 'formation', label: "Formation" },
          ]}
          data={formData.chosenTechnology}
          onAdd={() => addRow('chosenTechnology', { technologie: '', disponibilite: '', avantagesInconvenients: '', cycleVie: '', transfertTechnique: '', formation: '' })}
          onRemove={(id) => removeRow('chosenTechnology', id)}
          onChange={(id, k, v) => updateTable('chosenTechnology', id, k, v)}
        />

        <EditableTable<CapacityRow>
          title="Capacité installée de chaque composante de l'usine"
          columns={[
            { key: 'composante', label: "Composante" },
            { key: 'capaciteInstallee', label: "Capacité installée" },
          ]}
          data={formData.installedCapacity}
          onAdd={() => addRow('installedCapacity', { composante: '', capaciteInstallee: '' })}
          onRemove={(id) => removeRow('installedCapacity', id)}
          onChange={(id, k, v) => updateTable('installedCapacity', id, k, v)}
        />
      </div>

      {/* EVALUATION DES RISQUES & CONTRATS */}
      <div className="space-y-10 pt-12 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <ShieldCheck className="text-slate-400" size={24} />
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">52bis. Contrats, Permis & Risques</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormRadioGroup 
            label="Permis de construction et d’implantation obtenus ?"
            value={formData.permisObtenus}
            options={[
              { value: 'Oui', label: 'Oui' },
              { value: 'En cours', label: 'En cours' },
              { value: 'Non', label: 'Non' },
              { value: 'Non applicable', label: 'Non applicable' }
            ]}
            onChange={v => updateData({ permisObtenus: v })}
          />
          <FormRadioGroup 
            label="Existe-t-il un contrat d’ingénierie ?"
            value={formData.contratIngenierie}
            options={[
              { value: 'Oui', label: 'Oui' },
              { value: 'En cours', label: 'En cours' },
              { value: 'Non', label: 'Non' },
              { value: 'Neutre', label: 'Neutre' }
            ]}
            onChange={v => updateData({ contratIngenierie: v })}
          />
          <FormRadioGroup 
            label="Contrat de construction ou de montage ?"
            value={formData.contratConstruction}
            options={[
              { value: 'Oui', label: 'Oui' },
              { value: 'En cours', label: 'En cours' },
              { value: 'Non', label: 'Non' },
              { value: 'Neutre', label: 'Neutre' }
            ]}
            onChange={v => updateData({ contratConstruction: v })}
          />
          <FormRadioGroup 
            label="Garantie d’achèvement prévue ?"
            value={formData.garantieAchevement}
            options={[
              { value: 'Oui', label: 'Oui' },
              { value: 'En cours', label: 'En cours' },
              { value: 'Non', label: 'Non' },
              { value: 'Neutre', label: 'Neutre' }
            ]}
            onChange={v => updateData({ garantieAchevement: v })}
          />
          <FormRadioGroup 
            label="Portée et solidité du contrat d’exploitation"
            value={formData.soliditeContratExploitation}
            options={[
              { value: 'Élevée', label: 'Élevée' },
              { value: 'Moyenne', label: 'Moyenne' },
              { value: 'Faible', label: 'Faible' },
              { value: 'Non', label: 'Non' },
              { value: 'Non applicable', label: 'Non applicable' }
            ]}
            onChange={v => updateData({ soliditeContratExploitation: v })}
          />
          <FormRadioGroup 
            label="Compétences et capacité financière de l’exploitant"
            value={formData.competencesExploitant}
            options={[
              { value: 'Élevée', label: 'Élevée' },
              { value: 'Moyenne', label: 'Moyenne' },
              { value: 'Faible', label: 'Faible' },
              { value: 'Non', label: 'Non' },
              { value: 'Non applicable', label: 'Non applicable' }
            ]}
            onChange={v => updateData({ competencesExploitant: v })}
          />
          <FormRadioGroup 
            label="Risque de volatilité des prix d'approvisionnement"
            value={formData.risqueVolatilitePrix}
            options={[
              { value: 'Élevé', label: 'Élevé' },
              { value: 'Moyen', label: 'Moyen' },
              { value: 'Faible', label: 'Faible' },
              { value: 'Non applicable', label: 'Non applicable' }
            ]}
            onChange={v => updateData({ risqueVolatilitePrix: v })}
          />
          <FormRadioGroup 
            label="Risque lié au volume des approvisionnements"
            value={formData.risqueVolumeAppro}
            options={[
              { value: 'Élevé', label: 'Élevé' },
              { value: 'Moyen', label: 'Moyen' },
              { value: 'Faible', label: 'Faible' },
              { value: 'Non applicable', label: 'Non applicable' }
            ]}
            onChange={v => updateData({ risqueVolumeAppro: v })}
          />
          <FormRadioGroup 
            label="Existe-t-il un risque sur les réserves ?"
            value={formData.risqueReserves}
            options={[
              { value: 'Élevé', label: 'Élevé' },
              { value: 'Moyen', label: 'Moyen' },
              { value: 'Faible', label: 'Faible' },
              { value: 'Non applicable', label: 'Non applicable' }
            ]}
            onChange={v => updateData({ risqueReserves: v })}
          />
        </div>

        <FormTextarea 
          label="Coûts et moyens mis en œuvre pour la distribution :"
          value={formData.moyensDistribution}
          onChange={e => updateData({ moyensDistribution: e.target.value })}
          placeholder="Décrivez les vecteurs de distribution..."
        />
      </div>

      {/* 53-54. QUALITÉ & PRIX DE REVIENT */}
      <div className="space-y-12 pt-12 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <Activity className="text-slate-400" size={24} />
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">53-54. Qualité & Structure de coûts</h4>
        </div>
        
        <EditableTable<QualityMechanismRow>
          title="53. Mécanismes de contrôle de qualité"
          columns={[
            { key: 'matiere', label: "Matière première et intrant" },
            { key: 'mecanismes', label: "Mécanismes de gestion et contrôle" },
          ]}
          data={formData.qualityMechanisms}
          onAdd={() => addRow('qualityMechanisms', { matiere: '', mecanismes: '' })}
          onRemove={(id) => removeRow('qualityMechanisms', id)}
          onChange={(id, k, v) => updateTable('qualityMechanisms', id, k, v)}
        />

        <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-3xl border border-blue-100 dark:border-blue-900/30 flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-sm">
          <div className="flex items-start gap-4 max-w-lg">
            <BadgeAlert className="text-blue-500 dark:text-blue-400 shrink-0 mt-1" size={24} />
            <p className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-tight leading-relaxed">
              Joindre en annexe une copie du business plan pour l’appréciation de la pérennité économique et financière du projet.
            </p>
          </div>
          <RequiredDocumentUpload 
            id="business_plan" 
            label="Business Plan Complet" 
            required={true}
            currentFile={formData.files['business_plan'] || null}
            onFileSelect={(f) => handleFileChange('business_plan', f)}
          />
        </div>

        <EditableTable<UnitCostRow>
          title="54. Structure du prix de revient par unité"
          columns={[
            { key: 'produit', label: "Produit" },
            { key: 'unite', label: "Unité (Kg, Litre, etc.)", width: '150px' },
            { key: 'structurePrix', label: "Structure (Éléments constitutifs du prix)" },
          ]}
          data={formData.unitCostStructure}
          onAdd={() => addRow('unitCostStructure', { produit: '', unite: '', structurePrix: '' })}
          onRemove={(id) => removeRow('unitCostStructure', id)}
          onChange={(id, k, v) => updateTable('unitCostStructure', id, k, v)}
        />
      </div>

      {/* 55. DOCUMENTS FINANCIERS */}
      <div className="space-y-10 pt-12 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <FileText className="text-slate-400" size={24} />
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">55. Annexes Financières Obligatoires</h4>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 p-10 rounded-[3rem] border border-red-100 dark:border-red-900/30 space-y-8">
           <p className="text-xs font-black text-red-800 dark:text-red-300 uppercase tracking-widest">Veuillez joindre le dossier financier complet (SYSCOHADA) :</p>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <RequiredDocumentUpload 
                id="compte_resultat_prev" 
                label="Compte de résultat prévisionnel" 
                required={true}
                currentFile={formData.files['compte_resultat_prev'] || null}
                onFileSelect={(f) => handleFileChange('compte_resultat_prev', f)}
              />
              <RequiredDocumentUpload 
                id="cash_flow_prev" 
                label="Échéancier de Cash-flow" 
                required={true}
                currentFile={formData.files['cash_flow_prev'] || null}
                onFileSelect={(f) => handleFileChange('cash_flow_prev', f)}
              />
           </div>
        </div>
      </div>

      {/* 56-57. RESSOURCES HUMAINES */}
      <div className="space-y-12 pt-12 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <Users className="text-slate-400" size={24} />
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">56-57. Main-d'œuvre & RH</h4>
        </div>
        
        <div className="space-y-12">
          <EditableTable<DetailedPersonnelRow>
            title="56 (1). Personnel existant"
            columns={PERSONNEL_COLUMNS}
            data={formData.personnelExistant}
            onAdd={() => addRow('personnelExistant', { nombre: '', remuneration: '', fonction: '', qualification: '', categorie: '', nationalite: '', avantagesSociaux: '' })}
            onRemove={(id) => removeRow('personnelExistant', id)}
            onChange={(id, k, v) => updateTable('personnelExistant', id, k, v)}
          />

          <EditableTable<DetailedPersonnelRow>
            title="56 (2). Personnel nouveau"
            columns={PERSONNEL_COLUMNS}
            data={formData.personnelNouveau}
            onAdd={() => addRow('personnelNouveau', { nombre: '', remuneration: '', fonction: '', qualification: '', categorie: '', nationalite: '', avantagesSociaux: '' })}
            onRemove={(id) => removeRow('personnelNouveau', id)}
            onChange={(id, k, v) => updateTable('personnelNouveau', id, k, v)}
          />

          <EditableTable<DetailedPersonnelRow>
            title="56 (3). Gérant"
            columns={PERSONNEL_COLUMNS}
            data={formData.personnelGerant}
            onAdd={() => addRow('personnelGerant', { nombre: '1', remuneration: '', fonction: 'Gérant', qualification: '', categorie: '', nationalite: '', avantagesSociaux: '' })}
            onRemove={(id) => removeRow('personnelGerant', id)}
            onChange={(id, k, v) => updateTable('personnelGerant', id, k, v)}
          />

          <FormTextarea 
            label="57. Stratégie de recrutement de la main-d'œuvre :"
            value={formData.strategieRecrutement}
            onChange={e => updateData({ strategieRecrutement: e.target.value })}
            placeholder="Décrivez votre plan d'embauche..."
          />
        </div>
      </div>
    </FormSectionWrapper>
  );
};

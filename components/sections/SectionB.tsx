
import React from 'react';
import { FPIFormData, AssetRow, StockRow } from '../../types';
import { EditableTable } from '../common/EditableTable';
import { RequiredDocumentUpload } from '../common/RequiredDocumentUpload';
import { Briefcase, Landmark, HardHat, Package, TrendingUp, AlertCircle, FileText } from 'lucide-react';
import { FormSectionWrapper } from '../ui/FormSectionWrapper';
import { FormTextarea } from '../ui/FormTextarea';

interface SectionProps {
  formData: FPIFormData;
  updateData: (fields: Partial<FPIFormData>) => void;
}

export const SectionB: React.FC<SectionProps> = ({ formData, updateData }) => {
  
  const handleTableUpdate = <T extends { id: string }>(key: keyof FPIFormData, id: string, field: keyof T, val: any) => {
    const list = (formData[key] as unknown) as T[];
    updateData({
      [key]: list.map(item => item.id === id ? { ...item, [field]: val } : item)
    });
  };

  const handleAddRow = (key: keyof FPIFormData, template: any) => {
    const list = (formData[key] as unknown) as any[];
    updateData({
      [key]: [...list, { ...template, id: Date.now().toString() }]
    });
  };

  const handleFileChange = (key: string, file: File | null) => {
    updateData({ files: { ...formData.files, [key]: file } });
  };

  return (
    <FormSectionWrapper 
      title="B. PATRIMOINE ET MOYENS D’EXPLOITATION" 
      subtitle="Inventaire des actifs et capacités de production"
      icon={Briefcase}
    >
      {/* NOTA INFO */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 p-8 rounded-[2.5rem] flex items-start gap-6 shadow-sm">
        <AlertCircle className="text-amber-500 dark:text-amber-400 shrink-0 mt-1" size={24} />
        <p className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-tight leading-relaxed">
          Nota : Ne remplir cette section qu'en cas d'un projet d'extension, de modernisation ou de renforcement des capacités d'une installation/activité industrielle déjà existante.
        </p>
      </div>

      {/* 19 (a) TERRAINS ET BÂTIMENTS */}
      <div className="space-y-8">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <Landmark className="text-slate-400" size={24} />
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">19 (a). Terrains, bâtiments, infrastructures</h4>
        </div>
        
        <EditableTable<AssetRow>
          title="Liste des immobilisations foncières"
          columns={[
            { key: 'moyen', label: 'Moyen (Désignation)' },
            { key: 'anneeAcquisition', label: "Année d'acquisition", type: 'text' },
            { key: 'valeurEstimee', label: 'Valeur estimée actuelle', type: 'text' },
            { key: 'etat', label: 'Etat du bien', type: 'select', options: ['Bon', 'Mauvais'] },
          ]}
          data={formData.terrainsBatiments}
          onAdd={() => handleAddRow('terrainsBatiments', { moyen: '', anneeAcquisition: '', valeurEstimee: '', etat: 'Bon' })}
          onRemove={(id) => updateData({ terrainsBatiments: formData.terrainsBatiments.filter(a => a.id !== id) })}
          onChange={(id, k, v) => handleTableUpdate('terrainsBatiments', id, k, v)}
        />
      </div>

      {/* 19 (b) MACHINES ET ÉQUIPEMENTS */}
      <div className="space-y-10 pt-12 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <HardHat className="text-slate-400" size={24} />
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">19 (b). Machines, équipements, matériels roulants</h4>
        </div>

        <EditableTable<AssetRow>
          title="Liste du matériel industriel"
          columns={[
            { key: 'moyen', label: 'Moyen investi' },
            { key: 'anneeAcquisition', label: "Année d'acquisition", type: 'text' },
            { key: 'valeurEstimee', label: 'Valeur acquisition / estimée', type: 'text' },
            { key: 'etat', label: 'Etat du bien', type: 'select', options: ['Bon', 'Mauvais'] },
          ]}
          data={formData.machinesEquipements}
          onAdd={() => handleAddRow('machinesEquipements', { moyen: '', anneeAcquisition: '', valeurEstimee: '', etat: 'Bon' })}
          onRemove={(id) => updateData({ machinesEquipements: formData.machinesEquipements.filter(a => a.id !== id) })}
          onChange={(id, k, v) => handleTableUpdate('machinesEquipements', id, k, v)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <RequiredDocumentUpload 
            id="factures_patrimoine" 
            label="Factures & Contrats" 
            description="Preuves d'achat des équipements déjà acquis"
            required={false}
            currentFile={formData.files['factures_patrimoine'] || null}
            onFileSelect={(f) => handleFileChange('factures_patrimoine', f)}
          />
          <div className="p-6 rounded-3xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 flex items-center gap-4">
             <FileText className="text-blue-500 dark:text-blue-400 shrink-0" size={24} />
             <p className="text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase tracking-tight leading-relaxed">
               Joindre en annexe une copie des contrats/factures d'achat des équipements déjà au patrimoine.
             </p>
          </div>
        </div>
      </div>

      {/* 19 (c) STOCKS */}
      <div className="space-y-8 pt-12 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <Package className="text-slate-400" size={24} />
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">19 (c). Stocks (MP, Intrants, Produits Finis)</h4>
        </div>

        <EditableTable<StockRow>
          title="État des stocks actuels"
          columns={[
            { key: 'moyen', label: 'Moyen' },
            { key: 'quantite', label: 'Quantité' },
            { key: 'valeurMoyenne', label: 'Valeur moyenne', type: 'text' },
            { key: 'dateValorisation', label: 'Date valorisation', type: 'date' },
            { key: 'condition', label: 'Condition', type: 'select', options: ['Bon', 'Mauvais'] },
          ]}
          data={formData.stocks}
          onAdd={() => handleAddRow('stocks', { moyen: '', quantite: '', valeurMoyenne: '', dateValorisation: '', condition: 'Bon' })}
          onRemove={(id) => updateData({ stocks: formData.stocks.filter(s => s.id !== id) })}
          onChange={(id, k, v) => handleTableUpdate('stocks', id, k, v)}
        />
      </div>

      {/* 20. STATISTIQUES DE PRODUCTION */}
      <div className="space-y-10 pt-12 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <TrendingUp className="text-slate-900 dark:text-white" size={28} />
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">20. Statistiques de production (3 dernières années)</h4>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <FormTextarea 
            label="1ère année :"
            value={formData.prodStatsAnnee1}
            onChange={e => updateData({ prodStatsAnnee1: e.target.value })}
            placeholder="Énumérez les statistiques et difficultés..."
          />
          <FormTextarea 
            label="2ème année :"
            value={formData.prodStatsAnnee2}
            onChange={e => updateData({ prodStatsAnnee2: e.target.value })}
            placeholder="..."
          />
          <FormTextarea 
            label="3ème année :"
            value={formData.prodStatsAnnee3}
            onChange={e => updateData({ prodStatsAnnee3: e.target.value })}
            placeholder="..."
          />
          <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
            <FormTextarea 
              label="Perspectives d’avenir :"
              className="shadow-xl shadow-blue-50/50 dark:shadow-none"
              value={formData.perspectivesAvenir}
              onChange={e => updateData({ perspectivesAvenir: e.target.value })}
              placeholder="Décrivez vos ambitions et projets futurs..."
            />
          </div>
        </div>
      </div>
    </FormSectionWrapper>
  );
};

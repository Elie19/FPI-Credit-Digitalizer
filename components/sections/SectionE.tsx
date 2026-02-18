
import React from 'react';
import { 
  FPIFormData, 
  SiteAccessRow, 
  AssetRow, 
  StockRow, 
  InfrastructureRow, 
  FinancingRow, 
  RealizationTaskRow,
  SelfFinancingLoanRow
} from '../../types';
import { EditableTable } from '../common/EditableTable';
import { RequiredDocumentUpload } from '../common/RequiredDocumentUpload';
import { 
  FileText, 
  MapPin, 
  TrendingUp, 
  Zap, 
  Hammer, 
  Calendar, 
  AlertCircle, 
  DollarSign,
  PieChart
} from 'lucide-react';
import { FormSectionWrapper } from '../ui/FormSectionWrapper';
import { FormInput } from '../ui/FormInput';
import { FormSelect } from '../ui/FormSelect';
import { FormRadioGroup } from '../ui/FormRadioGroup';
import { FormTextarea } from '../ui/FormTextarea';

interface SectionProps {
  formData: FPIFormData;
  updateData: (fields: Partial<FPIFormData>) => void;
}

export const SectionE: React.FC<SectionProps> = ({ formData, updateData }) => {
  
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

  const zones = ['Zone résidentielle', 'Zone industrielle', 'Zone commerciale', 'Zone administrative', 'Zone mixte'];

  return (
    <FormSectionWrapper 
      title="E. DESCRIPTION DU PROJET ET PROGRAMME DE FINANCEMENT" 
      subtitle="Axe stratégique et financier de la demande"
      icon={FileText}
    >
      {/* 26-27. DESCRIPTION & OBJECTIFS */}
      <div className="space-y-12">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <TrendingUp className="text-slate-400" size={24} />
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">26. Description du projet</h4>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          {(['Historique', 'Motivation', 'Prévisions'] as const).map(key => (
            <FormTextarea 
              key={key}
              label={`26 (${key[0].toLowerCase()}). ${key} :`}
              value={formData[`projet${key}` as keyof FPIFormData] as string}
              onChange={e => updateData({ [`projet${key}` as keyof FPIFormData]: e.target.value })}
              placeholder={`Détaillez ${key.toLowerCase()}...`}
            />
          ))}

          <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
            <FormTextarea 
              label="27. Objectifs quantitatifs de production :"
              className="bg-slate-50/20 dark:bg-slate-900/20"
              value={formData.objectifsQuantitatifs}
              onChange={e => updateData({ objectifsQuantitatifs: e.target.value })}
              placeholder="Spécifiez les volumes, unités, etc..."
            />
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 p-8 rounded-[2.5rem] flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-sm">
            <div className="flex items-start gap-4 max-w-lg">
              <AlertCircle className="text-red-500 dark:text-red-400 shrink-0 mt-1" size={24} />
              <p className="text-xs font-bold text-red-800 dark:text-red-300 uppercase tracking-tight leading-relaxed">
                Joindre en annexe une copie des permis spéciaux vous permettant d'exercer vos activités ou d'implanter votre projet.
              </p>
            </div>
            <RequiredDocumentUpload 
              id="permis_speciaux" 
              label="Permis Spéciaux" 
              required={true}
              currentFile={formData.files['permis_speciaux'] || null}
              onFileSelect={(f) => handleFileChange('permis_speciaux', f)}
            />
          </div>
        </div>
      </div>

      {/* 28-32. LOCALISATION & ACCES */}
      <div className="space-y-12 pt-12 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <MapPin className="text-slate-400" size={24} />
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">28. Localisation & Accessibilité</h4>
        </div>

        <div className="p-10 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border border-slate-100 dark:border-slate-800 space-y-10 shadow-inner">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <FormInput 
              label="Adresse complète du site"
              value={formData.localisationSite}
              onChange={e => updateData({ localisationSite: e.target.value })}
            />
            <FormRadioGroup 
              label="Nature juridique des locaux"
              value={formData.natureLocauxSite}
              onChange={opt => updateData({ natureLocauxSite: opt })}
              options={[
                { value: 'Propriétaire', label: 'Propriétaire' },
                { value: 'Locataire', label: 'Locataire' }
              ]}
            />
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
             <RequiredDocumentUpload 
                id="titre_propriete_site" 
                label="Titre de propriété / Bail" 
                description="Document légal d'occupation du site"
                required={true}
                currentFile={formData.files['titre_propriete_site'] || null}
                onFileSelect={(f) => handleFileChange('titre_propriete_site', f)}
              />
          </div>
        </div>

        {/* 29-31 Tables */}
        <div className="space-y-12">
          <EditableTable<SiteAccessRow>
            title="29. Voies d'accès au site"
            columns={[
              { key: 'voie', label: "Désignation de la voie" },
              { key: 'etat', label: "État", type: 'select', options: ['Bon', 'Mauvais'] },
              { key: 'actions', label: "Actions prévues si mauvais état" },
            ]}
            data={formData.voiesAccesSite}
            onAdd={() => addRow('voiesAccesSite', { voie: '', etat: 'Bon', actions: '' })}
            onRemove={(id) => removeRow('voiesAccesSite', id)}
            onChange={(id, k, v) => updateTable('voiesAccesSite', id, k, v)}
          />

          <EditableTable<SiteAccessRow>
            title="30. Voies d'évacuation commerciale"
            columns={[
              { key: 'voie', label: "Désignation de la voie" },
              { key: 'etat', label: "État", type: 'select', options: ['Bon', 'Mauvais'] },
              { key: 'actions', label: "Actions prévues si mauvais état" },
            ]}
            data={formData.voiesEvacuation}
            onAdd={() => addRow('voiesEvacuation', { voie: '', etat: 'Bon', actions: '' })}
            onRemove={(id) => removeRow('voiesEvacuation', id)}
            onChange={(id, k, v) => updateTable('voiesEvacuation', id, k, v)}
          />

          <div className="space-y-8">
            <FormRadioGroup 
              label="31. Connexion réseau électrique et eau ?"
              value={formData.connexionReseaux}
              onChange={v => updateData({ connexionReseaux: v })}
              options={[
                { value: true, label: 'Oui' },
                { value: false, label: 'Non' }
              ]}
            />
            
            {formData.connexionReseaux && (
              <div className="animate-in slide-in-from-top-4 duration-300">
                <EditableTable<SiteAccessRow>
                  title="Détails des connexions réseaux"
                  columns={[
                    { key: 'voie', label: "Type de réseau (Elec/Eau)" },
                    { key: 'etat', label: "État actuel", type: 'select', options: ['Bon', 'Mauvais'] },
                    { key: 'actions', label: "Actions prévues" },
                  ]}
                  data={formData.detailsReseaux}
                  onAdd={() => addRow('detailsReseaux', { voie: '', etat: 'Bon', actions: '' })}
                  onRemove={(id) => removeRow('detailsReseaux', id)}
                  onChange={(id, k, v) => updateTable('detailsReseaux', id, k, v)}
                />
              </div>
            )}
          </div>
        </div>

        {/* 32. Zones */}
        <div className="space-y-8">
          <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">32. Localisation du projet dans les zones :</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {zones.map(z => (
              <label key={z} className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                formData.zonesLocalisation.includes(z) 
                  ? 'border-slate-900 dark:border-slate-100 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-xl' 
                  : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:border-slate-200 dark:hover:border-slate-700'
              }`}>
                <input 
                  type="checkbox" 
                  className="hidden" 
                  checked={formData.zonesLocalisation.includes(z)}
                  onChange={() => {
                    const next = formData.zonesLocalisation.includes(z) 
                      ? formData.zonesLocalisation.filter(x => x !== z) 
                      : [...formData.zonesLocalisation, z];
                    updateData({ zonesLocalisation: next });
                  }}
                />
                <span className="text-xs font-black uppercase tracking-widest">{z}</span>
              </label>
            ))}
          </div>
          <FormInput 
            label="Autre zone à préciser :"
            value={formData.zonesLocalisationAutre}
            onChange={e => updateData({ zonesLocalisationAutre: e.target.value })}
            placeholder="Précisez ici..."
          />
        </div>
      </div>

      {/* 34. MOYENS DÉJÀ INVESTIS */}
      <div className="space-y-12 pt-12 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <Hammer className="text-slate-400" size={24} />
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">34. Moyens déjà investis</h4>
        </div>
        
        <div className="space-y-12">
          <EditableTable<AssetRow>
            title="(a) Terrains, bâtiments, infrastructures investis"
            columns={[
              { key: 'moyen', label: "Moyen investi" },
              { key: 'anneeAcquisition', label: "Année d'acquisition" },
              { key: 'valeurEstimee', label: "Valeur actuelle" },
              { key: 'etat', label: "État", type: 'select', options: ['Bon', 'Mauvais'] },
              { key: 'garantie', label: "Garantie ?" },
            ]}
            data={formData.investisDejaTerrains}
            onAdd={() => addRow('investisDejaTerrains', { moyen: '', anneeAcquisition: '', valeurEstimee: '', etat: 'Bon', garantie: '' })}
            onRemove={(id) => removeRow('investisDejaTerrains', id)}
            onChange={(id, k, v) => updateTable('investisDejaTerrains', id, k, v)}
          />

          <EditableTable<AssetRow>
            title="(b) Machines, équipements, matériels roulants investis"
            columns={[
              { key: 'moyen', label: "Moyen investi" },
              { key: 'anneeAcquisition', label: "Année d'acquisition" },
              { key: 'valeurEstimee', label: "Valeur d'acquisition" },
              { key: 'etat', label: "État", type: 'select', options: ['Bon', 'Mauvais'] },
              { key: 'capacite', label: "Capacité" },
            ]}
            data={formData.investisDejaMachines}
            onAdd={() => addRow('investisDejaMachines', { moyen: '', anneeAcquisition: '', valeurEstimee: '', etat: 'Bon', capacite: '' })}
            onRemove={(id) => removeRow('investisDejaMachines', id)}
            onChange={(id, k, v) => updateTable('investisDejaMachines', id, k, v)}
          />

          <EditableTable<StockRow>
            title="(c) Stocks déjà acquis"
            columns={[
              { key: 'moyen', label: "Moyen" },
              { key: 'paysOrigine', label: "Pays d'origine" },
              { key: 'quantite', label: "Quantité" },
              { key: 'prix', label: "Prix" },
              { key: 'dateValorisation', label: "Date acquisition", type: 'date' },
              { key: 'condition', label: "Stockage", type: 'select', options: ['Bon', 'Mauvais'] },
            ]}
            data={formData.investisDejaStocks}
            onAdd={() => addRow('investisDejaStocks', { moyen: '', paysOrigine: '', quantite: '', prix: '', dateValorisation: '', condition: 'Bon' })}
            onRemove={(id) => removeRow('investisDejaStocks', id)}
            onChange={(id, k, v) => updateTable('investisDejaStocks', id, k, v)}
          />
        </div>
      </div>

      {/* 35-36. PROGRAMME D'INVESTISSEMENT & FINANCEMENT */}
      <div className="space-y-16 pt-16 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <DollarSign className="text-slate-400" size={24} />
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">35. Nouveaux Investissements Nécessaires</h4>
        </div>
        
        <div className="space-y-20">
          <div className="space-y-10">
            <EditableTable<InfrastructureRow>
              title="(a) Construction et aménagements des infrastructures"
              columns={[
                { key: 'item', label: "Item", width: "100px" },
                { key: 'designation', label: "Désignation" },
                { key: 'quantite', label: "Quantité", width: "100px" },
                { key: 'prixUnitaire', label: "P.U." },
                { key: 'valeurCIF', label: "Valeur CIF" },
                { key: 'provenance', label: "Prov.", type: 'select', options: ['Loc', 'Imp'] },
                { key: 'exoneration', label: "Biens", type: 'select', options: ['Exo', 'N/Exo'] },
              ]}
              data={formData.investisNouveauInfra}
              onAdd={() => addRow('investisNouveauInfra', { item: '', designation: '', quantite: '', prixUnitaire: '', valeurCIF: '', provenance: 'Loc', exoneration: 'Exo' })}
              onRemove={(id) => removeRow('investisNouveauInfra', id)}
              onChange={(id, k, v) => updateTable('investisNouveauInfra', id, k, v)}
            />
            <EditableTable<FinancingRow>
              title="Schéma de financement - Infrastructures"
              columns={[
                { key: 'item', label: "Item" },
                { key: 'designation', label: "Désignation" },
                { key: 'partPromoteur', label: "Entreprise Promotrice" },
                { key: 'creditFPI', label: "Crédit FPI" },
              ]}
              data={formData.schemaFinancemInfra}
              onAdd={() => addRow('schemaFinancemInfra', { item: '', designation: '', partPromoteur: '', creditFPI: '' })}
              onRemove={(id) => removeRow('schemaFinancemInfra', id)}
              onChange={(id, k, v) => updateTable('schemaFinancemInfra', id, k, v)}
            />
          </div>

          <div className="space-y-10">
            <EditableTable<InfrastructureRow>
              title="(b) Machinerie, équipements, matériels roulants et de manutention"
              columns={[
                { key: 'item', label: "Item", width: "100px" },
                { key: 'designation', label: "Désignation" },
                { key: 'quantite', label: "Quantité", width: "100px" },
                { key: 'prixUnitaire', label: "P.U." },
                { key: 'valeurCIF', label: "Valeur CIF" },
                { key: 'provenance', label: "Prov.", type: 'select', options: ['Loc', 'Imp'] },
                { key: 'exoneration', label: "Biens", type: 'select', options: ['Exo', 'N/Exo'] },
              ]}
              data={formData.investisNouveauMachines}
              onAdd={() => addRow('investisNouveauMachines', { item: '', designation: '', quantite: '', prixUnitaire: '', valeurCIF: '', provenance: 'Loc', exoneration: 'Exo' })}
              onRemove={(id) => removeRow('investisNouveauMachines', id)}
              onChange={(id, k, v) => updateTable('investisNouveauMachines', id, k, v)}
            />
            <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-3xl border border-blue-100 dark:border-blue-900/30 shadow-sm">
              <RequiredDocumentUpload 
                  id="factures_pro_forma_machines" 
                  label="Factures Pro-forma Machines" 
                  description="Spécifications de trois (3) fournisseurs différents"
                  required={true}
                  currentFile={formData.files['factures_pro_forma_machines'] || null}
                  onFileSelect={(f) => handleFileChange('factures_pro_forma_machines', f)}
                />
            </div>
            <EditableTable<FinancingRow>
              title="Schéma de financement - Machines"
              columns={[
                { key: 'item', label: "Item" },
                { key: 'designation', label: "Désignation" },
                { key: 'partPromoteur', label: "Entreprise Promotrice" },
                { key: 'creditFPI', label: "Crédit FPI" },
              ]}
              data={formData.schemaFinancemMachines}
              onAdd={() => addRow('schemaFinancemMachines', { item: '', designation: '', partPromoteur: '', creditFPI: '' })}
              onRemove={(id) => removeRow('schemaFinancemMachines', id)}
              onChange={(id, k, v) => updateTable('schemaFinancemMachines', id, k, v)}
            />
          </div>
        </div>
      </div>

      {/* 37-38. AUTOFINANCEMENT */}
      <div className="space-y-12 pt-12 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <PieChart className="text-slate-400" size={24} />
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">37. Autofinancement</h4>
        </div>
        
        <div className="space-y-10">
          <FormTextarea 
            label="37. Sources d'autofinancement :"
            value={formData.autofinancementSources}
            onChange={e => updateData({ autofinancementSources: e.target.value })}
            placeholder="Expliquez comment l'entreprise constitue son apport..."
          />

          <div className="space-y-8">
            <FormRadioGroup 
              label="38 (a). Part empruntée ?"
              value={formData.autofinanceEmprunte}
              onChange={v => updateData({ autofinanceEmprunte: v })}
              options={[
                { value: true, label: 'Oui' },
                { value: false, label: 'Non' }
              ]}
            />

            {formData.autofinanceEmprunte && (
              <div className="animate-in slide-in-from-top-4 duration-300">
                <EditableTable<SelfFinancingLoanRow>
                  title="Détails de l'emprunt"
                  columns={[
                    { key: 'source', label: "Source" },
                    { key: 'garantie', label: "Garantie consentie" },
                    { key: 'montant', label: "Montant" },
                    { key: 'taux', label: "Taux" },
                    { key: 'maturite', label: "Maturité" },
                  ]}
                  data={formData.detailsEmpruntAutofin}
                  onAdd={() => addRow('detailsEmpruntAutofin', { source: '', garantie: '', montant: '', taux: '', maturite: '' })}
                  onRemove={(id) => removeRow('detailsEmpruntAutofin', id)}
                  onChange={(id, k, v) => updateTable('detailsEmpruntAutofin', id, k, v)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 39. PLANNING */}
      <div className="space-y-12 pt-12 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <Calendar className="text-slate-400" size={24} />
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">39. Planning de réalisation</h4>
        </div>
        
        <EditableTable<RealizationTaskRow>
          title="Calendrier des investissements"
          subtitle="Phase d'installation du projet"
          columns={[
            { key: 'tache', label: "Tâche" },
            { key: 'acteur', label: "Acteur" },
            { key: 'duree', label: "Durée" },
            { key: 'montant', label: "Montant (USD)" },
            { key: 'source', label: "Source Financement" },
          ]}
          data={formData.planningRealisation}
          onAdd={() => addRow('planningRealisation', { tache: '', acteur: '', duree: '', montant: '', source: '' })}
          onRemove={(id) => removeRow('planningRealisation', id)}
          onChange={(id, k, v) => updateTable('planningRealisation', id, k, v)}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          <FormSelect 
            label="Mode de financement dominant"
            value={formData.modeFinancementDominant}
            onChange={e => updateData({ modeFinancementDominant: e.target.value as any })}
            options={['Dette senior', 'Dette subordonnée', 'Capital']}
          />
          <FormSelect 
            label="Durée du financement"
            value={formData.dureeFinancement}
            onChange={e => updateData({ dureeFinancement: e.target.value as any })}
            options={['Court terme', 'Moyen terme', 'Long terme', 'Indéterminée']}
          />
          <FormSelect 
            label="Modalité de remboursement"
            value={formData.modaliteRemboursement}
            onChange={e => updateData({ modaliteRemboursement: e.target.value as any })}
            options={['Annuités', 'Annuités avec différé', 'In fine', 'Dividendes']}
          />
        </div>
      </div>
    </FormSectionWrapper>
  );
};

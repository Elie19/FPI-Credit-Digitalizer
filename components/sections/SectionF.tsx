
import React from 'react';
import { 
  FPIFormData, 
  CompetitorRow, 
  ImportedCompetitorRow, 
  CompetitorSwotRow, 
  ConsumerEstimationRow, 
  ProductTypeRow, 
  DistributionChannelRow, 
  PromotionActivityRow 
} from '../../types';
import { EditableTable } from '../common/EditableTable';
import { 
  Globe, 
  BarChart, 
  Target, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  ShieldCheck
} from 'lucide-react';
import { FormSectionWrapper } from '../ui/FormSectionWrapper';
import { FormRadioGroup } from '../ui/FormRadioGroup';
import { FormTextarea } from '../ui/FormTextarea';

interface SectionProps {
  formData: FPIFormData;
  updateData: (fields: Partial<FPIFormData>) => void;
}

export const SectionF: React.FC<SectionProps> = ({ formData, updateData }) => {
  
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

  return (
    <FormSectionWrapper 
      title="F. ÉTUDE DE MARCHÉ ET STRATÉGIE COMMERCIALE" 
      subtitle="Analyse sectorielle, concurrence et mix marketing"
      icon={Globe}
    >
      {/* 38. ANALYSE DU SECTEUR */}
      <div className="space-y-12">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <TrendingUp className="text-slate-400" size={24} />
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">38. Tendances & Dynamique de marché</h4>
        </div>
        
        <div className="space-y-10">
          <FormTextarea 
            label="38. Description des tendances du secteur :"
            value={formData.tendancesSecteur}
            onChange={e => updateData({ tendancesSecteur: e.target.value })}
            placeholder="Décrivez l'évolution globale du secteur..."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormRadioGroup 
              label="Taux de croissance annuel du marché"
              value={formData.croissanceMarche}
              options={[
                { value: 'Élevé', label: 'Élevé' },
                { value: 'Moyen', label: 'Moyen' },
                { value: 'Faible', label: 'Faible' }
              ]}
              onChange={v => updateData({ croissanceMarche: v })}
            />
            <FormRadioGroup 
              label="Perspectives d'évolution (3 à 5 ans)"
              value={formData.perspectivesEvolution}
              options={[
                { value: 'Élevées', label: 'Élevées' },
                { value: 'Moyennes', label: 'Moyennes' },
                { value: 'Faibles', label: 'Faibles' }
              ]}
              onChange={v => updateData({ perspectivesEvolution: v })}
            />
            <FormRadioGroup 
              label="Avantage implantation géographique"
              value={formData.avantageGeographique}
              options={[
                { value: 'Oui', label: 'Oui' },
                { value: 'Non', label: 'Non' },
                { value: 'Neutre', label: 'Neutre' }
              ]}
              onChange={v => updateData({ avantageGeographique: v })}
            />
            <FormRadioGroup 
              label="Production locale vs pression prix"
              value={formData.reductionCoutsLocale}
              options={[
                { value: 'Oui', label: 'Oui' },
                { value: 'Non', label: 'Non' },
                { value: 'Neutre', label: 'Neutre' }
              ]}
              onChange={v => updateData({ reductionCoutsLocale: v })}
            />
            <FormRadioGroup 
              label="Avantage technologique significatif"
              value={formData.avantageTechnologique}
              options={[
                { value: 'Oui', label: 'Oui' },
                { value: 'Non', label: 'Non' },
                { value: 'Neutre', label: 'Neutre' }
              ]}
              onChange={v => updateData({ avantageTechnologique: v })}
            />
          </div>

          <div className="grid grid-cols-1 gap-8 pt-8 border-t border-slate-100 dark:border-slate-800">
            <FormRadioGroup 
              label="Résilience - Tensions économiques générales"
              value={formData.resilienceEconomique}
              options={[
                { value: 'Oui, sans difficulté', label: 'Oui, sans difficulté' },
                { value: 'Oui, avec difficulté', label: 'Oui, avec difficulté' },
                { value: 'Non', label: 'Non' },
                { value: 'Neutre', label: 'Neutre' }
              ]}
              onChange={v => updateData({ resilienceEconomique: v })}
            />
            <FormRadioGroup 
              label="Résilience - Tensions propres au secteur"
              value={formData.resilienceSectorielle}
              options={[
                { value: 'Oui, sans difficulté', label: 'Oui, sans difficulté' },
                { value: 'Oui, avec difficulté', label: 'Oui, avec difficulté' },
                { value: 'Non', label: 'Non' },
                { value: 'Neutre', label: 'Neutre' }
              ]}
              onChange={v => updateData({ resilienceSectorielle: v })}
            />
          </div>
        </div>
      </div>

      {/* 39. REGLEMENTATION */}
      <div className="space-y-10 pt-12 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <ShieldCheck className="text-slate-400" size={24} />
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">39. Cadre Réglementaire</h4>
        </div>
        
        <div className="space-y-8">
          <FormRadioGroup 
            label="Existe-t-il une réglementation particulière régissant le secteur ?"
            value={formData.reglementationSecteur}
            options={[
              { value: true, label: 'Oui' },
              { value: false, label: 'Non' }
            ]}
            onChange={v => updateData({ reglementationSecteur: v })}
          />
          {formData.reglementationSecteur && (
            <div className="animate-in slide-in-from-top-4 duration-300">
              <FormTextarea 
                label="Détails de la réglementation :"
                value={formData.detailsReglementation}
                onChange={e => updateData({ detailsReglementation: e.target.value })}
                placeholder="Énumérez les lois, décrets ou normes spécifiques..."
              />
            </div>
          )}
        </div>
      </div>

      {/* 40-41. CONCURRENCE */}
      <div className="space-y-12 pt-12 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <Users className="text-slate-400" size={24} />
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">40-41. Analyse de la concurrence</h4>
        </div>
        
        <EditableTable<CompetitorRow>
          title="40. Producteurs concurrents locaux ou nationaux"
          columns={[
            { key: 'producteur', label: "Producteur" },
            { key: 'paysOrigine', label: "Origine", width: "100px" },
            { key: 'produit', label: "Produit" },
            { key: 'niveauProduction', label: "Niveau Prod." },
            { key: 'capaciteProduction', label: "Capacité" },
            { key: 'caracteristiques', label: "Caractéristiques" },
            { key: 'prixVente', label: "Prix (USD)", width: "120px" },
          ]}
          data={formData.concurrentsLocaux}
          onAdd={() => addRow('concurrentsLocaux', { producteur: '', paysOrigine: 'RDC', produit: '', niveauProduction: '', capaciteProduction: '', caracteristiques: '', prixVente: '' })}
          onRemove={(id) => removeRow('concurrentsLocaux', id)}
          onChange={(id, k, v) => updateTable('concurrentsLocaux', id, k, v)}
        />

        <EditableTable<ImportedCompetitorRow>
          title="41. Produits importés similaires concurrents"
          columns={[
            { key: 'produit', label: "Désignation Produit" },
            { key: 'paysOrigine', label: "Pays d'origine" },
            { key: 'quantite', label: "Quantité importée" },
            { key: 'caracteristiques', label: "Caractéristiques" },
            { key: 'prixVente', label: "Prix (USD)", width: "120px" },
          ]}
          data={formData.concurrentsImportes}
          onAdd={() => addRow('concurrentsImportes', { produit: '', paysOrigine: '', quantite: '', caracteristiques: '', prixVente: '' })}
          onRemove={(id) => removeRow('concurrentsImportes', id)}
          onChange={(id, k, v) => updateTable('concurrentsImportes', id, k, v)}
        />
      </div>

      {/* 42-44. PART DE MARCHE & SWOT */}
      <div className="space-y-12 pt-12 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <BarChart className="text-slate-400" size={24} />
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">42-44. Positionnement Marché</h4>
        </div>
        
        <div className="space-y-10">
          <FormTextarea 
            label="42. Part de marché des principaux offreurs :"
            value={formData.partMarcheOffreurs}
            onChange={e => updateData({ partMarcheOffreurs: e.target.value })}
            placeholder="Analyse de la répartition du marché (locaux vs importateurs)..."
          />

          <EditableTable<CompetitorSwotRow>
            title="43. Forces et Faiblesses des concurrents"
            columns={[
              { key: 'forces', label: "Forces (Points forts)" },
              { key: 'faiblesses', label: "Faiblesses (Points critiques)" },
            ]}
            data={formData.swotConcurrents}
            onAdd={() => addRow('swotConcurrents', { forces: '', faiblesses: '' })}
            onRemove={(id) => removeRow('swotConcurrents', id)}
            onChange={(id, k, v) => updateTable('swotConcurrents', id, k, v)}
          />

          <EditableTable<ConsumerEstimationRow>
            title="44. Estimation des consommateurs par produit concurrent"
            columns={[
              { key: 'produit', label: "Produit" },
              { key: 'estimation', label: "Estimation du nombre / Volume" },
            ]}
            data={formData.estimationConsommateurs}
            onAdd={() => addRow('estimationConsommateurs', { produit: '', estimation: '' })}
            onRemove={(id) => removeRow('estimationConsommateurs', id)}
            onChange={(id, k, v) => updateTable('estimationConsommateurs', id, k, v)}
          />
        </div>
      </div>

      {/* 45-48. PRODUIT & AVANTAGES */}
      <div className="space-y-12 pt-12 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <Target className="text-slate-400" size={24} />
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">45-48. Offre & Stratégie Produit</h4>
        </div>
        
        <div className="space-y-10">
          <FormTextarea 
            label="45. Quels sont les marchés visés ?"
            value={formData.marchesVises}
            onChange={e => updateData({ marchesVises: e.target.value })}
            placeholder="Cible géographique, démographique, industrielle..."
          />

          <EditableTable<ProductTypeRow>
            title="46. Types de produits envisagés et caractéristiques"
            columns={[
              { key: 'produit', label: "Produit" },
              { key: 'caracteristiques', label: "Description technique / Spécifications" },
            ]}
            data={formData.produitsEnvisages}
            onAdd={() => addRow('produitsEnvisages', { produit: '', caracteristiques: '' })}
            onRemove={(id) => removeRow('produitsEnvisages', id)}
            onChange={(id, k, v) => updateTable('produitsEnvisages', id, k, v)}
          />

          <FormTextarea 
            label="47. Ententes actuelles / Contrats ou Lettres d'intention :"
            value={formData.ententesClienteles}
            onChange={e => updateData({ ententesClienteles: e.target.value })}
            placeholder="Détaillez les pré-commandes ou engagements de clients potentiels..."
          />

          <EditableTable<ProductTypeRow>
            title="48. Avantage concurrentiel des produits du projet"
            columns={[
              { key: 'produit', label: "Produit" },
              { key: 'avantage', label: "Pourquoi le client choisirait votre produit ?" },
            ]}
            data={formData.avantagesProduits}
            onAdd={() => addRow('avantagesProduits', { produit: '', avantage: '' })}
            onRemove={(id) => removeRow('avantagesProduits', id)}
            onChange={(id, k, v) => updateTable('avantagesProduits', id, k, v)}
          />
        </div>
      </div>

      {/* 49-51. PRIX & DISTRIBUTION */}
      <div className="space-y-12 pt-12 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <ShoppingCart className="text-slate-400" size={24} />
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">49-51. Distribution & Promotion</h4>
        </div>
        
        <div className="space-y-12">
          <EditableTable<ProductTypeRow>
            title="49. Prix de vente envisagé sur le marché"
            columns={[
              { key: 'produit', label: "Produit" },
              { key: 'prixMarche', label: "Prix de vente cible (USD / Unité)" },
            ]}
            data={formData.prixVenteMarche}
            onAdd={() => addRow('prixVenteMarche', { produit: '', prixMarche: '' })}
            onRemove={(id) => removeRow('prixVenteMarche', id)}
            onChange={(id, k, v) => updateTable('prixVenteMarche', id, k, v)}
          />

          <EditableTable<DistributionChannelRow>
            title="50. Circuits de distribution"
            subtitle="Identifiez vos distributeurs clés"
            columns={[
              { key: 'circuit', label: "Circuit (Grossistes/Détails/Direct)" },
              { key: 'noms', label: "Noms" },
              { key: 'adresses', label: "Adresses" },
              { key: 'contacts', label: "Contacts" },
              { key: 'ententes', label: "Ententes éventuelles" },
            ]}
            data={formData.circuitsDistribution}
            onAdd={() => addRow('circuitsDistribution', { circuit: '', noms: '', adresses: '', contacts: '', ententes: '' })}
            onRemove={(id) => removeRow('circuitsDistribution', id)}
            onChange={(id, k, v) => updateTable('circuitsDistribution', id, k, v)}
          />

          <EditableTable<PromotionActivityRow>
            title="51. Moyens et activités de promotion"
            subtitle="Plan d'action pour la visibilité"
            columns={[
              { key: 'activite', label: "Activités (Pub, Foires, Réseaux...)" },
              { key: 'objectifs', label: "Objectifs visés" },
              { key: 'taches', label: "Tâches à accomplir" },
              { key: 'cout', label: "Coût estimé" },
              { key: 'delais', label: "Délais", width: "120px" },
            ]}
            data={formData.actionsPromotion}
            onAdd={() => addRow('actionsPromotion', { activite: '', objectifs: '', taches: '', cout: '', delais: '' })}
            onRemove={(id) => removeRow('actionsPromotion', id)}
            onChange={(id, k, v) => updateTable('actionsPromotion', id, k, v)}
          />
        </div>
      </div>
    </FormSectionWrapper>
  );
};

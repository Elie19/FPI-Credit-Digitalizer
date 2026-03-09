
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { CreditFormData } from '../../types';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#1a1a1a',
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#0f172a',
    borderBottomStyle: 'solid',
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0f172a',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 10,
    textAlign: 'center',
  },
  section: {
    marginTop: 15,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0f172a',
    backgroundColor: '#f1f5f9',
    padding: 6,
    marginBottom: 8,
    textTransform: 'uppercase',
    borderLeftWidth: 3,
    borderLeftColor: '#0f172a',
    borderLeftStyle: 'solid',
  },
  subSectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#334155',
    marginTop: 10,
    marginBottom: 5,
    textDecoration: 'underline',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  gridItem: {
    width: '50%',
    padding: 4,
  },
  label: {
    fontSize: 7,
    fontWeight: 'bold',
    color: '#64748b',
    textTransform: 'uppercase',
    marginBottom: 1,
  },
  value: {
    fontSize: 9,
    color: '#0f172a',
    fontWeight: 'bold',
  },
  table: {
    marginTop: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderStyle: 'solid',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    borderBottomStyle: 'solid',
    padding: 4,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    borderBottomStyle: 'solid',
    padding: 4,
  },
  tableCell: {
    flex: 1,
    fontSize: 7,
    paddingRight: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 7,
    color: '#94a3b8',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    borderTopStyle: 'solid',
    paddingTop: 5,
  },
  coverPage: {
    padding: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#0f172a',
    color: '#fff',
  },
  coverTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    letterSpacing: 1,
  },
  coverSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 40,
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  coverDossierBox: {
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'solid',
    padding: 15,
    marginBottom: 40,
  },
  coverDossier: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  coverCompany: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 30,
    textAlign: 'center',
  },
  coverDate: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 80,
  },
  textBlock: {
    fontSize: 8,
    lineHeight: 1.4,
    marginBottom: 5,
    textAlign: 'justify',
  }
});

interface Props {
  data: CreditFormData;
}

const Table = ({ headers, data, keys }: { headers: string[], data: any[], keys: string[] }) => (
  <View style={styles.table}>
    <View style={styles.tableHeader}>
      {headers.map((h, i) => (
        <Text key={i} style={[styles.tableCell, { fontWeight: 'bold' }]}>{h}</Text>
      ))}
    </View>
    {data.length > 0 ? data.map((row, i) => (
      <View key={i} style={styles.tableRow}>
        {keys.map((k, j) => (
          <Text key={j} style={styles.tableCell}>{row[k] || '-'}</Text>
        ))}
      </View>
    )) : (
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, { textAlign: 'center', color: '#94a3b8' }]}>Aucune donnée enregistrée</Text>
      </View>
    )}
  </View>
);

export const CreditReportPDF: React.FC<Props> = ({ data }) => {
  const renderHeader = () => (
    <View style={styles.header} fixed>
      <Text style={styles.headerText}>FPI - Crédit Digital | Rapport Officiel</Text>
      <Text style={{ fontSize: 8 }}>Dossier: {data.dossierNumber}</Text>
    </View>
  );

  const renderFooter = () => (
    <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
      `Page ${pageNumber} / ${totalPages} - Rapport de Crédit N° ${data.dossierNumber} - Généré le ${new Date().toLocaleDateString()}`
    )} fixed />
  );

  return (
    <Document>
      {/* Page de Garde */}
      <Page size="A4" style={styles.coverPage}>
        <Text style={styles.coverSubtitle}>Dossier de Financement Industriel</Text>
        <Text style={styles.coverTitle}>RAPPORT COMPLET DE DEMANDE DE CRÉDIT</Text>
        
        <View style={styles.coverDossierBox}>
          <Text style={styles.coverDossier}>N° {data.dossierNumber}</Text>
        </View>

        <Text style={styles.coverCompany}>{data.raisonSociale || "ENTREPRISE NON SPÉCIFIÉE"}</Text>
        <Text style={{ fontSize: 12, color: '#94a3b8', marginTop: 8, textAlign: 'center' }}>{data.natureProjet || "PROJET NON SPÉCIFIÉ"}</Text>

        <Text style={styles.coverDate}>Date de soumission : {data.submissionDate || new Date().toLocaleDateString()}</Text>
        
        <Text style={{ position: 'absolute', bottom: 30, fontSize: 9, color: '#475569' }}>
          Document Confidentiel - Fonds de Promotion de l'Industrie (FPI)
        </Text>
      </Page>

      {/* SECTION 1 & 2: IDENTIFICATION & ENTREPRISE */}
      <Page size="A4" style={styles.page}>
        {renderHeader()}
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Identification de la Demande</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}><Text style={styles.label}>IFU/RCCM</Text><Text style={styles.value}>{data.ifuRccm || "N/A"}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Nature du Projet</Text><Text style={styles.value}>{data.natureProjet || "N/A"}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Montant Sollicité</Text><Text style={styles.value}>{data.montantCredit}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>But du Crédit</Text><Text style={styles.value}>{data.butCredit === 'AUTRE' ? data.butCreditAutre : data.butCredit}</Text></View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Informations sur l'Entreprise</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}><Text style={styles.label}>Raison Sociale</Text><Text style={styles.value}>{data.raisonSociale || "N/A"}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Sigle</Text><Text style={styles.value}>{data.sigle || "N/A"}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Forme Juridique</Text><Text style={styles.value}>{data.formeJuridique || "N/A"}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Date de Création</Text><Text style={styles.value}>{data.dateCreation || "N/A"}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Pays de Création</Text><Text style={styles.value}>{data.paysCreation || "N/A"}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Activités</Text><Text style={styles.value}>{data.activitePrincipale} / {data.activiteSecondaire}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Capital Social</Text><Text style={styles.value}>{data.montantCapitalSocial} {data.deviseCapital}</Text></View>
          </View>

          <Text style={styles.subSectionTitle}>Actionnariat</Text>
          <Table 
            headers={['Nom', 'Nationalité', 'Apport', 'Nature', 'Domicile']}
            data={data.shareholders}
            keys={['nom', 'nationalite', 'valeurApport', 'natureApport', 'adresseNatureDomicile']}
          />

          <Text style={styles.subSectionTitle}>Références Administratives</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}><Text style={styles.label}>RCCM</Text><Text style={styles.value}>{data.numRCCM} ({data.lieuRCCM}, {data.dateRCCM})</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>ID Nationale</Text><Text style={styles.value}>{data.numIDNat} ({data.lieuIDNat}, {data.dateIDNat})</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Numéro Impôt</Text><Text style={styles.value}>{data.numImpot} ({data.lieuImpot}, {data.dateImpot})</Text></View>
          </View>

          <Text style={styles.subSectionTitle}>Coordonnées & Sièges</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}><Text style={styles.label}>Siège Social</Text><Text style={styles.value}>{data.adresseSiegeSocial} ({data.natureLocauxSiege})</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Siège Exploitation</Text><Text style={styles.value}>{data.adresseSiegeExploitation} ({data.natureLocauxExploitation})</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Contact</Text><Text style={styles.value}>Tél: {data.telMobile} / Email: {data.email}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Web</Text><Text style={styles.value}>{data.siteInternet || "N/A"}</Text></View>
          </View>
        </View>
        {renderFooter()}
      </Page>

      {/* SECTION 3: PATRIMOINE & MOYENS */}
      <Page size="A4" style={styles.page}>
        {renderHeader()}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Patrimoine et Moyens d'Exploitation</Text>
          
          <Text style={styles.subSectionTitle}>Terrains et Bâtiments</Text>
          <Table 
            headers={['Moyen', 'Année Acq.', 'Valeur Est.', 'État', 'Garantie']}
            data={data.terrainsBatiments}
            keys={['moyen', 'anneeAcquisition', 'valeurEstimee', 'etat', 'garantie']}
          />

          <Text style={styles.subSectionTitle}>Machines et Équipements</Text>
          <Table 
            headers={['Moyen', 'Année Acq.', 'Valeur Est.', 'État', 'Capacité']}
            data={data.machinesEquipements}
            keys={['moyen', 'anneeAcquisition', 'valeurEstimee', 'etat', 'capacite']}
          />

          <Text style={styles.subSectionTitle}>Stocks</Text>
          <Table 
            headers={['Moyen', 'Quantité', 'Valeur Moy.', 'Date Val.', 'Origine']}
            data={data.stocks}
            keys={['moyen', 'quantite', 'valeurMoyenne', 'dateValorisation', 'paysOrigine']}
          />

          <Text style={styles.subSectionTitle}>Statistiques de Production (3 dernières années)</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}><Text style={styles.label}>Année N-2</Text><Text style={styles.value}>{data.prodStatsAnnee1 || "N/A"}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Année N-1</Text><Text style={styles.value}>{data.prodStatsAnnee2 || "N/A"}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Année N</Text><Text style={styles.value}>{data.prodStatsAnnee3 || "N/A"}</Text></View>
          </View>
          
          <Text style={styles.subSectionTitle}>Perspectives d'Avenir</Text>
          <Text style={styles.textBlock}>{data.perspectivesAvenir || "Non renseigné"}</Text>
        </View>
        {renderFooter()}
      </Page>

      {/* SECTION 4 & 5: PERSONNEL & ANTECEDENTS */}
      <Page size="A4" style={styles.page}>
        {renderHeader()}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Personnel et Organisation</Text>
          <Table 
            headers={['Noms', 'Poste', 'Tâches', 'Date Engagement']}
            data={data.personnelCle}
            keys={['noms', 'poste', 'taches', 'dateEngagement']}
          />
          <View style={styles.grid}>
            <View style={styles.gridItem}><Text style={styles.label}>Sous-traitance</Text><Text style={styles.value}>{data.sousTraitance ? "Oui" : "Non"}</Text></View>
          </View>
          {data.sousTraitance && <Text style={styles.textBlock}>Détails: {data.detailsSousTraitance}</Text>}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Antécédents Financiers et Juridiques</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}><Text style={styles.label}>Déjà bénéficié d'un concours FPI ?</Text><Text style={styles.value}>{data.dejaBeneficieConcours ? "Oui" : "Non"}</Text></View>
          </View>
          
          <Text style={styles.subSectionTitle}>Historique des Prêts (Autres institutions)</Text>
          <Table 
            headers={['Objet du Prêt', 'Montant Total', 'Encours']}
            data={data.historiquePrets}
            keys={['objetPret', 'montantTotal', 'encours']}
          />

          <View style={styles.grid}>
            <View style={styles.gridItem}><Text style={styles.label}>Faillite / Concordat ?</Text><Text style={styles.value}>{data.faillite ? `Oui: ${data.detailsFaillite}` : "Non"}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Poursuites Judiciaires ?</Text><Text style={styles.value}>{data.poursuites ? `Oui: ${data.detailsPoursuites}` : "Non"}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Garant d'autres prêts ?</Text><Text style={styles.value}>{data.garantPrets ? `Oui: ${data.detailsGarant}` : "Non"}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Antécédents Fiscaux ?</Text><Text style={styles.value}>{data.antecedentsFiscaux ? `Oui: ${data.detailsAntecedents}` : "Non"}</Text></View>
          </View>
        </View>
        {renderFooter()}
      </Page>

      {/* SECTION 6: DESCRIPTION DU PROJET */}
      <Page size="A4" style={styles.page}>
        {renderHeader()}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Description du Projet</Text>
          
          <Text style={styles.subSectionTitle}>Historique et Justification</Text>
          <Text style={styles.textBlock}>{data.projetHistorique || "N/A"}</Text>
          
          <Text style={styles.subSectionTitle}>Motivation du Projet</Text>
          <Text style={styles.textBlock}>{data.projetMotivation || "N/A"}</Text>

          <Text style={styles.subSectionTitle}>Localisation et Réseaux</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}><Text style={styles.label}>Site</Text><Text style={styles.value}>{data.localisationSite} ({data.natureLocauxSite})</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Zones</Text><Text style={styles.value}>{data.zonesLocalisation.join(', ')}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Connexion Réseaux</Text><Text style={styles.value}>{data.connexionReseaux ? "Oui" : "Non"}</Text></View>
          </View>

          <Text style={styles.subSectionTitle}>Investissements Nouveaux (Infrastructure, Machines, Taxes, Stocks)</Text>
          <Table 
            headers={['Item', 'Désignation', 'Qté', 'P.U.', 'Valeur CIF', 'Prov.']}
            data={[...data.investisNouveauInfra, ...data.investisNouveauMachines, ...data.investisNouveauTaxes, ...data.investisNouveauStocks]}
            keys={['item', 'designation', 'quantite', 'prixUnitaire', 'valeurCIF', 'provenance']}
          />

          <Text style={styles.subSectionTitle}>Schéma de Financement (Global)</Text>
          <Table 
            headers={['Item', 'Désignation', 'Part Promoteur', 'Crédit FPI']}
            data={[...data.schemaFinancemInfra, ...data.schemaFinancemMachines, ...data.schemaFinancemTaxes, ...data.schemaFinancemStocks]}
            keys={['item', 'designation', 'partPromoteur', 'creditFPI']}
          />

          <Text style={styles.subSectionTitle}>Modalités de Financement</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}><Text style={styles.label}>Mode Dominant</Text><Text style={styles.value}>{data.modeFinancementDominant}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Durée</Text><Text style={styles.value}>{data.dureeFinancement}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Modalité Remboursement</Text><Text style={styles.value}>{data.modaliteRemboursement}</Text></View>
          </View>

          <Text style={styles.subSectionTitle}>Planning de Réalisation</Text>
          <Table 
            headers={['Tâche', 'Acteur', 'Durée', 'Montant', 'Source']}
            data={data.planningRealisation}
            keys={['tache', 'acteur', 'duree', 'montant', 'source']}
          />
        </View>
        {renderFooter()}
      </Page>

      {/* SECTION 7: MARCHE & STRATEGIE */}
      <Page size="A4" style={styles.page}>
        {renderHeader()}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Marché et Stratégie</Text>
          
          <View style={styles.grid}>
            <View style={styles.gridItem}><Text style={styles.label}>Croissance Marché</Text><Text style={styles.value}>{data.croissanceMarche}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Perspectives</Text><Text style={styles.value}>{data.perspectivesEvolution}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Résilience Éco.</Text><Text style={styles.value}>{data.resilienceEconomique}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Avantage Géo.</Text><Text style={styles.value}>{data.avantageGeographique}</Text></View>
          </View>

          <Text style={styles.subSectionTitle}>Concurrents (Locaux & Importés)</Text>
          <Table 
            headers={['Producteur/Produit', 'Origine', 'Capacité/Qté', 'Prix Vente']}
            data={[...data.concurrentsLocaux.map(c => ({ ...c, name: c.producteur, qty: c.capaciteProduction })), ...data.concurrentsImportes.map(c => ({ ...c, name: c.produit, qty: c.quantite }))]}
            keys={['name', 'paysOrigine', 'qty', 'prixVente']}
          />

          <Text style={styles.subSectionTitle}>Produits Envisagés & Avantages</Text>
          <Table 
            headers={['Produit', 'Caractéristiques', 'Avantage', 'Prix Marché']}
            data={data.produitsEnvisages}
            keys={['produit', 'caracteristiques', 'avantage', 'prixMarche']}
          />

          <Text style={styles.subSectionTitle}>Circuits de Distribution & Promotion</Text>
          <Table 
            headers={['Circuit/Activité', 'Détails/Objectifs', 'Contacts/Tâches', 'Ententes/Coût']}
            data={[...data.circuitsDistribution.map(c => ({ ...c, name: c.circuit, d1: c.noms, d2: c.contacts, d3: c.ententes })), ...data.actionsPromotion.map(p => ({ ...p, name: p.activite, d1: p.objectifs, d2: p.taches, d3: p.cout }))]}
            keys={['name', 'd1', 'd2', 'd3']}
          />
        </View>
        {renderFooter()}
      </Page>

      {/* SECTION 8: TECHNIQUE & RH */}
      <Page size="A4" style={styles.page}>
        {renderHeader()}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Technique et Ressources Humaines</Text>
          
          <Text style={styles.subSectionTitle}>Cycle d'Approvisionnement & Normes</Text>
          <Table 
            headers={['Matière', 'Origine/Qté', 'Qté/Part', 'Cycle/Taux Perte']}
            data={[...data.supplyCycle.map(s => ({ ...s, d1: s.paysOrigine, d2: s.quantite, d3: s.cycleAppro })), ...data.productionNorms.map(n => ({ ...n, d1: n.quantite, d2: n.part, d3: n.tauxPerte }))]}
            keys={['matiere', 'd1', 'd2', 'd3']}
          />

          <Text style={styles.subSectionTitle}>Technologie & Capacité</Text>
          <Table 
            headers={['Techno/Composante', 'Dispo/Capacité', 'Avantages/Cycle Vie']}
            data={[...data.chosenTechnology.map(t => ({ ...t, name: t.technologie, d1: t.disponibilite, d2: t.avantagesInconvenients })), ...data.installedCapacity.map(c => ({ ...c, name: c.composante, d1: c.capaciteInstallee, d2: '-' }))]}
            keys={['name', 'd1', 'd2']}
          />

          <Text style={styles.subSectionTitle}>Qualité & Structure des Coûts</Text>
          <Table 
            headers={['Matière/Produit', 'Mécanismes/Unité', 'Structure Prix']}
            data={[...data.qualityMechanisms.map(q => ({ ...q, name: q.matiere, d1: q.mecanismes, d2: '-' })), ...data.unitCostStructure.map(u => ({ ...u, name: u.produit, d1: u.unite, d2: u.structurePrix }))]}
            keys={['name', 'd1', 'd2']}
          />

          <Text style={styles.subSectionTitle}>Personnel (Effectif Détaillé)</Text>
          <Table 
            headers={['Fonction', 'Nombre', 'Rémunération', 'Qualification', 'Catégorie']}
            data={[...data.personnelExistant, ...data.personnelNouveau, ...data.personnelGerant]}
            keys={['fonction', 'nombre', 'remuneration', 'qualification', 'categorie']}
          />
        </View>
        {renderFooter()}
      </Page>

      {/* SECTION 9 & 10: GARANTIES & ENVIRONNEMENT */}
      <Page size="A4" style={styles.page}>
        {renderHeader()}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Garanties Offertes</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}><Text style={styles.label}>Titre de Propriété</Text><Text style={styles.value}>{data.annexesGaranties.titrePropriete ? "Oui" : "Non"}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Rapport d'Expertise</Text><Text style={styles.value}>{data.annexesGaranties.rapportExpertise ? "Oui" : "Non"}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Photos du Site</Text><Text style={styles.value}>{data.annexesGaranties.photosSite ? "Oui" : "Non"}</Text></View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Évaluation Environnementale</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}><Text style={styles.label}>Certifié ISO</Text><Text style={styles.value}>{data.isoCertifie ? "Oui" : "Non"}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Assurance Incendie</Text><Text style={styles.value}>{data.assuranceIncendie ? "Oui" : "Non"}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Étude d'Impact</Text><Text style={styles.value}>{data.etudeImpactStatus}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Consultation Publique</Text><Text style={styles.value}>{data.consultationPubliqueStatus}</Text></View>
          </View>

          <Text style={styles.subSectionTitle}>Impacts Spécifiques</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}><Text style={styles.label}>Atmosphérique</Text><Text style={styles.value}>{data.impactAtmospherique.exists ? `Oui: ${data.impactAtmospherique.details} (Techno: ${data.impactAtmospherique.technologies})` : "Non"}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Effluents</Text><Text style={styles.value}>{data.impactEffluents.exists ? `Oui: ${data.impactEffluents.details} (Débit: ${data.impactEffluents.debit})` : "Non"}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Sonore</Text><Text style={styles.value}>{data.impactSonore.exists ? `Oui: ${data.impactSonore.niveau} (Normes: ${data.impactSonore.normes})` : "Non"}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Déchets</Text><Text style={styles.value}>{data.impactDechetsDangereux.exists ? `Oui: ${data.impactDechetsDangereux.substances}` : "Non"}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Faune/Flore</Text><Text style={styles.value}>{data.impactFauneFlore.exists ? `Oui: ${data.impactFauneFlore.nature}` : "Non"}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Social/Humain</Text><Text style={styles.value}>{data.impactSocialHumain.exists ? `Oui: ${data.impactSocialHumain.types.join(', ')}` : "Non"}</Text></View>
          </View>
        </View>
        {renderFooter()}
      </Page>

      {/* SECTION 11: DECLARATION */}
      <Page size="A4" style={styles.page}>
        {renderHeader()}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>11. Déclaration Finale</Text>
          <View style={{ padding: 15, borderWidth: 1, borderColor: '#e2e8f0', borderStyle: 'solid', backgroundColor: '#f8fafc' }}>
            <Text style={styles.textBlock}>
              Je, soussigné(e) {data.declarationNom || "____________________"}, agissant en qualité de {data.declarationFonction || "____________________"} pour le compte de l'entreprise {data.raisonSociale || "____________________"}, certifie sur l'honneur l'exactitude des informations fournies dans ce dossier.
            </Text>
            
            <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={styles.label}>Fait à</Text>
                <Text style={styles.value}>{data.declarationLieu || "____________________"}</Text>
              </View>
              <View>
                <Text style={styles.label}>Le</Text>
                <Text style={styles.value}>{data.declarationDate || "____________________"}</Text>
              </View>
            </View>

            <View style={{ marginTop: 30, alignItems: 'center' }}>
              <Text style={{ fontSize: 8, color: '#64748b', textTransform: 'uppercase' }}>Signature Électronique</Text>
              <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 5, color: '#0f172a' }}>{data.declarationNom || "SIGNATURE"}</Text>
              <Text style={{ fontSize: 7, color: '#94a3b8', marginTop: 2 }}>Document signé numériquement sur la plateforme FPI Crédit Digital</Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 40, padding: 10, backgroundColor: '#fef2f2', borderWidth: 1, borderColor: '#fee2e2', borderStyle: 'solid' }}>
          <Text style={{ fontSize: 8, color: '#991b1b', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 5 }}>Avertissement Légal</Text>
          <Text style={{ fontSize: 7, color: '#991b1b', lineHeight: 1.4 }}>
            Toute fausse déclaration ou usage de faux documents expose le demandeur au rejet de sa demande et à des poursuites judiciaires conformément au code pénal et à la réglementation du FPI.
          </Text>
        </View>
        {renderFooter()}
      </Page>
    </Document>
  );
};

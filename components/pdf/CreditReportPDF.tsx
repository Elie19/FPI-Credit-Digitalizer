
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { CreditFormData } from '../../types';

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#1a1a1a',
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#0f172a',
    borderBottomStyle: 'solid',
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0f172a',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 10,
    textAlign: 'center',
  },
  section: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
    backgroundColor: '#f1f5f9',
    padding: 8,
    marginBottom: 10,
    textTransform: 'uppercase',
    borderLeftWidth: 4,
    borderLeftColor: '#0f172a',
    borderLeftStyle: 'solid',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  gridItem: {
    width: '50%',
    padding: 5,
  },
  label: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#64748b',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  value: {
    fontSize: 10,
    color: '#0f172a',
    fontWeight: 'bold',
  },
  table: {
    marginTop: 10,
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
    padding: 6,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    borderBottomStyle: 'solid',
    padding: 6,
  },
  tableCell: {
    flex: 1,
    fontSize: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    textAlign: 'center',
    fontSize: 8,
    color: '#94a3b8',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    borderTopStyle: 'solid',
    paddingTop: 10,
  },
  coverPage: {
    padding: 80,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#0f172a',
    color: '#fff',
  },
  coverTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 2,
  },
  coverSubtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 60,
    textTransform: 'uppercase',
    letterSpacing: 4,
  },
  coverDossierBox: {
    borderWidth: 2,
    borderColor: '#fff',
    borderStyle: 'solid',
    padding: 20,
    marginBottom: 60,
  },
  coverDossier: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  coverCompany: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    textAlign: 'center',
  },
  coverDate: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 100,
  }
});

interface Props {
  data: CreditFormData;
}

export const CreditReportPDF: React.FC<Props> = ({ data }) => {
  return (
    <Document>
      {/* Page de Garde */}
      <Page size="A4" style={styles.coverPage}>
        <Text style={styles.coverSubtitle}>Dossier de Financement</Text>
        <Text style={styles.coverTitle}>RAPPORT DE DEMANDE DE CRÉDIT</Text>
        
        <View style={styles.coverDossierBox}>
          <Text style={styles.coverDossier}>N° {data.dossierNumber}</Text>
        </View>

        <Text style={styles.coverCompany}>{data.raisonSociale || "ENTREPRISE NON SPÉCIFIÉE"}</Text>
        <Text style={{ fontSize: 14, color: '#94a3b8', marginTop: 10 }}>{data.natureProjet || "PROJET NON SPÉCIFIÉ"}</Text>

        <Text style={styles.coverDate}>Soumis le : {data.submissionDate}</Text>
        
        <Text style={{ position: 'absolute', bottom: 40, fontSize: 10, color: '#475569' }}>
          Document Confidentiel - Plateforme Crédit Digital
        </Text>
      </Page>

      {/* Page 1: Identification & Entreprise */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Crédit Digital | Rapport Officiel</Text>
          <Text style={{ fontSize: 10 }}>Dossier: {data.dossierNumber}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Identification du Projet</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Nature du Projet</Text>
              <Text style={styles.value}>{data.natureProjet || "N/A"}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Montant Sollicité</Text>
              <Text style={styles.value}>{data.montantCredit} USD</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>But du Crédit</Text>
              <Text style={styles.value}>{data.butCredit}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Nationalité Promoteur</Text>
              <Text style={styles.value}>{data.nationalitePromoteur}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Informations sur l'Entreprise</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Raison Sociale</Text>
              <Text style={styles.value}>{data.raisonSociale || "N/A"}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Sigle</Text>
              <Text style={styles.value}>{data.sigle || "N/A"}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Forme Juridique</Text>
              <Text style={styles.value}>{data.formeJuridique || "N/A"}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Date de Création</Text>
              <Text style={styles.value}>{data.dateCreation || "N/A"}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Numéro RCCM</Text>
              <Text style={styles.value}>{data.numRCCM || "N/A"}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>ID Nationale</Text>
              <Text style={styles.value}>{data.numIDNat || "N/A"}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Numéro Impôt</Text>
              <Text style={styles.value}>{data.numImpot || "N/A"}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Capital Social</Text>
              <Text style={styles.value}>{data.montantCapitalSocial} {data.deviseCapital}</Text>
            </View>
          </View>
          
          <View style={{ marginTop: 10 }}>
            <Text style={styles.label}>Adresse Siège Social</Text>
            <Text style={styles.value}>{data.adresseSiegeSocial || "N/A"} ({data.natureLocauxSiege})</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Patrimoine et Moyens</Text>
          <Text style={{ fontSize: 9, color: '#64748b', marginBottom: 5 }}>Résumé des actifs déclarés :</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Terrains & Bâtiments</Text>
              <Text style={styles.value}>{data.terrainsBatiments.length} élément(s)</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Machines & Équipements</Text>
              <Text style={styles.value}>{data.machinesEquipements.length} élément(s)</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Stocks</Text>
              <Text style={styles.value}>{data.stocks.length} élément(s)</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Antécédents Financiers & Juridiques</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Déjà bénéficié d'un concours ?</Text>
              <Text style={styles.value}>{data.dejaBeneficieConcours ? "Oui" : "Non"}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Historique de faillite ?</Text>
              <Text style={styles.value}>{data.faillite ? "Oui" : "Non"}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Poursuites judiciaires ?</Text>
              <Text style={styles.value}>{data.poursuites ? "Oui" : "Non"}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Antécédents fiscaux ?</Text>
              <Text style={styles.value}>{data.antecedentsFiscaux ? "Oui" : "Non"}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
          `Page ${pageNumber} / ${totalPages} - Rapport de Crédit N° ${data.dossierNumber}`
        )} fixed />
      </Page>

      {/* Page 2: Personnel & Projet */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Crédit Digital | Rapport Officiel</Text>
          <Text style={{ fontSize: 10 }}>Dossier: {data.dossierNumber}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Personnel et Organisation</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Personnel Clé</Text>
              <Text style={styles.value}>{data.personnelCle.length} personne(s) listée(s)</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Recours à la Sous-traitance</Text>
              <Text style={styles.value}>{data.sousTraitance ? "Oui" : "Non"}</Text>
            </View>
          </View>
          {data.sousTraitance && (
            <View style={{ marginTop: 5 }}>
              <Text style={styles.label}>Détails Sous-traitance</Text>
              <Text style={styles.value}>{data.detailsSousTraitance}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Description du Projet</Text>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.label}>Historique et Justification</Text>
            <Text style={{ fontSize: 9, lineHeight: 1.4 }}>{data.projetHistorique || "Non renseigné"}</Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.label}>Motivation du Projet</Text>
            <Text style={{ fontSize: 9, lineHeight: 1.4 }}>{data.projetMotivation || "Non renseigné"}</Text>
          </View>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Localisation du Site</Text>
              <Text style={styles.value}>{data.localisationSite || "N/A"}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Nature des Locaux</Text>
              <Text style={styles.value}>{data.natureLocauxSite}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Marché et Stratégie</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Croissance du Marché</Text>
              <Text style={styles.value}>{data.croissanceMarche}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Perspectives d'Évolution</Text>
              <Text style={styles.value}>{data.perspectivesEvolution}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Avantage Géographique</Text>
              <Text style={styles.value}>{data.avantageGeographique}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Résilience Économique</Text>
              <Text style={styles.value}>{data.resilienceEconomique}</Text>
            </View>
          </View>
          <View style={{ marginTop: 5 }}>
            <Text style={styles.label}>Marchés Visés</Text>
            <Text style={styles.value}>{data.marchesVises || "Non renseigné"}</Text>
          </View>
        </View>

        <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
          `Page ${pageNumber} / ${totalPages} - Rapport de Crédit N° ${data.dossierNumber}`
        )} fixed />
      </Page>

      {/* Page 3: Technique & Environnement */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Crédit Digital | Rapport Officiel</Text>
          <Text style={{ fontSize: 10 }}>Dossier: {data.dossierNumber}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Technique et Production</Text>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.label}>Processus de Production</Text>
            <Text style={{ fontSize: 9, lineHeight: 1.4 }}>{data.processProduction || "Non renseigné"}</Text>
          </View>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Capacité Installée</Text>
              <Text style={styles.value}>{data.installedCapacity.length} ligne(s) déclarée(s)</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Permis Obtenus</Text>
              <Text style={styles.value}>{data.permisObtenus}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Garanties et Environnement</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Titre de Propriété</Text>
              <Text style={styles.value}>{data.annexesGaranties.titrePropriete ? "Fourni" : "Non fourni"}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Rapport d'Expertise</Text>
              <Text style={styles.value}>{data.annexesGaranties.rapportExpertise ? "Fourni" : "Non fourni"}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Certifié ISO (Export)</Text>
              <Text style={styles.value}>{data.isoCertifie ? "Oui" : "Non"}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Assurance Incendie</Text>
              <Text style={styles.value}>{data.assuranceIncendie ? "Oui" : "Non"}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Évaluation Environnementale</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Étude d'Impact (EIE)</Text>
              <Text style={styles.value}>{data.etudeImpactStatus}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Consultation Publique</Text>
              <Text style={styles.value}>{data.consultationPubliqueStatus}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Suivi Environnemental</Text>
              <Text style={styles.value}>{data.suiviEnvironnemental ? "Oui" : "Non"}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Frais de Dossier Payés</Text>
              <Text style={styles.value}>{data.fraisOuverturePayes ? "Oui" : "Non"}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
          `Page ${pageNumber} / ${totalPages} - Rapport de Crédit N° ${data.dossierNumber}`
        )} fixed />
      </Page>

      {/* Page 4: Déclaration */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Crédit Digital | Rapport Officiel</Text>
          <Text style={{ fontSize: 10 }}>Dossier: {data.dossierNumber}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>11. Déclaration Finale</Text>
          <View style={{ padding: 15, borderWidth: 1, borderColor: '#e2e8f0', borderStyle: 'solid', backgroundColor: '#f8fafc' }}>
            <Text style={{ fontSize: 10, lineHeight: 1.6, fontStyle: 'italic' }}>
              "Je, soussigné {data.declarationNom || "____________________"}, agissant au nom et pour le compte de l'entreprise {data.raisonSociale || "____________________"}, atteste par la présente que les informations contenues dans cette demande de financement sont exactes et sincères."
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
              <Text style={{ fontSize: 8, color: '#64748b', textTransform: 'uppercase' }}>Signature Numérique</Text>
              <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 5 }}>{data.declarationNom || "SIGNATURE"}</Text>
              <Text style={{ fontSize: 7, color: '#94a3b8', marginTop: 2 }}>Signé électroniquement via la plateforme Crédit Digital</Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 40, padding: 10, backgroundColor: '#fef2f2', borderWidth: 1, borderColor: '#fee2e2', borderStyle: 'solid' }}>
          <Text style={{ fontSize: 8, color: '#991b1b', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 5 }}>Avertissement Légal</Text>
          <Text style={{ fontSize: 7, color: '#991b1b', lineHeight: 1.4 }}>
            Toute fausse déclaration ou falsification de document peut entraîner le rejet immédiat de la demande et des poursuites judiciaires conformément à la réglementation en vigueur. Ce document est strictement confidentiel et destiné uniquement à l'instruction du dossier de crédit.
          </Text>
        </View>

        <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
          `Page ${pageNumber} / ${totalPages} - Rapport de Crédit N° ${data.dossierNumber}`
        )} fixed />
      </Page>
    </Document>
  );
};

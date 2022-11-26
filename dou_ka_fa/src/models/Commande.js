export default class Commande {
  constructor(
    id,
    dateCommande,
    dateVente,
    total,
    prixTotalPaye,
    prixPoint,
    pointUtilise,
    etat,
    clientId,
    qtePromotion,
    promotionId,
    lieuLivraison,
    statut
  ) {
    this.id = id;
    this.dateCommande = dateCommande;
    this.dateVente = dateVente;
    this.total = total;
    this.prixTotalPaye = prixTotalPaye;
    this.prixPoint = prixPoint;
    this.pointUtilise = pointUtilise;
    this.etat = etat;
    this.clientId = clientId;
    this.qtePromotion = qtePromotion;
    this.promotionId = promotionId;
    this.lieuLivraison = lieuLivraison;
    this.statut = statut;
  }
}

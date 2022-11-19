export default class LignePromotion {
  constructor(ligne) {
    this.id = ligne.id;
    this.qte = ligne.qte;
    this.promotionId = ligne.promotionId;
    this.articleId = ligne.articleId;
  }
}

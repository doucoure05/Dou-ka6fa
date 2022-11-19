export default class LigneCommande {
  constructor(params) {
    this.id = params.id;
    this.qte = params.qte;
    this.articleId = params.articleId;
    this.commandeId = params.commandeId;
  }
}

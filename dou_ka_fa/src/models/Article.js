export default class Article {
  constructor(id, nom, description, qteJour, prix, photo, point, categorieId) {
    this.id = id;
    this.nom = nom;
    this.description = description;
    this.qteJour = qteJour;
    this.prix = prix;
    this.photo = photo;
    this.point = point;
    this.categorieId = categorieId;
  }
}

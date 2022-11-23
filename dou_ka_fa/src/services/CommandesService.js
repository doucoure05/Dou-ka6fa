import axios from "axios";

export const getCommandes = async () => {
  const response = await axios.get("http://localhost:5000/commandes");

  return response.data;
};

export const getVentes = async () => {
  const response = await axios.get("http://localhost:5000/ventes");

  return response.data;
};

//Methode que je pourrais utiliser si j'utilisa le format DATEONLY dans le model controller du server
function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export const createCommande = async (commande) => {
  try {
    const response = await axios.post("http://localhost:5000/commande", {
      total: commande.total,
      clientId: commande.clientId === 0 ? null : commande.clientId,
      dateCommande: Date.now(),
      promotionId: commande.promotionId,
      qtePromotion: commande.qtePromotion,
      // dateCommande: formatDate(Date.now()),
      // qteJour: article.qteJour,
      // prix: article.prix,
      // photo: article.photo,
      // point: article.point,
      // categorieId: article.categorieId,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createLigneCommande = async (ligneCommande) => {
  try {
    const response = await axios.post("http://localhost:5000/ligneCommande", {
      qte: ligneCommande.qte,
      articleId: ligneCommande.articleId,
      commandeId: ligneCommande.commandeId,
      // total: commande.total,
      // clientId: commande.clientId,
      // dateCommande: Date.now(),
      // qteJour: article.qteJour,
      // prix: article.prix,
      // photo: article.photo,
      // point: article.point,
      // categorieId: article.categorieId,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getLigneCommandeByCommande = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/ligneCommandeByCommand/${id}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const annulerCommande = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/annulerCommande/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateCommandeToVente = async (commande) => {
  try {
    const response = await axios.patch(
      `http://localhost:5000/commandeToVente/${commande.id}`,
      {
        dateVente: Date.now(),
        prixTotalPaye: commande.prixTotalPaye,
        prixPoint: commande.prixPoint,
        pointUtilise: commande.pointUtilise,
        etat: 1,
        clientId: commande.clientId,
        // dateCommande: formatDate(Date.now()),
        // qteJour: article.qteJour,
        // prix: article.prix,
        // photo: article.photo,
        // point: article.point,
        // categorieId: article.categorieId,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

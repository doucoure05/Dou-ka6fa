import Commande from "../models/Commande.js";
import LigneCommande from "../models/LigneCommande.js";

import Client from "../models/Client.js";
import Article from "../models/Article.js";

export const getClientFidele = async (req, res) => {
  try {
    const response = await Client.findAll({
      order: [["point", "DESC"]],
      limit: 10,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
export const getMenuPlusVendu = async (req, res) => {
  try {
    //   const response = await Commande.findAll({
    //     where: {
    //       etat: 0,
    //     },
    //   });
    //   res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
export const getVentesPeriod = async (req, res) => {
  try {
    //   const response = await Commande.findAll({
    //     where: {
    //       etat: 0,
    //     },
    //   });
    //   res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
export const getMenuPlusVenduPeriod = async (req, res) => {
  try {
    //   const response = await Commande.findAll({
    //     where: {
    //       etat: 0,
    //     },
    //   });
    //   res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

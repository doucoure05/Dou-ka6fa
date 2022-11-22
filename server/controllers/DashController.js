import Commande from "../models/Commande.js";
import LigneCommande from "../models/LigneCommande.js";

import Client from "../models/Client.js";
import Article from "../models/Article.js";
import { Sequelize } from "sequelize";

const sequelize = Sequelize;

export const getClientFidele = async (req, res) => {
  try {
    const response = await Client.findAll({
      where: {
        point: {
          [sequelize.Op.gt]: 0,
        },
      },
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
    const response = await LigneCommande.findAll({
      attributes: [
        "articleId",
        [sequelize.fn("sum", sequelize.col("qte")), "qte"],
      ],
      group: ["articleId"],
      raw: true,
      order: [["qte", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
export const getVentesPeriod = async (req, res) => {
  try {
    let dateMinDay = new Date();
    dateMinDay.setMilliseconds(0);
    dateMinDay.setSeconds(0);
    dateMinDay.setMinutes(0);
    dateMinDay.setHours(0);

    let dateMaxDay = new Date();
    dateMaxDay.setMilliseconds(999);
    dateMaxDay.setSeconds(59);
    dateMaxDay.setMinutes(59);
    dateMaxDay.setHours(23);
    const response1 = await Commande.findAll({
      where: {
        etat: 1,
        dateVente: {
          [sequelize.Op.gt]: dateMinDay,
          [sequelize.Op.lt]: dateMaxDay,
        },
      },
    });

    let dateMinMonth = new Date();
    dateMinMonth.setMilliseconds(0);
    dateMinMonth.setSeconds(0);
    dateMinMonth.setMinutes(0);
    dateMinMonth.setHours(0);
    dateMinMonth.setDate(1);

    let dateMaxMonth = new Date();
    dateMaxMonth.setMilliseconds(0);
    dateMaxMonth.setSeconds(0);
    dateMaxMonth.setMinutes(0);
    dateMaxMonth.setHours(0);
    dateMaxMonth.setDate(1);
    dateMaxMonth.setMonth(dateMaxMonth.getMonth() + 1);

    const response2 = await Commande.findAll({
      where: {
        etat: 1,
        dateVente: {
          [sequelize.Op.gt]: dateMinMonth,
          [sequelize.Op.lt]: dateMaxMonth,
        },
      },
    });

    res.status(200).json({ j: response1.length, m: response2.length });
  } catch (error) {
    console.log(error.message);
  }
};
export const getMenuPlusVenduPeriodJ = async (req, res) => {
  try {
    let dateMinDay = new Date();
    dateMinDay.setMilliseconds(0);
    dateMinDay.setSeconds(0);
    dateMinDay.setMinutes(0);
    dateMinDay.setHours(0);

    let dateMaxDay = new Date();
    dateMaxDay.setMilliseconds(999);
    dateMaxDay.setSeconds(59);
    dateMaxDay.setMinutes(59);
    dateMaxDay.setHours(23);
    const commandesJ = await Commande.findAll({
      where: {
        etat: 1,
        dateVente: {
          [sequelize.Op.gt]: dateMinDay,
          [sequelize.Op.lt]: dateMaxDay,
        },
      },
    });
    let sommeJ = 0;
    if (commandesJ.length > 0) {
      commandesJ.forEach(async (element) => {
        await LigneCommande.findAll({
          where: {
            commandeId: element.id,
          },
        }).then((val) => {
          val.forEach((ligne) => {
            sommeJ += ligne.qte;
          });
          res.status(200).json({ j: sommeJ });
        });
      });
    } else {
      res.status(200).json({ j: sommeJ });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getMenuPlusVenduPeriodM = async (req, res) => {
  try {
    let dateMinMonth = new Date();
    dateMinMonth.setMilliseconds(0);
    dateMinMonth.setSeconds(0);
    dateMinMonth.setMinutes(0);
    dateMinMonth.setHours(0);
    dateMinMonth.setDate(1);

    let dateMaxMonth = new Date();
    dateMaxMonth.setMilliseconds(0);
    dateMaxMonth.setSeconds(0);
    dateMaxMonth.setMinutes(0);
    dateMaxMonth.setHours(0);
    dateMaxMonth.setDate(1);
    dateMaxMonth.setMonth(dateMaxMonth.getMonth() + 1);

    const commandesM = await Commande.findAll({
      where: {
        etat: 1,
        dateVente: {
          [sequelize.Op.gt]: dateMinMonth,
          [sequelize.Op.lt]: dateMaxMonth,
        },
      },
    });
    let sommeM = 0;
    if (commandesM.length > 0) {
      commandesM.forEach(async (element) => {
        await LigneCommande.findAll({
          where: {
            commandeId: element.id,
          },
        }).then((val) => {
          val.forEach((ligne) => {
            sommeM += ligne.qte;
          });
          res.status(200).json({ m: sommeM });
        });
      });
    } else {
      res.status(200).json({ m: sommeM });
    }
  } catch (error) {
    console.log(error.message);
  }
};

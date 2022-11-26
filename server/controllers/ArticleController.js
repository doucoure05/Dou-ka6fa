import { Sequelize } from "sequelize";
import Article from "../models/Article.js";
import Commande from "../models/Commande.js";
import LigneCommande from "../models/LigneCommande.js";

const sequelize = Sequelize;

export const getArticle = async (req, res) => {
  try {
    const response = await Article.findAll({
      order: [["nom", "ASC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getArticleById = async (req, res) => {
  try {
    const response = await Article.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createArticle = async (req, res) => {
  try {
    await Article.create(req.body);
    res.status(201).json({ msg: "success" });
  } catch (error) {
    console.log(error.message);
    res.status(201).json({ msg: "error" });
  }
};

export const updateArticle = async (req, res) => {
  try {
    await Article.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "success" });
  } catch (error) {
    console.log(error.message);
    res.status(201).json({ msg: "error" });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    await Article.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "success" });
  } catch (error) {
    console.log(error.message);
    res.status(201).json({ msg: "error" });
  }
};

export const articleVenduToday = async (req, res) => {
  try {
    let dateMin = new Date();
    dateMin.setMilliseconds(0);
    dateMin.setSeconds(0);
    dateMin.setMinutes(0);
    dateMin.setHours(0);

    let dateMax = new Date();
    dateMax.setMilliseconds(999);
    dateMax.setSeconds(59);
    dateMax.setMinutes(59);
    dateMax.setHours(23);

    const commandesJ = await Commande.findAll({
      where: {
        etat: 1,
        dateCommande: {
          [sequelize.Op.gt]: dateMin,
          [sequelize.Op.lt]: dateMax,
        },
      },
    });
    let liste = [];
    if (commandesJ.length > 0) {
      for (const element of commandesJ) {
        await LigneCommande.findAll({
          where: {
            commandeId: element.id,
          },
        }).then((val) => {
          val.forEach((ligne) => {
            liste.push(ligne);
          });
        });
      }
      res.status(200).json({ list: liste });
    } else {
      res.status(200).json({ list: liste });
    }
  } catch (error) {
    console.log(error.message);
  }
};

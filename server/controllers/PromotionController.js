import Promotion from "../models/Promotion.js";
import LignePromotion from "../models/LignePromotion.js";
import { Sequelize } from "sequelize";
import Commande from "../models/Commande.js";
const Op = Sequelize.Op;

export const getPromotion = async (req, res) => {
  try {
    const response = await Promotion.findAll({
      order: [["datePromotion", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getPromotionById = async (req, res) => {
  try {
    const response = await Promotion.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createPromotion = async (req, res) => {
  try {
    await Promotion.create(req.body);
    res.status(201).json({ msg: "Promotion created" });
  } catch (error) {
    console.log(error.message);
    res.status(201).json({ msg: "Failed to create Promotion" });
  }
};

export const updatePromotion = async (req, res) => {
  try {
    await Promotion.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Promotion Updated" });
  } catch (error) {
    console.log(error.message);
    res.status(201).json({ msg: "Failed to updated Promotion" });
  }
};

export const deletePromotion = async (req, res) => {
  try {
    await Promotion.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Promotion deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(201).json({ msg: "Failed to deleted Promotion" });
  }
};

export const createMenuJour = async (req, res) => {
  try {
    await Promotion.create(req.body.menu).then(async (menu) => {
      req.body.lignes.forEach(async (ligne) => {
        ligne.promotionId = menu.id;
        await LignePromotion.create(ligne);
      });
      res.status(201).json({ msg: "success" });
      // await LignePromotion.create
    });
  } catch (error) {
    console.log(error.message);
    res.status(201).json({ msg: "Failed to create Promotion" });
  }
};

export const updateMenuJour = async (req, res) => {
  console.log(req.params);
  try {
    await Promotion.update(req.body.menu, {
      where: {
        id: req.params.id,
      },
    }).then(async (reussi) => {
      LignePromotion.destroy({
        where: {
          promotionId: req.params.id,
        },
      }).then((li) => {
        req.body.lignes.forEach(async (ligne) => {
          ligne.promotionId = req.params.id;
          await LignePromotion.create(ligne);
        });
      });

      res.status(201).json({ msg: "success" });
      // await LignePromotion.create
    });
  } catch (error) {
    console.log(error.message);
    res.status(201).json({ msg: "Failed to create Promotion" });
  }
};

export const getLigneByMenu = async (req, res) => {
  try {
    const response = await LignePromotion.findAll({
      where: {
        promotionId: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getTodayMenu = async (req, res) => {
  /*
    Methode qui recupère  le menu du jour d'aujourdh'ui
  */
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
    await Promotion.findOne({
      where: {
        datePromotion: {
          [Op.gt]: dateMin,
          [Op.lt]: dateMax,
        },
      },
    }).then(async (menuJour) => {
      if (menuJour) {
        await LignePromotion.findAll({
          where: {
            promotionId: menuJour.id,
          },
        }).then(async (lignes) => {
          await Commande.findAll({
            where: {
              promotionId: menuJour.id,
            },
          }).then((list) => {
            console.log("succes");
            list.length > 0
              ? res
                  .status(200)
                  .json({ menuJour: menuJour, lignes: lignes, isUsed: true })
              : res
                  .status(200)
                  .json({ menuJour: menuJour, lignes: lignes, isUsed: false });
          });
        });
      } else {
        res.status(200).json({ menuJour: null, lignes: [], isUsed: false });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteMenuJour = async (req, res) => {
  try {
    await LignePromotion.destroy({
      where: {
        promotionId: req.params.id,
      },
    }).then(async (success) => {
      await Promotion.destroy({
        where: {
          id: req.params.id,
        },
      });
    });
    res.status(200).json({ msg: "success" });
  } catch (error) {
    console.log(error.message);
    res.status(201).json({ msg: "error" });
  }
};

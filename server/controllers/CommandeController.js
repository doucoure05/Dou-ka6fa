import Commande from "../models/Commande.js";
import LigneCommande from "../models/LigneCommande.js";

import Client from "../models/Client.js";
import Article from "../models/Article.js";
import Seuil from "../models/Seuil.js";

export const getCommande = async (req, res) => {
  try {
    const response = await Commande.findAll({
      where: {
        etat: 0,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getVentes = async (req, res) => {
  try {
    const response = await Commande.findAll({
      where: {
        etat: 1,
      },
      order: [["dateVente", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getCommandeById = async (req, res) => {
  try {
    const response = await Commande.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createCommande = async (req, res) => {
  try {
    const comm = await (await Commande.create(req.body)).dataValues;
    // console.log("***********SERVER***********");
    // console.log(comm);
    res.status(201).json(comm);
  } catch (error) {
    console.log(error.message);
  }
};
export const createLigneCommande = async (req, res) => {
  try {
    const comm = await (await LigneCommande.create(req.body)).dataValues;
    // console.log("***********SERVER***********");
    // console.log(comm);
    res.status(201).json(comm);
  } catch (error) {
    console.log(error.message);
  }
};
export const getLigneByCommande = async (req, res) => {
  try {
    const response = await LigneCommande.findAll({
      where: {
        commandeId: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const annulerCommande = async (req, res) => {
  try {
    await LigneCommande.destroy({
      where: {
        commandeId: Number(req.params.id),
      },
    }).then(async () => {
      await Commande.destroy({
        where: {
          id: req.params.id,
        },
      }).then(() => {
        res.status(200).json({ msg: "success" });
      });
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateCommandeToVente = async (req, res) => {
  try {
    console.log(req.params.id);
    const comm = await Commande.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    console.log("**************************");
    console.log(req.body.pointUtilise != null);
    if (req.body.pointUtilise != null) {
      //On a le point qui est utilisé
      await initClientPoints(req.body.clientId);
    }
    await increaseClientPoints(req.params.id);
    res.status(200).json({ msg: "success" });
  } catch (error) {
    console.log(error.message);
    res.status(201).json({ msg: "error" });
  }
};

async function increaseClientPoints(commandeId) {
  try {
    await Commande.findOne({
      where: {
        id: commandeId,
      },
    }).then(async (commande) => {
      await Client.findOne({
        where: {
          id: commande.clientId,
        },
      }).then(async (client) => {
        if (client != null)
          await LigneCommande.findAll({
            where: {
              commandeId: commandeId,
            },
          }).then(async (listLigneCommande) => {
            listLigneCommande.forEach(async (ligne) => {
              await Article.findOne({
                where: {
                  id: ligne.articleId,
                },
              }).then(async (article) => {
                await Client.update(
                  {
                    point:
                      Number(client.point) +
                      Number(article.point) * Number(ligne.qte),
                  },
                  {
                    where: {
                      id: client.id,
                    },
                  }
                ).then(async (response) => {
                  await Client.findOne({
                    where: {
                      id: commande.clientId,
                    },
                  }).then(async (client2) => {
                    await Seuil.findAll().then(async (seuils) => {
                      if (seuils.length > 0) {
                        if (client2.point >= seuils[0].point) {
                          await Client.update(
                            {
                              point: seuils[0].point,
                            },
                            {
                              where: {
                                id: client2.id,
                              },
                            }
                          );
                        }
                      } else {
                        //on met l'ancien point du client
                        await Client.update(
                          {
                            point: client.point,
                          },
                          {
                            where: {
                              id: client2.id,
                            },
                          }
                        );
                      }
                    });
                  });
                });
              });
            });
          });
      });
    });
  } catch (error) {
    console.log(error);
  }
}

async function initClientPoints(clientId) {
  await Client.update(
    {
      point: 0,
    },
    {
      where: {
        id: clientId,
      },
    }
  );
}

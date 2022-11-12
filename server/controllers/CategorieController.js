import Categorie from "../models/Categorie.js";

export const getCategorie = async (req, res) => {
  try {
    const response = await Categorie.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getCategorieById = async (req, res) => {
  try {
    const response = await Categorie.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createCategorie = async (req, res) => {
  try {
    await Categorie.create(req.body);
    res.status(201).json({ msg: "success" });
  } catch (error) {
    console.log(error.message);
    res.status(201).json({ msg: "error" });
  }
};

export const updateCategorie = async (req, res) => {
  try {
    await Categorie.update(req.body, {
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

export const deleteCategorie = async (req, res) => {
  try {
    await Categorie.destroy({
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

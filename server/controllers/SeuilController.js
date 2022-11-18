import Seuil from "../models/Seuil.js";

export const getSeuil = async (req, res) => {
  try {
    const response = await Seuil.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createSeuil = async (req, res) => {
  try {
    await Seuil.create(req.body);
    res.status(201).json({ msg: "success" });
  } catch (error) {
    console.log(error.message);
    res.status(201).json({ msg: "error" });
  }
};

export const updateSeuil = async (req, res) => {
  try {
    await Seuil.update(req.body, {
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

export const deleteSeuil = async (req, res) => {
  try {
    await Seuil.destroy({
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

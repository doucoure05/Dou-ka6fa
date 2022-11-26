import Client from "../models/Client.js";

export const getClient = async (req, res) => {
  try {
    const response = await Client.findAll({
      order: [["point", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getClientById = async (req, res) => {
  try {
    const response = await Client.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createClient = async (req, res) => {
  try {
    await Client.create(req.body);
    res.status(201).json({ msg: "success" });
  } catch (error) {
    console.log(error.message);
    res.status(201).json({ msg: "error" });
  }
};

export const updateClient = async (req, res) => {
  try {
    await Client.update(req.body, {
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

export const deleteClient = async (req, res) => {
  try {
    await Client.destroy({
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

export const createAndReturnClient = async (req, res) => {
  try {
    const comm = await (await Client.create(req.body)).dataValues;
    res.status(201).json(comm);
  } catch (error) {
    console.log(error.message);
    res.status(201).json({ msg: "error" });
  }
};

import User from "../models/UserModel.js";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createUser = async (req, res) => {
  try {
    const response = await User.findAll({
      where: {
        login: req.body.login,
      },
    });
    if (response.length > 0) {
      res.status(200).json({ msg: "loginExist" });
    } else {
      await User.create(req.body);
      res.status(200).json({ msg: "success" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(200).json({ msg: "error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "success" });
  } catch (error) {
    console.log(error.message);
    res.status(200).json({ msg: "error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "success" });
  } catch (error) {
    console.log(error.message);
    res.status(200).json({ msg: "error" });
  }
};

export const getUsserByLoginAndPassword = async (req, res) => {
  try {
    // console.log(req.body);
    const response = await User.findOne({
      where: {
        login: req.body.login,
        password: req.body.password,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

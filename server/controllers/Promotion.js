import Promotion from '../models/Promotion.js';

export const getPromotion = async (req, res) => {
    try {
        const response = await Promotion.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getPromotionById = async (req, res) => {
    try {
        const response = await Promotion.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createPromotion = async (req, res) => {
    try {
        await Promotion.create(req.body);
        res.status(201).json({ msg: "Promotion created" });
    } catch (error) {
        console.log(error.message);
        res.status(201).json({ msg: "Failed to create Promotion" });
    }
}

export const updatePromotion = async (req, res) => {
    try {
        await Promotion.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Promotion Updated" });
    } catch (error) {
        console.log(error.message);
        res.status(201).json({ msg: "Failed to updated Promotion" });
    }
}

export const deletePromotion = async (req, res) => {
    try {
        await Promotion.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Promotion deleted" });
    } catch (error) {
        console.log(error.message);
        res.status(201).json({ msg: "Failed to deleted Promotion" });
    }
}
import LignePromotion from '../models/LignePromotion';

export const getLignePromotion = async (req, res) => {
    try {
        const response = await LignePromotion.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getLignePromotionById = async (req, res) => {
    try {
        const response = await LignePromotion.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createLignePromotion = async (req, res) => {
    try {
        await LignePromotion.create(req.body);       
        res.status(201).json({msg: "LignePromotion created"});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateLignePromotion = async (req, res) => {
    try {
        await LignePromotion.update(req.body, {
            where:{
                id: req.params.id
            }
        });       
        res.status(200).json({msg: "LignePromotion Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteLignePromotion = async (req, res) => {
    try {
        await LignePromotion.destroy({
            where:{
                id: req.params.id
            }
        });         
        res.status(200).json({msg: "LignePromotion deleted"});    
    } catch (error) {
        console.log(error.message);
    }
}
import LigneCommande from '../models/LigneCommande';

export const getLigneCommande = async (req, res) => {
    try {
        const response = await LigneCommande.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getLigneCommandeById = async (req, res) => {
    try {
        const response = await LigneCommande.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createLigneCommande = async (req, res) => {
    try {
        await LigneCommande.create(req.body);       
        res.status(201).json({msg: "LigneCommande created"});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateLigneCommande = async (req, res) => {
    try {
        await LigneCommande.update(req.body, {
            where:{
                id: req.params.id
            }
        });       
        res.status(200).json({msg: "LigneCommande Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteLigneCommande = async (req, res) => {
    try {
        await LigneCommande.destroy({
            where:{
                id: req.params.id
            }
        });         
        res.status(200).json({msg: "LigneCommande deleted"});    
    } catch (error) {
        console.log(error.message);
    }
}
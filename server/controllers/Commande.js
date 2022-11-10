import Commande from '../models/Commande';

export const getCommande = async (req, res) => {
    try {
        const response = await Commande.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getCommandeById = async (req, res) => {
    try {
        const response = await Commande.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createCommande = async (req, res) => {
    try {
        await Commande.create(req.body);       
        res.status(201).json({msg: "Commande created"});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateCommande = async (req, res) => {
    try {
        await Commande.update(req.body, {
            where:{
                id: req.params.id
            }
        });       
        res.status(200).json({msg: "Commande Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteCommande = async (req, res) => {
    try {
        await Commande.destroy({
            where:{
                id: req.params.id
            }
        });         
        res.status(200).json({msg: "Commande deleted"});    
    } catch (error) {
        console.log(error.message);
    }
}
import Categorie from '../models/Categorie';

export const getCategorie = async (req, res) => {
    try {
        const response = await Categorie.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getCategorieById = async (req, res) => {
    try {
        const response = await Categorie.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createCategorie = async (req, res) => {
    try {
        await Categorie.create(req.body);       
        res.status(201).json({msg: "Categorie created"});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateCategorie = async (req, res) => {
    try {
        await Categorie.update(req.body, {
            where:{
                id: req.params.id
            }
        });       
        res.status(200).json({msg: "Categorie Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteCategorie = async (req, res) => {
    try {
        await Categorie.destroy({
            where:{
                id: req.params.id
            }
        });         
        res.status(200).json({msg: "Categorie deleted"});    
    } catch (error) {
        console.log(error.message);
    }
}
import Params from '../models/Params';

export const getParams = async (req, res) => {
    try {
        const response = await Params.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getParamsById = async (req, res) => {
    try {
        const response = await Params.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createParams = async (req, res) => {
    try {
        await Params.create(req.body);       
        res.status(201).json({msg: "Params created"});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateParams = async (req, res) => {
    try {
        await Params.update(req.body, {
            where:{
                id: req.params.id
            }
        });       
        res.status(200).json({msg: "Params Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteParams = async (req, res) => {
    try {
        await Params.destroy({
            where:{
                id: req.params.id
            }
        });         
        res.status(200).json({msg: "Params deleted"});    
    } catch (error) {
        console.log(error.message);
    }
}
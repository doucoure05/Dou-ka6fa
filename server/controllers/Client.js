import Client from '../models/Client';

export const getClient = async (req, res) => {
    try {
        const response = await Client.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getClientById = async (req, res) => {
    try {
        const response = await Client.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createClient = async (req, res) => {
    try {
        await Client.create(req.body);       
        res.status(201).json({msg: "Client created"});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateClient = async (req, res) => {
    try {
        await Client.update(req.body, {
            where:{
                id: req.params.id
            }
        });       
        res.status(200).json({msg: "Client Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteClient = async (req, res) => {
    try {
        await Client.destroy({
            where:{
                id: req.params.id
            }
        });         
        res.status(200).json({msg: "Client deleted"});    
    } catch (error) {
        console.log(error.message);
    }
}
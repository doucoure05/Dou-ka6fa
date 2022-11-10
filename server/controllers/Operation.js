import Operation from '../models/Operation';

export const getOperation = async (req, res) => {
    try {
        const response = await Operation.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getOperationById = async (req, res) => {
    try {
        const response = await Operation.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createOperation = async (req, res) => {
    try {
        await Operation.create(req.body);       
        res.status(201).json({msg: "Operation created"});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateOperation = async (req, res) => {
    try {
        await Operation.update(req.body, {
            where:{
                id: req.params.id
            }
        });       
        res.status(200).json({msg: "Operation Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteOperation = async (req, res) => {
    try {
        await Operation.destroy({
            where:{
                id: req.params.id
            }
        });         
        res.status(200).json({msg: "Operation deleted"});    
    } catch (error) {
        console.log(error.message);
    }
}
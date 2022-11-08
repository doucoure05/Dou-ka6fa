import Article from '../models/Article';

export const getArticle = async (req, res) => {
    try {
        const response = await Article.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getArticleById = async (req, res) => {
    try {
        const response = await Article.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createArticle = async (req, res) => {
    try {
        await Article.create(req.body);       
        res.status(201).json({msg: "Article created"});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateArticle = async (req, res) => {
    try {
        await Article.update(req.body, {
            where:{
                id: req.params.id
            }
        });       
        res.status(200).json({msg: "Article Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteArticle = async (req, res) => {
    try {
        await Article.destroy({
            where:{
                id: req.params.id
            }
        });         
        res.status(200).json({msg: "Article deleted"});    
    } catch (error) {
        console.log(error.message);
    }
}
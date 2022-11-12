import axios from "axios";

export const getArticle = async () => {
  const response = await axios.get("http://localhost:5000/articles");

  return response.data;
};

export const deleteArticle = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:5000/article/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateArticle = async (article) => {
  try {
    const response = await axios.patch(
      `http://localhost:5000/article/${article.id}`,
      {
        nom: article.nom,
        description: article.description,
        qteJour: article.qteJour,
        prix: article.prix,
        photo: article.photo,
        point: article.point,
        categorieId: article.categorieId,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const saveArticle = async (article) => {
  try {
    const response = await axios.post("http://localhost:5000/article", {
      nom: article.nom,
      description: article.description,
      qteJour: article.qteJour,
      prix: article.prix,
      photo: article.photo,
      point: article.point,
      categorieId: article.categorieId,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

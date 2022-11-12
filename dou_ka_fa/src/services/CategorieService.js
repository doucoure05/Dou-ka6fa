import axios from "axios";

export const getCategorie = async () => {
  const response = await axios.get("http://localhost:5000/categories");

  return response.data;
};

export const getCategorieById = async (id) => {
  const response = await axios.get(`http://localhost:5000/categorie/${id}`);

  return response.data;
};

export const deleteCategorie = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/categorie/${id}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateCategorie = async (categorie) => {
  try {
    const response = await axios.patch(
      `http://localhost:5000/categorie/${categorie.id}`,
      {
        nom: categorie.nom,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const saveCategorie = async (categorie) => {
  // console.log("I'm Called");
  try {
    const response = await axios.post("http://localhost:5000/categorie", {
      nom: categorie.nom,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

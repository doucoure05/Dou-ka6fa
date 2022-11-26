import axios from "axios";

export const getClient = async () => {
  const response = await axios.get("http://localhost:5000/clients");

  return response.data;
};

export const deleteClient = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:5000/client/${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateClient = async (client) => {
  try {
    const response = await axios.patch(
      `http://localhost:5000/client/${client.id}`,
      {
        nom: client.nom,
        prenom: client.prenom,
        telephone: client.telephone,
        adresse: client.adresse,
        point: client.point,
        photo: client.photo,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const saveClient = async (client) => {
  try {
    const response = await axios.post("http://localhost:5000/client", {
      nom: client.nom,
      prenom: client.prenom,
      telephone: client.telephone,
      adresse: client.adresse,
      point: client.point,
      photo: client.photo,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const saveAndReturnClient = async (client) => {
  try {
    const response = await axios.post("http://localhost:5000/clientR", {
      nom: client.nom,
      prenom: client.prenom,
      telephone: client.telephone,
      adresse: client.adresse,
      point: client.point,
      photo: client.photo,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

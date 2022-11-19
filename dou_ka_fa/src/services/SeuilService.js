import axios from "axios";

export const getSeuil = async () => {
  const response = await axios.get("http://localhost:5000/seuils");

  return response.data;
};

export const updateSeuil = async (seuil) => {
  try {
    const response = await axios.patch(
      `http://localhost:5000/seuil/${seuil.id}`,
      {
        point: seuil.point,
        montant: seuil.montant,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const saveSeuil = async (seuil) => {
  // console.log("I'm Called");
  try {
    const response = await axios.post("http://localhost:5000/seuil", {
      point: seuil.point,
      montant: seuil.montant,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteSeuil = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:5000/seuil/${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

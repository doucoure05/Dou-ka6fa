import axios from "axios";

export const getPromotion = async () => {
  const response = await axios.get("http://localhost:5000/promotions");

  return response.data;
};

export const deletePromotion = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/promotion/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updatePromotion = async (promotion) => {
  try {
    const response = await axios.patch(
      `http://localhost:5000/promotion/${promotion.id}`,
      {
        prixPromotion: promotion.prixPromotion,
        datePromotion: promotion.datePromotion,
        libelle: promotion.libelle,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const savePromotion = async (promotion) => {
  try {
    const response = await axios.post("http://localhost:5000/promotion", {
      prixPromotion: promotion.prixPromotion,
      datePromotion: promotion.datePromotion,
      libelle: promotion.libelle,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const saveMenu = async (menu, ligne) => {
  try {
    const response = await axios.post("http://localhost:5000/menuJour", {
      menu: {
        prixPromotion: menu.prixPromotion,
        datePromotion: Date.now(),
        libelle: menu.libelle,
      },
      lignes: ligne,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateMenu = async (menu, ligne) => {
  try {
    const response = await axios.patch(
      `http://localhost:5000/menuJour/${menu.id}`,
      {
        menu: {
          prixPromotion: menu.prixPromotion,
          libelle: menu.libelle,
        },
        lignes: ligne,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getLigneByMenuJour = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/ligneMenuJour/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getTodayMenu = async () => {
  const response = await axios.get("http://localhost:5000/todayMenuJour");

  return response.data;
};

export const deleteMenuJour = async (menu) => {
  const response = await axios.delete(
    `http://localhost:5000/deleteMenu/${menu.id}`
  );

  return response.data;
};

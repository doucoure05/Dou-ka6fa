import axios from "axios";

export const getPromotion = async () => {
    const response = await axios.get("http://localhost:5000/promotions");

    return response.data;
};

export const deletePromotion = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5000/promotion/${id}`);
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

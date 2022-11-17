import axios from "axios";

export const getLignePromotion = async () => {
    const response = await axios.get("http://localhost:5000/LignePromotions");

    return response.data;
};

export const deleteLignePromotion = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5000/LignePromotion/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}; 

export const deleteLignePromotionAttachToPromo = async (promotionId) => {
    try {
        const response = await axios.delete(`http://localhost:5000/deleteLignePromotionAttachToPromo/${promotionId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const updateLignePromotion = async (LignePromotion) => {
    try {
        const response = await axios.patch(
            `http://localhost:5000/LignePromotion/${LignePromotion.id}`,
            {
                qte: LignePromotion.qte ,
                promotionId: LignePromotion.promotionId ,
                articleId: LignePromotion.articleId,
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const saveLignePromotion = async (LignePromotion) => {
    try {
        // console.log("LignePromotion service: ", LignePromotion);
        const response = await axios.post("http://localhost:5000/LignePromotion", {
            qte: LignePromotion.qte,
            promotionId: LignePromotion.promotionId,
            articleId: LignePromotion.articleId,
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

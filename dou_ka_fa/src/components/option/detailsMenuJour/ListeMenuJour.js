import React, { Component } from 'react';
import DetailsMenuJourModal from "./DetailsMenuJourModal";
import * as service from "../../../services/PromotionService";
import Promotion from "../../../models/Promotion";
import LignePromotionModal from "../../promotions-LignePromotion/promotion/LignePromotionModal";
import PromotionModal from "../../promotions-LignePromotion/promotion/PromotionModal";

export default class ListeMenuJour extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listePromotion: [],
            toastShow: false,
            toastLibelle: "",
        };
    }

    componentDidMount() {
        this.getLIstPromotion();
    }

    getLIstPromotion() {
        service.getPromotion().then((promotions) => {
            let list = [];
            promotions.forEach((promotion) => {
                let promo = new Promotion(
                    promotion.id,
                    promotion.prixPromotion,
                    promotion.datePromotion,
                    promotion.libelle
                );
                list.push(promo);
            });
            this.setState(
                {
                    listePromotion: list,
                },
                () => { }
            );
        });
    }

    formatDate = (date) => {
        let dt = date.split("-");
        let dtt = dt[2].split("T");
        return dtt[0] + "/" + dt[1] + "/" + dt[0] + " à " + dtt[1].split(".")[0];
    };

    render() {
        return (
            <>
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Liste des menus du jour</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th width={50}>ID</th>
                                    <th>Libelle promotion</th>
                                    <th>Prix promotion</th>
                                    <th>Date promotion</th>
                                    <th width={100}>Voir détails</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.listePromotion.map((promo, index) => (
                                    <tr key={promo.id}>
                                        <td>{promo.id}</td>
                                        <td>{promo.libelle}</td>
                                        <td>{promo.prixPromotion}</td>
                                        <td>{this.formatDate(promo.datePromotion)}</td>
                                        <td>

                                            <LignePromotionModal
                                                // title
                                                libelle={"Voir étails"}
                                                add={true}
                                                LPpromo={promo}
                                                idpro={promo.id}
                                                btnStyle="button is-small is-info"
                                                btnIcon="bi bi-eye"
                                            />
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {this.state.listePromotion.length > 0 ? null : (
                            <h2 className="text-center display-4">Aucun élément trouvé</h2>
                        )}
                    </div>
                </section>

                {/* <ToastContainer className="p-3" position="top-end">
                    <Toast
                        show={this.state.toastShow}
                        onClose={this.toggleToastShow}
                        delay={3000}
                        autohide
                    >
                        <Toast.Header closeButton={false}>
                            <img
                                src="images/panier_2.png"
                                className="rounded me-2"
                                alt="boost"
                            />
                            <strong className="me-auto">DounKaFa</strong>
                        </Toast.Header>
                        <Toast.Body>{this.state.toastLibelle}</Toast.Body>
                    </Toast>
                </ToastContainer> */}
            </>
        );
    }
}



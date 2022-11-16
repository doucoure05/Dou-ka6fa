//import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
// import PromotionModal from "./PromotionModal.js";
import Form from "react-bootstrap/Form";
import React, { Component } from "react";
import LignePromotion from "../../../models/LignePromotion";
import Article from "../../../models/Article.js";
import PromotionM from "../../../models/Promotion";
import * as PromotionService from "../../../services/PromotionService";
import * as service from "../../../services/ArticleService";
import * as LignePromotionService from "../../../services/LignePromotionService";
import * as categorieService from "../../../services/CategorieService";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Categorie from "../../../models/Categorie.js";
import { Link } from "react-router-dom";

export default class LignePromotionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listeLignePromotion: [],
            listeArticle: [],
            listePromotion: [],
            ListePerPromo: [],
            idp: null,
            show: false,
            LPpromo: null,
            formOK: false,
        };
    }

    getArticleName = (id) => {
        // console.log("id articles: ", id);
        // console.log("listeArticle: ", this.state.listeArticle);
        let cat =
            this.state.listeArticle.filter((c) => c.id === id).length > 0
                ? this.state.listeArticle.filter((c) => c.id === id)[0]
                : null;
        if (cat != null) {
            return cat.nom;
        } else return "";
        // return cat.nom;
    };
    getPromotionLibelle = (id) => {
        // console.log("id promotion: ", id);
        // console.log("listePromotion: ", this.state.listePromotion);
        let cat =
            this.state.listePromotion.filter((c) => c.id === id).length > 0
                ? this.state.listePromotion.filter((c) => c.id === id)[0]
                : null;
        if (cat != null) {
            return cat.libelle;
        } else return "";
        // return cat.nom;
    };
    
    // getLignePromoPerPromo = (id) => {
    //     // console.log("id promotion: ", id);
    //     // console.log("listePromotion: ", this.state.listePromotion);
    //     let cat =
    //         this.state.listePromotion.filter((c) => c.id === id).length > 0
    //             ? this.state.listePromotion.filter((c) => c.id === id)[0]
    //             : null;
    //     if (cat != null) {
    //         return cat.libelle;
    //     } else return "";
    //     // return cat.nom;
    // };

    getLIstCategorie() {
        categorieService.getCategorie().then((categories) => {
            // console.log("this is categorie ", this.state.categories);
            let list = [];
            categories.forEach((categorie) => {
                let cl = new Categorie(categorie.id, categorie.nom);
                list.push(cl);
            });
            this.setState(
                {
                    listCategorie: list,
                },
                () => {
                    console.log(this.state.listCategorie);
                }
            );
        });
    }

    getLIstArticle() {
        service.getArticle().then((articles) => {
            // console.log("this is article ", articles);
            let list = [];
            articles.forEach((article) => {
                let ar = new Article(
                    article.id,
                    article.nom,
                    article.description,
                    article.qteJour,
                    article.prix,
                    article.photo,
                    article.point,
                    article.categorieId
                );
                list.push(ar);
            });
            this.setState(
                {
                    listeArticle: list,
                },
                () => {
                    //   console.log(this.state.listArticle);
                }
            );
        });
    }

    getLIstPromotion() {
        PromotionService.getPromotion().then((promotions) => {
            // console.log("this is promotion ", promotions);
            let list = [];
            promotions.forEach((promotion) => {
                let pr = new PromotionM(
                    promotion.id,
                    promotion.prixPromotion,
                    promotion.datePromotion,
                    promotion.libelle,
                );
                list.push(pr);
            });
            this.setState(
                {
                    listePromotion: list,
                },
                () => {
                    //   console.log(this.state.listArticle);
                }
            );
        });
    }

    getLIstLignePromotion() {
        LignePromotionService.getLignePromotion().then((lignepromotions) => {
            // console.log("this is LignePromotions ", lignepromotions);
            let list = [];
            lignepromotions.forEach((lignepromotion) => {
                let lp = new LignePromotion(
                    lignepromotion.id,
                    lignepromotion.qte,
                    lignepromotion.promotionId,
                    lignepromotion.articleId,
                );
                if (lp.promotionId === this.props.idpro) {
                    list.push(lp);
                }
            });
            this.setState(
                {
                    listeLignePromotion: list,
                },
                () => {
                    //   console.log(this.state.listArticle);
                }
            );
        });
    }
    componentDidMount() {
        this.getLIstLignePromotion();
        this.getLIstArticle();
        this.getLIstCategorie();
        this.getLIstPromotion();
        this.getLignePromoPerPromo();
    }

    handleClose = () => {
        this.setState({
            //Vider tous les champs ici
            LPpromo: null,
            show: false,
            formOK: false,
        });
    };

    handleShow = () => {

        // console.log("this is promo on click in table", this.props.idpro,);
        this.setState({
            show: true,
            LPpromo: this.props.LPpromo,
            idpro: this.props.idpro,
            formOK: this.props.LPpromo != null,
        });
        this.getLIstLignePromotion();
        this.getLIstArticle();
        this.getLIstPromotion();
        // this.getLignePromoPerPromo();
    };

    handleChange(event) {
        // console.log(this.state);
        let fieldName = event.target.name;
        let fleldVal = event.target.value;
        this.setState(
            {
                LPpromo: {
                    ...this.state.LPpromo,
                    [fieldName]: fleldVal,
                },
            },
            () => {
                this.checkForm();
            }
        );
    }

    checkForm() {
        let isqte = false;
        // let ispromotionId = false;
        let isarticleId = false;
        if (this.state.LPpromo.qte != null) {
            if (this.state.LPpromo.qte.length > 0) {
                isqte = true;
            }
        }
        this.state.LPpromo.promotionId = this.props.idpro;
        // console.log("this is id props", this.state.LPpromo.promotionId, " this is id LPpromo", this.state.LPpromo);
        // if (this.state.LPpromo.promotionId != null) {
        //     if (this.state.LPpromo.promotionId.length > 0) {
        //         ispromotionId = true;
        //     }
        // }
        if (this.state.LPpromo.articleId != null) {
            if (this.state.LPpromo.articleId.length > 0) {
                isarticleId = true;
            }
        }

        this.setState({
            formOK: isqte && isarticleId, //&& ispromotionId,
        });
    }

    componentDidMount() {
        this.setState({
            LPpromo: this.props.LPpromo,
        });
    }

    onSaveLP = (lignepromotion) => {
        // console.log("liste before adding one line: ", this.state.listeLignePromotion);
        LignePromotionService.saveLignePromotion(lignepromotion).then((result) => {
            this.getLIstLignePromotion();
            // console.log("liste after adding one line: ", this.state.listeLignePromotion);
            //this.getLignePromoPerPromo(lignepromotion.promotionId);
            // let msg =
            //     result.msg === "success"
            //         ? "Ajout effectué avec succès."
            //         : "Une erreur est intervenu lors de l'ajout de plat."; this.getLignePromoPerPromo(lignepromotion.promotionId);
            //                      this.toggleToastShow(msg);
        });
    };

    doSave = (event) => {
        this.onSaveLP(this.state.LPpromo);
        // this.handleClose();
    };

    doUpdate = (event) => {
        this.props.onSave(this.state.LPpromo);
        this.handleClose();
    };

    
    deleteLignePromotion = (id) => {
        //const [list,setListeLignePromotion] = useState([]);
        try {
            let list = this.state.listeLignePromotion.filter((c) => c.id !== id);
            // console.log("List of l: ", list);
            this.state.listeLignePromotion.length = 0;
            // console.log("List of listeLignePromotion: ", this.state.listeLignePromotion);
            this.setState({
                listeLignePromotion: list
            })
            // console.log("List of listeLignePromotion: ", this.state.listeLignePromotion);
            const response = axios.delete(`http://localhost:5000/LignePromotion/${id}`);
            
            return response.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    };


    render() {
        return (
            <>
                <div className={this.props.LPpromo === null ? "mb-4" : ""}>
                    <Button className={this.props.btnStyle} onClick={this.handleShow}>
                        <i className={this.props.btnIcon}></i> {this.props.libelle}
                    </Button>
                </div>

                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    // backdrop="static"
                    keyboard={false}
                    backdrop={false}
                    animation={true}
                    centered
                    // dialogClassName="modal-90w"
                    className="modal-dialog modal-xl"
                >
                    <Modal.Header closeButton>
                        {this.props.LPpromo === null ? (
                            <Modal.Title>Ajout de plat au menu du jour</Modal.Title>
                        ) : (
                            <Modal.Title>Ajout de plat au menu du jour</Modal.Title>
                        )}
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Article</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    name="articleId"
                                    value={
                                        this.state.LPpromo != null
                                            ? this.state.LPpromo.articleId
                                            : 0
                                    }
                                    onChange={this.handleChange.bind(this)}
                                >
                                    <option>Sélectionner un plat</option>
                                    {this.state.listeArticle.map((article, index) => (
                                        <option
                                            key={article.id}
                                            // selected={
                                            //   this.props.article != null &&
                                            //   this.props.article.categorieId === categorie.id
                                            // }
                                            value={article.id}
                                        >
                                            {article.nom}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Quantité</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Entrer la quantité"
                                    value={
                                        this.state.LPpromo != null ? this.state.LPpromo.qte : ""
                                    }
                                    name="qte"
                                    onChange={this.handleChange.bind(this)}
                                />
                            </Form.Group>
                        </Form>

                        {/* {this.state.listePromotion.length > 0 ? null : (
                            <h2 className="text-center display-4">Aucun élément trouvé</h2>
                        )} */}
                        <table className="table">
                            <thead>
                                <tr>
                                    <th width={50}>ID</th>
                                    <th>Promotion</th>
                                    <th>Article</th>
                                    <th>Quantité</th>
                                    <th width={100}>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                <script>
                                    let tdindex = document.getElementById("index")
                                </script>
                                {
                                    this.state.listeLignePromotion.map((LPpromo, index) => (

                                        <tr key={LPpromo.id}>
                                            <td id="index">{LPpromo.id}</td>
                                            <td>{this.getPromotionLibelle(LPpromo.promotionId)}</td>
                                            <td>{this.getArticleName(LPpromo.articleId)}</td>
                                            <td>{LPpromo.qte}</td>
                                            <td>
                                                <button type="button" className="btn btn-block btn-danger btn-sm"
                                                    onClick={() => {
                                                        this.deleteLignePromotion(LPpromo.id);
                                                    }}>
                                                    Supprimer
                                                </button>
                                                {/* <Button variant="secondary" onClick={this.doDelete(LPpromo.id)}>
                                                    Supprimer
                                                </Button> */}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </Modal.Body>
                    {this.props.Lppromo === null ? (
                        <Modal.Footer>
                            <Button
                                disabled={!this.state.formOK}
                                variant="primary"
                                onClick={this.doSave}
                            >
                                Ajouter
                            </Button>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Annuler
                            </Button>
                        </Modal.Footer>
                    ) : (
                        <Modal.Footer>
                            <Button
                                disabled={!this.state.formOK}
                                variant="primary"
                                onClick={this.doSave}
                            >
                                Ajouter
                            </Button>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Clôturer
                            </Button>
                        </Modal.Footer>
                    )}
                </Modal>
            </>
        );
    }
}

// export default PromotionModal;

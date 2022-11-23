// import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import * as articleService from "../../../services/ArticleService";
import * as categorieService from "../../../services/CategorieService";
import * as service from "../../../services/PromotionService.js";
import React, { Component } from "react";
import Article from "../../../models/Article";
import Categorie from "../../../models/Categorie";
import LignePromotion from "../../../models/LignePromotion";
import * as menuJourservice from "../../../services/PromotionService.js";

export default class DetailsMenuJourModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuJour: null,
            show: false,
            ligneMenuJour: [],
            listeArticle: [],
            listCategorie: [],
            isMenuUsed: false,
        };
    }

    //   const [show, setShow] = useState(false);

    handleClose = () => {
        this.setState({
            //Vider tous les champs ici
            menuJour: null,
            show: false,
            // formOK: false,
        });
    };
    handleShow = () => {
        this.setState({
            show: true,
            menuJour: this.props.menuJour,
            // formOK: this.props.menuJour != null,
        });
    };

    getLIstArticle() {
        articleService.getArticle().then((articles) => {
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
    getArticleName = (id) => {
        // console.log("id articles: ", id);
        // console.log("listeArticle: ", this.state.listeArticle);
        // console.log(
        //   this.state.listeArticle.filter((c) => Number(c.id) === Number(id)).length
        // );
        let cat =
            this.state.listeArticle.filter((c) => Number(c.id) === Number(id))
                .length > 0
                ? this.state.listeArticle.filter((c) => Number(c.id) === Number(id))[0]
                : null;
        if (cat != null) {
            return cat.nom + "(" + this.getCategorieName(cat.categorieId) + ")";
        } else return "Aucun";
        // return cat.nom;
    };

    getLIstCategorie() {
        categorieService.getCategorie().then((categories) => {
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
                    //   console.log(this.state.listCategorie);
                }
            );
        });
    }
    getCategorieName = (id) => {
        let cat =
            this.state.listCategorie.filter((c) => Number(c.id) === Number(id))
                .length > 0
                ? this.state.listCategorie.filter((c) => Number(c.id) === Number(id))[0]
                : null;
        if (cat != null) {
            return cat.nom;
        } else return "";
        // return cat.nom;
    };

    getLigneByMenu = () => {
        if (this.props.menuJour != null) {
            service.getLigneByMenuJour(this.props.menuJour.id).then((lignes) => {
                let list = [];
                lignes.forEach((ligne) => {
                    let ar = new LignePromotion(ligne);
                    list.push(ar);
                });
                this.setState(
                    {
                        listeLigneMenu: list,
                    },
                    () => {
                        //   console.log(this.state.listArticle);
                    }
                );
            });
        }
    };

    addToLigne = (event) => {
        // On verifie si l'article  n'est pas dans la liste
        let list = [...this.state.listeLigneMenu];
        let trouve = false;
        list.forEach((ligne) => {
            if (ligne.articleId === this.state.ligneMenu.articleId) {
                trouve = true;
            }
        });
        if (trouve) {
            list.map((ligne) => {
                if (ligne.articleId === this.state.ligneMenu.articleId) {
                    ligne.qte = this.state.ligneMenu.qte;
                }
                return ligne;
            });
        } else {
            list.push(this.state.ligneMenu);
        }
        this.setState(
            {
                listeLigneMenu: [...list],
                ligneMenu: null,
            },
            () => {
                this.checkLigneForm();
            }
        );
    };
    // deleteLigne = (id) => {
    //     let list = [...this.state.listeLigneMenu].filter(
    //         (ligne) => ligne.articleId !== id
    //     );
    //     this.setState(
    //         {
    //             listeLigneMenu: [...list],
    //         },
    //         () => {
    //             this.checkLigneForm();
    //         }
    //     );
    // };

    componentDidMount() {
        this.getLIstArticle();
        this.getLIstCategorie();
        // this.getLigneByMenu();
        this.getMenuJour();

        // this.setState({
        //     menuJour: this.props.menuJour,
        // });
    }

    getMenuJour() {
        service.getTodayMenu().then((result) => {
            console.log("menujour avant setState: ", this.state.menuJour);
            this.setState({
                menuJour: result.menuJour,
                ligneMenuJour: result.lignes,
                isMenuUsed: result.isUsed,
            });
        }); console.log("menujour apres setState: ", this.state.menuJour);
    }


    render() {
        return (
            <>
                <Button className={this.props.btnStyle} onClick={this.handleShow}>
                    <i className={this.props.btnIcon}></i> {this.props.libelle}
                </Button>

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
                        <Modal.Title>Menu du Jour</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="dropdown-divider"></div>
                        <div>
                            <p>Prix: { this.state.ligneMenuJour.indexOf }</p>
                        </div>
                        <div className="dropdown-divider"></div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Article</th>
                                    <th>Quantité</th>
                                    <th width={50}></th>
                                </tr>
                            </thead>
                            <tbody>
                                <script>let tdindex = document.getElementById("index")</script>
                                {this.state.ligneMenuJour.map((ligne, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{this.getArticleName(ligne.articleId)}</td>
                                        <td>{ligne.qte}</td>
                                        {/*<td>
                                             <button
                                                type="button"
                                                className="btn btn-block btn-danger btn-sm"
                                                onClick={() => {
                                                    //   this.deleteLignePromotion(ligne.id);
                                                    this.deleteLigne(ligne.articleId);
                                                }}
                                            >
                                                <i className="bi bi-x"></i>
                                            </button>
                                             <Button variant="secondary" onClick={this.doDelete(LPpromo.id)}>
                                                    Supprimer
                                                </Button>
                                        </td> */}
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

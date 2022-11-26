import Form from "react-bootstrap/Form";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import LignePromotion from "../../../models/LignePromotion";
import Article from "../../../models/Article.js";
import * as service from "../../../services/ArticleService";
import * as LignePromotionService from "../../../services/LignePromotionService";
import * as categorieService from "../../../services/CategorieService";
import Categorie from "../../../models/Categorie.js";

export default class LignePromotionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LPpromo: null,
      idpro: null,
      lignePromotionFiltered: [],
      listeArticle: [],
      show: false,
      formOK: false,
    };
  }

  getArticleName = (id) => {
    let cat =
      this.state.listeArticle.filter((c) => c.id === id).length > 0
        ? this.state.listeArticle.filter((c) => c.id === id)[0]
        : null;
    if (cat != null) {
      return cat.nom + "(" + this.getCategorieName(cat.categorieId) + ")";
    } else return "";
  };

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
          //console.log(this.state.listCategorie);
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

  componentDidMount() {
    this.getLIstArticle();
    this.getLIstCategorie();
    console.log(this.props.myStyles);
    //this.getLignePromotion();
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
    this.setState({
      show: true,
      LPpromo: this.props.LPpromo,
      idpro: this.props.idpro,
    });
    this.getLigneByPromo();
  };

  formatDate = (date) => {
    let dt = date.split("-");
    let dtt = dt[2].split("T");
    return dtt[0] + "/" + dt[1] + "/" + dt[0];
  };

  getLigneByPromo = () => {
    LignePromotionService.getLigneByPromotion(this.props.idpro).then(
      (lignes) => {
        let list = [];
        lignes.forEach((ligne) => {
          let ar = new LignePromotion(ligne);
          list.push(ar);
        });
        this.setState(
          {
            lignePromotionFiltered: list,
          },
          () => {
            console.log(
              "this ins the filtered liste",
              this.state.lignePromotionFiltered
            );
          }
        );
      }
    );
  };

  render() {
    return (
      <>
        <div className={this.props.LPpromo === null ? "mb-4" : ""}>
          <Button
            style={
              this.props.myStyles != null
                ? { position: "relative", top: "2rem" }
                : {}
            }
            className={this.props.btnStyle}
            onClick={this.handleShow}
          >
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
          className="modal-dialog "
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <p>
                Détails menu du jour (
                <strong>
                  {this.formatDate(this.props.LPpromo.datePromotion)}
                </strong>
                )
              </p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <Form> */}
            {/* <p
                className="text-center"
                style={{ fontSize: "20px", fontWeight: "bold" }}
              >
                <i className="bi bi-card-list"></i> Infos menu
              </p>
              <div className="dropdown-divider"></div> */}
            <p className="text-left mb-2">
              Libelle: <strong>{this.props.LPpromo.libelle}</strong>
            </p>
            <p className="text-left">
              Prix: <strong>{this.props.LPpromo.prixPromotion}</strong>
            </p>
            {/* <div className="row">
                <div className="col-sm-6">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Libellé</Form.Label>
                    <p>{this.props.LPpromo.libelle} </p>
                  </Form.Group>
                </div>
                <div className="col-sm-6">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Prix menu</Form.Label>
                    <p>{this.props.LPpromo.prixPromotion} </p>
                  </Form.Group>
                </div>
              </div> */}
            {/* </Form> */}
            <div className="dropdown-divider"></div>
            <p className="text-center">Contenu</p>
            {/* <p
              className="text-center"
              style={{ fontSize: "20px", fontWeight: "bold" }}
            >
              <i className="bi bi-cart"></i> Plat
            </p> */}

            <table className="table">
              <thead>
                <tr>
                  <th width={50}>#</th>
                  <th>Nom(Catégorie)</th>
                  <th width={100}>Qte</th>
                </tr>
              </thead>
              <tbody>
                <script>let tdindex = document.getElementById("index")</script>
                {this.state.lignePromotionFiltered.map((LP, index) => (
                  <tr key={LP.id}>
                    <td>{index}</td>
                    <td>{this.getArticleName(LP.articleId)}</td>
                    <td>{LP.qte}</td>
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

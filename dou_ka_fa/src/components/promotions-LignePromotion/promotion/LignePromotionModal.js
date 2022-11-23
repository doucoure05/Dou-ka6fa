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
      return cat.nom;
    } else return "";
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
    return dtt[0] + "/" + dt[1] + "/" + dt[0] + " à " + dtt[1].split(".")[0];
  };

  getLigneByPromo = () => {
    LignePromotionService.getLigneByPromotion(this.props.idpro).then((lignes) => {
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
          console.log("this ins the filtered liste",this.state.lignePromotionFiltered);
        }
      );
    });
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
          className="modal-dialog "
        >
          <Modal.Header closeButton>
            <Modal.Title>Menu du jour au <strong>{this.formatDate(this.props.LPpromo.datePromotion)}</strong></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className="row">
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
              </div>
            </Form>
            <div className="dropdown-divider"></div>
            <i className="bi bi-cart" ></i> Article
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Article</th>
                  <th>Quantité</th>
                </tr>
              </thead>
              <tbody>
                <script>let tdindex = document.getElementById("index")</script>
                {this.state.lignePromotionFiltered.map((LP, index) => (
                  <tr key={LP.id}>
                    <td>{LP.id}</td>
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

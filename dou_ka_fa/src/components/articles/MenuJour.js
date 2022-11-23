import React, { Component } from "react";
import NewPromotionModal from "../promotions-LignePromotion/NewPromotionModal";
import LignePromotionModal from "../promotions-LignePromotion/promotion/LignePromotionModal";
import PromotionModal from "../promotions-LignePromotion/promotion/PromotionModal";
import * as service from "../../services/PromotionService.js";
import * as articleService from "../../services/ArticleService";
import * as categorieService from "../../services/CategorieService";
import Categorie from "../../models/Categorie";
import Article from "../../models/Article";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

export default class MenuJour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuJour: null,
      ligneMenuJour: [],
      listeArticle: [],
      listCategorie: [],
      toastShow: false,
      toastLibelle: "",
      isMenuUsed: false,
    };
  }

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

  getMenuJour() {
    service.getTodayMenu().then((result) => {
      this.setState({
        menuJour: result.menuJour,
        ligneMenuJour: result.lignes,
        isMenuUsed: result.isUsed,
      });
    });
  }
  componentDidMount() {
    this.getMenuJour();
    this.getLIstArticle();
    this.getLIstCategorie();
  }
  onClose = (msg) => {
    let mess =
      msg === "success"
        ? "Opération effectué avec succès."
        : "Une erreur est intervenu lors de l'ajout.";
    this.setState(
      {
        menuJour: null,
        ligneMenuJour: [],
      },
      () => {
        this.toggleToastShow(mess);
        this.getMenuJour();
      }
    );
    // this.getMenuJour();
  };

  toggleToastShow = (libelle) => {
    this.setState({
      toastShow: !this.state.toastShow,
      toastLibelle: libelle,
    });
  };

  render() {
    return (
      <>
        {this.state.menuJour == null ? (
          <div>
            <div className="text-center">
              <h2>Aucun menu du du jour</h2>
            </div>
            <NewPromotionModal
              libelle={"Ajouter un menu du jour"}
              add={true}
              menuJour={null}
              btnStyle="btn btn-block btn-success"
              btnIcon="bi-plus-circle"
              onClose={this.onClose}
            />
          </div>
        ) : (
          <div>
            <p className="text-left">
              Libelle: <strong>{this.state.menuJour.libelle}</strong>
            </p>
            <p className="text-left">
              Prix: <strong>{this.state.menuJour.prixPromotion}</strong>
            </p>
            <div className="dropdown-divider"></div>
            <p className="text-center">Contenu</p>
            <table className="table">
              <thead>
                <tr>
                  <th>Nom(Catégorie)</th>
                  <th width={100}>Qte</th>
                </tr>
              </thead>
              <tbody>
                {this.state.ligneMenuJour.map((ligne, index) => (
                  <tr key={ligne.articleId}>
                    <td>{this.getArticleName(ligne.articleId)}</td>
                    <td>{ligne.qte}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {this.state.isMenuUsed ? null : (
              <div>
                <div className="dropdown-divider"></div>
                <NewPromotionModal
                  libelle={"Modifier"}
                  add={true}
                  menuJour={this.state.menuJour}
                  btnStyle="btn btn-block is-info"
                  btnIcon="bi-plus-circle"
                  onClose={this.onClose}
                />
              </div>
            )}
          </div>
        )}
        <ToastContainer className="p-3" position="top-end">
          <Toast
            show={this.state.toastShow}
            onClose={this.toggleToastShow}
            delay={3000}
            autohide
          >
            <Toast.Header closeButton={false}>
              <img
                src="images/online-store_32.png"
                className="rounded me-2"
                alt="boost"
              />
              <strong className="me-auto">DounKaFa</strong>
            </Toast.Header>
            <Toast.Body>{this.state.toastLibelle}</Toast.Body>
          </Toast>
        </ToastContainer>
      </>
    );
  }
}

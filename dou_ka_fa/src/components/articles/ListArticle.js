import React, { Component } from "react";
import { Link } from "react-router-dom";
import Article from "../../models/Article.js";
import * as service from "../../services/ArticleService";

import * as categorieService from "../../services/CategorieService";

import ArticleModal from "./ArticleModal";

import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Categorie from "../../models/Categorie.js";
import MenuJour from "./MenuJour.js";

export default class ListArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listArticle: [],
      toastShow: false,
      toastLibelle: "",
      listCategorie: [],
    };
  }

  getCategorieName = (id) => {
    let cat =
      this.state.listCategorie.filter((c) => c.id === id).length > 0
        ? this.state.listCategorie.filter((c) => c.id === id)[0]
        : null;
    if (cat != null) {
      return cat.nom;
    } else return "";
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

  getLIstArticle() {
    service.getArticle().then((articles) => {
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
          listArticle: list,
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
  }

  onSave = (article) => {
    service.saveArticle(article).then((result) => {
      this.getLIstArticle();
      let msg =
        result.msg === "success"
          ? "Ajout effectué avec succès."
          : "Une erreur est intervenu lors de l'ajout.";
      this.toggleToastShow(msg);
    });
  };
  onUpdate = (article) => {
    service.updateArticle(article).then((result) => {
      this.getLIstArticle();
      let msg =
        result.msg === "success"
          ? "Modification effectué avec succès."
          : "Une erreur est intervenu lors de la modification.";
      this.toggleToastShow(msg);
    });
  };
  onDelete = (article) => {
    service.deleteArticle(article.id).then((result) => {
      this.getLIstArticle();
      let msg =
        result.msg === "success"
          ? "Suppression effectué avec succès."
          : "Une erreur est intervenu lors de la suppression.";
      this.toggleToastShow(msg);
    });
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
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>MENUS</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link className="nav-link" to="/home">
                      Acceuil
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">Menu</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <div className="dropdown-divider"></div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <div className="card card-secondary card-outline">
                  <div className="card-header">
                    <h3 className="card-title">Menu du jour</h3>
                  </div>
                  <div className="card-body">
                    <MenuJour />
                  </div>
                </div>
              </div>

              <div className="col-md-9">
                <div className="card card-secondary card-outline">
                  <div className="card-header">
                    <h3 className="card-title">Autres Menu</h3>
                  </div>
                  <div className="card-body">
                    <ArticleModal
                      libelle={"Nouvel Article"}
                      add={true}
                      article={null}
                      btnStyle="btn btn-block btn-success"
                      btnIcon="bi-plus-circle"
                      onSave={this.onSave}
                    />

                    <table className="table">
                      <thead>
                        <tr>
                          <th width={50}>#</th>
                          <th>Nom</th>
                          <th>Description</th>
                          <th>Qte Journalière</th>
                          <th>Prix</th>
                          <th>Pt de Fidelité</th>
                          <th>Catégorie</th>
                          <th width={100}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.listArticle.map((article, index) => (
                          <tr key={article.id}>
                            <td>{index + 1}</td>
                            <td>{article.nom}</td>
                            <td>{article.description}</td>
                            <td>{article.qteJour}</td>
                            <td>{article.prix}</td>
                            <td>{article.point}</td>
                            <td>
                              {this.getCategorieName(article.categorieId)}
                            </td>

                            <td>
                              <ArticleModal
                                libelle={"Editer"}
                                add={true}
                                article={article}
                                btnStyle="button is-small is-info"
                                onSave={this.onUpdate}
                                onDelete={this.onDelete}
                                btnIcon="bi bi-pencil"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {this.state.listArticle.length > 0 ? null : (
                      <h2 className="text-center display-4">
                        Aucun élément trouvé
                      </h2>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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

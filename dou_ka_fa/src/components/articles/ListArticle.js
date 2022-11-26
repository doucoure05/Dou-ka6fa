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

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button.js";

export default class ListArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listArticle: [],
      toastShow: false,
      toastLibelle: "",
      listCategorie: [],
      tableRows: [],
      searchWord: "",
      formOK: false,
      listAllLigneVenteToday: [],
    };
  }

  handleChange(event) {
    let fleldVal = event.target.value;
    this.setState(
      {
        searchWord: fleldVal,
      },
      () => {
        this.checkForm();
      }
    );
  }

  getQteVenteParArticle() {
    service.getArticleVenduToday().then((list) => {
      // console.log(list.list);
      this.setState(
        {
          listAllLigneVenteToday: list.list,
        },
        () => {
          this.getLIstArticle();
        }
      );
    });
  }

  getNbreVenteToday = (articleId) => {
    let list = this.state.listAllLigneVenteToday.filter(
      (item) => item.articleId === articleId
    );
    if (list.length > 0) {
      let somme = 0;
      list.forEach((it) => {
        somme += it.qte;
      });
      return somme;
    } else {
      return 0;
    }
  };

  checkForm() {
    let isword = false;

    if (this.state.searchWord != null) {
      if (this.state.searchWord.length > 0) {
        isword = true;
      }
    }

    this.setState({
      formOK: isword,
    });
  }

  search = () => {
    if (this.state.searchWord.length > 0) {
      if (this.state.searchWord.split("#").length > 1) {
        if (this.state.searchWord.split("#")[0].toLowerCase() === "c") {
          this.setState({
            tableRows: [...this.state.listArticle].filter((art) =>
              art.categorieName.includes(this.state.searchWord.split("#")[1])
            ),
          });
        } else if (this.state.searchWord.split("#")[0].toLowerCase() === "n") {
          this.setState({
            tableRows: [...this.state.listArticle].filter((art) =>
              art.nom.includes(this.state.searchWord.split("#")[1])
            ),
          });
        }
      } else {
        this.setState({
          tableRows: [...this.state.listArticle].filter(
            (art) =>
              art.nom.includes(this.state.searchWord) ||
              art.description.includes(this.state.searchWord) ||
              art.qteJour.toString().includes(this.state.searchWord) ||
              art.prix.toString().includes(this.state.searchWord) ||
              art.point.toString().includes(this.state.searchWord) ||
              art.categorieName.includes(this.state.searchWord)
          ),
        });
      }
    } else {
      this.setState({
        tableRows: [...this.state.listArticle],
      });
    }
  };

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
          this.getLIstArticle();
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
        ar.categorieName = this.getCategorieName(ar.categorieId);
        ar.nbVenteToday = this.getNbreVenteToday(ar.id);
        list.push(ar);
      });
      this.setState(
        {
          listArticle: list,
          tableRows: [...list],
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
    this.getQteVenteParArticle();
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
          : "Suppression impossible! Ce article est utilisé dans des Opérations.";
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
            <div className="row">
              <div className="col-sm-12 text-center">
                <h1>MENUS</h1>
              </div>
            </div>
          </div>
        </section>
        <div className="dropdown-divider"></div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <div className="card card-success card-outline">
                  <div className="card-header">
                    <h3 className="card-title">Menu du jour</h3>
                  </div>
                  <div className="card-body">
                    <MenuJour />
                  </div>
                </div>
              </div>

              <div className="col-md-9">
                <div className="card card-success card-outline">
                  <div className="card-header">
                    <h3 className="card-title">Articles</h3>
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
                    <div className="row">
                      <div className="col-md-9"></div>
                      <div className="col-md-3">
                        <div className="row">
                          <div className="col-md-9">
                            <Form>
                              <Form.Group className="mb-3">
                                <Form.Control
                                  size="sm"
                                  type="text"
                                  placeholder="Recherche"
                                  value={this.state.searchWord}
                                  name="word"
                                  autoComplete="off"
                                  onChange={this.handleChange.bind(this)}
                                />
                                {/* <Form.Text className="text-muted">
                                  <p className="mb-1">*Par Categorie: c#mot</p>
                                  <p>*Par Nom: c#mot</p>
                                </Form.Text> */}
                              </Form.Group>
                            </Form>
                          </div>
                          <div className="col-md-3">
                            <Button
                              // disabled={!this.state.formOK}
                              className="btn btn-block btn-sm"
                              variant="success"
                              onClick={this.search}
                            >
                              <i className="bi bi-search"></i>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <table className="table">
                      <thead>
                        <tr>
                          <th width={50}>#</th>
                          <th>Nom</th>
                          <th>Description</th>
                          <th>Qte Journalière</th>
                          <th>Acheté auj.</th>
                          <th>Restant auj.</th>
                          <th>Prix</th>
                          <th>Pt de Fidelité</th>
                          <th>Catégorie</th>
                          <th width={100}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.tableRows.map((article, index) => (
                          <tr key={article.id}>
                            <td>{index + 1}</td>
                            <td>{article.nom}</td>
                            <td>{article.description}</td>
                            <td>{article.qteJour}</td>
                            <td>{article.nbVenteToday}</td>
                            <td>
                              {Number(article.qteJour) -
                                Number(article.nbVenteToday)}
                            </td>
                            <td>{article.prix}</td>
                            <td>{article.point}</td>
                            <td>
                              {article.categorieName}
                              {/* {this.getCategorieName(article.categorieId)} */}
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
                    {this.state.tableRows.length > 0 ? null : (
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

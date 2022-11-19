// import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import * as articleService from "../../services/ArticleService";
import * as categorieService from "../../services/CategorieService";
import * as service from "../../services/PromotionService.js";

import React, { Component } from "react";
import Article from "../../models/Article";
import Categorie from "../../models/Categorie";
import LignePromotion from "../../models/LignePromotion";

export default class NewPromotionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      menuJour: null,
      formOK: false,
      ligneMenu: null,
      listeArticle: [],
      formLigneOK: false,
      listeLigneMenu: [],
      listCategorie: [],
    };
  }

  //   const [show, setShow] = useState(false);

  handleClose = () => {
    this.setState({
      //Vider tous les champs ici
      menuJour: null,
      show: false,
      formOK: false,
    });
  };
  handleShow = () => {
    this.setState({
      show: true,
      menuJour: this.props.menuJour,
      formOK: this.props.menuJour != null,
    });
  };

  handleChange(event) {
    // console.log(this.state);
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState(
      {
        menuJour: {
          ...this.state.menuJour,
          [fieldName]: fleldVal,
        },
      },
      () => {
        this.checkForm();
      }
    );
  }

  handleLigneChange(event) {
    // console.log(this.state);
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState(
      {
        ligneMenu: {
          ...this.state.ligneMenu,
          [fieldName]: fleldVal,
        },
      },
      () => {
        this.checkLigneForm();
      }
    );
  }

  checkForm() {
    let isprixpromotion = false;
    let islibelle = false;
    let isLigne = false;

    if (this.state.menuJour != null) {
      if (this.state.menuJour.prixPromotion != null) {
        if (this.state.menuJour.prixPromotion > 0) {
          isprixpromotion = true;
        }
      }
      if (this.state.menuJour.libelle != null) {
        if (this.state.menuJour.libelle.length > 0) {
          islibelle = true;
        }
      }

      if (this.state.listeLigneMenu.length > 0) {
        isLigne = true;
      }
    }

    this.setState({
      formOK: isprixpromotion && islibelle && isLigne,
    });
  }

  checkLigneForm() {
    let isqte = false;
    // let ispromotionId = false;
    let isarticleId = false;
    if (this.state.ligneMenu != null) {
      if (this.state.ligneMenu.qte != null) {
        if (this.state.ligneMenu.qte > 0) {
          isqte = true;
        }
      }

      if (this.state.ligneMenu.articleId != null) {
        if (this.state.ligneMenu.articleId.length > 0) {
          isarticleId = true;
        }
      }
    }

    this.setState(
      {
        formLigneOK: isqte && isarticleId, //&& ispromotionId,
      },
      () => {
        this.checkForm();
      }
    );
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
  deleteLigne = (id) => {
    let list = [...this.state.listeLigneMenu].filter(
      (ligne) => ligne.articleId !== id
    );
    this.setState(
      {
        listeLigneMenu: [...list],
      },
      () => {
        this.checkLigneForm();
      }
    );
  };

  componentDidMount() {
    this.getLIstArticle();
    this.getLIstCategorie();
    this.getLigneByMenu();

    this.setState({
      menuJour: this.props.menuJour,
    });
  }

  doSave = (event) => {
    service
      .saveMenu(this.state.menuJour, this.state.listeLigneMenu)
      .then((response) => {
        this.props.onClose(response.msg);
        this.handleClose();
      });

    // this.handleClose();
  };

  doUpdate = (event) => {
    service
      .updateMenu(this.state.menuJour, this.state.listeLigneMenu)
      .then((response) => {
        this.props.onClose(response.msg);
        this.handleClose();
      });
  };

  doDelete = (event) => {
    service.deleteMenuJour(this.state.menuJour).then((response) => {
      this.props.onClose(response.msg);
      this.handleClose();
    });
  };
  render() {
    return (
      <>
        <div className={this.props.menuJour === null ? "mb-4" : ""}>
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
            {this.props.menuJour === null ? (
              <Modal.Title>Nouveau Menu du jour</Modal.Title>
            ) : (
              <Modal.Title>Modification Menu du Jour</Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className="row">
                <div className="col-md-3">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Prix</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Entrer le prix"
                      value={
                        this.state.menuJour != null
                          ? this.state.menuJour.prixPromotion
                          : ""
                      }
                      name="prixPromotion"
                      onChange={this.handleChange.bind(this)}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-9">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Libelle</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Entrer le Libelle Promotion"
                      value={
                        this.state.menuJour != null
                          ? this.state.menuJour.libelle
                          : ""
                      }
                      name="libelle"
                      onChange={this.handleChange.bind(this)}
                    />
                  </Form.Group>
                </div>
              </div>

              {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Date Promotion</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrer la date"
                  value={
                    this.state.menuJour != null
                      ? this.state.menuJour.datePromotion
                      : ""
                  }
                  name="datePromotion"
                  onChange={this.handleChange.bind(this)}
                />
              </Form.Group> */}
              <div className="dropdown-divider"></div>
              <p className="text-left mb-4" style={{ fontSize: "20px" }}>
                Contenu
              </p>
              <div className="row">
                <div className="col-sm-6">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Article</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      name="articleId"
                      value={
                        this.state.ligneMenu != null
                          ? this.state.ligneMenu.articleId
                          : 0
                      }
                      onChange={this.handleLigneChange.bind(this)}
                    >
                      <option>Sélectionner un plat</option>
                      {this.state.listeArticle.map((article, index) => (
                        <option key={article.id} value={article.id}>
                          {this.getArticleName(article.id)}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col-sm-6">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Quantité</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Entrer la quantité"
                      value={
                        this.state.ligneMenu != null
                          ? this.state.ligneMenu.qte
                          : ""
                      }
                      name="qte"
                      onChange={this.handleLigneChange.bind(this)}
                    />
                  </Form.Group>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <Button
                      disabled={!this.state.formLigneOK}
                      className="btn btn-block"
                      onClick={this.addToLigne}
                    >
                      Ajouter
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
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
                {/* <script>let tdindex = document.getElementById("index")</script> */}
                {this.state.listeLigneMenu.map((ligne, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{this.getArticleName(ligne.articleId)}</td>
                    <td>{ligne.qte}</td>
                    <td>
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
                      {/* <Button variant="secondary" onClick={this.doDelete(LPpromo.id)}>
                                                    Supprimer
                                                </Button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button
              disabled={!this.state.formOK}
              variant="primary"
              onClick={
                this.props.menuJour === null ? this.doSave : this.doUpdate
              }
            >
              Enregistrer
            </Button>
            {this.props.menuJour != null ? (
              <Button
                disabled={!this.state.formOK}
                variant="primary"
                onClick={this.doDelete}
              >
                Supprimer
              </Button>
            ) : null}
          </Modal.Footer>
          )
        </Modal>
      </>
    );
  }
}

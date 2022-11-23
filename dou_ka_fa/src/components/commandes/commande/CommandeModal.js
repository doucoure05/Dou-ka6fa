import React, { Component } from "react";
import Button from "react-bootstrap/esm/Button";
import * as service from "../../../services/CommandesService";
import * as clientService from "../../../services/ClientService";
import * as articleService from "../../../services/ArticleService";
import * as categorieService from "../../../services/CategorieService";
import Client from "../../../models/Client";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Article from "../../../models/Article";
import Categorie from "../../../models/Categorie";
// import LigneCommande from "../../../models/LigneCommande";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import * as menuJourservice from "../../../services/PromotionService.js";
import LignePromotionModal from "../../promotions-LignePromotion/promotion/LignePromotionModal"
export default class CommandeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      commande: null,
      listClient: [],
      listArticle: [],
      currentLigne: null,
      ligneCommande: [],
      listCategorie: [],
      formOK: false,
      formLigneOK: false,

      toastShow: false,
      toastLibelle: "",
      isMenuJourAdd: false,
      menuJour: null,
      ligneMenuJour: [],

      globalLigneCommande: [],
      menuAddLigne: [],
    };
  }

  getMenuJour() {
    menuJourservice.getTodayMenu().then((result) => {
      this.setState({
        menuJour: result.menuJour,
        ligneMenuJour: result.lignes,
      });
    });
  }

  toggleToastShow = (libelle) => {
    this.setState({
      toastShow: !this.state.toastShow,
      toastLibelle: libelle,
    });
  };

  doSave = () => {
    // console.log("On Save");
    console.log(this.state.commande);
    let success = false;
    service.createCommande(this.state.commande).then((article) => {
      if (article.id != null) {
        success = true;
      }
      if (success) {
        this.state.globalLigneCommande.forEach((ligne) => {
          ligne.commandeId = article.id;
          service.createLigneCommande(ligne).then((response) => { });
        });
      }
      if (success) {
        this.toggleToastShow("Ajout effectué avec succès.");
        this.handleClose();
      } else {
        this.toggleToastShow("Une erreur est intervenu lors de l'opération.");
      }
    });
  };

  getLIstClient() {
    clientService.getClient().then((clients) => {
      let list = [];
      clients.forEach((client) => {
        let cl = new Client(
          client.id,
          client.nom,
          client.prenom,
          client.telephone,
          client.adresse,
          client.point,
          client.photo
        );
        list.push(cl);
      });
      this.setState(
        {
          listClient: list,
        },
        () => { }
      );
    });
  }

  getLIstArticle() {
    articleService.getArticle().then((articles) => {
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

  getArticleName = (id) => {
    let art =
      this.state.listArticle.filter((a) => a.id === Number(id)).length > 0
        ? this.state.listArticle.filter((a) => a.id === Number(id))[0]
        : null;
    if (art != null) {
      return art.nom + "(" + this.getCategorieName(art.categorieId) + ")";
    } else return "";
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

  calculTotal() {
    // console.log(this.state.ligneCommande);
    let somme = 0;
    this.state.ligneCommande.forEach((ligne) => {
      somme +=
        ligne.qte *
        this.state.listArticle.filter(
          (article) => article.id === Number(ligne.articleId)
        )[0].prix;
    });
    if (this.state.isMenuJourAdd) {
      somme +=
        Number(this.state.commande.qtePromotion) *
        Number(this.state.menuJour.prixPromotion);
    }

    this.setState({
      commande: {
        ...this.state.commande,
        total: somme,
      },
    });
  }

  addToLigne = (event) => {
    // console.log(this.state.currentLigne.articleId);
    // On verifie si l'article  n'est pas dans la liste
    let list = [...this.state.ligneCommande];
    let trouve = false;
    list.forEach((ligne) => {
      if (
        Number(ligne.articleId) === Number(this.state.currentLigne.articleId)
      ) {
        trouve = true;
      }
    });
    if (trouve) {
      list.map((ligne) => {
        if (
          Number(ligne.articleId) === Number(this.state.currentLigne.articleId)
        ) {
          ligne.qte = Number(this.state.currentLigne.qte);
        }
        return ligne;
      });
    } else {
      list.push(this.state.currentLigne);
    }
    this.setState(
      {
        ligneCommande: [...list],
        currentLigne: null,
      },
      () => {
        this.checkLigneForm();
        this.mergeLigneListes();
        // this.calculTotal();
      }
    );
  };
  deleteLigne = (id) => {
    let list = [...this.state.ligneCommande].filter(
      (ligne) => ligne.articleId !== id
    );
    this.setState(
      {
        ligneCommande: [...list],
      },
      () => {
        this.checkLigneForm();
        this.mergeLigneListes();
      }
    );
  };

  handleClose = () => {
    this.setState(
      {
        //Vider tous les champs ici
        commande: null,
        show: false,
        formOK: false,
      },
      this.props.onClose()
    );
  };
  handleShow = () => {
    this.setState(
      {
        show: true,
        commande: this.props.article,
        formOK: this.props.article != null,
        formLigneOK: false,
        currentLigne: null,
        ligneCommande: [],
        isMenuJourAdd: false,
        menuJour: null,
        ligneMenuJour: [],
        globalLigneCommande: [],
        menuAddLigne: [],
      },
      this.getMenuJour()
    );
    // this.getLIstClient();
  };

  handleChange(event) {
    // console.log(this.fiel);
    // event.preventDefault();
    // event.preventDefault();
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState(
      {
        commande: {
          ...this.state.commande,
          [fieldName]: fleldVal,
        },
      },
      () => {
        this.checkForm();
      }
    );
  }

  wantToAddMenuJour = (event) => {
    this.setState(
      {
        isMenuJourAdd: !this.state.isMenuJourAdd,
      },
      () => {
        if (this.state.isMenuJourAdd) {
          this.setState(
            {
              commande: {
                ...this.state.commande,
                promotionId: this.state.menuJour.id,
                qtePromotion: 1,
              },
            },
            () => {
              let list = [];
              this.state.ligneMenuJour.forEach((menuLigne) => {
                list.push({
                  qte: menuLigne.qte * this.state.commande.qtePromotion,
                  articleId: menuLigne.articleId,
                });
              });
              this.setState(
                {
                  menuAddLigne: [...list],
                },
                () => {
                  this.mergeLigneListes();

                  // this.calculTotal();
                }
              );
            }
          );
        } else {
          this.setState(
            {
              commande: {
                ...this.state.commande,
                promotionId: null,
                qtePromotion: null,
              },
            },
            () => {
              this.mergeLigneListes();
            }
          );
        }
      }
    );
  };

  handleChangeMenuQte(event) {
    event.preventDefault();
    let fleldVal = event.target.value;
    this.setState(
      {
        commande: {
          ...this.state.commande,
          qtePromotion: fleldVal,
        },
      },
      () => {
        // this.checkForm();
        let list = [];
        this.state.ligneMenuJour.forEach((menuLigne) => {
          list.push({
            articleId: Number(menuLigne.articleId),
            qte:
              Number(menuLigne.qte) * Number(this.state.commande.qtePromotion),
          });
        });
        this.setState(
          {
            menuAddLigne: [...list],
          },
          () => {
            this.mergeLigneListes();
            // this.calculTotal();
          }
        );
      }
    );
  }

  mergeLigneListes() {
    let finalList = [];
    let list = [];
    [...this.state.ligneCommande].forEach((el) => {
      list.push(el);
    });
    [...list].forEach((element) => {
      finalList.push({ ...element });
    });
    let listMenuAddLigne = [...this.state.menuAddLigne];

    if (this.state.isMenuJourAdd) {
      listMenuAddLigne.forEach((ligne) => {
        let trouve = false;
        list.forEach((li) => {
          if (Number(ligne.articleId) === Number(li.articleId)) {
            trouve = true;
          }
        });
        if (trouve) {
          //On a le même article dans les deux liste
          finalList = finalList.map((finalLigne) => {
            if (Number(finalLigne.articleId) === Number(ligne.articleId)) {
              finalLigne.qte = Number(finalLigne.qte) + Number(ligne.qte);
            }
            return finalLigne;
          });
        } else {
          //L'article set dans la listeCommande
          finalList.push(ligne);
        }
      });
    }
    // console.log(list);
    this.setState(
      {
        globalLigneCommande: [...finalList],
      },
      () => {
        this.calculTotal();
        this.checkForm();
      }
    );
  }

  handleLigneChange(event) {
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState(
      {
        currentLigne: {
          ...this.state.currentLigne,
          [fieldName]: fleldVal,
        },
      },
      () => {
        this.checkLigneForm();
      }
    );
  }
  checkForm() {
    let isclient = true;
    let isligne = false;
    if (this.state.commande !== null) {
      // if (this.state.commande.clientId != null) {
      //   if (this.state.commande.clientId > 0) {
      //     isclient = true;
      //   }
      // }
      if (this.state.globalLigneCommande != null) {
        if (this.state.globalLigneCommande.length > 0) {
          isligne = true;
        }
      }
    }
    this.setState({
      formOK: isclient && isligne,
    });
  }

  checkLigneForm() {
    let isarticle = false;
    let isqte = false;

    if (this.state.currentLigne != null) {
      if (this.state.currentLigne.articleId != null) {
        if (this.state.currentLigne.articleId > 0) {
          isarticle = true;
        }
      }
      if (this.state.currentLigne.qte != null) {
        if (this.state.currentLigne.qte > 0) {
          isqte = true;
        }
      }
    }

    this.setState(
      {
        formLigneOK: isarticle && isqte,
      },
      () => {
        this.checkForm();
      }
    );
  }

  componentDidMount() {
    this.getLIstCategorie();
    this.getLIstArticle();
    this.getLIstClient();
  }

  render() {
    return (
      <>
        <Button
          disabled={this.state.show}
          className={this.props.btnStyle}
          onClick={this.handleShow}
        >
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
            <Modal.Title>Nouvelle Commande</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Client</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Entrer le nom de l'article"
                    value={
                      this.state.article != null ? this.state.article.nom : ""
                    }
                    name="nom"
                    // onChange={this.handleChange.bind(this)}
                  />
                </Form.Group> */}
              <div className="row">
                <div className="col-sm-6">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Client</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      name="clientId"
                      value={
                        this.state.commande != null
                          ? this.state.commande.clientId
                          : 0
                      }
                      onChange={this.handleChange.bind(this)}
                    >
                      <option value={0}>Selectionner un client</option>
                      {this.state.listClient.map((client, index) => (
                        <option key={client.id} value={client.id}>
                          {client.nom +
                            " " +
                            client.prenom +
                            "(" +
                            client.telephone +
                            ")"}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col-sm-6">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Total</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="0"
                      disabled
                      value={
                        this.state.commande != null
                          ? this.state.commande.total
                          : 0
                      }
                      name="total"
                    />
                  </Form.Group>
                </div>
              </div>
            </Form>
            {this.state.menuJour != null ? (
              <div>
                <div className="dropdown-divider"></div>
                <Form>
                  {!this.state.isMenuJourAdd ? (
                    <div className="row">
                      <div className="text-center">
                        <Button
                          className="btn btn-secondary btn-sm"
                          onClick={this.wantToAddMenuJour}
                        >
                          <i className="bi bi-cart"></i> Ajouter le menu du jour
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="row">
                      <h1 style={{ textAlign: "center" }}>Menu du jour</h1>
                      <div className="col-md-6">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ fontSize: "15px" }}>
                            Qte menu du jour
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="number"
                            placeholder="Quantité"
                            min={1}
                            value={
                              this.state.commande != null &&
                                this.state.commande.qtePromotion != null
                                ? this.state.commande.qtePromotion
                                : ""
                            }
                            name="qtePromotion"
                            onChange={this.handleChangeMenuQte.bind(this)}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-md-3">
                        <Button
                          className="btn btn-block btn-danger btn-sm"
                          style={{
                            position: "relative",
                            top: "1.95rem",
                          }}
                          onClick={this.wantToAddMenuJour}
                        >
                          <i className="bi-x"></i> Annuler
                        </Button>
                      </div>
                      <div className="col-md-3">
                        <LignePromotionModal
                          // title
                          libelle={"Voir étails"}
                          add={true}
                          LPpromo={this.state.menuJour}
                          idpro={this.state.menuJour.id}
                          btnStyle="btn btn-block btn-secondary btn-sm"
                          btnIcon="bi bi-eye"
                          style={{
                            position: "relative",
                            top: "3rem",
                          }}
                        />
                      </div>
                    </div>
                  )}
                </Form>
              </div>
            ) : null}

            <div className="dropdown-divider"></div>
            <h1 style={{ textAlign: "center" }}>Ajouter Un artile</h1>
            <Form>
              <div className="row">
                <div className="col-sm-4">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label style={{ fontSize: "15px" }}>
                      Article
                    </Form.Label>
                    <Form.Select
                      size="sm"
                      aria-label="Default select example"
                      name="articleId"
                      value={
                        this.state.currentLigne != null
                          ? this.state.currentLigne.articleId
                          : 0
                      }
                      onChange={this.handleLigneChange.bind(this)}
                    >
                      <option value={0}>Selectionner un article</option>
                      {this.state.listArticle.map((article, index) => (
                        <option key={article.id} value={Number(article.id)}>
                          {article.nom +
                            "(" +
                            this.getCategorieName(article.categorieId) +
                            ")"}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col-sm-4">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label style={{ fontSize: "15px" }}>
                      Quantité
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      type="number"
                      placeholder="Quantité"
                      value={
                        this.state.currentLigne != null
                          ? this.state.currentLigne.qte
                          : ""
                      }
                      name="qte"
                      onChange={this.handleLigneChange.bind(this)}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-4">
                  <Button
                    disabled={!this.state.formLigneOK}
                    className="btn btn-block btn-success btn-sm"
                    style={{
                      position: "relative",
                      top: "1.95rem",
                    }}
                    onClick={this.addToLigne}
                  >
                    <i className="bi-plus-circle"></i>
                  </Button>
                </div>
              </div>
            </Form>
            <div className="dropdown-divider"></div>
            <h1 style={{ textAlign: "center" }}>Liste des articles</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>Article</th>
                  <th width={100}>Qte</th>
                  <th width={50}></th>
                </tr>
              </thead>
              <tbody>
                {this.state.globalLigneCommande.map((ligne, index) => (
                  <tr key={ligne.articleId}>
                    <td>{this.getArticleName(ligne.articleId)}</td>
                    <td>{ligne.qte}</td>
                    <td>
                      <Button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          this.deleteLigne(ligne.articleId);
                        }}
                      >
                        <i className="bi bi-x"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button
              disabled={!this.state.formOK}
              variant="success"
              onClick={this.doSave}
            >
              Valider
            </Button>
            <Button variant="secondary" onClick={this.handleClose}>
              Annuler
            </Button>
          </Modal.Footer>
        </Modal>

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

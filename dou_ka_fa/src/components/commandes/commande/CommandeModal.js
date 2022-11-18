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
import Overlay from "react-bootstrap/Overlay";
import { Popover } from "bootstrap";
import { Tooltip } from "bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

export default class CommandeModal extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
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
      showOverlay: false,
      target: null,
    };
  }

  toggleToastShow = (libelle) => {
    this.setState({
      toastShow: !this.state.toastShow,
      toastLibelle: libelle,
    });
  };

  doSave = () => {
    // console.log("On Save");
    let success = false;
    service.createCommande(this.state.commande).then((article) => {
      if (article.id != null) {
        success = true;
      }
      if (success) {
        this.state.ligneCommande.forEach((ligne) => {
          ligne.commandeId = article.id;
          service.createLigneCommande(ligne).then((response) => {});
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
        () => {}
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
    this.setState({
      commande: {
        ...this.state.commande,
        total: somme,
      },
    });
  }

  addToLigne = (event) => {
    // On verifie si l'article  n'est pas dans la liste
    let list = [...this.state.ligneCommande];
    let trouve = false;
    list.forEach((ligne) => {
      if (ligne.articleId === this.state.currentLigne.articleId) {
        trouve = true;
      }
    });
    if (trouve) {
      list.map((ligne) => {
        if (ligne.articleId === this.state.currentLigne.articleId) {
          ligne.qte = this.state.currentLigne.qte;
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
        this.calculTotal();
      }
    );
  };
  deleteLigne = (id) => {
    console.log(id);
    let list = [...this.state.ligneCommande].filter(
      (ligne) => ligne.articleId !== id
    );
    this.setState(
      {
        ligneCommande: [...list],
      },
      () => {
        this.checkLigneForm();
        this.calculTotal();
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
    this.setState({
      show: true,
      commande: this.props.article,
      formOK: this.props.article != null,
      formLigneOK: false,
      currentLigne: null,
      ligneCommande: [],
    });
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
      if (this.state.ligneCommande != null) {
        if (this.state.ligneCommande.length > 0) {
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
  handleOverlay = (event) => {
    this.setState({
      showOverlay: !this.state.showOverlay,
      // target: event.target,
    });
  };

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
            <div>
              <div className="dropdown-divider"></div>
              <h1 style={{ textAlign: "center" }}>Menu du jour</h1>
              <Form>
                <div className="row">
                  <div className="col-sm-4">
                    <div>
                      <Button
                        ref={this.ref}
                        onClick={() => this.handleOverlay()}
                      >
                        Click me!
                      </Button>
                      <Overlay
                        target={this.ref.current}
                        show={this.state.showOverlay}
                        placement="right"
                      >
                        {(props) =>
                          "Teste"
                          // <Tooltip id="overlay-example" {...props}>
                          //   My Tooltip
                          // </Tooltip>
                        }
                      </Overlay>
                    </div>
                  </div>
                  <div className="col-sm-4"></div>
                  <div className="col-sm-4"></div>
                </div>
              </Form>
            </div>
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
                {this.state.ligneCommande.map((ligne, index) => (
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
              variant="primary"
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
                src="images/panier_2.png"
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

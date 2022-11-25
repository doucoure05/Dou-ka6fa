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
import LigneCommande from "../../../models/LigneCommande";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import Seuil from "../../../models/Seuil";
import * as seuilService from "../../../services/SeuilService";

import UserProfile from "../../../userProfile/UserProfile";

export default class OperationCommandeModal extends Component {
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
      toastShow: false,
      toastLibelle: "",
      seuil: null,
    };
  }
  getSeuil = () => {
    seuilService.getSeuil().then((seuils) => {
      let list = [];
      seuils.forEach((seuil) => {
        let cl = new Seuil(seuil);
        list.push(cl);
      });
      this.setState(
        {
          seuil: list.length > 0 ? list[0] : null,
        },
        () => {
          //   console.log(this.state.listCategorie);
        }
      );
    });
  };

  getClientName = (id) => {
    let clt =
      this.state.listClient.filter((c) => c.id === id).length > 0
        ? this.state.listClient.filter((c) => c.id === id)[0]
        : null;
    if (clt != null) {
      return clt.nom + " " + clt.prenom + "(" + clt.telephone + ")";
    } else return "Aucun";
    // return cat.nom;
  };

  getClientPoint = (id) => {
    let clt =
      this.state.listClient.filter((c) => c.id === id).length > 0
        ? this.state.listClient.filter((c) => c.id === id)[0]
        : null;
    if (clt != null) {
      return clt.point;
    } else return "Aucun";
    // return cat.nom;
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

  getLIstLigneCommande() {
    service
      .getLigneCommandeByCommande(this.props.commande.id)
      .then((lignes) => {
        let list = [];
        lignes.forEach((ligne) => {
          let cl = new LigneCommande(ligne);
          list.push(cl);
        });
        // console.log("LIGNES", list);
        this.setState(
          {
            ligneCommande: list,
          },
          () => {}
        );
      });
  }

  formatDate = (date) => {
    let dt = date.split("-");
    let dtt = dt[2].split("T");
    return dtt[0] + "/" + dt[1] + "/" + dt[0] + " à " + dtt[1].split(".")[0];
  };

  handleClose = () => {
    this.setState(
      {
        //Vider tous les champs ici
        commande: null,

        show: false,
      },
      () => {
        this.props.onClose(this.state.toastLibelle);
      }
    );
  };
  handleShow = () => {
    this.setState({
      show: true,
      commande: {
        ...this.props.commande,
        prixTotalPaye: this.props.add
          ? this.props.commande.total
          : this.props.commande.prixTotalPaye,
      },
      formLigneOK: false,
      currentLigne: null,
      ligneCommande: [],
      toastShow: !this.state.toastShow,
      toastLibelle: "",
    });
    this.getLIstLigneCommande();
    this.getSeuil();
  };
  componentDidMount() {
    this.getLIstClient();
    // this.getLIstLigneCommande();
    this.getLIstCategorie();
    this.getLIstArticle();
  }

  annulerCommande = () => {
    service.annulerCommande(this.props.commande.id).then((result) => {
      // console.log(result);
      let msg =
        result.msg === "success"
          ? "Commande annulée avec succès."
          : "Une erreur est intervenu lors de l'annulation.";
      // this.toggleToastShow(msg);
      this.setState(
        {
          toastShow: !this.state.toastShow,
          toastLibelle: msg,
        },
        this.handleClose()
      );
    });
  };
  doSave = () => {
    service.updateCommandeToVente(this.state.commande).then((result) => {
      // console.log(result);
      let msg =
        result.msg === "success"
          ? "Vente enregistré avec succès."
          : "Une erreur est intervenu lors de l'annulation.";
      // this.toggleToastShow(msg);
      this.setState(
        {
          toastShow: !this.state.toastShow,
          toastLibelle: msg,
        },
        this.handleClose()
      );
    });
  };

  pointCheck = (event) => {
    console.log(event.target.checked);
    if (event.target.checked) {
      this.setState(
        {
          commande: {
            ...this.state.commande,
            prixTotalPaye:
              Number(this.state.commande.total) -
              Number(this.state.seuil.montant),
            prixPoint: this.state.seuil.montant,
            pointUtilise: this.state.seuil.point,
          },
        },
        () => {
          // console.log(this.state.commande);
        }
      );
    } else {
      this.setState(
        {
          commande: {
            ...this.state.commande,
            prixTotalPaye: Number(this.state.commande.total),
            prixPoint: null,
            pointUtilise: null,
          },
        },
        () => {
          // console.log(this.state.commande);
        }
      );
    }
  };

  render() {
    return (
      <>
        {this.props.add ? (
          <Button
            className="btn btn-block btn-success btn-sm"
            onClick={this.handleShow}
          >
            <i className="bi bi-bag-check"></i>
          </Button>
        ) : (
          <Button
            className="btn btn-block btn-success btn-sm"
            onClick={this.handleShow}
          >
            <i className="bi bi-eye"> Voir détail</i>
          </Button>
        )}
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          // backdrop="static"
          keyboard={false}
          backdrop={false}
          animation={true}
          centered
          //   dialogClassName="modal-90w"
          className="modal-dialog modal-xl"
          size="xl"
        >
          <Modal.Header closeButton>
            {this.props.add ? "Opération " : null}Commande N°
            {this.props.commande.id}
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className="row">
                <div className="col-sm-6">
                  <p className="text-center">Commande fait le</p>
                  <p className="text-center">
                    <strong>
                      {this.formatDate(this.props.commande.dateCommande)}
                    </strong>
                  </p>
                </div>
                {this.props.commande.clientId != null ? (
                  <div className="col-sm-6">
                    <p className="text-center">Commande fait par</p>
                    <p className="text-center">
                      <strong>
                        {this.getClientName(this.props.commande.clientId)}
                      </strong>
                    </p>
                  </div>
                ) : null}
              </div>
              <div className="dropdown-divider"></div>
              <p
                className="text-center"
                style={{ fontSize: "20px", fontWeight: "bold" }}
              >
                Articles {this.state.ligneCommande.length}
              </p>
              <table className="table">
                <thead>
                  <tr>
                    <th>Nom(Catégorie)</th>
                    <th width={100}>Qte</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.ligneCommande.map((ligne, index) => (
                    <tr key={ligne.articleId}>
                      <td>{this.getArticleName(ligne.articleId)}</td>
                      <td>{ligne.qte}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="row">
                <div className="col-sm-12">
                  <p>
                    Cout de la Commande:{" "}
                    <strong>{this.props.commande.total}</strong>
                  </p>
                  {/* {console.log(
                    Number(this.getClientPoint(this.props.commande.clientId)) >=
                      (this.state.seuil != null ? this.state.seuil.montant : 0)
                  )} */}
                  {this.props.add &&
                  this.props.commande.clientId != null &&
                  this.state.seuil != null &&
                  Number(this.getClientPoint(this.props.commande.clientId)) >=
                    (this.state.seuil != null ? this.state.seuil.point : 0) ? (
                    <Form>
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label={
                          "Utiliser les point de fidelité du client (" +
                          this.getClientPoint(this.props.commande.clientId) +
                          ")"
                        }
                        onChange={this.pointCheck}
                      />
                    </Form>
                  ) : null}
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <div className="row">
                {this.props.add ? (
                  <div className="col-sm-12">
                    <p
                      className="text-center"
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                    >
                      Total à payer
                    </p>
                    <p
                      className="text-center"
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                    >
                      {this.state.commande != null
                        ? this.state.commande.prixTotalPaye
                        : null}
                    </p>
                  </div>
                ) : (
                  <div className="col-sm-12">
                    <p
                      className="text-center"
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                    >
                      Total payer
                    </p>
                    <p
                      className="text-center"
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                    >
                      {this.state.commande != null
                        ? this.state.commande.prixTotalPaye
                        : null}
                    </p>
                  </div>
                )}
              </div>
            </Form>
          </Modal.Body>
          {this.props.add ? (
            <Modal.Footer>
              <Button variant="success" onClick={this.doSave}>
                Enregistrer la Vente
              </Button>
              <Button variant="danger" onClick={this.annulerCommande}>
                Annuler la commande
              </Button>
            </Modal.Footer>
          ) : null}
          {UserProfile.getProfile() === "Administrateur" ? (
            <Modal.Footer>
              <Button variant="danger" onClick={this.annulerCommande}>
                Supprimer la vente
              </Button>
            </Modal.Footer>
          ) : null}
        </Modal>

        {/* <ToastContainer className="p-3" position="top-end">
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
        </ToastContainer> */}
      </>
    );
  }
}

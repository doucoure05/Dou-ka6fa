import React, { Component } from "react";
import CommandeModal from "./CommandeModal";
import * as service from "../../../services/CommandesService";
import * as clientService from "../../../services/ClientService";
import Client from "../../../models/Client";
import Commande from "../../../models/Commande";
import OperationCommandeModal from "./OperationCommandeModal";

import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button.js";

export default class ListeCommande extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCommande: [],
      listClient: [],
      toastShow: false,
      toastLibelle: "",
      tableRows: [],
      searchWord: "",
      formOK: false,
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
            tableRows: [...this.state.listCommande].filter((art) =>
              art.clientName.includes(this.state.searchWord.split("#")[1])
            ),
          });
        } else if (this.state.searchWord.split("#")[0].toLowerCase() === "t") {
          this.setState({
            tableRows: [...this.state.listCommande].filter((art) =>
              art.total.toString().includes(this.state.searchWord.split("#")[1])
            ),
          });
        } else if (this.state.searchWord.split("#")[0].toLowerCase() === "d") {
          this.setState({
            tableRows: [...this.state.listCommande].filter((art) =>
              this.formatDate(art.dateCommande).includes(
                this.state.searchWord.split("#")[1]
              )
            ),
          });
        } else if (this.state.searchWord.split("#")[0].toLowerCase() === "n") {
          this.setState({
            tableRows: [...this.state.listCommande].filter((art) =>
              art.id.toString().includes(this.state.searchWord.split("#")[1])
            ),
          });
        }
      } else {
        this.setState({
          tableRows: [...this.state.listCommande].filter(
            (art) =>
              this.formatDate(art.dateCommande).includes(
                this.state.searchWord
              ) ||
              this.formatDate(art.dateVente).includes(this.state.searchWord) ||
              art.id.toString().includes(this.state.searchWord) ||
              art.total.toString().includes(this.state.searchWord) ||
              art.clientName.toLowerCase().includes(this.state.searchWord) ||
              art.pointUtilise.toString().includes(this.state.searchWord) ||
              art.prixPoint.toString().includes(this.state.searchWord) ||
              art.prixTotalPaye.toString().includes(this.state.searchWord)
          ),
        });
      }
    } else {
      this.setState({
        tableRows: [...this.state.listCommande],
      });
    }
  };

  formatDate = (date) => {
    let dt = date.split("-");
    let dtt = dt[2].split("T");
    return dtt[0] + "/" + dt[1] + "/" + dt[0] + " à " + dtt[1].split(".")[0];
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
        () => {
          this.getListCommande();
        }
      );
    });
  }

  getListCommande() {
    service.getCommandes().then((commandes) => {
      // console.log(commandes);
      let list = [];
      commandes.forEach((commande) => {
        let com = new Commande(
          commande.id,
          commande.dateCommande,
          commande.dateVente,
          commande.total,
          commande.prixTotalPaye,
          commande.prixPoint,
          commande.pointUtilise,
          commande.etat,
          commande.clientId,
          commande.qtePromotion,
          commande.promotionId
        );
        com.clientName = this.getClientName(com.clientId);
        list.push(com);
      });
      this.setState({
        listCommande: list,
        tableRows: [...list],
      });
    });
  }
  componentDidMount() {
    this.getListCommande();
    this.getLIstClient();
  }

  onClose(msg) {
    if (msg !== "") {
      this.toggleToastShow(msg);
      this.getListCommande();
    }
    this.props.onClose();
  }

  toggleToastShow = (libelle) => {
    this.setState(
      {
        toastShow: !this.state.toastShow,
        toastLibelle: libelle,
      },
      () => {
        // if (this.state.clos && this.state.toastShow === false) {
        //   this.handleClose();
        // }
      }
    );
  };

  render() {
    return (
      <>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                {this.state.listCommande.length > 0 ? (
                  <h4 className="text-left">
                    {" "}
                    {this.state.listCommande.length} en cours
                  </h4>
                ) : null}
              </div>
            </div>
            <CommandeModal
              libelle={"Nouvelle Commande"}
              add={true}
              commande={null}
              btnStyle="btn btn-block btn-success"
              btnIcon="bi-plus-circle"
              onSave={this.onSave}
              onClose={this.getListCommande.bind(this)}
            />
            {this.state.listCommande.length > 0 ? (
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
                        </Form.Group>
                      </Form>
                    </div>
                    <div className="col-md-3">
                      <Button
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
            ) : null}
            {this.state.listCommande.length > 0 ? (
              <>
                <table className="table">
                  <thead>
                    <tr>
                      <th width={100}>N°</th>
                      <th>Date</th>
                      <th>Client</th>
                      <th width={150}>Total</th>
                      <th width={50}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.tableRows.map((commande, index) => (
                      <tr key={commande.id}>
                        <td>{commande.id}</td>
                        <td>{this.formatDate(commande.dateCommande)}</td>
                        <td>{commande.clientName}</td>
                        <td>{commande.total}</td>
                        <td>
                          {
                            <OperationCommandeModal
                              commande={commande}
                              onClose={this.onClose.bind(this)}
                              add={true}
                            />
                          }
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
              </>
            ) : (
              <h2 className="text-center display-4">
                Aucune Commande en cours
              </h2>
            )}
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

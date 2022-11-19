import React, { Component } from "react";
// import CommandeModal from "./CommandeModal";
import * as service from "../../../services/CommandesService";
import * as clientService from "../../../services/ClientService";
import Client from "../../../models/Client";
import Commande from "../../../models/Commande";
// import OperationCommandeModal from "./OperationCommandeModal";

import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import CommandeModal from "../commande/CommandeModal";
import OperationCommandeModal from "../commande/OperationCommandeModal";
import ListeCommande from "../commande/ListeCommande";

export default class ListVente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCommande: [],
      listClient: [],
      toastShow: false,
      toastLibelle: "",
    };
  }

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
        () => {}
      );
    });
  }

  getListCommande() {
    service.getVentes().then((commandes) => {
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
        list.push(com);
      });
      this.setState({
        listCommande: list,
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
        <div className="row">
          <div className="col-md-12">
            <div className="card card-secondary card-outline">
              <div className="card-header">
                <h3 className="card-title">Commande en cours</h3>
              </div>
              <div className="card-body">
                <ListeCommande onClose={this.getListCommande.bind(this)} />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card card-secondary card-outline">
              <div className="card-header">
                <h3 className="card-title">Liste des ventes</h3>
              </div>
              <div className="card-body">
                <section className="content">
                  <div className="container-fluid">
                    {/* <div className="row">
              <div className="col-sm-12">
                {this.state.listCommande.length > 0 ? (
                  <h4 className="text-left">
                    {" "}
                    {this.state.listCommande.length} en cours
                  </h4>
                ) : null}
              </div>
            </div> */}
                    {/* <CommandeModal
              libelle={"Nouvelle Commande"}
              add={true}
              commande={null}
              btnStyle="btn btn-block btn-success"
              btnIcon="bi-plus-circle"
              onSave={this.onSave}
              onClose={this.getListCommande.bind(this)}
            /> */}

                    {this.state.listCommande.length > 0 ? (
                      <table className="table">
                        <thead>
                          <tr>
                            <th width={50}>N°</th>
                            <th>Client</th>
                            <th>DateCommande</th>
                            <th>DateVente</th>
                            <th>Tt Cmd</th>
                            <th>Point utilisé</th>
                            <th>Montant point</th>
                            <th>Tt Payé par le Client</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.listCommande.map((commande, index) => (
                            <tr key={commande.id}>
                              <td>{commande.id}</td>
                              <td>{this.getClientName(commande.clientId)}</td>
                              <td>
                                {
                                  this.formatDate(commande.dateCommande)
                                  // commande.dateCommande
                                }
                              </td>
                              <td>
                                {
                                  this.formatDate(commande.dateVente)
                                  // commande.dateCommande
                                }
                              </td>
                              {/* <td>{this.getClientName(commande.clientId)}</td> */}
                              <td>{commande.total}</td>
                              <td>
                                {commande.pointUtilise != null
                                  ? commande.pointUtilise
                                  : 0}
                              </td>
                              <td>
                                {commande.prixPoint != null
                                  ? commande.prixPoint
                                  : 0}
                              </td>
                              <td>{commande.prixTotalPaye}</td>
                              <td>
                                {
                                  <OperationCommandeModal
                                    commande={commande}
                                    onClose={this.onClose.bind(this)}
                                    add={false}
                                  />
                                }
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <h2 className="text-center display-4">
                        Aucune Commande en cours
                      </h2>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

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

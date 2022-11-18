import React, { Component } from "react";
import CommandeModal from "./CommandeModal";
import * as service from "../../../services/CommandesService";
import * as clientService from "../../../services/ClientService";
import Client from "../../../models/Client";
import Commande from "../../../models/Commande";
import OperationCommandeModal from "./OperationCommandeModal";
export default class ListeCommande extends Component {
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

  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              {this.state.listCommande.length > 0 ? (
                <h3 className="text-right display-4">
                  {" "}
                  {this.state.listCommande.length} Commande en cours
                </h3>
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

          <table className="table">
            <thead>
              <tr>
                <th width={100}>ID</th>
                <th>Date</th>
                <th>Client</th>
                <th width={150}>Prix</th>
                <th width={150}>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.listCommande.map((commande, index) => (
                <tr key={commande.id}>
                  <td>{commande.id}</td>
                  <td>
                    {
                      this.formatDate(commande.dateCommande)
                      // commande.dateCommande
                    }
                  </td>
                  <td>{this.getClientName(commande.clientId)}</td>
                  <td>{commande.total}</td>
                  <td>
                    {
                      // <CommandeModal
                      //   libelle={"Editer"}
                      //   add={true}
                      //   commande={commande}
                      //   btnStyle="button is-small is-info"
                      //   onSave={this.onUpdate}
                      //   onDelete={this.onDelete}
                      //   btnIcon="bi bi-pencil"
                      // />
                      <OperationCommandeModal
                        commande={commande}
                        onClose={this.getListCommande.bind(this)}
                      />
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {this.state.listCommande.length > 0 ? null : (
            <h2 className="text-center display-4">Aucune Commande en cours</h2>
          )}
        </div>
      </section>
    );
  }
}

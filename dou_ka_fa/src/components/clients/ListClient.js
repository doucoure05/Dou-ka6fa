import React, { Component } from "react";
import { Link } from "react-router-dom";
import Client from "../../models/Client";
import * as service from "../../services/ClientService";

import ClientModal from "./ClientModal";

import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

export default class ListClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listClient: [],
      toastShow: false,
      toastLibelle: "",
    };
  }

  getLIstClient() {
    service.getClient().then((clients) => {
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

  componentDidMount() {
    this.getLIstClient();
  }
  onSave = (client) => {
    service.saveClient(client).then((result) => {
      this.getLIstClient();
      let msg =
        result.msg === "success"
          ? "Ajout effectué avec succès."
          : "Une erreur est intervenu lors de l'ajout.";
      this.toggleToastShow(msg);
    });
  };
  onUpdate = (client) => {
    service.updateClient(client).then((result) => {
      this.getLIstClient();
      let msg =
        result.msg === "success"
          ? "Modification effectué avec succès."
          : "Une erreur est intervenu lors de la modification.";
      this.toggleToastShow(msg);
    });
  };
  onDelete = (client) => {
    service.deleteClient(client.id).then((result) => {
      this.getLIstClient();
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
              <div className="col-sm-6">{/* <h1>Liste des clients</h1> */}</div>
            </div>
          </div>
        </section>
        <div className="dropdown-divider"></div>
        <section className="content">
          <div className="container-fluid">
            <div className="col-md-12">
              <div className="card card-success card-outline">
                <div className="card-header">
                  <h3 className="card-title">Liste des clients</h3>
                </div>
                <div className="card-body">
                  <ClientModal
                    libelle={"Nouveau Client"}
                    add={true}
                    client={null}
                    btnStyle="btn btn-block btn-success"
                    btnIcon="bi-plus-circle"
                    onSave={this.onSave}
                  />
                  <table className="table">
                    <thead>
                      <tr>
                        <th width={50}>ID</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Téléphone</th>
                        <th>Adresse</th>
                        <th>Pt Fidelité</th>
                        <th width={100}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.listClient.map((client, index) => (
                        <tr key={client.id}>
                          <td>{client.id}</td>
                          <td>{client.nom}</td>
                          <td>{client.prenom}</td>
                          <td>{client.telephone}</td>
                          <td>{client.adresse}</td>
                          <td>{client.point}</td>
                          <td>
                            <ClientModal
                              // title
                              libelle={"Editer"}
                              add={true}
                              client={client}
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
                  {this.state.listClient.length > 0 ? null : (
                    <h2 className="text-center display-4">
                      Aucun élément trouvé
                    </h2>
                  )}
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

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
          client.photo
        );
        list.push(cl);
      });
      this.setState(
        {
          listClient: list,
        },
        () => {
          //   console.log(this.state.listClient);
        }
      );
    });
  }

  componentDidMount() {
    console.log("ON MOUNTED");
    this.getLIstClient();
  }
  onSave = (client) => {
    console.log("doSave");
    service.saveClient(client).then((result) => {
      console.log(result);
      this.getLIstClient();
      //   this.setState({
      //     toastShow: true,
      //     toastLibelle: "Teste",
      //   });
      this.toggleToastShow("Teste");
    });
  };
  onUpdate = (client) => {
    console.log("doUpdate");
    service.updateClient(client).then((result) => {
      console.log(result);
      this.getLIstClient();
    });
  };
  onDelete = (client) => {
    console.log("doDelete");
    service.deleteClient(client).then((result) => {
      console.log(result);
      this.getLIstClient();
    });
  };
  toggleToastShow = (libelle) => {
    console.log("On Close");
    this.setState({
      toastShow: !this.state.toastShow,
      toastLibelle: libelle,
    });
  };

  render() {
    return (
      <>
        <div className="container">
          <div>
            {/* <Link to="/client/add" className="button is-success">
            {
              //Ajouter l'cone plus ici
            }
            Nouveau client
          </Link> */}
            <ClientModal
              libelle={"Nouveau Client"}
              add={true}
              client={null}
              btnStyle=""
              onSave={this.onSave}
            />
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Téléphone</th>
                  <th>Adresse</th>
                  <th>Actions</th>
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
                    <td>
                      {/* <Link
                      to={`edit/${client.id}`}
                      className="button is-small is-info"
                    >
                      Editer
                    </Link> */}
                      <ClientModal
                        // title
                        libelle={"Editer"}
                        add={true}
                        client={client}
                        btnStyle="button is-small is-info"
                        onSave={this.onUpdate}
                        onDelete={this.onDelete}
                      />
                      <button
                        className="button is-small is-danger"
                        onClick={() => console.log("ON DELETE")}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <ToastContainer className="p-3" position="top-end">
          <Toast
            show={this.state.toastShow}
            onClose={this.toggleToastShow}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt="boost"
              />
              <strong className="me-auto">Bootstrap</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>
              Woohoo, you're reading this text in a Toast!
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </>
    );
  }
}

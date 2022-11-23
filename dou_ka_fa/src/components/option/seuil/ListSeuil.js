import React, { Component } from "react";
import Seuil from "../../../models/Seuil";
import * as service from "../../../services/SeuilService";
import SeuilModal from "./SeuilModal";

import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

export default class ListSeuil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSeuil: [],
      toastShow: false,
      toastLibelle: "",
    };
  }
  getListSeuil() {
    service.getSeuil().then((seuils) => {
      let list = [];
      seuils.forEach((seuil) => {
        let cl = new Seuil(seuil);
        list.push(cl);
      });
      this.setState(
        {
          listSeuil: list,
        },
        () => {
          //   console.log(this.state.listCategorie);
        }
      );
    });
  }

  onSave = (seuil) => {
    service.saveSeuil(seuil).then((result) => {
      this.getListSeuil();
      let msg =
        result.msg === "success"
          ? "Ajout effectué avec succès."
          : "Une erreur est intervenu lors de l'ajout.";
      this.toggleToastShow(msg);
    });
  };
  onUpdate = (seuil) => {
    service.updateSeuil(seuil).then((result) => {
      this.getListSeuil();
      let msg =
        result.msg === "success"
          ? "Modification effectué avec succès."
          : "Une erreur est intervenu lors de la modification.";
      this.toggleToastShow(msg);
    });
  };

  onDelete = (seuil) => {
    service.deleteSeuil(seuil.id).then((result) => {
      this.getListSeuil();
      let msg =
        result.msg === "success"
          ? "Suppression effectué avec succès."
          : "Une erreur est intervenu lors de la suppression. Verifier si ola catégorie nest pas utilisé par un article.";
      this.toggleToastShow(msg);
    });
  };

  componentDidMount() {
    this.getListSeuil();
  }
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
              <div className="col-sm-6">
                <h1>Seuil du point de fidelité</h1>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            {this.state.listSeuil.length > 0 ? null : (
              <SeuilModal
                libelle={"Ajouter le seuil"}
                seuil={null}
                btnStyle="btn btn-block btn-success"
                onSave={this.onSave}
                btnIcon="bi-plus-circle"
              />
            )}
            <table className="table">
              <thead>
                <tr>
                  <th>Point seuil</th>
                  <th>Montant du seuil</th>
                  <th width={100}>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.listSeuil.map((seuil, index) => (
                  <tr key={seuil.id}>
                    <td>{seuil.point}</td>
                    <td>{seuil.montant}</td>
                    <td>
                      {/* <Link
                        to={`edit/${categorie.id}`}
                        className="button is-small is-info"
                      >
                        Editer
                      </Link> */}
                      <SeuilModal
                        libelle={"Editer"}
                        seuil={seuil}
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
            {this.state.listSeuil.length > 0 ? null : (
              <h2 className="text-center display-4">
                Ajouter un seuil pour la gestion des points de fidelité
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

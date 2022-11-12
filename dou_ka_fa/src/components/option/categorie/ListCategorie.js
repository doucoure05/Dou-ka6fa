import React, { Component } from "react";
import { Link } from "react-router-dom";
import Categorie from "../../../models/Categorie";
import * as service from "../../../services/CategorieService";

import CategorieModal from "./CategorieModal";

import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

export default class ListCategorie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCategorie: [],
      toastShow: false,
      toastLibelle: "",
    };
  }

  getLIstCategorie() {
    service.getCategorie().then((categories) => {
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

  componentDidMount() {
    this.getLIstCategorie();
  }
  onSave = (categorie) => {
    service.saveCategorie(categorie).then((result) => {
      this.getLIstCategorie();
      let msg =
        result.msg === "success"
          ? "Ajout effectué avec succès."
          : "Une erreur est intervenu lors de l'ajout.";
      this.toggleToastShow(msg);
    });
  };
  onUpdate = (categorie) => {
    service.updateCategorie(categorie).then((result) => {
      this.getLIstCategorie();
      let msg =
        result.msg === "success"
          ? "Modification effectué avec succès."
          : "Une erreur est intervenu lors de la modification.";
      this.toggleToastShow(msg);
    });
  };
  onDelete = (categorie) => {
    service.deleteCategorie(categorie.id).then((result) => {
      this.getLIstCategorie();
      let msg =
        result.msg === "success"
          ? "Suppression effectué avec succès."
          : "Une erreur est intervenu lors de la suppression. Verifier si ola catégorie nest pas utilisé par un article.";
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
            <div className="row">
              <div className="col-sm-6">
                <h1>Liste des categories</h1>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            {/* <Link to="/categorie/add" className="button is-success">
              {
                //Ajouter l'cone plus ici
              }
              Nouveau categorie
            </Link> */}
            <CategorieModal
              libelle={"Nouvelle Catégorie"}
              add={true}
              categorie={null}
              btnStyle="btn btn-block btn-success"
              btnIcon="bi-plus-circle"
              onSave={this.onSave}
            />
            <table className="table">
              <thead>
                <tr>
                  <th width={100}>ID</th>
                  <th>Nom</th>
                  <th width={100}>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.listCategorie.map((categorie, index) => (
                  <tr key={categorie.id}>
                    <td>{categorie.id}</td>
                    <td>{categorie.nom}</td>
                    <td>
                      {/* <Link
                        to={`edit/${categorie.id}`}
                        className="button is-small is-info"
                      >
                        Editer
                      </Link> */}
                      <CategorieModal
                        // title
                        libelle={"Editer"}
                        add={true}
                        categorie={categorie}
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
            {this.state.listCategorie.length > 0 ? null : (
              <h2 className="text-center display-4">Aucun élément trouvé</h2>
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

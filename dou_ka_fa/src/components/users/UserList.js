import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserModal from "./UserModal";
import * as service from "../../services/UserService";

import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      toastShow: false,
      toastLibelle: "",
    };
  }

  //Methode to fetch data
  getListUsers = async () => {
    service.getUsers().then((data) => {
      this.setState({
        users: data,
      });
    });
  };
  componentDidMount() {
    this.getListUsers();
  }

  onSave = (user) => {
    service.saveUser(user).then((result) => {
      this.getListUsers();
      let msg = "";
      if (result.msg === "success") {
        msg = "Ajout effectué avec succès.";
      } else if (result.msg === "loginExist") {
        msg = "ERREUR! Ce login existe déjà pour un Utilisateur";
      } else {
        msg = "Une erreur est intervenu lors de l'ajout.";
      }
      this.toggleToastShow(msg);
    });
  };
  onUpdate = (user) => {
    service.updateUser(user).then((result) => {
      this.getListUsers();
      let msg =
        result.msg === "success"
          ? "Modification effectué avec succès."
          : "Une erreur est intervenu lors de la modification.";
      this.toggleToastShow(msg);
    });
  };
  onDelete = (user) => {
    service.deleteUser(user.id).then((result) => {
      this.getListUsers();
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
            <div className="row">
              <div className="col-sm-6">
                {/* <h1>Liste des utilisateurs</h1> */}
              </div>
            </div>
          </div>
        </section>
        <div className="dropdown-divider"></div>
        <section className="content">
          <div className="container-fluid">
            <div className="col-md-12">
              <div className="card card-success card-outline">
                <div className="card-header">
                  <h3 className="card-title">Liste des utilisateurs</h3>
                </div>
                <div className="card-body">
                  <UserModal
                    libelle={"Nouvel utilisateur"}
                    add={true}
                    user={null}
                    btnStyle="btn btn-block btn-success"
                    btnIcon="bi-plus-circle"
                    onSave={this.onSave}
                  />

                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Telephone</th>
                        <th>Profil</th>
                        <th>Login</th>
                        <th width={100}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.users.map((user, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{user.nom}</td>
                          <td>{user.prenom}</td>
                          <td>{user.telephone}</td>
                          <td>{user.profil}</td>
                          <td>{user.login}</td>
                          <td>
                            <UserModal
                              libelle={"Editer"}
                              add={true}
                              user={user}
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

// import logo from "./logo.svg";
import "./App.css";
import "react-router-dom";

import Base from "./components/Base";
import Login from "../src/components/Login";
import { Component } from "react";

import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import UserProfile from "./userProfile/UserProfile";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,

      toastShow: false,
      toastLibelle: "",
    };
  }

  toggleToastShow = (libelle) => {
    this.setState({
      toastShow: !this.state.toastShow,
      toastLibelle: libelle,
    });
  };

  log = (user) => {
    let msg = "";
    if (user === null) {
      msg = "Login ou Mot de passe incorrect.";
    } else {
      msg = "Connexion reussi.";
    }
    this.toggleToastShow(msg);
    this.setState(
      {
        user: user,
      },
      () => {
        UserProfile.setName(this.state.user.nom + " " + this.state.user.prenom);
        UserProfile.setProfile(this.state.user.profil);
      }
    );
  };

  render() {
    return (
      <>
        {this.state.user === null ? <Base /> : <Login onLog={this.log} />}

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

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";

import React, { Component } from "react";

export default class UserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      user: null,
      formOK: false,
    };
  }

  handleClose = () => {
    this.setState({
      //Vider tous les champs ici
      user: null,
      show: false,
      formOK: false,
    });
  };
  handleShow = () => {
    this.setState({
      show: true,
      user: this.props.user,
      formOK: this.props.user != null,
    });
  };

  handleChange(event) {
    // console.log(this.state);
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState(
      {
        user: {
          ...this.state.user,
          [fieldName]: fleldVal,
        },
      },
      () => {
        this.checkForm();
      }
    );
  }

  checkForm() {
    let isnom = false;
    let isprenom = false;
    let istelephone = false;
    let islogin = false;
    let ispassword = false;
    let isprofil = false;
    if (this.state.user.nom != null) {
      if (this.state.user.nom.length > 0) {
        isnom = true;
      }
    }
    if (this.state.user.prenom != null) {
      if (this.state.user.prenom.length > 0) {
        isprenom = true;
      }
    }
    if (this.state.user.telephone != null) {
      if (this.state.user.telephone.length > 0) {
        istelephone = true;
      }
    }
    if (this.state.user.login != null) {
      if (this.state.user.login.length > 0) {
        islogin = true;
      }
    }
    if (this.state.user.password != null) {
      if (this.state.user.password.length > 0) {
        ispassword = true;
      }
    }
    if (this.state.user.profil != null) {
      if (this.state.user.profil.length > 0) {
        isprofil = true;
      }
    }
    this.setState({
      formOK:
        isnom && isprenom && istelephone && islogin && ispassword && isprofil,
    });
  }

  componentDidMount() {
    this.setState({
      user: this.props.user,
    });
  }

  doSave = (event) => {
    this.props.onSave(this.state.user);
    this.handleClose();
  };

  doUpdate = (event) => {
    this.props.onSave(this.state.user);
    this.handleClose();
  };

  doDelete = (event) => {
    this.props.onDelete(this.state.user);
    this.handleClose();
  };

  render() {
    return (
      <>
        <div className={this.props.user === null ? "mb-4" : ""}>
          <Button className={this.props.btnStyle} onClick={this.handleShow}>
            <i className={this.props.btnIcon}></i> {this.props.libelle}
          </Button>
        </div>

        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          // backdrop="static"
          keyboard={false}
          backdrop={false}
          animation={true}
          centered
          // dialogClassName="modal-90w"
          className="modal-dialog modal-xl"
        >
          <Modal.Header closeButton>
            {this.props.user === null ? (
              <Modal.Title>Nouvel Utilisateur</Modal.Title>
            ) : (
              <Modal.Title>Modification Utilisateur</Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrer le nom"
                  value={this.state.user != null ? this.state.user.nom : ""}
                  name="nom"
                  onChange={this.handleChange.bind(this)}
                />
                {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrer le prénom"
                  value={this.state.user != null ? this.state.user.prenom : ""}
                  name="prenom"
                  onChange={this.handleChange.bind(this)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Téléphone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrer le téléphone"
                  value={
                    this.state.user != null ? this.state.user.telephone : ""
                  }
                  name="telephone"
                  onChange={this.handleChange.bind(this)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nom d'utilisateur</Form.Label>
                <Form.Control
                  type="text"
                  disabled={this.props.user != null}
                  placeholder="Entrer le nom d'utilisateur"
                  value={this.state.user != null ? this.state.user.login : ""}
                  name="login"
                  onChange={this.handleChange.bind(this)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Entrer le mot de passe"
                  value={
                    this.state.user != null ? this.state.user.password : ""
                  }
                  name="password"
                  onChange={this.handleChange.bind(this)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Profil</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="profil"
                  value={this.state.user != null ? this.state.user.profil : ""}
                  onChange={this.handleChange.bind(this)}
                >
                  <option value={""}>Selection un profil</option>
                  <option value={"Utilisateur"}>Utilisateur</option>
                  <option value={"Administrateur"}>Administrateur</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          {this.props.user === null ? (
            <Modal.Footer>
              <Button
                disabled={!this.state.formOK}
                variant="success"
                onClick={this.doSave}
              >
                Ajouter
              </Button>
              <Button variant="secondary" onClick={this.handleClose}>
                Annuler
              </Button>
            </Modal.Footer>
          ) : (
            <Modal.Footer>
              <Button
                disabled={!this.state.formOK}
                variant="primary"
                onClick={this.doUpdate}
              >
                Modifier
              </Button>
              <Button variant="danger" onClick={this.doDelete}>
                Supprimer
              </Button>
            </Modal.Footer>
          )}
        </Modal>
      </>
    );
  }
}

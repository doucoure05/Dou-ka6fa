// import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";

import React, { Component } from "react";

export default class ClientModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      client: null,
      formOK: false,
    };
  }

  //   const [show, setShow] = useState(false);

  handleClose = () => {
    this.setState({
      //Vider tous les champs ici
      client: null,
      show: false,
      formOK: false,
    });
  };
  handleShow = () => {
    this.setState({
      show: true,
      client: this.props.client,
      formOK: this.props.client != null,
    });
  };

  handleChange(event) {
    // console.log(this.state);
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState(
      {
        client: {
          ...this.state.client,
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
    let isadresse = false;
    if (this.state.client.nom != null) {
      if (this.state.client.nom.length > 0) {
        isnom = true;
      }
    }
    if (this.state.client.prenom != null) {
      if (this.state.client.prenom.length > 0) {
        isprenom = true;
      }
    }
    if (this.state.client.telephone != null) {
      if (this.state.client.telephone.length > 0) {
        istelephone = true;
      }
    }
    if (this.state.client.adresse != null) {
      if (this.state.client.adresse.length > 0) {
        isadresse = true;
      }
    }
    this.setState({
      formOK: isnom && isprenom && istelephone && isadresse,
    });
  }

  componentDidMount() {
    this.setState({
      client: this.props.client,
    });
  }

  doSave = (event) => {
    this.props.onSave(this.state.client);
    this.handleClose();
  };

  doUpdate = (event) => {
    this.props.onSave(this.state.client);
    this.handleClose();
  };

  doDelete = (event) => {
    this.props.onDelete(this.state.client);
    this.handleClose();
  };
  render() {
    return (
      <>
        <div className={this.props.client === null ? "mb-4" : ""}>
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
            {this.props.client === null ? (
              <Modal.Title>Nouveau Client</Modal.Title>
            ) : (
              <Modal.Title>Modification Client</Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrer le nom"
                  value={this.state.client != null ? this.state.client.nom : ""}
                  name="nom"
                  onChange={this.handleChange.bind(this)}
                />
                {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrer le prénom"
                  value={
                    this.state.client != null ? this.state.client.prenom : ""
                  }
                  name="prenom"
                  onChange={this.handleChange.bind(this)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Téléphone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrer le téléphone"
                  value={
                    this.state.client != null ? this.state.client.telephone : ""
                  }
                  name="telephone"
                  onChange={this.handleChange.bind(this)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrer l'adresse"
                  value={
                    this.state.client != null ? this.state.client.adresse : ""
                  }
                  name="adresse"
                  onChange={this.handleChange.bind(this)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          {this.props.client === null ? (
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
              <Button variant="secondary" onClick={this.doDelete}>
                Supprimer
              </Button>
            </Modal.Footer>
          )}
        </Modal>
      </>
    );
  }
}

// export default ClientModal;

import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";

export default class SeuilModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      seuil: null,
      formOK: false,
    };
  }
  handleClose = () => {
    this.setState({
      //Vider tous les champs ici
      seuil: null,
      show: false,
      formOK: false,
    });
  };
  handleShow = () => {
    this.setState({
      show: true,
      seuil: this.props.seuil,
      formOK: this.props.seuil != null,
    });
  };

  handleChange(event) {
    // console.log(this.state);
    // event.preventDefault();
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState(
      {
        seuil: {
          ...this.state.seuil,
          [fieldName]: fleldVal,
        },
      },
      () => {
        this.checkForm();
      }
    );
  }

  checkForm() {
    let ispoint = false;
    let ismontant = false;

    if (this.state.seuil.point != null) {
      if (this.state.seuil.point > 0) {
        ispoint = true;
      }
    }
    if (this.state.seuil.montant != null) {
      if (this.state.seuil.montant > 0) {
        ismontant = true;
      }
    }

    this.setState({
      formOK: ispoint && ismontant,
    });
  }
  doSave = (event) => {
    this.props.onSave(this.state.seuil);
    this.handleClose();
  };

  doUpdate = (event) => {
    this.props.onSave(this.state.seuil);
    this.handleClose();
  };

  doDelete = (event) => {
    this.props.onDelete(this.state.seuil);
    this.handleClose();
  };

  render() {
    return (
      <>
        <div className={this.props.seuil === null ? "mb-4" : ""}>
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
          className="modal-dialog"
        >
          <Modal.Header closeButton>
            {this.props.seuil === null ? (
              <Modal.Title>Ajout du seuil</Modal.Title>
            ) : (
              <Modal.Title>Modification du seuil</Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="pointControl">
                <Form.Label>Point</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Entrer le point du seuil"
                  value={this.state.seuil != null ? this.state.seuil.point : ""}
                  name="point"
                  onChange={this.handleChange.bind(this)}
                />
                <Form.Text className="text-muted">
                  Les clients ayant atteint ce point aurons droit à un achat du
                  montant ci-dessous.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="montantControl">
                <Form.Label>Montant</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Entrer le montant"
                  value={
                    this.state.seuil != null ? this.state.seuil.montant : ""
                  }
                  name="montant"
                  onChange={this.handleChange.bind(this)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          {this.props.seuil === null ? (
            <Modal.Footer>
              <Button
                disabled={!this.state.formOK}
                variant="primary"
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

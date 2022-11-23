import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";

export default class CategorieModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      categorie: null,
      formOK: false,
    };
  }

  handleClose = () => {
    this.setState({
      //Vider tous les champs ici
      categorie: null,
      show: false,
      formOK: false,
    });
  };
  handleShow = () => {
    this.setState({
      show: true,
      categorie: this.props.categorie,
      formOK: this.props.categorie != null,
    });
  };

  handleChange(event) {
    // console.log(this.state);
    // event.preventDefault();
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState(
      {
        categorie: {
          ...this.state.categorie,
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

    if (this.state.categorie.nom != null) {
      if (this.state.categorie.nom.length > 0) {
        isnom = true;
      }
    }

    this.setState({
      formOK: isnom,
    });
  }

  componentDidMount() {
    this.setState({
      categorie: this.props.categorie,
      formOK: this.props.categorie != null,
    });
  }

  doSave = (event) => {
    this.props.onSave(this.state.categorie);
    this.handleClose();
  };

  doUpdate = (event) => {
    this.props.onSave(this.state.categorie);
    this.handleClose();
  };

  doDelete = (event) => {
    this.props.onDelete(this.state.categorie);
    this.handleClose();
  };

  render() {
    return (
      <>
        <div className={this.props.categorie === null ? "mb-4" : ""}>
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
            {this.props.categorie === null ? (
              <Modal.Title>Nouvelle catégorie</Modal.Title>
            ) : (
              <Modal.Title>Modification catégorie</Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrer le nom"
                  value={
                    this.state.categorie != null ? this.state.categorie.nom : ""
                  }
                  name="nom"
                  onChange={this.handleChange.bind(this)}
                />
                <Form.Text className="text-muted">
                  Soyez sure que le nom ne se repète pas.
                </Form.Text>
              </Form.Group>
            </Form>
          </Modal.Body>
          {this.props.categorie === null ? (
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

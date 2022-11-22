import React, { Component } from "react";
import Button from "react-bootstrap/esm/Button";

import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";

import * as categorieService from "../../services/CategorieService";
import Categorie from "../../models/Categorie";

export default class ArticleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      article: null,
      listCategorie: [],
      formOK: false,
    };
  }

  getLIstCategorie() {
    categorieService.getCategorie().then((categories) => {
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

  handleClose = () => {
    this.setState({
      //Vider tous les champs ici
      article: null,
      show: false,
      formOK: false,
    });
  };
  handleShow = () => {
    this.setState({
      show: true,
      article: this.props.article,
      formOK: this.props.article != null,
    });
    this.getLIstCategorie();
  };

  handleChange(event) {
    // console.log(this.fiel);
    // event.preventDefault();
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState(
      {
        article: {
          ...this.state.article,
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
    let isdescription = false;
    let isqteJour = false;
    let isprix = false;
    let ispoint = false;
    let iscategorieId = false;
    if (this.state.article.nom != null) {
      if (this.state.article.nom.length > 0) {
        isnom = true;
      }
    }
    if (this.state.article.description != null) {
      if (this.state.article.description.length > 0) {
        isdescription = true;
      }
    }
    if (this.state.article.qteJour != null) {
      if (this.state.article.qteJour > 0) {
        isqteJour = true;
      }
    }
    if (this.state.article.prix != null) {
      if (this.state.article.prix > 0) {
        isprix = true;
      }
    }
    if (this.state.article.point != null) {
      if (this.state.article.point > 0) {
        ispoint = true;
      }
    }
    if (this.state.article.categorieId != null) {
      if (this.state.article.categorieId > 0) {
        iscategorieId = true;
      }
    }

    this.setState({
      formOK:
        isnom &&
        isdescription &&
        isqteJour &&
        isprix &&
        ispoint &&
        iscategorieId,
    });
  }

  componentDidMount() {
    this.setState({
      article: this.props.article,
      formOK: this.props.article != null,
    });
  }
  doSave = (event) => {
    this.props.onSave(this.state.article);
    this.handleClose();
  };

  doUpdate = (event) => {
    this.props.onSave(this.state.article);
    this.handleClose();
  };

  doDelete = (event) => {
    this.props.onDelete(this.state.article);
    this.handleClose();
  };
  render() {
    return (
      <>
        <div className={this.props.article === null ? "mb-4" : ""}>
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
            {this.props.article === null ? (
              <Modal.Title>Nouveau Article</Modal.Title>
            ) : (
              <Modal.Title>Modification Article</Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrer le nom de l'article"
                  value={
                    this.state.article != null ? this.state.article.nom : ""
                  }
                  name="nom"
                  onChange={this.handleChange.bind(this)}
                />
                {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrer la description"
                  value={
                    this.state.article != null
                      ? this.state.article.description
                      : ""
                  }
                  name="description"
                  onChange={this.handleChange.bind(this)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Qte Journalière</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Entrer la quantité journalière de vente"
                  value={
                    this.state.article != null ? this.state.article.qteJour : ""
                  }
                  name="qteJour"
                  onChange={this.handleChange.bind(this)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Prix</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Entrer le prix unitaire"
                  value={
                    this.state.article != null ? this.state.article.prix : ""
                  }
                  name="prix"
                  onChange={this.handleChange.bind(this)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Point de fidelité</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Entrer le point de fidelité lors de l'achat"
                  value={
                    this.state.article != null ? this.state.article.point : ""
                  }
                  name="point"
                  onChange={this.handleChange.bind(this)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Catégorie</Form.Label>
                {/* <Form.Control
                  type="text"
                  placeholder="Selectionner la Categorie"
                  value={
                    this.state.article != null
                      ? this.state.article.categorieId
                      : ""
                  }
                  name="categorieId"
                  onChange={this.handleChange.bind(this)}
                /> */}
                <Form.Select
                  aria-label="Default select example"
                  name="categorieId"
                  value={
                    this.state.article != null
                      ? this.state.article.categorieId
                      : 0
                  }
                  onChange={this.handleChange.bind(this)}
                >
                  <option value={0}>Selectionner une catégorie</option>
                  {this.state.listCategorie.map((categorie, index) => (
                    <option
                      key={categorie.id}
                      // selected={
                      //   this.props.article != null &&
                      //   this.props.article.categorieId === categorie.id
                      // }
                      value={categorie.id}
                    >
                      {categorie.nom}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          {this.props.article === null ? (
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

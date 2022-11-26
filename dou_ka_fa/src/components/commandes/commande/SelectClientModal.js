import React, { Component } from "react";
import Button from "react-bootstrap/esm/Button";

import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import Client from "../../../models/Client";
import * as clientService from "../../../services/ClientService";
import ClientModal from "../../clients/ClientModal";

export default class SelectClientModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      listClient: [],
      tableRows: [],
      searchWord: "",
      client: null,
    };
  }

  getLIstClient() {
    clientService.getClient().then((clients) => {
      let list = [];
      clients.forEach((client) => {
        let cl = new Client(
          client.id,
          client.nom,
          client.prenom,
          client.telephone,
          client.adresse,
          client.point,
          client.photo
        );
        list.push(cl);
      });
      this.setState(
        {
          listClient: list,
          tableRows: [...list],
        },
        () => {}
      );
    });
  }

  handleClose = () => {
    this.setState(
      {
        show: false,
      },
      () => {
        this.props.onClose(this.state.client);
      }
    );
  };
  handleShow = () => {
    this.setState({
      show: true,
      client: null,
    });
  };
  handleChange(event) {
    let fleldVal = event.target.value;
    this.setState(
      {
        searchWord: fleldVal,
      },
      () => {
        // this.checkForm();
      }
    );
  }

  search = () => {
    // console.log("search", this.state.searchWord);
    if (this.state.searchWord.length > 0) {
      this.setState({
        tableRows: [...this.state.listClient].filter(
          (art) =>
            art.nom.includes(this.state.searchWord) ||
            art.prenom
              .toLowerCase()
              .includes(this.state.searchWord.toString().toLowerCase()) ||
            art.telephone
              .toLowerCase()
              .toString()
              .includes(this.state.searchWord.toString().toLowerCase())
        ),
      });
    } else {
      this.setState({
        tableRows: [...this.state.listClient],
      });
    }
  };

  choisirClient = (client) => {
    this.setState(
      {
        client: client,
      },
      () => {
        this.handleClose();
      }
    );
  };

  onSave = (client) => {
    clientService.saveAndReturnClient(client).then((result) => {
      this.choisirClient(result);
    });
  };

  componentDidMount() {
    this.getLIstClient();
  }
  render() {
    return (
      <>
        <Button
          style={{ position: "relative", top: "2rem" }}
          className="btn btn-block btn-success"
          onClick={this.handleShow}
        >
          Selectionner un client
        </Button>
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
            <Modal.Title>Selectionner un client</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ClientModal
              libelle={"Nouveau Client"}
              add={true}
              client={null}
              btnStyle="btn btn-block btn-success"
              btnIcon="bi-plus-circle"
              onSave={this.onSave}
            />

            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-9">
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Control
                          size="sm"
                          type="text"
                          placeholder="Recherche"
                          value={this.state.searchWord}
                          name="word"
                          autoComplete="off"
                          onChange={this.handleChange.bind(this)}
                        />
                        {/* <Form.Text className="text-muted">
                                  <p className="mb-1">*Par Categorie: c#mot</p>
                                  <p>*Par Nom: c#mot</p>
                                </Form.Text> */}
                      </Form.Group>
                    </Form>
                  </div>
                  <div className="col-md-3">
                    <Button
                      // disabled={!this.state.formOK}
                      className="btn btn-block btn-sm"
                      variant="success"
                      onClick={this.search}
                    >
                      <i className="bi bi-search"></i>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th width={20}>#</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Téléphone</th>
                  <th width={50}></th>
                </tr>
              </thead>
              <tbody>
                {this.state.tableRows.map((client, index) =>
                  index < 10 ? (
                    <tr key={client.id}>
                      <td>{index + 1}</td>
                      <td>{client.nom}</td>
                      <td>{client.prenom}</td>
                      <td>{client.telephone}</td>
                      <td>
                        <Button
                          className="btn btn-block btn-success btn-sm"
                          onClick={() => {
                            this.choisirClient(client);
                          }}
                        >
                          <i className="bi bi-check"></i>
                        </Button>
                      </td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

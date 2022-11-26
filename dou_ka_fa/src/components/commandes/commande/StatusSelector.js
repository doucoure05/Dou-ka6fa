import React, { Component } from "react";
import Button from "react-bootstrap/esm/Button";

import Modal from "react-bootstrap/Modal";
export default class StatusSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      statut: null,
    };
  }

  handleClose = () => {
    this.setState(
      {
        show: false,
      },
      () => {
        this.props.onClose(this.state.statut);
      }
    );
  };
  handleShow = () => {
    this.setState({
      show: true,
      statut: null,
    });
  };

  choisirStatut = (statut) => {
    this.setState(
      {
        statut: statut,
      },
      () => {
        this.handleClose();
      }
    );
  };

  render() {
    return (
      <>
        <Button variant="secondary" onClick={this.handleShow}>
          Modifier l'etat
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
            <Modal.Title>Selectionner l'etat de la commande</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table className="table">
              <thead>
                <tr>
                  <th width={20}>#</th>
                  <th>Libellé</th>
                  <th width={50}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span class="badge bg-secondary">EAPR</span>
                  </td>
                  <td>En attente de préparation</td>
                  <td>
                    <Button
                      className="btn btn-block btn-success btn-sm"
                      onClick={() => {
                        this.choisirStatut(0);
                      }}
                    >
                      <i className="bi bi-check"></i>
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span class="badge bg-danger">ECPR</span>
                  </td>
                  <td>En cours de préparation</td>
                  <td>
                    <Button
                      className="btn btn-block btn-success btn-sm"
                      onClick={() => {
                        this.choisirStatut(1);
                      }}
                    >
                      <i className="bi bi-check"></i>
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span class="badge bg-warning">EALI</span>
                  </td>
                  <td>En attente de livraison</td>
                  <td>
                    <Button
                      className="btn btn-block btn-success btn-sm"
                      onClick={() => {
                        this.choisirStatut(2);
                      }}
                    >
                      <i className="bi bi-check"></i>
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span class="badge bg-primary">ECLI</span>
                  </td>
                  <td>En cours de livraison</td>
                  <td>
                    <Button
                      className="btn btn-block btn-success btn-sm"
                      onClick={() => {
                        this.choisirStatut(3);
                      }}
                    >
                      <i className="bi bi-check"></i>
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span class="badge bg-success">EAPA</span>
                  </td>
                  <td>En attente de payement</td>
                  <td>
                    <Button
                      className="btn btn-block btn-success btn-sm"
                      onClick={() => {
                        this.choisirStatut(4);
                      }}
                    >
                      <i className="bi bi-check"></i>
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

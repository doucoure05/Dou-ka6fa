// import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import LignePromotionModal from "./LignePromotionModal";
import Form from "react-bootstrap/Form";

import React, { Component } from "react";

export default class PromotionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            promo: null,
            formOK: false,
            listePromotion: [],
        };
    }

    //   const [show, setShow] = useState(false);

    handleClose = () => {
        this.setState({
            //Vider tous les champs ici
            promo: null,
            show: false,
            formOK: false,
        });
    };
    handleShow = () => {
        this.setState({
            show: true,
            promo: this.props.promo,
            formOK: this.props.promo != null,
        });
    };

    handleChange(event) {
        // console.log(this.state);
        let fieldName = event.target.name;
        let fleldVal = event.target.value;
        this.setState(
            {
                promo: {
                    ...this.state.promo,
                    [fieldName]: fleldVal,
                },
            },
            () => {
                this.checkForm();
            }
        );
    }

    checkForm() {
        let isprixpromotion = false;
        let isdatepromotion = false;
        let islibelle = false;
        if (this.state.promo.prixPromotion != null) {
            if (this.state.promo.prixPromotion.length > 0) {
                isprixpromotion = true;
            }
        }
        if (this.state.promo.datePromotion != null) {
            if (this.state.promo.datePromotion.length > 0) {
                isdatepromotion = true;
            }
        }
        if (this.state.promo.libelle != null) {
            if (this.state.promo.libelle.length > 0) {
                islibelle = true;
            }
        }

        this.setState({
            formOK: isprixpromotion && isdatepromotion && islibelle,
        });
    }

    componentDidMount() {
        this.setState({
            promo: this.props.promo,
        });
    }

    doSave = (event) => {
        this.props.onSave(this.state.promo);
        this.handleClose();
    };

    doUpdate = (event) => {
        this.props.onSave(this.state.promo);
        this.handleClose();
    };

    doDelete = (event) => {
        this.props.onDelete(this.state.promo);
        this.handleClose();
    };
    render() {
        return (
            <>
                <div className={this.props.promo === null ? "mb-4" : ""}>
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
                        {this.props.promo === null ? (
                            <Modal.Title>Nouvelle Promotion</Modal.Title>
                        ) : (
                            <Modal.Title> Promotion</Modal.Title>
                        )}
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>prix Promotion</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Entrer le prix"
                                    value={this.state.promo != null ? this.state.promo.prixPromotion : ""}
                                    name="prixPromotion"
                                    onChange={this.handleChange.bind(this)}
                                />
                                {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Date Promotion</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Entrer la date"
                                    value={
                                        this.state.promo != null ? this.state.promo.datePromotion : ""
                                    }
                                    name="datePromotion"
                                    onChange={this.handleChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Libelle Promotion</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Entrer le Libelle Promotion"
                                    value={
                                        this.state.promo != null ? this.state.promo.libelle : ""
                                    }
                                    name="libelle"
                                    onChange={this.handleChange.bind(this)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    {this.props.promo === null ? (
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
                            <Button variant="secondary" onClick={this.handleClose}>
                                Annuler
                            </Button>
                        </Modal.Footer>
                    ) : (
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
                            {/* <LignePromotionModal
                                libelle={"Ajout de plat au menu"}
                                add={true}
                                LPpromo={null}
                                btnStyle="btn btn-block btn-success"
                                btnIcon="bi-plus-circle"
                                onSave={this.onSave}
                            /> */}
                        </Modal.Footer>
                    )}
                    <table className="table">
                        <thead>
                            <tr>
                                <th width={50}>ID</th>
                                <th>Prix promotion</th>
                                <th>Date promotion</th>
                                <th>Libelle promotion</th>
                                <th width={100}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.listePromotion.map((promo, index) => (
                                <tr key={promo.id}>
                                    <td>{promo.id}</td>
                                    <td>{promo.prixPromotion}</td>
                                    <td>{promo.datePromotion}</td>
                                    <td>{promo.libelle}</td>
                                    <td>
                                        {/* <Link
                      to={`edit/${client.id}`}
                      className="button is-small is-info"
                    >
                      Editer
                    </Link> */}
                                        {/* <LignePromotionModal
                                            // title
                                            libelle={"Ajouter plat"}
                                            add={true}
                                            LPpromo={promo}
                                            btnStyle="button is-small is-info"
                                            onSave={this.onSave}
                                            onDelete={this.onDelete}
                                            btnIcon="bi bi-pencil"
                                        /> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Modal>
            </>
        );
    }
}

// export default PromotionModal;

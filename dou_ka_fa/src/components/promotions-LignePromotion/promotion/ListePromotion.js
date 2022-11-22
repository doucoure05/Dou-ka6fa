import React, { Component } from "react";
import { Link } from "react-router-dom";
import Promotion from "../../../models/Promotion.js";
import * as service from "../../../services/PromotionService.js";
import PromotionModal from "./PromotionModal.js";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import LignePromotionModal from "./LignePromotionModal";
// import LignePromotion from "../../../models/LignePromotion";
import * as LignePromotionService from "../../../services/LignePromotionService";
import axios from "axios";

export default class ListePromotion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listePromotion: [],
      //listeLignePromotion: [],
      toastShow: false,
      toastLibelle: "",
    };
  }

  getLIstPromotion() {
    service.getPromotion().then((promotions) => {
      let list = [];
      promotions.forEach((promotion) => {
        let promo = new Promotion(
          promotion.id,
          promotion.prixPromotion,
          promotion.datePromotion,
          promotion.libelle
        );
        list.push(promo);
      });
      this.setState(
        {
          listePromotion: list,
        },
        () => {}
      );
    });
  }

  // getLIstLignePromotion() {
  //     LignePromotionService.getLignePromotion().then((lignepromotions) => {
  //         let list = [];
  //         lignepromotions.forEach((lignepromotion) => {
  //             let lppromo = new LignePromotion(
  //                 lignepromotion.id,
  //                 lignepromotion.prixPromotion,
  //                 lignepromotion.datePromotion,
  //                 lignepromotion.libelle
  //             );
  //             list.push(lppromo);
  //         });
  //         this.setState(
  //             {
  //                 listeLignePromotion: list,
  //             },
  //             () => { }
  //         );
  //     });
  // }

  componentDidMount() {
    this.getLIstPromotion();
  }

  onSave = (promotion) => {
    service.savePromotion(promotion).then((result) => {
      this.getLIstPromotion();
      let msg =
        result.msg === "success"
          ? "Ajout effectué avec succès."
          : "Une erreur est intervenu lors de l'ajout.";
      this.toggleToastShow(msg);
    });
  };

  onSaveLP = (lignepromotion) => {
    LignePromotionService.saveLignePromotion(lignepromotion).then((result) => {
      //this.getLignePromoPerPromo(lignepromotion.promotionId);
      // let msg =
      //     result.msg === "success"
      //         ? "Ajout effectué avec succès."
      //         : "Une erreur est intervenu lors de l'ajout de plat."; this.getLignePromoPerPromo(lignepromotion.promotionId);
      //                      this.toggleToastShow(msg);
    });
  };
  onUpdate = (promotion) => {
    service.updatePromotion(promotion).then((result) => {
      this.getLIstPromotion();
      let msg =
        result.msg === "success"
          ? "Modification effectué avec succès."
          : "Une erreur est intervenu lors de la modification.";
      this.toggleToastShow(msg);
    });
  };

  deleteLignePromotion = (id) => {
    //const [list,setListeLignePromotion] = useState([]);
    try {
      // let list = this.state.listeLignePromotion.filter((c) => c.id !== id);
      // // console.log("List of l: ", list);
      // this.state.listeLignePromotion.length = 0;
      // // console.log("List of listeLignePromotion: ", this.state.listeLignePromotion);
      // this.setState({
      //     listeLignePromotion: list
      // })
      // console.log("List of listeLignePromotion: ", this.state.listeLignePromotion);
      const response = axios.delete(
        `http://localhost:5000/deleteLignePromotionAttachToPromo/${id}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  DeletePromotion = (id) => {
    this.deleteLignePromotion(id);
    const response2 = axios.delete(`http://localhost:5000/promotion/${id}`);
    let list = this.state.listePromotion.filter((c) => c.id !== id);
    // console.log("List of l: ", list);
    this.state.listePromotion.length = 0;
    // console.log("List of listeLignePromotion: ", this.state.listeLignePromotion);
    this.setState({
      listePromotion: list,
    });
    // try {
    // let list = this.state.listePromotion.filter((c) => c.id !== id);
    // // console.log("List of l: ", list);
    // this.state.listePromotion.length = 0;
    // // console.log("List of listeLignePromotion: ", this.state.listeLignePromotion);
    // this.setState({
    //     listePromotion: list
    // })
    //     // console.log("List of listeLignePromotion: ", this.state.listeLignePromotion);
    //     const response2 = axios.delete(`http://localhost:5000/promotion/${id}`);
    //     // const response1 = axios.delete(`http://localhost:5000/deleteLignePromotionAttachToPromo/${id}`);

    //     return response2.data;
    // } catch (error) {
    //     console.log(error);
    //     return null;
    // }
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
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Liste des Menu du Jour</h1>
              </div>
              {/* <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <Link className="nav-link" to="/home">
                                            Acceuil
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item active">Liste des clients</li>
                                </ol>
                            </div> */}
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            {/* <Link to="/client/add" className="button is-success">
            {
              //Ajouter l'cone plus ici
            }
            Nouveau client
          </Link> */}
            <PromotionModal
              libelle={"Nouvelle promotion"}
              add={true}
              promotion={null}
              btnStyle="btn btn-block btn-success"
              btnIcon="bi-plus-circle"
              onSave={this.onSave}
            />
            <table className="table">
              <thead>
                <tr>
                  <th width={50}>ID</th>
                  <th>Prix promotion</th>
                  <th>Date promotion</th>
                  <th>Libelle promotion</th>
                  <th width={100}>Ajouter</th>
                  <th width={100}>Supprimer</th>
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
                      <LignePromotionModal
                        // title
                        libelle={"Ajout de plat"}
                        idpro={promo.id}
                        add={true}
                        btnStyle="button is-small is-info"
                        // onSaveLP={this.onSaveLP}
                        //onDeleteLP={this.onDeleteLP}
                        btnIcon="bi bi-pencil"
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-block btn-danger btn-sm"
                        onClick={() => {
                          this.DeletePromotion(promo.id);
                        }}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {this.state.listePromotion.length > 0 ? null : (
              <h2 className="text-center display-4">Aucun élément trouvé</h2>
            )}
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

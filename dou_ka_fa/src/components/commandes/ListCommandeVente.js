import React, { Component } from "react";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ListeCommande from "./commande/ListeCommande";
import ListVente from "./vente/ListVente";

export default class ListCommandeVente extends Component {
  render() {
    return (
      <>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">
                <h1>Commandes/Ventes</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link className="nav-link" to="/home">
                      Acceuil
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">Liste des articles</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <div className="dropdown-divider"></div>
        <section className="content">
          <div className="container-fluid">
            {/* <div className="row">
              <div className="col-md-12">
                <div className="card card-success card-outline">
                  <div className="card-header">
                    <h3 className="card-title">Commande en cours</h3>
                  </div>
                  <div className="card-body">
                    <ListeCommande />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card card-success card-outline">
                  <div className="card-header">
                    <h3 className="card-title">Liste des ventes</h3>
                  </div>
                  <div className="card-body">
                    <ListVente />
                  </div>
                </div>
              </div>
            </div> */}
            <ListVente />
          </div>
        </section>
      </>
    );
  }
}

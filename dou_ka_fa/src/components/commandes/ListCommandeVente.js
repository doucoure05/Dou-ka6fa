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
              <div className="col-sm-12 text-center">
                <h1>Commandes/Ventes</h1>
              </div>
            </div>
          </div>
        </section>
        <div className="dropdown-divider"></div>
        <section className="content">
          <div className="container-fluid">
            <ListVente />
          </div>
        </section>
      </>
    );
  }
}

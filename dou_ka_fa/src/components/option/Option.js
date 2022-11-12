import React, { Component } from "react";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ListCategorie from "./categorie/ListCategorie";

export default class Option extends Component {
  render() {
    return (
      <>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">
                <h1>Options</h1>
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
        <section className="content">
          <div className="container-fluid">
            <Tabs
              defaultActiveKey="categorie"
              id="option-tab"
              className="myTab"
            >
              <Tab eventKey="categorie" title="Catégorie">
                <ListCategorie />
              </Tab>
              <Tab eventKey="seuil" title="Seuil">
                Seuil
              </Tab>
            </Tabs>
          </div>
        </section>
      </>
    );
  }
}

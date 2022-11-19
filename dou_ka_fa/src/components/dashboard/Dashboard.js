import React, { Component } from "react";
import * as clientService from "../../services/ClientService";
import * as articleService from "../../services/ArticleService";
import * as categorieService from "../../services/CategorieService";
import Categorie from "../../models/Categorie";
import Article from "../../models/Article";
import Client from "../../models/Client";
import * as dashService from "../../services/DashService";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listClient: [],
      listArticle: [],
      listCategorie: [],
      clientsFidele: [],
      produitVendus: [],
      venteJ: 0,
      venteM: 0,
      menuVenduJ: 0,
      menuVenduM: 0,
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
        },
        () => {}
      );
    });
  }

  getLIstArticle() {
    articleService.getArticle().then((articles) => {
      let list = [];
      articles.forEach((article) => {
        let ar = new Article(
          article.id,
          article.nom,
          article.description,
          article.qteJour,
          article.prix,
          article.photo,
          article.point,
          article.categorieId
        );
        list.push(ar);
      });
      this.setState(
        {
          listArticle: list,
        },
        () => {
          //   console.log(this.state.listArticle);
        }
      );
    });
  }
  getCategorieName = (id) => {
    let cat =
      this.state.listCategorie.filter((c) => c.id === id).length > 0
        ? this.state.listCategorie.filter((c) => c.id === id)[0]
        : null;
    if (cat != null) {
      return cat.nom;
    } else return "";
    // return cat.nom;
  };

  getArticleName = (id) => {
    let art =
      this.state.listArticle.filter((a) => a.id === Number(id)).length > 0
        ? this.state.listArticle.filter((a) => a.id === Number(id))[0]
        : null;
    if (art != null) {
      return art.nom + "(" + this.getCategorieName(art.categorieId) + ")";
    } else return "";
  };

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

  getClientFidele() {}

  getMenuPlusVendu() {}

  getVentePeriod() {}

  getMenuVenduPeriod() {}

  componentDidMount() {
    this.getLIstClient();
    this.getLIstCategorie();
    this.getLIstArticle();

    this.getClientFidele();
    this.getMenuPlusVendu();
    this.getVentePeriod();
    this.getMenuVenduPeriod();
  }

  render() {
    return (
      <>
        <div>
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Acceuil</h1>
                </div>
              </div>
            </div>
          </section>
          <div className="dropdown-divider"></div>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-info">
                    <div className="inner">
                      <h2 className="text-center" style={{ color: "white" }}>
                        Total Client
                      </h2>
                      <h3 className="text-center" style={{ color: "white" }}>
                        {this.state.listClient.length}
                      </h3>
                    </div>
                    <div className="icon ">
                      <i className="bi bi-eye"></i>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-info">
                    <div className="inner">
                      <h2 className="text-center" style={{ color: "white" }}>
                        Total Menu
                      </h2>
                      <h3 className="text-center" style={{ color: "white" }}>
                        {this.state.listArticle.length}
                      </h3>
                    </div>
                    <div className="icon">
                      <i className="bi bi-eye"></i>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-info">
                    <div className="inner">
                      <h2 className="text-center" style={{ color: "white" }}>
                        Vente(J/M)
                      </h2>
                      <h3 className="text-center" style={{ color: "white" }}>
                        {this.state.venteJ + "/" + this.state.venteM}
                      </h3>
                    </div>
                    <div className="icon">
                      <i className="bi bi-eye"></i>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-info">
                    <div className="inner">
                      <h2 className="text-center" style={{ color: "white" }}>
                        Menu Vendu(J/M)
                      </h2>
                      <h3 className="text-center" style={{ color: "white" }}>
                        {this.state.menuVenduJ + "/" + this.state.menuVenduM}
                      </h3>
                    </div>
                    <div className="icon">
                      <i className="bi bi-eye"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">
                        Clients les + <strong>fidèle</strong>
                      </h3>
                    </div>
                    <div className="card-body p-0">
                      <table className="table">
                        <thead>
                          <tr>
                            <th style={{ width: "10px" }}>#</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Téléphone</th>
                            <th>Point de fidelité</th>
                          </tr>
                        </thead>
                        <tbody></tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">
                        Menus les + <strong>vendu</strong>
                      </h3>
                    </div>
                    <div className="card-body p-0">
                      <table className="table">
                        <thead>
                          <tr>
                            <th style={{ width: "10px" }}>#</th>
                            <th>Nom</th>
                            <th>Prix</th>
                            <th>Catégorie</th>
                            <th>Point de fidelité</th>
                            <th>Qte Vendu</th>
                          </tr>
                        </thead>
                        <tbody></tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }
}

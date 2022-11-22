import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import {
  //   BrowserRouter as Router,
  Route,
  Routes,
  Link,
  BrowserRouter,
} from "react-router-dom";

import UserList from "./users/UserList";

import ListClient from "./clients/ListClient";
import ListArticle from "./articles/ListArticle";
import Option from "./option/Option";
import ListCommandeVente from "./commandes/ListCommandeVente";
import MenuJourTouMenu from "./promotions-LignePromotion/MenuJourTouMenu.js";
import AddUser from "./users/AddUser";
import Dashboard from "./dashboard/Dashboard";

export default class Base extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "Acceuil",
    };
  }
  handleActive = (event) => {
    // console.log(event.target.text);
    this.setState({
      active: event.target.text.trim(),
    });
  };
  render() {
    return (
      <>
        <BrowserRouter>
          <div className="hold-transition layout-top-nav">
            <div className="wrapper">
              {/* <nav className="navbar bg-light fixed-top">
            <div className="container-fluid">
              <button
                className="navbar-toggler"
                type="button"
                style={{ fontSize: "0.5rem" }}
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar"
              >
                <img
                  height={30}
                  width={40}
                  src="images/panier.png"
                  alt="panier"
                />
              </button>
              <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
              >
                <div className="offcanvas-header">
                  <div className="offcanvas-title" id="offcanvasNavbarLabel">
                    <button
                      type="button"
                      // className="btn-close"
                      className="navbar-toggler"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    >
                      <img
                        className="text-center"
                        height={30}
                        width={40}
                        src="/images/panier.png"
                        alt="panier"
                      />
                    </button>
                  </div>
                </div>
                <div className="offcanvas-body">
                  <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li className="nav-item">
                      <Link className="nav-link" to="/Home">
                        <i
                          className="bi bi-house"
                          style={{
                            fontSize: "1.5rem",
                            color: "cornflowerblue",
                          }}
                        ></i>{" "}
                        <span style={{ fontSize: "1.5rem" }}>Acceuil</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/Home">
                        <i
                          className="bi bi-journal"
                          style={{
                            fontSize: "1.5rem",
                            color: "cornflowerblue",
                          }}
                        ></i>{" "}
                        <span style={{ fontSize: "1.5rem" }}>Menu</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/home">
                        <i
                          className="bi bi-cash-coin"
                          style={{
                            fontSize: "1.5rem",
                            color: "cornflowerblue",
                          }}
                        ></i>{" "}
                        <span style={{ fontSize: "1.5rem" }}>
                          Commande/Vente
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/client">
                        <i
                          className="bi bi-house"
                          style={{
                            fontSize: "1.5rem",
                            color: "cornflowerblue",
                          }}
                        ></i>{" "}
                        <span style={{ fontSize: "1.5rem" }}>Client</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav> */}
              <nav className="main-header navbar navbar-expand-md navbar-light navbar-white">
                <div className="container">
                  <div className="navbar-brand">
                    <img
                      src="/images/online-store_256.png"
                      alt="AdminLTE Logo"
                      className="brand-image img-circle elevation-3"
                      style={{ opacity: ".8", marginTop: "5px" }}
                    />
                    <span
                      className="brand-text font-weight-light"
                      style={{ marginTop: "5px", marginLeft: "5px" }}
                    >
                      Doun Ka Fa
                    </span>
                  </div>
                  <div className=" navbar-collapse order-3" id="navbarCollapse">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <Link
                          className={
                            this.state.active === "Acceuil"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to="/home"
                          onClick={this.handleActive}
                        >
                          <i className="bi bi-house"></i> Acceuil
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className={
                            this.state.active === "Menu"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to="/menu"
                          onClick={this.handleActive}
                        >
                          <i className="bi bi-journal"></i> Menu
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className={
                            this.state.active === "Commande/Vente"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to="/commande"
                          onClick={this.handleActive}
                        >
                          <i className="bi bi-cash-coin"></i> Commande/Vente
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className={
                            this.state.active === "Client"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to="/client"
                          onClick={this.handleActive}
                        >
                          <i className="bi bi-house"></i> Client
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className={
                            this.state.active === "Articles"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to="/article"
                          onClick={this.handleActive}
                        >
                          <i className="bi bi-house"></i> Articles
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className={
                            this.state.active === "Options"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to="/option"
                          onClick={this.handleActive}
                        >
                          <i className="bi bi-house"></i> Options
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
              {/* <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <a href="../../index3.html" className="brand-link">
                  <img
                    src="/images/panier.png"
                    alt="AdminLTE Logo"
                    className="brand-image img-circle elevation-3"
                    style={{ opacity: ".8" }}
                  />
                  <span className="brand-text font-weight-light">
                    Doun Ka Fa
                  </span>
                </a>
                <div className="sidebar">
                  <nav className="mt-2">
                    <ul
                      className="nav nav-pills nav-sidebar flex-column"
                      data-widget="treeview"
                      role="menu"
                      data-accordion="false"
                    >
                      <li className="nav-item">
                        <Link
                          className={
                            this.state.active === "Acceuil"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to="/Home"
                          onClick={this.handleActive}
                        >
                          <i className="bi bi-house"></i> Acceuil
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className={
                            this.state.active === "Menu"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to="/mjtm"
                          onClick={this.handleActive}
                        >
                          <i className="bi bi-journal"></i> Menu
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className={
                            this.state.active === "Commande/Vente"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to="/commande"
                          onClick={this.handleActive}
                        >
                          <i className="bi bi-cash-coin"></i> Commande/Vente
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className={
                            this.state.active === "Client"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to="/client"
                          onClick={this.handleActive}
                        >
                          <i className="bi bi-house"></i> Client
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className={
                            this.state.active === "Articles"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to="/article"
                          onClick={this.handleActive}
                        >
                          <i className="bi bi-house"></i> Articles
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className={
                            this.state.active === "Options"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to="/option"
                          onClick={this.handleActive}
                        >
                          <i className="bi bi-house"></i> Options
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </aside> */}
              <div className="content-wrapper">
                <Routes>
                  <Route path="/" element={<Dashboard />}></Route>
                  <Route path="/home" element={<Dashboard />}></Route>
                  <Route path="/add" element={<AddUser />}></Route>
                  <Route path="/client" element={<ListClient />}></Route>
                  <Route path="/article" element={<MenuJourTouMenu />}></Route>
                  <Route path="/option" element={<Option />}></Route>
                  <Route path="/menu" element={<ListArticle />}></Route>
                  <Route
                    path="/commande"
                    element={<ListCommandeVente />}
                  ></Route>
                </Routes>
              </div>
              <footer className="main-footer">
                <div className="float-right d-none d-sm-block">
                  <b>Version</b> 1.0.0
                </div>
                <strong>
                  Copyright &copy; 2021-2022{" "}
                  <a href="https://github.com/doucoure05/Dou-ka6fa">DounKaFa</a>
                  .
                </strong>{" "}
                All rights reserved.
              </footer>
            </div>
          </div>
        </BrowserRouter>
      </>
    );
  }
}

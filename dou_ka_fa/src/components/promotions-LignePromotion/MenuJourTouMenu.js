import React, { Component } from "react";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ListePromotion from "./promotion/ListePromotion.js";
import ToutMenu from "./Tout Menu/ToutMenu.js";

export default class MenuJourTouMenu extends Component {
    render() {
        return (
            <>
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-6">
                                <h1>Menu du jour / Tout Menu</h1>
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
                            defaultActiveKey="menujour"
                            id="option-tab"
                            className="myTab"
                        >
                            <Tab eventKey="menujour" title="Menu du Jour">
                                <ListePromotion />
                            </Tab>
                            <Tab eventKey="toutmenu" title="Tout Menu">
                                <ToutMenu />
                            </Tab>
                        </Tabs>
                    </div>
                </section>
            </>
        );
    }
}

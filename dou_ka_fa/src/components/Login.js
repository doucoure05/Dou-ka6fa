import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  onLog = () => {
    this.props.onLog();
  };
  render() {
    return (
      <>
        <div className="hold-transition login-page">
          <div className="login-box">
            <div className="card card-outline card-primary">
              <div className="card-header text-center">
                <div className="row">
                  <div className="col">
                    <img
                      src="/images/online-store_64.png"
                      alt="AdminLTE Logo"
                      className="brand-image img-circle elevation-3"
                      style={{ opacity: ".8", marginTop: "5px" }}
                    />
                  </div>
                </div>

                <div
                  //   className="brand-text font-weight-light"
                  style={{
                    position: "relative",
                    top: "5px",
                    marginLeft: "5px",
                  }}
                >
                  <span style={{ fontSize: "40px", fontWeight: "bold" }}>
                    Doun Ka Fa
                  </span>
                </div>
              </div>
              <div className="card-body">
                <p className="login-box-msg">Bienvenu!</p>

                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nom d'utilisateur"
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user"></span>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Mot de passe"
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <button
                      className="btn btn-primary btn-block"
                      onClick={this.onLog}
                    >
                      Connecter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Login;

import React, { Component } from "react";
import { getUserByLoginAndPassword } from "../services/UserService";

import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: null,
      password: null,
      formOK: false,
    };
  }

  onLog = () => {
    getUserByLoginAndPassword(this.state.login, this.state.password).then(
      (user) => {
        this.props.onLog(user);
      }
    );
    // this.props.onLog();
  };

  handleChange(event) {
    // console.log(this.state);
    // event.preventDefault();
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState(
      {
        [fieldName]: fleldVal,
      },
      () => {
        this.checkForm();
      }
    );
  }

  checkForm() {
    let islogin = false;
    let ispassword = false;

    if (this.state.login != null) {
      if (this.state.login.length > 0) {
        islogin = true;
      }
    }

    if (this.state.password != null) {
      if (this.state.password.length > 0) {
        ispassword = true;
      }
    }

    this.setState({
      formOK: islogin && ispassword,
    });
  }

  render() {
    return (
      <>
        <div className="hold-transition login-page">
          <div className="login-box">
            <div className="card card-outline card-success">
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
                    name="login"
                    onChange={this.handleChange.bind(this)}
                    value={this.state.login}
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
                    name="password"
                    onChange={this.handleChange.bind(this)}
                    value={this.state.password}
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
                      className="btn btn-success btn-block"
                      disabled={!this.state.formOK}
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

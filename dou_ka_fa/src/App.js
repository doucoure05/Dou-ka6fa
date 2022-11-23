// import logo from "./logo.svg";
import "./App.css";
import // BrowserRouter as Router,
// Route,
// Routes,
// Link,
// BrowserRouter,
"react-router-dom";
import {
  //   BrowserRouter as Router,
  Route,
  Routes,
  Link,
  BrowserRouter,
} from "react-router-dom";

// import UserList from "./components/users/UserList";

// import ListClient from "./components/clients/ListClient";
import Base from "./components/Base";
import Login from "../src/components/Login";
import { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connect: true,
    };
  }

  log = (event) => {
    console.log("ON LOG");
    this.setState({
      connect: true,
    });
  };

  render() {
    return (
      <>
        {this.state.connect ? <Base /> : <Login onLog={this.log.bind(this)} />}

        {/* <Base /> */}
        {/* <BrowserRouter>
          <Routes>
            <Route path="/base" element={<Base />}></Route>
          </Routes>
        </BrowserRouter> */}
      </>
    );
  }
}

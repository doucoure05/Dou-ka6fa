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

function App() {
  return (
    <>
      <Base />
      <BrowserRouter>
        <Routes>
          <Route path="/base" element={<Base />}></Route>
        </Routes>
      </BrowserRouter>
    </>
    // <Base />

    // <Router>
    //   <nav className="navbar navbar-expand navbar-brand m-2">
    //     <ul className="navbar-nav">
    //       <li>
    //         <Link className="nav-link" to="/Login">Login </Link>
    //       </li>
    //     </ul>

    //   </nav>

    //   <div className="m-4">
    //   <Routes>
    //       <Route path="/Login" element={<Login/>} ></Route>
    //     </Routes>
    //   </div>
    // </Router>
  );
}

export default App;

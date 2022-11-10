import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  BrowserRouter,
} from "react-router-dom";
import Login from "./components/Login";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar bg-light fixed-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            style={{ fontSize: "0.5rem" }}
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            {/* <span className="navbar-toggler-icon"></span> */}
            <img height={30} width={40} src="images/panier.png" alt="panier" />
          </button>
          {/* <div className="navbar-brand"></div> */}
          {/* <a  href="#">
            Offcanvas navbar
          </a> */}

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
                      style={{ fontSize: "1.5rem", color: "cornflowerblue" }}
                    ></i>{" "}
                    <span style={{ fontSize: "1.5rem" }}>Acceuil</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Home">
                    <i
                      className="bi bi-journal"
                      style={{ fontSize: "1.5rem", color: "cornflowerblue" }}
                    ></i>{" "}
                    <span style={{ fontSize: "1.5rem" }}>Menu</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/home">
                    <i
                      className="bi bi-cash-coin"
                      style={{ fontSize: "1.5rem", color: "cornflowerblue" }}
                    ></i>{" "}
                    <span style={{ fontSize: "1.5rem" }}>Commande/Vente</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/client">
                    <i
                      className="bi bi-house"
                      style={{ fontSize: "1.5rem", color: "cornflowerblue" }}
                    ></i>{" "}
                    <span style={{ fontSize: "1.5rem" }}>Client</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className="m-4">
        <Routes>
          <Route path="/Home" element={<UserList />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
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

import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Login from "./components/Login";
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<UserList />} ></Route>
            <Route path='add' element={<AddUser />} ></Route>
            <Route path='edit/:id' element={<EditUser />} ></Route>
          </Routes>
        </Router>
      </div>
    </>
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

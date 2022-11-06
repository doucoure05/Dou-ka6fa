import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Login extends Component {

    render(){
        return(
            <>
            <div className="container">
                <h1>ReactJs Axios Mysql CRUD(Create Read Update and Delete)</h1>
                <p><Link to="/create" className="btn btn primary btn-xs">Add User</Link></p>
            </div>
            </>
        );
    }
}

export default Login;
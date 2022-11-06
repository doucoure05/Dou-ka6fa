import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const EditUser = () => {
    const [nom, setNom] = useState("");
    const [login, setLogin] = useState("");
    const [gender, setGender] = useState("Male");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        getUserById();
    }, []);

    const UpdateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/users/${id}`, {
                nom,
                login,
                gender,
                password
            });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    const getUserById = async () =>{
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setNom(response.data.nom);
        setLogin(response.data.login);
        setGender(response.data.gender);
        setPassword(response.data.password);
    }

    return (
        <>
            <div className="colums mt-5 is-centered">
                <div className="column is-half">
                    <form onSubmit={UpdateUser}>
                        <div className="fied">
                            <label className="label">Nom</label>
                            <div className="control">
                                <input type="text" className="input" placeholder='Nom' value={nom} onChange={(e) => { setNom(e.target.value) }} />
                            </div>
                        </div>
                        <div className="fied">
                            <label className="label">Login</label>
                            <div className="control">
                                <input type="text" className="input" placeholder='Login' value={login} onChange={(e) => { setLogin(e.target.value) }} />
                            </div>
                        </div>
                        <div className="fied">
                            <label className="label">Gender</label>
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select value={gender} onChange={(e) => { setGender(e.target.value) }}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="fied">
                            <label className="label">Password</label>
                            <div className="control">
                                <input type="password" className="input" placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            </div>
                        </div>
                        <div className="fied">
                            <button type='submit' className='button is-success'>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditUser
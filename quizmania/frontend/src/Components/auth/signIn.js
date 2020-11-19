import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from '../../context/userContext';
import Axios from "axios";
import ErrorNotice from "../misc/ErrorMsg";
import '../../stylesheets/signin.css'

export default function SignIn() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const loginUser = { email, password };
            const loginRes = await Axios.post(
                "http://192.168.43.24:80/login",
                loginUser
            );
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.userPresent,
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/");
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };
    return (
        <div className="page">
            <h2>Login</h2>
            {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)} />
            )}
            {/* <div className="container"> */}
                <form onSubmit={submit} className='Brown'>
                    <div className='input-field'>
                        <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} required />
                        <span></span>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className='input-field'>
                        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} required/>
                        <span></span>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="log-btn">
                        <button className="btn white black-text">Login</button>
                    </div>
                </form>
            {/* </div> */}
        </div>
    );
}


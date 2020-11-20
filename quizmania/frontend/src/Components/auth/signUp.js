import UserContext from '../../context/userContext';

import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import cookie from 'js-cookie';
import ErrorNotice from "../misc/ErrorMsg";
import '../../stylesheets/signup.css'

export default function Signup() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();

        try {
            const newUser = { firstName, lastName, email, password, password2 };

            await Axios.post("http://192.168.0.100:80/register", newUser);
            const loginRes = await Axios.post("http://192.168.0.100:80/login", {

                email,
                password,
            });
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.userPresent,
            });
            cookie.set("auth-token", loginRes.data.token);
            history.push("/");
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };

    return (
        <div className="register-page">
            <h2>Register</h2>
            {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)} />
            )}
            <div className="register-container">
                <form onSubmit={submit} className='Brown'>
                    <div className='register-input-field'>
                        <input type="text" id="firstName" onChange={(e) => setFirstName(e.target.value)} required autoComplete="off" />
                        <span></span>
                        <label htmlFor="firstName">First Name</label>
                    </div>
                    <div className='register-input-field'>
                        <input type="text" id="lastName" onChange={(e) => setLastName(e.target.value)} required autoComplete="off" />
                        <span></span>
                        <label htmlFor="lastName">Last Name</label>
                    </div>
                    <div className='register-input-field'>
                        <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} required autoComplete="off" />
                        <span></span>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className='register-input-field'>
                        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} required autoComplete="off" />
                        <span></span>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className='register-input-field'>
                        <input type="password" id="password2" onChange={(e) => setPassword2(e.target.value)} required autoComplete="off" />
                        <span></span>
                        <label htmlFor="password">Confirm Password</label>
                    </div>
                    <div className='register-log-btn'>
                        <button className="btn white black-text">SignUp</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

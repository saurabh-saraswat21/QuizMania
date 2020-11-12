import UserContext from '../../context/userContext';

import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorMsg";

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
            await Axios.post("http://192.168.0.104:80/register", newUser);
            const loginRes = await Axios.post("http://192.168.0.104:80/login", {
                email,
                password,
            });
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
            <h2>Register</h2>
            {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)} />
            )}
            <div className="container">
                <form onSubmit={submit} className='Brown'>
                    <h5 className="white-text">Sign Up</h5>
                    <div className='input-field'>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className='input-field'>
                        <label htmlFor="lastName">First Name</label>
                        <input type="text" id="lastName" onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className='input-field'>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='input-field'>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='input-field'>
                        <label htmlFor="password">Confirm Password</label>
                        <input type="password" id="password2" onChange={(e) => setPassword2(e.target.value)} />
                    </div>
                    <div className='input-field'>
                        <button className="btn white black-text">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// class signIn extends Component {
//     state = {
//         firstName: '',
//         lastName: '',
//         email: '',
//         password: ''
//     }
//     setUserData = useContext(UserContext);
//     handleChange = (e) => {
//         this.setState({
//             [e.target.id]: e.target.value
//         })
//     }
//     handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log(this.state);
//         await axios.post('http://192.168.0.104:80/register', this.state);
//         const loginRes = await axios.post('http://192.168.0.104:80/login', { email: this.state.email, password: this.state.password });
//         this.setUserData({
//             token: loginRes.data.token,
//             user: loginRes.data.user
//         })
//     }
//     render() {
//         return (
            // <div className="container">
            //     <form onSubmit={this.handleSubmit} className='Brown'>
            //         <h5 className="white-text">Sign Up</h5>
            //         <div className='input-field'>
            //             <label htmlFor="firstName">First Name</label>
            //             <input type="text" id="firstName" onChange={this.handleChange} />
            //         </div>
            //         <div className='input-field'>
            //             <label htmlFor="lastName">First Name</label>
            //             <input type="text" id="lastName" onChange={this.handleChange} />
            //         </div>
            //         <div className='input-field'>
            //             <label htmlFor="email">Email</label>
            //             <input type="email" id="email" onChange={this.handleChange} />
            //         </div>
            //         <div className='input-field'>
            //             <label htmlFor="password">Password</label>
            //             <input type="password" id="password" onChange={this.handleChange} />
            //         </div>
            //         <div className='input-field'>
            //             <label htmlFor="password">Confirm Password</label>
            //             <input type="password" id="password2" onChange={this.handleChange} />
            //         </div>
            //         <div className='input-field'>
            //             <button className="btn white black-text">Sign Up</button>
            //         </div>
            //     </form>
            // </div>
//         )
//     }
// }

// export default signIn

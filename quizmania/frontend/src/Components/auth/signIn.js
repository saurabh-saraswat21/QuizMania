import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from '../../context/userContext';
import Axios from "axios";
import ErrorNotice from "../misc/ErrorMsg";

export default function Login() {
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
                "http://192.168.0.104:80/login",
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
            <h2>Log in</h2>
            {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)} />
            )}
            <div className="container">
                <form onSubmit={submit} className='Brown'>
                    <h5 className="white-text">Sign In</h5>
                    <div className='input-field'>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='input-field'>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='input-field'>
                        <button className="btn white black-text">Log in</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
// class signIn extends Component {
//     state = {
//         email: '',
//         password: ''
//     }
//     handleChange = (e) => {
//         this.setState({
//             [e.target.id]: e.target.value
//         })
//     }
//     handleSubmit = (e) => {
//         e.preventDefault()
//         console.log(this.state);
//         axios.post('http://192.168.0.104:80/login/', this.state)
//     }
//     render() {
//         return (
            // <div className="container">
            //     <form onSubmit={this.handleSubmit} className='Brown'>
            //         <h5 className="white-text">Sign In</h5>
            //         <div className='input-field'>
            //             <label htmlFor="email">Email</label>
            //             <input type="email" id="email" onChange={this.handleChange} />
            //         </div>
            //         <div className='input-field'>
            //             <label htmlFor="password">Password</label>
            //             <input type="password" id="password" onChange={this.handleChange} />
            //         </div>
            //         <div className='input-field'>
            //             <button className="btn white black-text">Log in</button>
            //         </div>
            //     </form>
            // </div>
//         )
//     }
// }

// export default signIn

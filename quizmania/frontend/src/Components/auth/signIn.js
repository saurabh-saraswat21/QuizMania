import React, { Component } from 'react'
import axios from 'axios';

class signIn extends Component {
    state = {
        email: '',
        password: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state);
        axios.post('http://192.168.0.104:80/login/', this.state)
    }
    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className='Brown'>
                    <h5 className="white-text">Sign In</h5>
                    <div className='input-field'>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange} />
                    </div>
                    <div className='input-field'>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange} />
                    </div>
                    <div className='input-field'>
                        <button className="btn white black-text">Log in</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default signIn

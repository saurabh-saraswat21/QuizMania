import React, { Component } from 'react'

class signIn extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state);
    }
    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className='Brown'>
                    <h5 className="white-text">Sign Up</h5>
                    <div className='input-field'>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" onChange={this.handleChange} />
                    </div>
                    <div className='input-field'>
                        <label htmlFor="lastName">First Name</label>
                        <input type="text" id="lastName" onChange={this.handleChange} />
                    </div>
                    <div className='input-field'>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange} />
                    </div>
                    <div className='input-field'>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange} />
                    </div>
                    <div className='input-field'>
                        <label htmlFor="password">Confirm Password</label>
                        <input type="password" id="password2" onChange={this.handleChange} />
                    </div>
                    <div className='input-field'>
                        <button className="btn white black-text">Sign Up</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default signIn

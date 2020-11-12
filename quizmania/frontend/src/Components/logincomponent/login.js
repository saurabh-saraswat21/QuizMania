import React from 'react'
import {Link} from 'react-router-dom'

function login() {
    return (
        <div>
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />
            <Link to = '/login/dashboard'><button>Submit</button></Link>

        </div>
    )
}

export default login

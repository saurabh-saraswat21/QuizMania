import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedInLinks = () => {
    return (
        <ul className='right'>
            <li><NavLink to='/'>Sign Out</NavLink></li>
            <li><NavLink to='/user'>NameofUser</NavLink></li>
        </ul>
    )
}
export default SignedInLinks
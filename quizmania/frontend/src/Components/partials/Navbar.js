import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Button } from './Button'
import '../../stylesheets/Navbar.css'

function Navbar() {
    const [click, setClick] = useState(false)
    const [button, setButton] = useState(true)

    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false)
        } else {
            setButton(true)
        }
    }

    useEffect(() => {
        showButton()
    },[])

    window.addEventListener('resize', showButton)

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    QuizMania
                </Link>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={click ? "fa fa-times": "fa fa-bars"}/>
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to="/" className='nav-links' onClick={closeMobileMenu}>
                            Contact
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/" className='nav-links' onClick={closeMobileMenu}>
                            About Us
                        </Link>
                    </li>
                    <li className='nav-item ' >
                        <Link to="/JoinQuiz" className='nav-links' onClick={closeMobileMenu}>
                            Join Quiz
                        </Link>
                    </li>
                    <li className='nav-item '>
                        <Link to="/" className='nav-links-mobile' onClick={closeMobileMenu}>
                            Sign Up
                        </Link>
                    </li>
                </ul>
                {button && <Button buttonStyle='btn--outline'>Sign Up</Button>}
            </div>
        </nav>
    );
}

export default Navbar;

import React from 'react'
import '../../stylesheets/style.css'
const Navbar = () => {
    return (

        <div className="nav">
            <nav className="navigation">
                <ul className="navbar">
                    <li className="logo"><a href="/">QuizMania</a></li>
                    <li className="items main"><a href="#">Login</a></li>
                    <li className="items main secondary"><a href="#">JoinQuiz</a></li>
                    <li className="items"><a href="#">SignUp</a></li>
                    <li className="items"><a href="#">Contact</a></li>
                    <li className="items"><a href=" # ">About us</a></li>
                    <li className="toggle"><span className="hamburger"></span></li>

                </ul>
            </nav>

        </div>
    )
}
export default Navbar

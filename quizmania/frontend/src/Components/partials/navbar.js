// Use state is used to use state in function components
import React from 'react'

// import '../../stylesheets/navbar.css'
import { Link, NavLink } from 'react-router-dom'
import AuthOption from './AuthOption'
// import SignedInLinks from './SignedInLinks'


// Toggle function  for navbar
const Navbar = () => {

    //     // "clas" is the name of state same as the "state" in the class based component 
    //     // "toggle" is the method use to set the state same as the "setState" method
    //     // useState is used to set the initial value of the state i.e, false
    // const [clas, toggle] = useState(false)

    // const togglefunc = () => {
    //     // calling the set function to set the opoosite value everytime its called
    //     toggle(!clas)
    // }

    return (

        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/' className="brand-logo">QuizMania</Link>
                <ul className='right'>
                    {/* <li><NavLink to='/'>About</NavLink></li> */}
                    {/* <li><NavLink to='/'>Contact Us</NavLink></li> */}
                    <li><NavLink to='/JoinQuiz'>Join Quiz</NavLink></li>
                </ul>
                <AuthOption />
            </div>
        </nav>

        // {/* <div className="nav">
        //     <nav className="navigation">
        //         <ul className="navbar">

        //             <li className="logo"><a href="/">QuizMania</a></li>

        //             {/* setting className as clas variable of state its true of false value decides what className should 
        //             be given to the  the items of the nav bar */}

        //             <li className={clas ? "active items main" : "items main "}><Link to="#">Login</Link></li>

        //             <li className={clas ? "active items main secondary" : "items main secondary "}><Link to="/JoinQuiz">JoinQuiz</Link></li>

        //             <li className={clas ? "active items" : "items "}> <Link to="#">SignUp</Link></li>

        //             <li className={clas ? "active items " : " items"}> <Link to="#">Contact</Link></li>

        //             <li className={clas ? "active items" : "items"}> <Link to="#">About us</Link></li>
        //             {/* Calling the toggleFunc on click of the hamburger */}
        //             <li onClick={togglefunc} className="toggle"><span className="hamburger"></span></li>

        //         </ul>
        //     </nav>

        // </div> */}
    )
}
export default Navbar

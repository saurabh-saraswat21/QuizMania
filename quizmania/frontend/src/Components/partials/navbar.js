import React ,{useState} from 'react'
import '../../stylesheets/style.css'
import {Link } from 'react-router-dom' 
const Navbar = () => {
    const [clas,toggle] = useState(false)
    const togglefunc =()=>{
        toggle(!clas) 
    }

    return (

        <div className="nav">
            <nav className="navigation">
                <ul className="navbar">
                    <li className="logo"><a href="/">QuizMania</a></li>
                    <li className={clas?"active items main":"items main "}><Link to="#">Login</Link></li>
                    <li className={clas?"active items main secondary":"items main secondary "}><Link to="#">JoinQuiz</Link></li>
                    <li className={clas?"active items":"items "}> <Link to="#">SignUp</Link></li>
                    <li className={clas?"active items ":" items"}> <Link to="#">Contact</Link></li>
                    <li className={clas?"active items":"items"}> <Link to="#">About us</Link></li>
                    <li onClick={togglefunc} className="toggle"><span className="hamburger"></span></li>

                </ul>
            </nav>

        </div>
    )
}
export default Navbar

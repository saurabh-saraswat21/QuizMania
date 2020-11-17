import React ,{useState,useContext} from 'react'
import {Link} from 'react-router-dom'
import UserContext from '../../context/userContext';
import JoinQuiz from '../partials/JoinQuiz'
function LoginDashBoard() {
    const { userData} = useContext(UserContext);
    console.log();
  
    return (
        <div>
            {userData.user.displayName}
            <Link to ='/createquiz'><button>CreateQuiz</button></Link>
            <Link to ='/viewquiz'><button>ViewQuiz</button></Link>
            <Link to ='/hostquiz'><button>Hostquiz</button></Link>
            <JoinQuiz/>
            
        </div>
    )
}

export default LoginDashBoard

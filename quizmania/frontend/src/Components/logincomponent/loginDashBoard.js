import React from 'react'
import {Link} from 'react-router-dom'
import JoinQuiz from '../partials/JoinQuiz'
function LoginDashBoard() {
  
    return (
        <div>
            <Link to ='/createquiz'><button>CreateQuiz</button></Link>
            <Link to ='/viewquiz'><button>ViewQuiz</button></Link>
            <JoinQuiz/>
            
        </div>
    )
}

export default LoginDashBoard

import React from 'react'
import {Link} from 'react-router-dom'
function loginDashBoard() {
    return (
        <div>

        <Link to ='/createquiz'><button>createquiz</button></Link>
        <Link to ='/joinquiz'><button>JoinQuiz</button></Link>
        
        </div>
    )
}

export default loginDashBoard

import React ,{useState} from 'react'
import { Link } from 'react-router-dom'

import '../../stylesheets/userInfo.css'

const generateuser_id= ()=>{
    return  Math.floor(100000 + Math.random() * 900000)
} 

function Userinfo(props) {
    const [username, setusername] = useState("")
    const [user_id] = useState(generateuser_id)
    const quiz_id = props.match.params.quiz_id

    return (
        <div>
            <div className="player_info_box">
                <input type="text" placeholder="enter your nickname" 
                 onChange={(event)=>{
                     setusername(event.target.value)
                     console.log(username);
                     console.log(quiz_id);
                 }}
                
                />

                <Link  to={{

                    pathname: '/startQuiz/'+quiz_id,
                    state : {username,quiz_id,user_id}
                  }
                } >

                <button> Go</button>

                
                </Link>

            </div>
        </div>
    )
}

export default Userinfo
import React,{useState} from 'react'
import {Link} from 'react-router-dom'


function JoinQuiz() {
    const[quiz_id,setquiz_id]= useState(null);
    
    const handleChange=(e)=>{
        setquiz_id(e.target.value)
    }

    return (
        <div className="joinquiz" >
            <input type="text" placeholder="Enter Quiz ID to Join" onChange={(e)=>handleChange(e)}/>
            <Link to ={{
                pathname: '/Quiz/enter_info/'+quiz_id
            }} ><button disabled={!quiz_id}>JoinQuiz</button></Link>
        </div>
    )
}

export default JoinQuiz

import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import '../../stylesheets/joinquizcomp.css'


function JoinQuizComp() {
    const[quiz_id,setquiz_id]= useState(null);
    
    const handleChange=(e)=>{
        setquiz_id(e.target.value)
    }

    return (
        <div className="joinquizcomp" >
            <input type="number" placeholder="Enter Quiz ID to Join" onChange={(e)=>handleChange(e)}/>
            <Link to ={{
                pathname: '/Quiz/enter_info/'+quiz_id
            }} target="_blank" ><button disabled={!quiz_id}>JoinQuiz</button></Link>
        </div>
    )
}

export default JoinQuizComp

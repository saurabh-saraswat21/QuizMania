import React, {useState, useEffect } from 'react'
import io from 'socket.io-client'
const ENDPOINT = "192.168.43.91:80"
var socket
const HostquizPage = (props) => {
    const [quizName,setQuizName]= useState(null)
  
    useEffect(()=>{
        socket= io(ENDPOINT)
        // setQuiz(this.props.location.state)
       setQuizName(props.location.state.quizName);
    })

   const  startquiz=(quiz_id)=>{
         socket.emit('start',(quiz_id))
    }
    
    const quiz_id = props.match.params.quiz_id
  

    return (
        <div>
            <h1>QuizName : {quizName}</h1>

        <h1>Share this Join Code to instantly join the quiz  {quiz_id}</h1>
            <h1> Start  The QUiz NOW</h1>
            <button onClick={()=>startquiz(quiz_id)} >Start</button>
            
        </div>
    )
}

export default (HostquizPage)

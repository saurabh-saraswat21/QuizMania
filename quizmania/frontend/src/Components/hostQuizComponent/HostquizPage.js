import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
const ENDPOINT = "192.168.43.91:80"
var socket
const HostquizPage = (props) => {
  
    useEffect(()=>{
        socket= io(ENDPOINT)
    })

   const  startquiz=(quiz_id)=>{
         socket.emit('start',(quiz_id))
    }
    let quiz =[];
    const quiz_id = props.match.params.quiz_id
    if(props.quiz) 
    quiz = props.quiz

    return (
        <div>

            <h1> Start  The QUiz NOW<button onClick={()=>startquiz(quiz_id)} >Start</button></h1>
            
        </div>
    )
}

const mapStateToProps = (state,defaultProps) => {

    const id = parseInt(defaultProps.match.params.quiz_id)

    //returning the particular quiz that is to be viewed
    return {

        // find method iterates every quiz in the quizzes and return that quiz whose id matches the id we get from the params above
        quiz: state.quizzes.find(quiz => quiz.quiz_id === id),

    }
    
}

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(HostquizPage)

import React, {useState, useEffect } from 'react'
import io from 'socket.io-client'
import axios from 'axios'
const ENDPOINT = "192.168.43.24:80"

var socket
const HostquizPage = (props) => {
    const quiz_id = props.match.params.quiz_id
    const [quizName,setQuizName]= useState(null)
    const[users,setUsers]= useState([])

    const userlist = users.length?

    (   users.map(user=>  
        {
                return(
                    <div className = "userlist" key={user.user_id}>
                        <h1>{user.username}</h1>
                        <span>{user.score?"finished the quiz final score is "+user.score:""} </span>
                    </div>
                )
        })
           
    )
    :(
        <h1>no users</h1>
    )

    useEffect(()=>{
        socket= io(ENDPOINT)
        setQuizName(props.location.state.quizName);

        socket.emit('host_connected',quiz_id)
        socket.emit('get_update')

        socket.on('update',(data)=>{
           console.log("host has recived update");
            if(users!=data){
                setUsers(data)
            }

        })
        socket.on('a_quiz_ends',(data)=>{
            const {username}= data
            const {score,total} = data.scores

            if(data && users){
                const index = users.findIndex(user=>user.username===username)
                if(index!==-1){
                    const tempusers = users
                    tempusers[index].score= score
                    setUsers(tempusers)
                }
                const userdata = {
                    username : username,
                    score : score
                }
            
            }
           
        })

      
    })




   const  startquiz=(quiz_id)=>{
         socket.emit('start',(quiz_id))
         
    }
    
  
  

    return (
        <div>
            <h1>QuizName : {quizName}</h1>

        <h1>Share this Join Code to instantly join the quiz  {quiz_id}</h1>
            <h1> Start  The QUiz NOW</h1>
        <h1>current no of users :-{users.length}</h1>
            <button onClick={()=>startquiz(quiz_id)} >Start</button>
             {userlist}
            
        </div>
    )
}

export default (HostquizPage)

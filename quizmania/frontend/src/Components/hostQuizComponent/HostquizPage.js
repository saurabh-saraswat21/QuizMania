import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import '../../stylesheets/hostquizzpage.css'

const ENDPOINT = "192.168.43.24:80"

var socket
const HostquizPage = (props) => {
    const quiz_id = props.match.params.quiz_id
    const [quizName, setQuizName] = useState(null)
    const [users, setUsers] = useState([])

    const userlist = users.length ?

        (users.map(user => {
            return (
                <div className="userlist" key={user.user_id}>
                    <h1>{user.username}</h1>
                    <span>{user.score ? "finished the quiz final score is " + user.score : ""} </span>
                </div>
            )
        })

        )
        : (
            <h1>no users</h1>
        )


    useEffect(() => {
        socket = io(ENDPOINT)
        if (props.location.state) {
            const quizname = props.location.state.quizName
            setQuizName(quizname);
        }


        socket.emit('host_connected', quiz_id)
        socket.emit('get_update')

        socket.on('update', (data) => {
            console.log("host has recived update");
            if (users !== data) {
                setUsers(data)
            }

        })
        socket.on('a_quiz_ends', (data) => {
            const { username } = data
            const { score } = data.scores

            if (data && users) {
                const index = users.findIndex(user => user.username === username)
                if (index !== -1) {
                    const tempusers = users
                    tempusers[index].score = score
                    setUsers(tempusers)
                }


            }

        })


    }, [props.location.state, quiz_id, users])




    const startquiz = (quiz_id) => {
        socket.emit('start', (quiz_id))

    }




    return (
        <div>
            <div className="ready-host">
            <h1>QuizName : <h2>{quizName}</h2> </h1>
            <h1>QuizCode :  <h2>{quiz_id}</h2> </h1>
            <h1>Current no. of Users: <h3>{users.length}</h3> </h1>
            <button onClick={()=>startquiz(quiz_id)} >Start Quiz</button>
        </div>
        <div>
            {userlist}
        </div>
        </div>
    )
}

export default (HostquizPage)

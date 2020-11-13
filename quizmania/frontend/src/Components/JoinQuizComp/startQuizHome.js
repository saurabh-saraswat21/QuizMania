import React, { Component } from 'react'
import '../../stylesheets/startQuizHome.css'
import { connect } from 'react-redux'
import Direct from '../errComponents/DirectAccess'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'
import axios from 'axios'
const ENDPOINT = "192.168.0.100:80"
var socket
export class startQuizHome extends Component {
    constructor(props) {
        super(props)
        this.state = {

            quiz_id: this.props.location.state ? this.props.location.state.quiz_id : null,

            //   the username is passed in the props by the HOC function below
            myusername: this.props.username,

            no_of_users: 0

        }
    }



    componentDidMount() {

        if (this.state.myusername) {
            const socket_data = {
                username: this.state.myusername,
                quiz_id: this.state.quiz_id
            }
            // estabishing a new socket connection 
            socket = io(ENDPOINT)

            // emmiting the update socket event 
            socket.emit('update_socket', socket_data)

            // handling the event emiited from server side
            socket.on('update_user_list', (quiz_id) => {

                // calling the update userlist function
                this.updateUserList(quiz_id)
            })
        }

    }

    //  method to update userlist whenever called
    updateUserList = (quiz_id) => {

        //  making get request to server and fetching the data
        axios.get("http://:80/getusers/" + quiz_id, {

        }).then(response => {

            //  if the response is not empty 
            if (response != null) {


                var length = response.data.userList.length
                var all_users = response.data.userList

                // updating the current state
                this.setState({
                    no_of_users: length,
                    all_users: all_users
                })
            }
        }
        )

    }
    render() {
        // getting quiz from the props because it is available because we have already mapped it
        const quiz = this.props.quiz;
        const username = this.state.myusername
        const all_users = this.state.all_users;

        // cross checking the quiz if it is undefined  
        if (quiz === undefined) {

            // just render please wait message
            return (
                <div>
                    <h1>Please Wait</h1>
                </div>
            )

        }
        else if (!this.state.myusername) {
            return (
                <Direct></Direct>
            )

        }

        // if the quiz has value  then 
        else {


            return (

                <div className="Start_quiz_container">


                    <div className="quizinfobox">
                        <h1>Quiz ID : {quiz.quiz_id}</h1>
                        <h1>Quiz Name : {quiz.quizName}</h1>
                        <h1>No of questions:{quiz.questions.length}</h1>
                        <h1> myname = {this.state.myusername} </h1>
                        <h2>user = {this.state.no_of_users} </h2>
                        {/* start button to start the quiz and passing the quiz as the state as it will be used  for displaying questions  */}
                        <Link to={{

                            // pathname is same without parameters to prevent the direct acess of the quiz 
                            pathname: '/start',

                            // the state will be available at the location of the component that renders after
                            state: { quiz, username, all_users }

                        }}> <h2>Start</h2>

                        </Link>
                    </div>

                </div>
            )
        }
    }
}





// a  function that will map the quiz to the props before it renders for the first time
const mapStateToProps = (state, defaultProps) => {

    //defaultProps are the basic props of the component that can give access to route params 
    // so that we know which quiz to fetch

    // getting  id from router params and cnverting to int so that is is able to be compared 
    const id = parseInt(defaultProps.match.params.quiz_id)

    //returning the particular quiz that is to be viewed
    return {

        // find method iterates every quiz in the quizzes and return that quiz whose id matches the id we get from the params above
        quiz: state.quizzes.find(quiz => quiz.quiz_id === id),
        username: defaultProps.location.state ? defaultProps.location.state.username : null

    }
}

// wrapping up the map function with a high order component function that will run before the component renders   
export default connect(mapStateToProps)(startQuizHome)

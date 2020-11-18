import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'


// importing the error component  
import Directacess from '../errComponents/DirectAccess'

import '../../stylesheets/quiz.css'


import { FcAlarmClock } from 'react-icons/fc'

class QuizOngoing extends Component {

    // constructor fr initally setting state values 
    constructor(props) {
        super(props)

        this.state = {

            // for kepping the normal brown background i.e., no button is pressed 
            backgroundClass: false,

            // setting the background green or red
            choice: false,

            // the current question to be displayed
            currentQuestion: {},

            // the next questin to be displayed 
            nextQuestion: {},

            // the correct answer of the question 
            answer: '',

            // Total number of questions in the quiz
            numberOfQuestions: 0,

            // the number of answered questions
            numberOfAnsweredQuestions: 0,

            //  for fetching the current question from the array
            currentQuestionIndex: 0,

            // the total score 
            score: 0,

            //  number of wrong answers 
            wrongAnswers: 0,

            // time alloted for the quiz
            time: {
                minutes: 0,
                seconds: 0
            }
        }

        // for setting time current interval is 0 
        this.timeInterval = null
    }


    componentDidMount = () => {
       
        console.log("component did mount is called");
        // getting data from the location
        const Data = this.props.data
        console.log(Data.socket);

        // checking if the data is undefined (in case of direct access)

        if (Data !== undefined) {

            // getting quiz from the state if is not undefined
            const quiz = Data.quiz
            const username = Data.username


            //  setting state of the component with the details of the quiz fetched
            this.setState({
                quiz: quiz,
                username:username,
                questions: quiz.questions,

            },

                //  callback function that is executed after the state is set 
                () => {

                    //  getting the  values from state as the function is called after the state is set so this wil not be undefined
                    const { questions, currentQuestion, nextQuestion } = this.state;

                    //  calling the display question option
                    this.displayQuestions(questions, currentQuestion, nextQuestion)
                })

            // starting the timer
            this.startTimer(quiz.questions.length);
        }
    }





    //  function to display questions in the quiz takes four arguments
    displayQuestions =

        //  the questions array that has all the questions of the quiz
        (questions = this.state.questions,

            //  the current question to be displayed
            currentQuestion,

            //  the next question to be displayed
            nextQuestion,

            // the index of the current question for transition  
            currentQuestionIndex = 0) => {

            // if the index is equal to the length i.e., all the questions are answered 
            if (currentQuestionIndex === (questions.length)) {

                //  end the quiz
                this.endQuiz();

            }

            //  if the current index is less i.e, questions are left to be answered
            if (currentQuestionIndex <= questions.length - 1) {

                //  fetching the current question index 
                // this step is necassry because we will keep updationg the current index for next question 
                currentQuestion = questions[currentQuestionIndex];

                //  getting next question 
                nextQuestion = questions[currentQuestionIndex + 1];

                // storing the correct answer
                const answer = currentQuestion.correct;

                // setting the total number of questions as it is to be displayed as a info 
                const numberOfQuestions = questions.length

                // setting the state with the details
                this.setState({
                    currentQuestionIndex,
                    currentQuestion,
                    nextQuestion,
                    answer,
                    numberOfQuestions

                })
            }


        }

        // start timer function takes total no of questions as input
    startTimer = (numberOfQuestions) => {

        // setting the timer according to number of questions
        const countDown = Date.now() + (numberOfQuestions * 60) * 500 
        
        // 2 sec more to cumpunsate the loading time 
        + 2000;


        // setting the time interval that will keep executing again and again after a certain time limit
        this.timeInterval = setInterval(() => {
            const now = new Date();
            const distance = countDown - now

            // getting left minutes and seconds
            const minutes = Math.floor((distance) % (1000 * 60 * 60) / (1000 * 60))
            const seconds = Math.floor((distance) % (1000 * 60) / (1000))

            // if the time is up 
            if (distance < 0) {

                // clear the interval
                clearInterval(this.innerHTML);
                
                // setting time to zero
                this.setState({
                    time: {
                        minutes: 0,
                        seconds: 0

                    }
                },

                // end the quiz 
                () => {
                    this.endQuiz();
                })
            }

            // if time is left 
            else {

                // setting state every 1 sec
                this.setState({
                    time: {

                        minutes,
                        seconds
                    }

                })
            }
        }, 
        
        // time interval of 1 sec
        1000)

    }


    //  a function to end the quiz
    endQuiz = () => {

        //  alerting that the quiz has ended
        alert('quizENDED')

        //  after a while
        setTimeout(() => {

            //  close the new opened tab
            window.close()

        },

            // half second wait 
            500)

    }

    // when any option is clicked
    handleSubmit = (e) => {

        // comparing the clicked optin with the answer of the question

        // if the answer is correct
        if (e.target.innerHTML === this.state.answer) {

            // execute the right option function
            this.rightChosen()
        }

        // if the answer is wrong
        else {

            // execute the wrong option function
            this.wrongChosen()
        }

    }


    // if the option is correct
    rightChosen = () => {

        // updating the values of state

        // currentState is the current values of state
        this.setState(currentState => ({

            // setting background classs to false as the background needs to change 
            backgroundClass: true,

            // setting choice true for green color
            choice: true,

            // increasing  no of answered question by 1 
            numberOfAnsweredQuestions: currentState.numberOfAnsweredQuestions + 1,

            // increasing the score as the option chosen is right
            score: currentState.score + 1,
        }),


            // called when the state is updated  
            () => {

                // time out function to show the background color for a while
                setTimeout(

                    // a self executing function
                    function () {

                        //  getting the updated values of state

                        const {

                            // the array of questions  
                            questions

                            // the current question that is answered 
                            , currentQuestion,

                            // the next question to be displayed
                            nextQuestion,

                            // the updated index for the next question as this will update the current question 
                            currentQuestionIndex }

                            = this.state;

                        // calling the display question function to update the current displayed question
                        this.displayQuestions(questions, currentQuestion, nextQuestion, currentQuestionIndex + 1)


                    }
                        // binding this with the timeout function this keyword is used in the function  
                        .bind(this),

                    // the time interval for the timeut function 
                    1100
                );


                //  another timeout function to set the background back to normal
                setTimeout
                    (

                        function () {

                            this.setState({
                                backgroundClass: false
                            })

                        }.bind(this), 1000
                    );


            })
    }

    // if the answer chosen is wrong
    wrongChosen = () => {

        this.setState(currentState => ({
            backgroundClass: true,

            // choice set to false for red color
            choice: false,

            numberOfAnsweredQuestions: currentState.numberOfAnsweredQuestions + 1,

            // increasing the wrong answers
            wrongAnswers: currentState.wrongAnswers + 1,
        }), () => {

            // time out functions same as above
            setTimeout(
                function () {

                    const { questions, currentQuestion, nextQuestion, currentQuestionIndex } = this.state;
                    this.displayQuestions(questions, currentQuestion, nextQuestion, currentQuestionIndex + 1)


                }
                    .bind(this),
                1100
            );
            setTimeout(
                function () {

                    this.setState({
                        backgroundClass: false
                    })
                }
                    .bind(this),
                1000
            );
        })
    }




    render() {

        // if the state is not defined (direct acess)

        if (this.state.quiz === undefined) {

            // render the error component
            return (
                <Directacess />
            )
        }

        // if the quiz is valid 
        else {

            // getting details for rendering 

            const {

                // to be displayed   
                currentQuestion,

                // to be displayed  as information   
                numberOfQuestions,

                // for current number of question

                currentQuestionIndex,

                // time alloted for quiz
                time,
                backgroundClass,
                choice
            } = this.state


            //  if question is loading because of any issue
            if (currentQuestion === {}) {

                return (

                    // just display loading message 
                    <h1>Loading</h1>
                )
            }

            // if fetched
            else {

                return (

                    // setting class of the background dyanamically

                    <div

                        // checking if the the normal  background 
                        className={backgroundClass ?

                            //  if background is to be changed i.e, any one option is selected
                            (choice ?
                                // if choice is true add green to class  
                                ' questions green' :

                                // if option is wrong add red to class 
                                'questions red ') :

                            // if background is normal no color is set
                            'questions'}>

                        <div className="details-container">
                            <div className="timer">
                            <div className="time_text"><FcAlarmClock/>TimeLeft{/* getting time from the state */}</div> 
                            <div className="time">{time.minutes}
                            :
                            {time.seconds}
                            </div>
                            </div >
                           { /*<span className="shiftBelow"> Score: {this.state.score}</span>*/} 
                            <span className="shiftBelow"> Myname: {this.state.username}</span>
                                
                            
                            <p>
                                <span>
                                    <span className="question-no">
                                        {currentQuestionIndex + 1} of {numberOfQuestions}
                                    </span>
                                </span>
                            </p>

                        </div>
                        <hr></hr>
                        <div className="questionString">
                            
                            {/* Displaying current question string  */}
                            <p>{currentQuestion.questionString}</p>
                        </div>
                        <div className="options-container">

                                    {/* Displaying option */}
                            <p onClick={this.handleSubmit} className="option">{currentQuestion.option1}</p>
                            <p onClick={this.handleSubmit} className="option">{currentQuestion.option2}</p>

                        </div>
                        <div className="options-container">
                            <p onClick={this.handleSubmit} className="option">{currentQuestion.option3}</p>
                            <p onClick={this.handleSubmit} className="option">{currentQuestion.option4}</p>

                        </div>
                        <div className="btn-container">
                            <button onClick={this.endQuiz} className="quit-btn">Quit</button>
                        </div>
                    </div>
                )
            }
        }


    }

}
export default withRouter(quizOngoing)
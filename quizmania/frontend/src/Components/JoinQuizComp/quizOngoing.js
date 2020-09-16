import React, { Component } from 'react'

// is used to acess the passed state in the link tag in the instruction page 
import { withRouter } from "react-router";

// importing the error component  
import Directacess from '../errComponents/DirectAccess'

import '../../stylesheets/quiz.css'

class quizOngoing extends Component {
    
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
                minutes :0,
                seconds :0
            }
        }

        // for setting time current interval is 0 
        this.timeInterval = null
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

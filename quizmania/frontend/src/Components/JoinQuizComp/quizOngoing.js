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

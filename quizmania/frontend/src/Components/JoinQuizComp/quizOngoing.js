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

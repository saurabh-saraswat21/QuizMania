import React, { Component } from 'react'
import axios from 'axios';

class insertques extends Component {
    
    
    // initial state with empty values  will be updated  and passed to be saved in the database
    state = {
        quiz_id: 0,
        questionString: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correct: '',

        // the flag to ensure all the fields are entered
        questionStringflag: false,
        option1flag: false,
        option2flag: false,
        option3flag: false,
        option4flag: false,
        correctflag: false,

        // a universal flag that will enable submit btn  
        allflag: false
    }

        // setting quiz id to the state
componentDidMount() {
        const QuizID = this.props.match.params.quiz_id
        this.setState({
            quiz_id: QuizID

        })
    }

    checkAllFilled = () => {

        // getting state for all the input fields
        const ques = this.state.questionStringflag
        const one = this.state.option1flag
        const two = this.state.option2flag
        const three = this.state.option3flag
        const four = this.state.option4flag

        // all will store true only if all the entered fields are true
        const all = ques && one && two && three && four

        // setting the correct flag with the value all if any of the input flag is false the correct flag is false
        this.setState({

            correctflag: all

        })
    }



    // updating the state as the user enters the value
    handleChange = (e) => {

        // getting the value based on the input 
        const flag = e.target.value ? true : false

        //we have set the  id  input field with the same name as its corresponding state field name
        //the id of the button on which the event has taken place this is same name by which we have stored in state
        this.setState({

            // setting the question filled  value 
            [e.target.id]: e.target.value,
            // the  entered value of the input field 

            // setting that corresponding flag value
            [e.target.id + "flag"]: flag



        }, () => {

            // after the state is set then check all the fields to enable the correct  dropdown 
            this.checkAllFilled()

        })

    }


   

     // this will check if the submit btn is to be set on or not by setting the all flag
    checkSubmit = () => {

        // getting the value of the correctflag
        const allFlag = this.state.correctflag
        
        // seeting the value of correct flag with the all flag 
        this.setState({
            allflag: allFlag
        })

    }
        
    // this will insert the correct value to the correct field t be saved in the database
    setCorrect = (e) => {
        this.setState({ correct: e.target.value }, () => {

            // after the value is set then check if to turn the submit btn on and off 
            this.checkSubmit()
        })
    }

    handleClick = (e) => {
        // get the values from state and store in a variable  
        // so that it can be passed to the backend server to be stored in the database

        const question = {
            quiz_id: this.state.quiz_id,
            questionString: this.state.questionString,
            option1: this.state.option1,
            option2: this.state.option2,
            option3: this.state.option3,
            option4: this.state.option4,
            correct: this.state.correct,

        }
        //making request to backend server
          axios.post('http://localhost:80/submitques/',question)
      
      
        //redirect to the same page after saving question
        this.props.history.push('/insertques/'+this.state.quiz_id)
    }


    
    render() {

        return (
            <div className="insertques">
                <div className="insertform">

                    <form id="form">

                        <div className="quesfield"><input type="number" placeholder="QuizID" value={this.state.quiz_id} readOnly /></div>
                        <div className="quesfield"><input type="text" id="questionString" placeholder="question" onChange={this.handleChange} /></div>
                        <div className="quesfield"><input type="text" id="option1" placeholder="option1" onChange={this.handleChange} /></div>
                        <div className="quesfield"><input type="text" id="option2" placeholder="option2" onChange={this.handleChange} /></div>
                        <div className="quesfield"><input type="text" id="option3" placeholder="option3" onChange={this.handleChange} /></div>
                        <div className="quesfield"><input type="text" id="option4" placeholder="option4" onChange={this.handleChange} /></div>
                        <div className="quesfield"><input type="text" id="correct" placeholder="Correct" onChange={this.handleChange} /></div>


                        <button className="submit btn" onClick={this.handleClick}>Submit</button>

                    </form>
                </div>




            </div>
        )
    }
}
export default insertques

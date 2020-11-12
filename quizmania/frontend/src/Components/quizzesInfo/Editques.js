import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from "react-router-dom";


class EditQues extends Component {


    // initial state with empty values  will be updated  and passed to be saved in the database
    state = {

        //the fields for question that is to be entered
        quiz_id: 0,
        _id:0,
        questionString: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correct: '',
        correctflag:true,
        // a universal flag that will enable submit btn  
        allflag: false
    }




    // setting quiz id to the state
    componentDidMount() {
        const QuizID = this.props.match.params.quiz_id
        const question = this.props.location.state.question
        const quizName = this.props.location.state.quizName
        
        this.setState({
            quiz_id: QuizID,
            redirect : false,
            _id :question._id,
            quizName: quizName,
            questionString: question.questionString,
            option1: question.option1,
            option2: question.option2,
            option3: question.option3,
            option4: question.option4,
            correct: question.correct

        })
    }


    //  a function to check all the options are unique 
    checkAllUnique = (arr) => {
        return (new Set(arr)).size === arr.length;

    }


    //  the function that will check that all the values are entered or not
    checkAllFilled = () => {

        // getting state for all the input fields
        const ques = this.state.questionString
        const one = this.state.option1
        const two = this.state.option2
        const three = this.state.option3
        const four = this.state.option4

        //  to check all the options entered are unique or not
        const allVaild = this.checkAllUnique([one, two, three, four])

        // all will store true only if all the entered fields are true
        const allFilled = ques && one && two && three && four

        const allCorrect = allVaild && allFilled;

        // setting the correct flag with the value all if any of the input flag is false or duplicate  the correctflag is false
        
            this.setState({

                correctflag: allCorrect
    
            },()=>{
                this.checkSubmit()
            })


        
    }



    // updating the state as the user enters the value
    handleChange = (e) => {

        // getting the value based on the input 

        //we have set the  id  input field with the same name as its corresponding state field name
        //the id of the button on which the event has taken place this is same name by which we have stored in state
        this.setState({

            // setting the question filled  value 
            [e.target.id]: e.target.value,
            // the  entered value of the input field 




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





    // after the submit button is pressed

    handleClick = (e) => {
        // get the values from state and store in a variable  
        // so that it can be passed to the backend server to be stored in the database

        const question = {
            quiz_id: this.state.quiz_id,
            questionString: this.state.questionString,
            _id : this.state._id,
            option1: this.state.option1,
            option2: this.state.option2,
            option3: this.state.option3,
            option4: this.state.option4,
            correct: this.state.correct,

        }
        //making request to backend server
        axios.post('http://192.168.43.91:80/editques/', question).then(
            this.setState({
                    redirect:true
            })
        )
            
        

    }


    render() {
    if(this.state.redirect){
        return <Redirect to={{
            pathname : '/getquiz/'+this.state.quiz_id,
            state : 1
        }} />
        }

    return (
            <div className="insertques">
                <div className="insertform">

                    <form id="form">

                        {/* Basic input fields of the form */}
                        <div className="quesfield"><input type="text" placeholder="QuizID" value={this.state.quizName} readOnly /></div>

                        <div className="quesfield"><input type="text" id="questionString" placeholder="question" value={this.state.questionString} onChange={this.handleChange} /></div>

                        <div className="quesfield"><input type="text" id="option1" placeholder="option1"   value={this.state.option1} onChange={this.handleChange} /></div>

                        <div className="quesfield"><input type="text" id="option2" placeholder="option2" value={this.state.option2} onChange={this.handleChange} /></div>

                        <div className="quesfield"><input type="text" id="option3" placeholder="option3" value={this.state.option3} onChange={this.handleChange} /></div>

                        <div className="quesfield"><input type="text" id="option4" placeholder="option4" value={this.state.option4} onChange={this.handleChange} /></div>
                        <div className="quesfield">

                            {/* The correct value dropdown */}
                            {/* disabled will be set to opposite value of correctflag */}
                            <select name="correct" id="correct" disabled={!this.state.correctflag} value={this.state.correct} onChange={this.setCorrect}>

                                {/* The default value that is to be shown but not to be selected  */}
                                <option value="none" hidden>correct</option>

                                {/* The options  that are nothing but the entered values */}
                                <option value={this.state.option1}>{this.state.option1}</option>
                                <option value={this.state.option2}>{this.state.option2}</option>
                                <option value={this.state.option3}>{this.state.option3}</option>
                                <option value={this.state.option4}>{this.state.option4}</option>

                            </select>

                        </div>

                        {/* The submit buttton that is enabled if both the correctflag and the all flag are true */}
                        

                    </form>
                    <button disabled={!(this.state.allflag && this.state.correctflag)} className="submit btn" onClick={this.handleClick}>Submit</button>
                </div>
            </div>
        )
    }
}
export default EditQues
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
    }

        // setting quiz id to the state
componentDidMount() {
        const QuizID = this.props.match.params.quiz_id
        this.setState({
            quiz_id: QuizID

        })
    }

        // updating the state as the user enters the value
        handleChange = (e) => {

                    //we have set the  id  input field with the same name as its corresponding state field name
        
                    //the id of the button on which the event has taken place this is same name by which we have stored in state
              this.setState({
            [e.target.id]: e.target.value
                            // the  entered value of the input field 
                              
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

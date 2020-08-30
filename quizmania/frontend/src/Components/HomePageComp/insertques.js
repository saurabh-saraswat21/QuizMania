import React, { Component } from 'react'
import axios from 'axios';

class insertques extends Component {
    state = {
        quiz_id: 0,
        questionString: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correct: '',

    }
    handleChange = (e) => {
        console.log(this.state)
        this.setState({
            [e.target.id]: e.target.value
        })

    }
    handleClick = (e) => {
        e.preventDefault();
        var question = {
            quiz_id: this.state.quiz_id,
            questionString: this.state.questionString,
            option1: this.state.option1,
            option2: this.state.option2,
            option3: this.state.option3,
            option4: this.state.option4,
            correct: this.state.correct,

        }
        axios.post('http://localhost:80/submitques',question)
    }


    componentDidMount() {
        const QuizID = this.props.match.params.quiz_id
        this.setState({
            quiz_id: QuizID

        })
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
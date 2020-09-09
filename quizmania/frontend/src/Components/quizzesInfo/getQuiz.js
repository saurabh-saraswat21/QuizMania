import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '../../stylesheets/quiz.css'
class Quiz extends Component {


    // Empty state structure
    state = {
        showbtn: []
    }
    
    show = (index) => {

        // store current staus array in a new arrray
        const newShowbtn = [...this.state.showbtn]

        // get the current status at the  given index
        const currentStatus = this.state.showbtn[index];

        // toggling the  status 
        newShowbtn[index] = !currentStatus

        // setting state with the new arrray
        this.setState({
            showbtn: newShowbtn
        })
    }

    render() {
        const questions = this.props.questions;


        // getting questions from the state and mapping one by one
        const queslist = questions.map((question, index) => {
            console.log(index)


            return (


                <div className="question" key={question._id}>

                    <h4>{question.questionString}</h4>

                    {/* Link is used for future use */}
                    <Link to="#">

                        {/* Calling function  passing the current index  */}
                        <button onClick={(e) => {
                            this.show(index)
                        }} value="View more">viewmore</button>
                    </Link>

                    {/* classname is decided by the showbtn status at that index */}
                    <div className={this.state.showbtn[index] ? "boxhidden" : "boxactive" + index}>
                        <li className="options">Option1:-{question.option1}</li>
                        <li className="options">Option2:-{question.option2}</li>
                        <li className="options">Option3:-{question.option3}</li>
                        <li className="options">Option4:-{question.option4}</li>
                        <li className="options correct ">Correct:-{question.correct}</li>
                    </div>

                </div>


            )

        }

        )
        return (
            <div className="quizone">
                {queslist}

            </div>
        )


    }
}
const MapStateToProps = (state) => {
    return {
        questions: state.questions
    }
}

export default connect(MapStateToProps)(Quiz)
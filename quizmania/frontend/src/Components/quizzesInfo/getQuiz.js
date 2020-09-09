import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Quiz extends Component {

    componentDidMount = () => {
        // getting the quiz id for which the quiz is to be matched
        const { quiz_id } = this.props.match.params

        // the   array that will store the status of the view more buttons if its pressed or not
        const showbtn = [];

        // requesting server to get details of the quiz
        fetch("http://localhost:80/viewquizes/" + quiz_id)

            // conversion to JSON
            .then(res => res.json())

            .then(res2 => {
                // initial status for the showbtn if false and size is equal to the number of buttons
                for (let i = 0; i < res2.questions.length; i++) {
                    showbtn[i] = "false";

                }

                // setting state with the initial showbtn array  and the quiz questions fetched from server
                this.setState({
                    questions: [...res2.questions],
                    showbtn: showbtn
                })

            })

    }

    // Empty state structure
    state = {
        questions: [
            {
                _id: "",
                questionString: '',
                option1: '',
                option2: '',
                option3: '',
                option4: '',
                correct: ''

            }
        ],
        showbtn: []

    }

    // show method that takes the index of the button and toggle it by making the corresonding state value to "true"
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

        // getting questions from the state and mapping one by one
        const queslist = this.state.questions.map((question, index) => {


            return (

                 
                <div className="question" key={question._id}>

                    <h4>{question.questionString}</h4>

                    {/* Link is used for future use */}
                    <Link to="#">

                        {/* Calling function  passing the current index  */}
                        <button  onClick={(e) => {
                            this.show(index)
                        }}  value="View more">viewmore</button>
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

export default Quiz
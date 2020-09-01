import React, { Component } from 'react'
import "../../stylesheets/style2.css"
import { Link } from 'react-router-dom'

class Quiz extends Component {

    componentDidMount = () => {
        const { quiz_id } = this.props.match.params
        const showbtn = [];

        fetch("http://localhost:80/viewquizes/" + quiz_id)
            .then(res => res.json())
            .then(res2 => {
                for (let i = 0; i < res2.questions.length; i++) {
                    showbtn[i] = "false";

                }
                this.setState({
                    questions: [...res2.questions],
                    showbtn: showbtn
                })

            })

    }
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
    show = (index) => {
        const newShowbtn = [...this.state.showbtn]
        const currentStatus = this.state.showbtn[index];
        newShowbtn[index] = !currentStatus
        this.setState({
            showbtn: newShowbtn
        })
    }

    render() {


        const queslist = this.state.questions.map((question, index) => {


            return (

                <div className="question" key={question._id}>
                    <h4>{question.questionString}</h4>
                    <Link to="#">
                        <button className={question._id} onClick={(e) => {
                            this.show(index)
                        }} key={question._id} value="View more">viewmore</button>
                    </Link>
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
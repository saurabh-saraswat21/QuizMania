import React, { Component } from 'react'
import Quizlist from '../quizzesInfo/quizlist'
class viewQuiz extends Component {
    componentDidMount() {
        const quiz_id_array =[];

        fetch("http://localhost:80/viewquizes")
            .then(res => res.json())
            .then(res2 =>{

                for (let i = 0; i < res2.length; i++) {
                    quiz_id_array[i] = res2[i].quiz_id;
                    
                    
                }
                this.setState({
                    quiz_ids :[...quiz_id_array]
                })
               
            })


    }
    state = {
        quiz_ids: []

    }


    render() {
        console.log(this.state)
        return (
            <div className="viewQuiz">
                <div className="viewquizfield">
                    <div className="quizzes">
                        <img src="#" alt="quiz logo" className="quizimage" />
                        <Quizlist list={this.state.quiz_ids} />

                    </div>
                </div>

            </div>
        )
    }
}
export default viewQuiz
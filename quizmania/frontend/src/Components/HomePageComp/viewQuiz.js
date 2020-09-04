import React, { Component } from 'react'
import Quizlist from '../quizzesInfo/quizlist'
class viewQuiz extends Component {
    
    //initial state
         state = {
             
        quiz_ids: []

        }

    componentDidMount() {
        
    
         //array that will store ids of quiz
       const quiz_id_array =[];


         //making request to server to give the data
       fetch("http://localhost:80/viewquizes")
        
            // converting output data to JSON format
            .then(res => res.json())
            .then(res2 =>{

                // just storing quizid in arrray
                for (let i = 0; i < res2.length; i++) {
                    quiz_id_array[i] = res2[i].quiz_id;
                    
                    
                   
                }
           
                 // setting state with the ids
               this.setState({
                   
                    //...  is spread operator it breaks array in seprate elements 
                    quiz_ids :[...quiz_id_array]
                })
               
            })


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

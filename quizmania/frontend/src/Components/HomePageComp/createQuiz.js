import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class createQuiz extends Component {
    
        //initailly state that will be updated by the quiz id entered so that in can be passed to the insertques compopnent

        constructor(props){
            super(props)
            this.state = {
                quiz_id:Math.floor(100000 + Math.random() * 900000)
            }
        }

    // the function to be called when user enters something in the quiz id field
      //  "e" is the event

    handleChange = (e) => {

        //updating the state with the entered value 
            this.setState({
            quizName : e.target.value
        })
        
    }
    render() {
        
        return (
            

            <div className="createQuiz">
               
                <div className="insertform">
                    <form onSubmit={this.handleSubmit} id="createform">
                        <div className="quesfield"><input type="text"  placeholder="New Quiz Name" onChange={this.handleChange} /></div>
                       <Link to ={{
                           pathname : "/insertques/" + this.state.quiz_id,
                           state : this.state.quizName
                       }}>

                        <button className="submit btn"> Submit</button>
                       </Link>
                    </form>

                </div>

            </div>
        )
    }   
}
export default createQuiz

import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class createQuiz extends Component {
    
        //initailly state that will be updated by the quiz id entered so that in can be passed to the insertques compopnent
    state = {
        quiz_id:0
    }

    // the function to be called when user enters something in the quiz id field
      //  "e" is the event

    handleChange = (e) => {

        //updating the state with the entered value 
            this.setState({
            [e.target.id]: e.target.value
        })
        
    }
    render() {
        
        return (
            <div className="createQuiz">
                <div className="insertform">
                    <form onSubmit={this.handleSubmit} id="createform">
                        <div className="quesfield"><input type="number" id="quiz_id" placeholder="New Quiz ID" onChange={this.handleChange} /></div>
                       <Link to ={"/insertques/" + this.state.quiz_id}>

                        <button className="submit btn"> Submit</button>
                       </Link>
                    </form>

                </div>

            </div>
        )
    }
}
export default createQuiz

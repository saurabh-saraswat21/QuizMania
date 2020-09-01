import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class createQuiz extends Component {

    state = {
        quiz_id:0
    }

    handleChange = (e) => {
        console.log(e.target.id)
        console.log(e.target.value)
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log(this.state.quiz_id)
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
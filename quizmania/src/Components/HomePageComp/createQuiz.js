import React, { Component } from 'react'
class createQuiz extends Component {
    render() {
        return (
            <div className="createQuiz">
                <div className="insertform">
                    <form action="/insertques" id="createform">
                        <div className="quesfield"><input type="number" name="quiz"  placeholder="New Quiz ID"/></div>
                    </form>
                </div>

            </div>
        )
    }
}
export default createQuiz
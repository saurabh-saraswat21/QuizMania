import React from 'react'
import '../../stylesheets/quizstats.css'

const QuizStats=(props)=> {
const quizData = props.location.state
const exit = ()=>{
       window.close()
    }
    if(quizData){
        return (
            <div className="quizend">
                <h1>Your Quiz is finished</h1> 
                <h3>Your final score is {quizData.score} out of {quizData.total}</h3>
                <button onClick={exit}>Confirm And Exit</button>
            </div>
        )
    }
    else{
        return(
            <div>
                <h1>Invaild page  Seems like you lost your Way</h1>
            </div>
        )
    }
    
}

export default QuizStats

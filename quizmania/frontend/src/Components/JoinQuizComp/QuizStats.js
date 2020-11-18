import React from 'react'    
const QuizStats=(props)=> {
const quizData = props.location.state
const exit = ()=>{
       window.close()
    }
    if(quizData){
        return (
            <div>
                Your Quiz is finished 
                Your final score is {quizData.score} out of {quizData.total}
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

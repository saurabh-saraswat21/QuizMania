import React  from 'react'
import {Link} from 'react-router-dom'

const quizlist = ({list}) =>{
    const List = list.length ? (
        list.map(quiz =>{
            return(
                <div className="quiz" key = {quiz}>
                    <Link to ={{
                        pathname :'/getquiz/'+quiz,
                        
                    }}>{quiz}</Link>
                    
                </div>
            )
        })
    ):(
        <h1>No quizzes</h1>
    )
    return(
        <div className="quizList">
            {List}
            
        </div>
    )
}
export default quizlist

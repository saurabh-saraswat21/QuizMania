import React  from 'react'
import {Link} from 'react-router-dom'

// accesing quizlist that is passed through props
const quizlist = ({id_list}) =>{

    // differentitating output if the quizlist is empty or not
    
    
    const Quiz_List = id_list.length ?

    // if not empty
    (
        // mapping quiz one by one
        id_list.map(quiz_id =>{

            // retutrning some JSX
            return(
                
                                    //  a unique key that is quiz id itself
                <div className="quiz" key = {quiz_id}>

                    <img src="#" alt="quiz logo" className="quizimage" />
                    
                    {/* link every quiz id to view all the questions of the quiz */}
                    <Link to ={{
                        pathname :'/getquiz/'+quiz_id,
                        
                    }}>{quiz_id}</Link>
                    
                </div>
            )
        })
    )
    // if Empty 
    :(
        <h1>No quizzes</h1>
    )
    return(
        <div className="quizList">
            {Quiz_List}
            
        </div>
    )
}
export default quizlist

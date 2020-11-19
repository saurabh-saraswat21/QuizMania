import React, {useState} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom'

import '../../stylesheets/viewQuiz.css';

const ViewQuiz=(props)=> {

    var list =[] ;
    const[quiz_id,setquiz_id] = useState(null);

    // getting quiz id list from props

    if(props.quizInfo){
        list = props.quizInfo
    }


    // checking if list is empty
    const Quiz_List = list.length ?

    // if not empty
    (
        // mapping quiz one by one
        list.map(quiz =>{

            // retutrning some JSX
            return(
                
                
               // {/* //  a unique key that is quiz id itself */}
            
            <div className="quiz" key = {quiz.quiz_id}>

                <h2>{quiz.quiz_id}</h2>
                    
                    {/* link every quiz id to view all the questions of the quiz */}
                    <Link to ={{
                        pathname :'/getquiz/'+quiz.quiz_id,
                        
                    }}> <h2>{quiz.quizName}</h2> </Link>

                    <button onClick={()=>deletequiz(quiz.quiz_id)}>delete</button>
                    
               
                    
                
                
            </div>
            )
        })
    )
    // if Empty 
    :(
        <h1>No quizzes</h1>
    )

    //main return component
    return(
        
        <div className="quizList">
            <input
            disabled={!props.quizInfo} 
            onChange={(event)=>{
                console.log(event);
                setquiz_id(event.target.value)
            }
            
            } type="number"/>

            <Link to={{
                pathname: '/getquiz/'+quiz_id
            }}><button disabled={!quiz_id} >go</button></Link>
            
            {Quiz_List}
            
        </div>
    )

   
}

const deletequiz=(quiz_id)=>{
    axios.post('http://192.168.43.135:80/deletequiz',{quiz_id}).then(window.location.reload())
}

//mapping state to props of component
const MapStateToProps=(state)=>{
    return{

        //quiz_ids will be available in the props of the component
        quizInfo : state.quizInfo
    }
}

// wrapping the component with the HOC
export default connect(MapStateToProps)(ViewQuiz)

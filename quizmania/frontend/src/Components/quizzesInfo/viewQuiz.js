import React, {useState} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom'


const ViewQuiz=(props)=> {


    
    const[quiz_id,setquiz_id] = useState(null);
    // getting quiz id list from props
    const id_list =props.quiz_ids

    

    // checking if list is empty
    const Quiz_List = id_list.length ?

    // if not empty
    (
        // mapping quiz one by one
        id_list.map(quiz_id =>{

            // retutrning some JSX
            return(
                
                
                                    // {/* //  a unique key that is quiz id itself */}
                <div className="quiz" key = {quiz_id}>

                    <img src="#" alt="quiz logo" className="quizimage" />
                    
                    {/* link every quiz id to view all the questions of the quiz */}
                    <Link to ={{
                        pathname :'/getquiz/'+quiz_id,
                        
                    }}>{quiz_id}</Link>

                    <button onClick={()=>deletequiz(quiz_id)}>delete</button>
                   
               
                    
                
                
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
            disabled={!props.quiz_ids.length} 
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
    axios.post('http://192.168.43.91:80/deletequiz',{quiz_id}).then(window.location.reload())
}

//mapping state to props of component
const MapStateToProps=(state)=>{
    return{

        //quiz_ids will be available in the props of the component
        quiz_ids : state.quiz_ids 
    }
}

// wrapping the component with the HOC
export default connect(MapStateToProps)(ViewQuiz)

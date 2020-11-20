import React ,{useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Hostquiz=(props)=> {

   
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
            <h2>{quiz.quizName}</h2>
                    
                    {/* link every quiz id to view all the questions of the quiz */}
                    <Link to ={{
                        pathname :'/hostquiz/'+quiz.quiz_id,
                        state:quiz
                        
                    }}> HOST</Link>
                </div>
            )
        })
    )
    // if Empty 
    :(
        <div>
            <h1> There are no quiz to Host </h1>
            <Link to ="/createquiz"> <button>Create Now</button> </Link>
        </div>
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
                pathname: '/hostquiz/'+quiz_id
            }}><button disabled={!quiz_id} >go</button></Link>
            
            {Quiz_List}
            
        </div>
    )

   
}
//mapping state to props of component
const MapStateToProps=(state)=>{
    return{

        //quiz_ids will be available in the props of the component
        quizInfo : state.quizInfo
    }
}


export default connect(MapStateToProps) (Hostquiz)

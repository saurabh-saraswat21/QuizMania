import React, { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'


import '../../stylesheets/viewQuiz.css';

import { GiMagnifyingGlass } from 'react-icons/gi';
import { RiDeleteBin6Line } from 'react-icons/ri';

const ViewQuiz=(props)=> {


    var list = [];
    const [quiz_id, setquiz_id] = useState(null);

    // getting quiz id list from props

    if (props.quizInfo) {
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

                <h2 id="quizID">{quiz.quiz_id}</h2>
                    
                    {/* link every quiz id to view all the questions of the quiz */}
                    <Link to ={{
                        pathname :'/getquiz/'+quiz.quiz_id,
                        
                    }} id="quizName" > <h2>{quiz.quizName}</h2> </Link>

                    <button className="delete-btn" onClick={()=>deletequiz(quiz.quiz_id)}><RiDeleteBin6Line id="del-btn"/></button>

            </div>
            )
        })
    )
    // if Empty 
    :(
        <div>
            <h1> You have not created any quiz  </h1>
            <Link to ="/createquiz"> <button>Create Now</button> </Link>
        </div>
    )


    //main return component
    return (

        <div className="quizList">

            <div className="header-container">

                <div id="title">
                    <h1 className="title">Quiz List</h1>
                </div>
                <div className="search-form">
                    <input className="search-input"
                    disabled={!props.quizInfo} 
                    onChange={(event)=>{
                        console.log(event);
                        setquiz_id(event.target.value)
                    }
                        
                    } type="number"/>

                    <Link to={{
                        pathname: '/getquiz/'+quiz_id
                    }}><button className="search-btn" disabled={!quiz_id} ><GiMagnifyingGlass id="magnify"/></button>
                    </Link>    
                </div>
                
                                        
            </div>
            <hr id="hr"/>
            <div id="headings">
                <div className="headingName">QuizID</div>
                <div className="headingName">QuizName</div>
            </div>
            {Quiz_List}

        </div>
    )


}


const deletequiz=(quiz_id)=>{
    axios.post('http://192.168.43.91:80/deletequiz',{quiz_id}).then(window.location.reload())

}

//mapping state to props of component
const MapStateToProps = (state) => {
    return {

        //quiz_ids will be available in the props of the component
        quizInfo: state.quizInfo
    }
}

// wrapping the component with the HOC
export default connect(MapStateToProps)(ViewQuiz)

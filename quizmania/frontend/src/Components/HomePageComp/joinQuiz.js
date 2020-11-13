import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


const joinQuiz = (props) => {
    // getting quiz id list from props
    const id_list = props.quiz_ids

    // checking if list is empty
    const Quiz_List = id_list.length ?

        // if not empty
        (
            // mapping quiz one by one

            id_list.map(quiz_id => {

                // retutrning some JSX
                // this will be displayed for every quiz that is saved in the database
                return (


                    // {/* //  a unique key that is quiz id itself */}
                    <div className="quiz" key={quiz_id}>

                        <img src="#" alt="quiz logo" className="quizimage" />

                        {/* link every quiz id to start that quiz */}
                        <Link to={{
                            pathname: '/Quiz/enter_info/' + quiz_id,

                        }}
                            // the target field is here so that the quiz opens in a same tab 
                            target="_self">

                            {/* Displaying   Id of the quiz */}
                            {quiz_id}

                        </Link>
                    </div>
                )
            })
        )
        // if Empty 
        : (
            <h1>No quizzes</h1>
        )

    //main return component
    return (
        <div className="quizList">
            {Quiz_List}

        </div>
    )


}

//mapping state to props of component
const MapStateToProps = (state) => {
    return {

        //quiz_ids will be available in the props of the component
        quiz_ids: state.quiz_ids
    }
}

// wrapping the component with the HOC
export default connect(MapStateToProps)(joinQuiz)

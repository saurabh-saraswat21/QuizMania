import React, { Component } from 'react'
import '../../stylesheets/startQuizHome.css'
import { connect } from 'react-redux'
import{Link} from 'react-router-dom'

export class startQuizHome extends Component {


    render() {
// a  function that will map the quiz to the props before it renders for the first time
const mapStateToProps = (state, defaultProps) => {

    //defaultProps are the basic props of the component that can give access to route params 
    // so that we know which quiz to fetch

    // getting  id from router params and cnverting to int so that is is able to be compared 
    const id = parseInt(defaultProps.match.params.quiz_id)

    //returning the particular quiz that is to be viewed
    return {

        // find method iterates every quiz in the quizzes and return that quiz whose id matches the id we get from the params above
        quiz: state.quizzes.find(quiz => quiz.quiz_id === id),

    }
}

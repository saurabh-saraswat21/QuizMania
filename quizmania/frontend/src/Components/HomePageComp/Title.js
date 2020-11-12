import React from 'react'
import '../../App.css';
import {Button} from '../partials/Button';
import '../../stylesheets/Title.css'
// import VideoContainer from './VideoContainer';
import {Link}  from 'react-router-dom'

function Title() {
    return (
        <div className='hero-container'>
            
            <h1>Welcome to QuizMania</h1>
            <p>What are you waiting for?</p>
            <div className="hero-btns">
                <Button className='btns' buttonStyle='btn--outline'
                 buttonSize='btn--large'>

                     <Link to ='/login'>Get Started</Link>
                    
                </Button>
            </div>
        </div>
    )
}

export default Title

import React from 'react'
import {Link} from 'react-router-dom' 
import '../../stylesheets/style.css'

const Home = () => {
    return (
        <div className="homePage">
            <div className="btn container">

                <div className="main btn"><Link to ="/createquiz" className="k">Create Quiz</Link> </div>
                <div className="main btn"><Link to ="/viewquiz">View Quiz</Link> </div>
            </div>
        </div>
    )
}
export default Home
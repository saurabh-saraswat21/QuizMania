// import react 
import React, { Component } from 'react';

//import router for routing
import {BrowserRouter,Route} from 'react-router-dom'

// import various components to be rendered  
import Home from './Components/MainPagesComp/home'
import Navbar from './Components/partials/navbar';
import createQuiz from './Components/HomePageComp/createQuiz';
import insertques from './Components/HomePageComp/insertques';
import viewQuiz from './Components/quizzesInfo/viewQuiz';
import getQuiz from './Components/quizzesInfo/getQuiz';
import joinQuiz from './Components/HomePageComp/joinQuiz';



class App extends Component {
  render() {

    return (
      <BrowserRouter>
      <div className="App">
        
        {/* NavBar that is alwasy going to show at the top of the website */}
        <Navbar/>





        {/* Routing for the different pages */}
        <Route exact path ='/' component={Home}/>
        <Route exact path ='/createquiz' component={createQuiz}/> 
        <Route path = '/insertques/:quiz_id' component={insertques}/>
        <Route path = '/viewquiz' component={viewQuiz}/>
        <Route path = '/getQuiz/:quiz_id' component ={getQuiz}/>
        <Route path = '/JoinQuiz' component ={joinQuiz}/>


      </div>
      </BrowserRouter>
    );
  }
}

export default App;

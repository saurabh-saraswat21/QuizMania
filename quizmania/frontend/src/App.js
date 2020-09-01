import React, { Component } from 'react';
import Home from './Components/MainPagesComp/home'
import Navbar from './Components/partials/navbar';
import {BrowserRouter,Route} from 'react-router-dom'
import createQuiz from './Components/HomePageComp/createQuiz';
import insertques from './Components/HomePageComp/insertques';



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
        


      </div>
      </BrowserRouter>
    );
  }
}

export default App;
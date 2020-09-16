// import react 
import React, { Component } from 'react';

//import router for routing
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// import various components to be rendered  
import Home from './Components/MainPagesComp/home'
import Navbar from './Components/partials/navbar';
import createQuiz from './Components/HomePageComp/createQuiz';
import insertques from './Components/HomePageComp/insertques';
import viewQuiz from './Components/quizzesInfo/viewQuiz';
import getQuiz from './Components/quizzesInfo/getQuiz';
import joinQuiz from './Components/HomePageComp/joinQuiz'
import startQuiz from './Components/JoinQuizComp/startQuizHome'
import quizOngoing from './Components/JoinQuizComp/quizOngoing';



class App extends Component {
  render() {


    const defaultRoutes = () => {
      return (
        <div>
          <div className="App">

            {/* NavBar that is alwasy going to show at the top of the website */}
            <Navbar />

            {/* Routing for the different pages */}
            <Switch>

              <Route exact path='/' component={Home} />
              <Route path='/createquiz' component={createQuiz} />
              <Route path='/getQuiz/:quiz_id' component={getQuiz} />
              <Route path='/insertques/:quiz_id' component={insertques} />
              <Route path='/viewquiz' component={viewQuiz} />
              <Route path='/JoinQuiz' component={joinQuiz} />
              <Route exact path='/startQuiz/:quiz_id' component={startQuiz} />
            </Switch>

          </div>

        </div>
      )

    }




    return (
      <BrowserRouter>
        <Switch>
          <Route path='/start' component ={quizOngoing}/>
          <Route component={defaultRoutes} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

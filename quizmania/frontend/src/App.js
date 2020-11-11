// import react 
import React, { Component } from 'react';

//import router for routing
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// import various components to be rendered  
import Home from './Components/MainPagesComp/home'
// import Navbar from './Components/partials/Navbar';
// import createQuiz from './Components/HomePageComp/createQuiz';
import insertques from './Components/HomePageComp/insertques';
import viewQuiz from './Components/quizzesInfo/viewQuiz';
import getQuiz from './Components/quizzesInfo/getQuiz';
import joinQuiz from './Components/HomePageComp/joinQuiz'
import startQuiz from './Components/JoinQuizComp/startQuizHome'
import quizOngoing from './Components/JoinQuizComp/quizOngoing';
import Userinfo from './Components/JoinQuizComp/userinfo';
import Editques from './Components/quizzesInfo/Editques';
import Dialog from './Components/partials/Dialog'



class App extends Component {
  render() {


    const defaultRoutes = () => {
      return (
        <div>
          <div className="App">


            {/* Routing for the different pages */}
            <Switch>

              <Route exact path='/' component={Home} />
              <Route path='/createquiz' component={Dialog} />
              <Route path='/getQuiz/:quiz_id' component={getQuiz} />
              <Route path='/insertques/:quiz_id' component={insertques} />
              <Route path='/edit/:quiz_id' component={Editques} />
              <Route path='/viewquiz' component={viewQuiz} />
              <Route path='/JoinQuiz' component={joinQuiz} />
              <Route exact path='/Quiz/enter_info/:quiz_id' component={Userinfo} />
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

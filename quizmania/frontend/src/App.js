<<<<<<< HEAD
// import react 
import React, { Component } from 'react';

//import router for routing
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// import various components to be rendered  
import Home from './Components/MainPagesComp/home'
import createQuiz from './Components/HomePageComp/createQuiz';
=======
import React from 'react';
>>>>>>> c4ff47bed2297a26f7fee27e4502515867465cea
import insertques from './Components/HomePageComp/insertques';
import viewQuiz from './Components/quizzesInfo/viewQuiz';
import getQuiz from './Components/quizzesInfo/getQuiz';
import startQuiz from './Components/JoinQuizComp/startQuizHome'
import Userinfo from './Components/JoinQuizComp/userinfo';
import Editques from './Components/quizzesInfo/Editques';
<<<<<<< HEAD
import Navbar from './Components/partials/Navbar';
import login from './Components/logincomponent/login';
import loginDashBoard from './Components/logincomponent/loginDashBoard';



class App extends Component {
  render() {
    const defaultRoutes = () => {
      return (
        <div>
          <div className="App">
          <Navbar/>

            {/* Routing for the different pages */}
            <Switch>

              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={login} />
              <Route exact path='/login/dashboard' component={loginDashBoard} />
              <Route path='/createquiz' component={createQuiz} />
              <Route path='/getQuiz/:quiz_id' component={getQuiz} />
              <Route path='/insertques/:quiz_id' component={insertques} />
              <Route path='/edit/:quiz_id' component={Editques} />
              <Route path='/viewquiz' component={viewQuiz} />
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
=======
import Dialog from './Components/partials/Dialog'
import GlobalStyle from './globalStyles'
import home from '../src/Components/MainPagesComp/home'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <GlobalStyle/>
      <Switch>
        <Route path="/" exact component={home} />
        <Route path='/createquiz' component={Dialog} />
        <Route path='/getQuiz/:quiz_id' component={getQuiz} />
        <Route path='/insertques/:quiz_id' component={insertques} />
        <Route path='/edit/:quiz_id' component={Editques} />
        <Route path='/viewquiz' component={viewQuiz} />
        <Route path='/JoinQuiz' component={joinQuiz} />
        <Route exact path='/Quiz/enter_info/:quiz_id' component={Userinfo} />
        <Route exact path='/startQuiz/:quiz_id' component={startQuiz} />
      </Switch>
    </Router>
  );
>>>>>>> c4ff47bed2297a26f7fee27e4502515867465cea
}

export default App;

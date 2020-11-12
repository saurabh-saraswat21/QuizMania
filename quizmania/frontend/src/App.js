import React from 'react';

//import router for routing
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// import various components to be rendered  
import Home from './Components/MainPagesComp/home'
import insertques from './Components/HomePageComp/insertques';
import viewQuiz from './Components/quizzesInfo/viewQuiz';
import getQuiz from './Components/quizzesInfo/getQuiz';
import startQuiz from './Components/JoinQuizComp/startQuizHome'
import quizOngoing from './Components/JoinQuizComp/quizOngoing';
import Userinfo from './Components/JoinQuizComp/userinfo';
import Editques from './Components/quizzesInfo/Editques';
import JoinQuiz from './Components/partials/JoinQuiz'
import Navbar from './Components/Navbar/Navbar';
import GlobalStyles from '../src/globalStyles'
import createQuiz from './Components/HomePageComp/createQuiz'
import login from './Components/logincomponent/login'
import LoginDashBoard from './Components/logincomponent/loginDashBoard';


const defaultRoutes = () => {
  return (
    <div>
      <div className="App">
      <Navbar/>

        {/* Routing for the different pages */}
        <Switch>

          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={login} />
          <Route exact path='/login/dashboard' component={LoginDashBoard} />
          <Route path='/createquiz' component={createQuiz} />
          <Route path='/joinquiz' component={JoinQuiz} />
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

function App() {



  return (
    <BrowserRouter>
    <GlobalStyles/>
    <Switch>
      <Route path='/start' component ={quizOngoing}/>
      <Route component={defaultRoutes} />
    </Switch>
  </BrowserRouter>
  );
}

export default App;

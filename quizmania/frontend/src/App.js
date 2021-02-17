import React, { useState, useEffect } from 'react';
//import router for routing
import { BrowserRouter, Route, Switch, } from 'react-router-dom'

// import various components to be rendered  
import Home from './Components/MainPagesComp/home'
import insertques from './Components/HomePageComp/insertques';
import viewQuiz from './Components/quizzesInfo/viewQuiz';
import getQuiz from './Components/quizzesInfo/getQuiz';
import startQuiz from './Components/JoinQuizComp/startQuizHome'
import Userinfo from './Components/JoinQuizComp/userinfo';
import Editques from './Components/quizzesInfo/Editques';
import Navbar from './Components/Navbar/Navbar';
import GlobalStyles from '../src/globalStyles'
import createQuiz from './Components/HomePageComp/createQuiz'
import LoginDashBoard from './Components/logincomponent/loginDashBoard';
import SignIn from './Components/auth/signIn';
import SignUp from './Components/auth/signUp';
import UserContext from './context/userContext';
import Axios from 'axios';
import cookie from 'js-cookie';
import hostquiz from './Components/JoinQuizComp/hostquiz';
import HostquizPage from './Components/hostQuizComponent/HostquizPage';
import QuizStats from './Components/JoinQuizComp/QuizStats';
import JoinQuizComp from './Components/partials/JoinQuizComp'



function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  })
  const checkLoggedIn = async () => {

    var token = cookie.get("auth-token");

    if (token === null) {
      cookie.set("auth-token", "");
      token = "";
    }
    const tokenRes = await Axios.post(
      'http://192.168.100.2:80/tokenIsValid',
      null,
      { headers: { "x-auth-token": token } }
    );

    if (tokenRes.data) {
      const userRes = await Axios.get("http://192.168.100.2:80/auth", {
        headers: { "x-auth-token": token },
      });

      setUserData({
        token,
        user: userRes.data,
      });
      // console.log(userData);

    }
  };
  useEffect(() => {

    checkLoggedIn();
  }, []);

  const defaultRoutes = () => {
    return (
      <div>
        <div className="App">
          <Navbar />

          {/* Routing for the different pages */}
          <Switch>

            {(userData.user) ?
              // if user login then this component is available
              (<Route exact path='/' component={LoginDashBoard} />) :
              //else this
              (<Route exact path='/' component={Home} />)

            }
            <Route path='/createquiz' component={createQuiz} />
            <Route path='/getQuiz/:quiz_id' component={getQuiz} />
            <Route path='/insertques/:quiz_id' component={insertques} />
            <Route path='/hostquiz/:quiz_id' component={HostquizPage} />
            <Route path='/viewquiz' component={viewQuiz} />
            <Route path='/hostquiz' component={hostquiz} />
            <Route path='/joinquiz' component={JoinQuizComp} />
            <Route path='/quizstats' component={QuizStats} />
            <Route exact path='/login' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/edit/:quiz_id' component={Editques} />
            <Route exact path='/Quiz/enter_info/:quiz_id' component={Userinfo} />
            <Route exact path='/startQuiz/:quiz_id' component={startQuiz} />
          </Switch>

        </div>

      </div>
    )

  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <GlobalStyles />
        <Switch>
          <Route component={defaultRoutes} />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;

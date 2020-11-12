// import react 
import React, { useState, useEffect } from 'react';

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
import Userinfo from './Components/JoinQuizComp/userinfo';
import SignIn from './Components/auth/signIn';
import SignUp from './Components/auth/signUp';
import User from './Components/auth/user';
import UserContext from './context/userContext';
import Axios from 'axios';


export default function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  })
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        'http://192.168.0.104:80/tokenIsValid',
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/auth", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();
  }, []);


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
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/user' component={User} />
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
        <Switch>
          <Route path='/start' component={quizOngoing} />
          <Route component={defaultRoutes} />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}




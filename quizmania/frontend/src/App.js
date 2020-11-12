import React from 'react';
import insertques from './Components/HomePageComp/insertques';
import viewQuiz from './Components/quizzesInfo/viewQuiz';
import getQuiz from './Components/quizzesInfo/getQuiz';
import joinQuiz from './Components/HomePageComp/joinQuiz'
import startQuiz from './Components/JoinQuizComp/startQuizHome'
import Userinfo from './Components/JoinQuizComp/userinfo';
import Editques from './Components/quizzesInfo/Editques';
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
}

export default App;

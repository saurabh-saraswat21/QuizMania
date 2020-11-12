// // import react 
import React, { Component } from 'react';

// //import router for routing
// import { Router, Route, Switch } from 'react-router-dom'

// import  {Navbar} from './Components'

// import various components to be rendered  
// import home from './Components/MainPagesComp/home'
// import Navbar from './Components/partials/Navbar';
// import createQuiz from './Components/HomePageComp/createQuiz';
import insertques from './Components/HomePageComp/insertques';
import viewQuiz from './Components/quizzesInfo/viewQuiz';
import getQuiz from './Components/quizzesInfo/getQuiz';
import joinQuiz from './Components/HomePageComp/joinQuiz'
import startQuiz from './Components/JoinQuizComp/startQuizHome'
// import quizOngoing from './Components/JoinQuizComp/quizOngoing';
import Userinfo from './Components/JoinQuizComp/userinfo';
import Editques from './Components/quizzesInfo/Editques';
import Dialog from './Components/partials/Dialog'



// class App extends Component {
//   render() {


//     const defaultRoutes = () => {
//       return (
//       <Router>
//         {/* <GlobalStyle/> */}
//         <Navbar/>
//         <Switch>
//           <Route exact path='/' component={Home} />
//           <Route path='/createquiz' component={Dialog} />
//           <Route path='/getQuiz/:quiz_id' component={getQuiz} />
//           <Route path='/insertques/:quiz_id' component={insertques} />
//           <Route path='/edit/:quiz_id' component={Editques} />
//           <Route path='/viewquiz' component={viewQuiz} />
//           <Route path='/JoinQuiz' component={joinQuiz} />
//           <Route exact path='/Quiz/enter_info/:quiz_id' component={Userinfo} />
//           <Route exact path='/startQuiz/:quiz_id' component={startQuiz} />
//         </Switch>
//         {/* <Footer/> */}
//       </Router> 

//       )

//     }




//     return (
//       <BrowserRouter>
//         <Switch>
//           <Route path='/start' component ={quizOngoing}/>
//           <Route component={defaultRoutes} />
//         </Switch>
//       </BrowserRouter>
//     );
//   }
// }

// export default App;

import { Footer, Navbar} from './Components'
// import React from 'react'
import GlobalStyle from './globalStyles'
import home from '../src/Components/MainPagesComp/home'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <GlobalStyle/>
      <Navbar />
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
      <Footer/>
    </Router>
  );
}

export default App;

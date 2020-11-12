import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux'
// import * as serviceWorker from './serviceWorker';
import acessListReducer from './reducers/acessListReducer'
import {fetchData} from './Actions/getQuizData'

//creating  a redux store
const quizStore = createStore(

  //reducer of the store
    acessListReducer,

    // middleware for Async request 
    applyMiddleware(thunk)

  );

  //dispatching action from the action creator to fetch data initialy when the websites loads and store in the redux state
  quizStore.dispatch(fetchData())

//subscribe to changes whenever that state of the store updates the subsribbe functin is going to execute 
  quizStore.subscribe(()=>{
    console.log("update")

  })

ReactDOM.render(
  <React.StrictMode>

    {/* Provider allows to connect redux store to the main App 
    App and store are both wrapped up inside provider tag*/}
    <Provider 

    // Attaching the store
    store ={quizStore}>

      {/* wrapping the app */}
      <App />

    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


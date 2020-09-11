// Initial state of the redux store

const initState ={
    quizzes: [],
     quiz_ids :[]
}

// the reducer that is going to handle all the actions dispatched
const acessListReducer =(state=initState,action)=>{

    // if the action if of type 'GET_QUIZ_DATA_SUCCESS' 
    if(action.type === 'GET_QUIZ_DATA_SUCCESS')
    {
        // empty array to store quiz ids
    var quiz_ids =[];
    
    // iterating data that is attached by the action of this type 
    // data basically contains the data from the database that are fetched in action creators 
    // and dispatched with the payload 
    for (let i = 0; i < action.data.length; i++) {

        // storing every data element in the quiz_ids array
         quiz_ids[i] = action.data[i].quiz_id;
        
    }

    //whatever reducers return that saves in the state of the store so now updating the state of store with the data 
      return{

        // spreading the data to be saved as a indivdual elements
          quizzes:[...action.data],

        //   saving quiz_ids
          quiz_ids : quiz_ids

      }
      
    }
    
    // till now there is only one action so returnng the default state of initial action
    return state;
}

export default acessListReducer;
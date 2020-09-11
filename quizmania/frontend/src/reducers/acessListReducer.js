const initState ={
    quizzes: [],
     quiz_ids :[]
}
const acessListReducer =(state=initState,action)=>{
    if(action.type === 'GET_QUIZ_DATA_SUCCESS')
    {
    var quiz_ids =[];
    
    for (let i = 0; i < action.data.length; i++) {
         quiz_ids[i] = action.data[i].quiz_id;
        
    }
      return{
          quizzes:[...action.data],
          quiz_ids : quiz_ids
      }
      
    }
    

    return state;
}

export default acessListReducer;
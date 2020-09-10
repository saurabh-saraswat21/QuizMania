const initState ={
    quizzes: [
        {
            _id: "000",
            questions:[
            {

                questionString: 'sample question',
                option1: 'sample option 1',
                option2: 'sample option 2',
                option3: 'sample option 3',
                option4: 'sample option 4',
                correct: 'sample correct '
            }

            ]

        }
    ],
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
          quizzes:action.data,
          quiz_ids : quiz_ids
      }
      
    }
    

    return state;
}

export default acessListReducer;
const initState ={
    questions: [
        {
            _id: "000",
            questionString: 'sample question',
            option1: 'sample option 1',
            option2: 'sample option 2',
            option3: 'sample option 3',
            option4: 'sample option 4',
            correct: 'sample correct '

        }
    ],
     quiz_ids :[123,213,1234,48682]
}
const acessListReducer =(state=initState,action)=>{

    return state;
}

export default acessListReducer;
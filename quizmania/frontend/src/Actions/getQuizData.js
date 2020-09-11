export const getQuizDataSucess = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: 'GET_QUIZ_DATA_SUCCESS',
                data: data
            });
            resolve()
        })
    }
}

export const getQuizDataFailure = (message)=>{
    return {
        type : 'GET_QUIZ_DATA_FAILURE',
        message
    }
}

export const  fetchData=()=>{
 return(dispatch)=>{

    fetch("http://localhost:80/viewquizes")
    .then(res1 =>res1.json())
    .then(res2=>{
         dispatch(getQuizDataSucess(res2))
        
    })

    .catch(err=>{
        const errMsg  = err.message
            dispatch(getQuizDataFailure(errMsg))
    })
 }
}

// if successful the action returns a promise that dipatch the success action
export const getQuizDataSucess = (data) => {

    // returning dispatch as a callback
    return dispatch => {

        // returning promise  with success and reject functin as params
        return new Promise((resolve, reject) => {

            // the main action
            dispatch({
                type: 'GET_QUIZ_DATA_SUCCESS',
                data: data
            });

            // calling the success function 
            resolve()
        })
    }
}


// failure action creator function

export const getQuizDataFailure = (message)=>{

    // return an actioon of type GET_QUIZ_DATA_FAILURE with the error message payload
    return {
        type : 'GET_QUIZ_DATA_FAILURE',
        message
    }
}



// The main action creator that will be used to fetch data
export const  fetchData=()=>{

    // takes dispatch as an argument to be used to dipatch action
 return(dispatch)=>{

    // requesting backend server for data
    fetch("http://192.168.43.24:80/viewquizes")

    // converting  fetched data to JSON
    .then(res1 =>res1.json())

    .then(res2=>{

        // if data fetchedd succesfully dispatch the success action with the response payload
         dispatch(getQuizDataSucess(res2))
        
    })

    // if there is error dispatch the failure action with the error message 
    .catch(err=>{

        const errMsg  = err.message

            dispatch(getQuizDataFailure(errMsg))
    })
 }
}
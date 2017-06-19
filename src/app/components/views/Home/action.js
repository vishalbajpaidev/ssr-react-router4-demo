
export function getHomeData1(config,sleep=300) {
    console.log("## Action :: getHomeData_1:: Called === #############");
    return (dispatch) =>
        new Promise((res)=>setTimeout(res,sleep,{firstName:"Vishal",lastName:"Bajpai",age:26}))
            .then((json) => {
                // console.log("~~~TEST 1 ~~~~~~~~~~~~~~~~~~~~~",json)
                dispatch({type:'GET_HOME_DATA_1' ,data: json});
            });
}


export function getHomeData2(config,sleep=300) {
    console.log("## Action :: getHomeData_1:: Called === #############");
    return (dispatch) =>
        new Promise((res)=>setTimeout(res,sleep,{email:"vishal.bajpai@gmail.com",username:"vishal.bajpai"}))
            .then((json) => {
                // console.log("~~~TEST 2 ~~~~~~~~~~~~~~~~~~~~~",json)
                dispatch({type:'GET_HOME_DATA_2' ,data: json});
            });
}

export function getTest1(para,pageOffset = 0) {
    console.log("##Test1 #############");
    return (dispatch) =>
        new Promise((res)=>setTimeout(res,5000,{test1:"test 1111 VAl"}))
            .then((json) => {
                console.log("~~~TEST 1 ~~~~~~~~~~~~~~~~~~~~~",json)
                dispatch({type:'test1' ,data: json});
            });
}

export function getTest2(para,pageOffset = 0) {
    console.log(para,"##Test2 #############");
    return (dispatch) =>
        new Promise((res)=>setTimeout(res,6000,{test2:"TESt 222 VAlue "}))
            .then((json) => {
                console.log("~~~TEST 2 ~~~~~~~~~~~~~~~~~~~~~",json)
                dispatch({type:'test2' ,data: json});
            });
}

/**
 * Created by intelligrape on 6/6/17.
 */
import {ACTION} from './constants';

const initialState = {
    homeData1:{},
    homeData2:{},
};

export default function homeReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_HOME_DATA_1' :
            return {...state, homeData1:action.data};
        case "GET_HOME_DATA_2" :
            return {...state, homeData2:action.data};
        default:
            return state;
    }
}

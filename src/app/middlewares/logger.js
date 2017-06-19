/**
 * Created by intelligrape on 2/6/17.
 */


const logger = (store) =>(next) =>(action) => {
    console.log(`Fired action is: ${action.type}`);
    next(action);
};

export default logger;
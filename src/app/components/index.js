import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import routes from '../../config/route';
import {createRoute} from '../../utils/helper';


class Main extends Component{
    render(){
        return (<div>
            <Switch>
                {createRoute(routes)}
            </Switch>
        </div>)
    }
}
const mapStateToProps = state => ({
    modal: state.modal

});
export default connect(mapStateToProps)(Main);

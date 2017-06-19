/**
 * Created by intelligrape on 5/6/17.
 */

import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getHomeContent} from './action';
import {bindActionCreators} from 'redux';


class Home extends Component {
    constructor(props){
        super(props);
        // console.log("***********",props.homeData1)

    }
    componentDidMount() {
    }
    render() {
        const {homeData1,homeData2} = this.props;
        return (
        <div>
            <h1>Home</h1>
            <h2> Home Data 1 </h2>
            {homeData1?
                <div>
                    First Name: {homeData1.firstName}
                    <br/>
                    Last Name: {homeData1.lastName}
                </div>
                :null
            }
            <br/>

            <h2> Home Data 2 </h2>
            {homeData2?
                <div>
                    Email: {homeData2.email}
                    <br/>
                    User Name: {homeData2.username}
                </div>
                :null
            }
            <br/>
            <br/>
            <br/>

            <p>Check 'View Page source' for make sure data 1 and data2 is comming form server</p>
            <p>updated store saved in window.__REDUX_STATE__</p>
            <p>we did't dispatch any action in Home component.</p>
        </div>
        );
    }
}

const mapStateToProps = (state) => ({
    homeData1 : state.homeData.homeData1,
    homeData2 : state.homeData.homeData2
});

const mapDispatchToProps = (dispatch) => ({
});

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
export default HomeContainer;

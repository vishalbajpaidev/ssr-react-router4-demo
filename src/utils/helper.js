import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import routesDacorator from './routesDacorator';

const RouteWithSubRoutes = (route) => {
    const isLogin = true;
    if (!route.auth || (route.auth && route.auth.access && isLogin)) {
        // for login user
        if (route && route.decorator) {
            return routesDacorator[route.decorator](route);
        } else {
            return (
                <Route path={route.path} render={props => {
        // pass the sub-routes down to keep nesting
    return(<route.component {...props} routes={route.routes}/>)
    }
  }/>
            )
        }
    }else{
        return (<Redirect to={{
        pathname: (route && route.auth && route.auth.redirectUrl) || '/login',
      }}/>)
    }
};

export const createRoute = (routes) =>(routes && routes.map && routes.map((route, i) => (<RouteWithSubRoutes key={i} {...route}/>)) );

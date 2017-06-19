export default {
    PrivateRoute : (route) => (
        <Route path={route.path} render={props => {
        console.log(route.decorator,"===decorator###########");
    return(<route.component {...props} routes={route.routes}/>)
    }
  }/>
    )
};

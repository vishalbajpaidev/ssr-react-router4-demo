# ssr-react-router4

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Node.js Version][node-version-image]][node-version-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

If you are using express for serve your reactjs app with react-router-4.x, this module will works for you, By using this module you may reander HTML from `sever` by setup very less configuration and you may set list of action that you want to initially dispatch for setup your store before render HTML.
Demo: https://github.com/vishalbajpaidev/ssr-react-router4-demo
## Installation

```sh
$ npm install ssr-react-router4
```

## API

```js
var express      = require('express')
var ssr = require('ssr-react-router4')

var app = express()
app.get('*', (req, res, next) => {
    ssr(config,(err,html)=>{
        if(err) console.log(err);
        res.send(html);
        console.log(JSON.stringify(store.getState())); // updated store
  });
});

```

### ssr(config, callback)

- `config` a object of configuration that must have following keys:
     - `App` a react component what is root component of application (don't use BrowserRouter route inside this component).
    - `routes` a react route array of route configuration.
    eg: https://reacttraining.com/react-router/web/example/route-config
    - `store` must be your store with initial values of store state (what created by using createStore module),that will be update after server side rendering.
     - `url` must be an string, you may get it by using request.url in express route handler.
     - `query` must be an object, you may get it by using request.query in express route handler.
     

### How you configure routes with pre-load Data (for dispach actions before render HTML form server)

If you want to dispatch actions at the time of server side rendering, you need to define the list of action in an array with route config.
- `Eg:`
 ```js
import {getHomeContent,getUserInfo,getBannerData,getOtherData} from '../app/components/views/Home/action';

export default [
    { path: '/show-banner',
        component: ShowBanner,
        loadData:[getBannerData]
    },
    { path: '/home',
        component: Home,
        loadData:[{actionName:getUserInfo,priority:1},{actionName:getHomeContent,priority:2}],
        routes: [
            { path: '/home/inner-page',
                component: HomeInnerPage,
                loadData:[{actionName:getHomeContent,priority:3}]
            },
            { path: '/home/data-list',
                component: List,
            }
        ]
    }
]

```

There are two way to dispatch actions in server,
- Parallel:  
  - if you push action in loadData key like: 
loadData:[getBannerData] // It will run your all actions in Parallel
- Sequential:

  - You can run your actionss in Sequential way, when API response are dependent on each other.
  - loadData:[{actionName:getHomeContent,priority:1}] 
  - You must need to set priority for all sequential actions.
## Example

```js
var express = require('express')
var ssr = require('ssr-react-router4')
import Main from './app/components'
import routes from './routes';
import store from './app/store';

var app = express()
app.get('*', (req, res, next) => {
// data to send template
const data = {
    entry: 'assets.js',
    stylesheet: 'style.css',
    preloadedState: JSON.stringify({}),
    body: "",
  };
const config = {
    App:Main,
    routes: routes,
    url: req.url,
    query: req.query,
    store: store,
  };
  const template = ejs.compile(require('./view/index.ejs.js')); // compile your template
    ssr(config,(err,html)=>{
        if(err) console.log(err);
        data.body = body;
        data.preloadedState = JSON.stringify(store.getState()); // got updated store based on loadData key defined in your routes config
        res.send(template(data));
  });
});

```

## Action implementation :

```js
export function getData({params,queryString,store}) {
    // First paramenter is fixed for ssr
    // params & queryString are based on routes, store will be update store on each action
    // you should pass same values from client due to dispatch action,if needed
    return (dispatch) =>
        new Promise((resolve)=>
        setTimeout(resolve,3000,{data:{home:[val1,val2]}}))
            .then((json) => {
                dispatch({type:'GET_DATA_SUCCESS' ,data: json});
            });
}

```
## Template File :
- `Ejs Template File` should look like this.

```js
// Exporting ejs template as string for further compilation
// is a hack to work around webpack's serverside bundling
module.exports = `
<html>
<body>
<h1>Heading..</h1>
<div id="app"><%- body %></div>
<script src="<%- vendor %>" defer="defer"></script>
<script src="<%- entry %>" defer="defer"></script>
<script>window.__REDUX_STATE__ = <%- preloadedState %> </script>
</body>
`;

```

## How to get updated store in client side :
- we have saved __REDUX_STATE__ in window object in previous step,can be used to set initialState in client side,when you are creating your redux store.
- const initialState = window.__INITIAL_STATE__
- const store = createStore(combineReducers(reducers),initialState);
- By using this you can get you updated store (form server side) in client side as well. For this you need to defined action's priority like this:
{actionName:getHomeContent,priority:1}
## Demo :
Click here for see full demo in reactjs Application.
Demo: https://github.com/vishalbajpaidev/ssr-react-router4-demo

### [MIT Licensed](LICENSE)

[npm-image]: https://img.shields.io/npm/v/react-express-ssr.svg
[npm-url]: https://npmjs.org/package/react-express-ssr
[node-version-image]: https://img.shields.io/node/v/react-express-ssr.svg
[node-version-url]: https://nodejs.org/en/download
[travis-image]: https://img.shields.io/travis/expressjs/react-express-ssr/master.svg
[travis-url]: https://travis-ci.org/expressjs/react-express-ssr
[coveralls-image]: https://img.shields.io/coveralls/expressjs/react-express-ssr/master.svg
[coveralls-url]: https://coveralls.io/r/expressjs/react-express-ssr?branch=master
[downloads-image]: https://img.shields.io/npm/dm/react-express-ssr.svg
[downloads-url]: https://npmjs.org/package/react-express-ssr


import Home from '../app/components/views/Home';
import {getHomeData1,getHomeData2,getTest1,getTest2} from '../app/components/views/Home/action';

export default [
    { path: '/view-all',
        component: Home,
        decorator:null
    },

    { path: '/test',
        component: Home,
        loadData:[/*{actionName:getTest1,priority:2},{actionName:getTest1,priority:1}*/],
        // exact: true,
        routes: [
            { path: '/test/one/:id',
                component: Home,
                loadData:[/*{actionName:getTest1,priority:3}*/],
                // exact: true,
            },
            { path: '/test/two',
                component: Home,
                // exact: true,
            }
        ]
    },
    { path: '/',
        component: Home,
        auth:{redirectUrl:"",access:true},
        exact: true,
        loadData:[getHomeData1,getHomeData2],

        // decorator:"PrivateRoute"
    },
]

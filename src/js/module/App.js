import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import React from "react";
import Main from "./main";

export default class App extends React.Component{

    render() {
        return (
            <Router>
                <Route path={'/'} component={Main}/>
                {/*<Route path={'/report'} component={ClientInfoTabs}/>*/}
                {/*<Route exact={} path={'/home'}></Route>*/}
            </Router>
        )
    }

}

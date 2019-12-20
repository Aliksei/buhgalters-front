import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import {Drawer} from "@material-ui/core";
import MiniDrawer from "./js/general/CoolMenu";
import {AuthContext} from "./js/context/auth";


const App = () => (
    <div>
        <MiniDrawer/>
    </div>
    // <AuthContext.Provider value={false}>
    // <div>
    // <MiniDrawer/>
    // </div>
// </AuthContext.Provider>
);


// ReactDOM.render(<FullWidthTabs/>, document.getElementById('root'));
ReactDOM.render((
        <BrowserRouter>
            <App/>
        </BrowserRouter>

), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

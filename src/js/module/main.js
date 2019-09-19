import * as React from "react";
import {Fragment} from "react";
import Clients from "./clientsTable";
import TabPanel from './navigationTab'
import UserBar from "./userBar";


export default class Main extends React.Component {
    render() {
        return (
            <Fragment>
                <UserBar/>
                <TabPanel/>
            </Fragment>)
    }
}
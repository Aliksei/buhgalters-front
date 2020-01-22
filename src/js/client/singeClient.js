import React, {Fragment, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Grid} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import ClientsReport from "./singleClientReport";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Paper from "@material-ui/core/Paper";
import ClientData from "./clientPersonalData";
import ClientsAct from "./singleClientActs";
import {clientService} from "../service/clientService";
import Shablons from "./emailact";


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    paper2: {
        padding: theme.spacing(2),
        width: '99%',
        minHeight: '200px',
        maxHeight: '500px',
        color: "rgb(241, 241, 241)",
    }
}));

const SingleClient = (props) => {

    const classes = useStyles();
    const [client, setClient] = useState({});
    const [acts, setActs] = useState([]);
    const [reports, setReports] = useState([]);
    const [update, triggerUpdate] = useState({});

    useEffect(() => {
        let clientId = props.match.params.id;
        clientService.getClientById(clientId).then(c => setClient(c));
        clientService.getClientActs(clientId).then(a => setActs(a));
        clientService.getClientReports(clientId).then(r => setReports(r));
    }, [update]);

    return (
        <Fragment>
            <Breadcrumbs aria-label="breadcrumb">
                <Link to='/clients'>
                    Клиенты
                </Link>
                <Link to={'/clients/' + props.match.params.id}>
                    {client.name}
                </Link>
            </Breadcrumbs>
            <div>
                <Grid container className={classes.container}>
                    <Grid item xs={6} className={classes.paper}>
                        <Paper className={classes.paper2}>
                            <ClientData client={client} update={triggerUpdate}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} className={classes.paper}>
                        <Paper className={classes.paper2}>
                            <Shablons client={client} update={triggerUpdate} acts={acts}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} className={classes.paper}>
                        <ClientsAct owner={client} actList={acts} update={triggerUpdate}/>
                    </Grid>
                    <Grid item xs={12} className={classes.paper}>
                        <ClientsReport owner={client} reportList={reports} update={triggerUpdate}/>
                    </Grid>
                </Grid>

            </div>
        </Fragment>
    )
};


export default SingleClient;

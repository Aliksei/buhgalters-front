import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import {Grid} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {useClientData} from "../service/custom-hooks/custom-hookjs";
import ClientData from "./clientPersonalData";
import Paper from "@material-ui/core/Paper";
import ClientsReport from "./singleClientReport";
import ClientsAct from "./singleClientActs";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";


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
        color: theme.palette.text.secondary,
        backgroundColor: "rgba(0,109,255,0.07)",
    }
}));

const SingleClient = (props) => {

    const classes = useStyles();
    const [update, triggerUpdate] = useState({});
    const {client, acts, reports} = useClientData(props.match.params.id, update);

    if (client === null) return null;

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
            <Grid container className={classes.container}>
                <Grid item xs={12} className={classes.paper}>
                    <Paper className={classes.paper2}>
                        <ClientData client={client} update={triggerUpdate}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} className={classes.paper}>
                    <ClientsAct owner={client} actList={acts} update={triggerUpdate}/>
                </Grid>
                <Grid item xs={12} className={classes.paper}>
                    <ClientsReport owner={client} reportList={reports} update={triggerUpdate}/>
                </Grid>
            </Grid>
        </Fragment>
    );
};


export default SingleClient;

import React, {Fragment, useEffect, useState} from "react";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link} from "react-router-dom";
import {Box, Button, Grid, ListItemText} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import ClientsReport from "./singleClientReport";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Paper from "@material-ui/core/Paper";
import ClientData from "./clientPersonalData";
import ClientsAct from "./singleClientActs";
import {clientService} from "../service/clientService";


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
        width: '50%',
        minHeight: '200px',
        maxHeight: '300px',
        color: theme.palette.text.secondary,
    }
}));

const SingleClient = (props) => {

    const classes = useStyles();
    const [client, setClient] = useState({});
    const [hasError, setErrors] = useState(false);

    useEffect(() => {
        clientService.getClientById(props.match.params.id)
            .then(res => setClient(res));
    }, []);

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
                    <Grid item xs={12} className={classes.paper}>
                        <Paper className={classes.paper2}>
                            <ClientData client={client}/>
                            <Link to='/clients'>
                                <Button variant="contained" color="default" size="small">
                                    <ArrowBackIcon/>
                                </Button>
                            </Link>
                        </Paper>

                    </Grid>
                    <Grid item xs={12} className={classes.paper}>
                        <ClientsAct owner={client} clientId={props.match.params.id}/>
                    </Grid>
                    <Grid item xs={12} className={classes.paper}>
                        <ClientsReport owner={client} clientId={props.match.params.id}/>
                    </Grid>
                </Grid>

            </div>
        </Fragment>
    )
};


export default SingleClient;

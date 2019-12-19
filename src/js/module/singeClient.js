import React, {Fragment, useEffect, useState} from "react";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import {Link} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import {Box, Button, Grid, ListItemText} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import ClientsAct from "./singleClientActs";
import ClientsReport from "./singleClientReport";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ClientData from "./singl";


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
        textAlign: 'center',
        width: '99%',
        minHeight: '200px',
        maxHeight: '400px',
        color: theme.palette.text.secondary,
    }
}));

const SingleClient = (props) => {

    const classes = useStyles();
    const [client, setClient] = useState({});
    const [hasError, setErrors] = useState(false);

    async function fetchClickedClient(props) {
        return fetch("http://localhost:8080/clients/" + props.match.params.id)
            .then(res => res.json())
            .then(res => setClient(res))
            .catch(error => setErrors(error));
    }

    useEffect(() => {
        fetchClickedClient(props);
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
                            <ClientData/>
                            <Link to='/clients'>
                                <Button variant="contained" color="default" size="small">
                                    <ArrowBackIcon/>
                                </Button>
                            </Link>
                            <Link to='/clients'>
                                <Button variant="contained" color="inherit" size="small">
                                    <EditOutlinedIcon/>
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

export function clientView(client) {
    return (
            <Box display="flex" flexWrap="wrap" alignItems="flex-start">





            </Box>
    )
}

export default SingleClient;

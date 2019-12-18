import React, {Fragment, useEffect, useState} from "react";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import {Link} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import {Box, Button, Grid} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import ClientsAct from "./singleClientActs";
import ClientsReport from "./singleClientReport";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {func} from "prop-types";


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
        minHeight: '300px',
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
                            {clientView(client)}
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
        <Box display="flex" >
            <div style={{display:'flex'}}>
                <Typography variant={"h9"}>Имя : </Typography>
                <TextField required id="client-name" value={client.name} variant="standard" margin="normal"/>
            </div>
            <div style={{display:'flex'}}>
                <Typography variant={"h9"}>Адрес : </Typography>
                <TextField id="client-address" value={client.address} variant="standard" margin="normal"/>
            </div>
            <div style={{display:'flex'}}>
                <Typography variant={"h9"}>Почта:</Typography>
                <TextField id="client-email" value={client.email} variant="standard" margin="normal"/>
            </div>
            <div style={{display:'flex'}}>
                <Typography variant={"h9"}>Директор:</Typography>
                <TextField id="client-director" value={client.director} variant="standard" margin="normal"/>
            </div>
            <div style={{display:'flex'}}>
                <Typography variant={"h9"}>Фонд:</Typography>
                <TextField id="client-fond" value={client.fond} variant="standard" margin="normal"/>
            </div>
            <div style={{display:'flex'}}>
                <Typography variant={"h9"}>Имнс:</Typography>
                <TextField id="client-imns" value={client.imns} variant="standard" margin="normal"/>
            </div>
            <div style={{display:'flex'}}>
                <Typography variant={"h9"}>Окпо:</Typography>
                <TextField id="client-okpo" value={client.okpo} variant="standard" margin="normal"/>
            </div>
            <div style={{display:'flex'}}>
                <Typography variant={"h9"}>Фсзн:</Typography>
                <TextField  id="client-fszn" value={client.fszn} variant="standard" margin="normal"/>
            </div>
            <div style={{display:'flex'}}>
                <Typography variant={"h9"}>Унп:</Typography>
                <TextField  id="client-ynp" value={client.ynp} variant="standard" margin="normal"/>
            </div>

        </Box>
    )
}

export default SingleClient;

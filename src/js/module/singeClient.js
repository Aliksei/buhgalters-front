import React, {useEffect, useState} from "react";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import {Link} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import {Button, Grid} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import ClientsAct from "./singleClientActs";
import ClientsReport from "./singleClientReport";


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
        <div>
            <div>
                <span>Имя клиента : </span>
                <span>
                    <TextField
                        required
                        disabled={true}
                        id="client-name"
                        className={classes.textField}
                        value={client.name}
                        variant="outlined"
                        margin="normal"
                    />
                </span>
                <div>{client.id}</div>
                <div>{client.name}</div>
                <div>{client.email}</div>
                <div>{client.address}</div>
                <div>{client.director}</div>
                <div>{client.fond}</div>
                <div>{client.imns}</div>
                <div>{client.okpo}</div>
                <div>{client.fszn}</div>
                <div>{client.ynp}</div>

                <Link to='/clients'>
                    <Button variant="contained" color="default" size="small">
                        <ArrowBackIcon/>
                    </Button>
                </Link>

                <Grid container>
                    <Grid item xs={12} className={classes.paper}>
                        {/*<Paper className={classes.paper}>*/}
                        <ClientsAct owner={client} clientId={props.match.params.id}/>
                        {/*</Paper>*/}
                    </Grid>
                    <Grid item xs={12} className={classes.paper}>
                        {/*<Paper>*/}
                        <ClientsReport owner={client} clientId={props.match.params.id}/>
                        {/*</Paper>*/}
                    </Grid>
                </Grid>

                <Link to='/clients'>
                    <Button
                        variant="contained"
                        color="inherit"
                        size="small"
                    >
                        <EditOutlinedIcon/>
                    </Button>
                </Link>
            </div>
        </div>
    )
};

export default SingleClient;

import React, {useEffect, useState} from "react";
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import {Link} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import {Button} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import ClientsAct from "./singleClientActs";
import OneAct from "./singleClientActs";
import Acts from "./actsTable";


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

                <div>
                    <ClientsAct owner={client} clientId={props.match.params.id}/>
                </div>

                <Link to='/clients'>
                    <Button variant="contained" color="default" size="small">
                        <ArrowBackIcon/>
                    </Button>
                </Link>
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

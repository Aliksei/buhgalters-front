import React, {useState} from 'react'
import Button from "@material-ui/core/Button";
import {Card, FormControl, makeStyles} from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles({
    card: {
        minWidth: 275,
        maxWidth: 500,
        minHeight:275,
        maxHeight:500
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});



export default function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const classes = useStyles();

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <Card className={classes.card}>
            <Button variant="outlined" color="primary">
                Login
            </Button>
            <TextField id="outlined-basic"
                       label="login"
                       variant="outlined"
            />
            <TextField
                id="filled-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
            />
        </Card>
    );

}
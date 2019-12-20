import React, {useState} from 'react'
import Button from "@material-ui/core/Button";
import {Card, FormControl, makeStyles} from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import {useAuth} from "../context/auth";
import {Redirect} from "react-router-dom";
import Box from "@material-ui/core/Box";


const useStyles = makeStyles({
    card: {
        minWidth: 275,
        maxWidth: 500,
        minHeight: 275,
        maxHeight: 500
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

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const {setAuthTokens} = useAuth();
    const classes = useStyles();


    function postLogin() {
        console.log("TREEE");
        setAuthTokens("LIL");
        setLoggedIn(true);
    }

    if (isLoggedIn) {
        return <Redirect to="/clients"/>;
    }

    return (
        <Card className={classes.card}>
                <Box display="flex">
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
                </Box>
                <Box display="flex">
                    <Button variant="outlined" color="primary" onClick={postLogin}>
                        Login
                    </Button>
                    <Button variant="outlined" color="primary" onClick={postLogin}>
                        Register
                    </Button>
                </Box>
        </Card>
    );

}

import React, {useState} from 'react'
import Button from "@material-ui/core/Button";
import {Card, Grid, makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {useAuth} from "../context/auth";
import {Link, Redirect} from "react-router-dom";
import Box from "@material-ui/core/Box";
import {API_HOST} from "../service/actService";


const useStyles = makeStyles(theme => ({
    card: {
        minWidth: "30%",
        minHeight: "30%",
        textAlign: 'center'
    },
    box: {
        padding: theme.spacing(2),
        flexDirection: "column"
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
}));


export default function LoginForm() {

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const {setAuthTokens} = useAuth();
    const classes = useStyles();

    function postLogin() {
        setError(false);
        return fetch(`http://${API_HOST}:8080/authenticate`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            // credentials: "include",
            body: JSON.stringify({
                userName: btoa(userName),
                password: btoa(password),
            })
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    console.log("Setting error true");
                    setError(true);
                    return "";
                }
            })
            .then(res => {
                if (res !== "") {
                    setAuthTokens(res.jwtToken);
                    setLoggedIn(true);
                }
            });
    }

    const handleUserName = (event) => setUserName(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);

    if (isLoggedIn) {
        return <Redirect to="/clients"/>;
    }

    const getHelperText= () => {
            return  error ? 'Логин или пароль введены неверно' : null
    };

    return (
        <Grid container align="center" justify="center">
            <Card className={classes.card}>
                <Box className={classes.box}>
                    <Box className={classes.box}>
                        <TextField id="outlined-basic"
                                   error={error}
                                   label="Логин"
                                   helperText={getHelperText()}
                                   variant="outlined"
                                   onChange={handleUserName}
                                   style={{display: "flex"}}
                        />
                    </Box>
                    <Box className={classes.box}>
                        <TextField
                            id="filled-password-input"
                            error={error}
                            helperText={getHelperText()}
                            label="Пароль"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            onChange={handlePassword}
                            style={{display: "flex"}}
                        />
                    </Box>
                    <Box className={classes.box}>
                        <Button variant="outlined" color="primary" onClick={postLogin} style={{margin:7}}>Войти</Button>
                        <Button variant="outlined" color="primary" component={Link} to={'/registration'}>Регистрация</Button>
                    </Box>
                </Box>
            </Card>
        </Grid>
    );

}

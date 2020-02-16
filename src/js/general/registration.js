import React, {useState} from 'react'
import Button from "@material-ui/core/Button";
import {Card, Grid, makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {useAuth} from "../context/auth";
import {Link, Redirect} from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
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


export default function RegistrationFrom() {

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [secondPassword, setSecondPassword] = useState("");
    const {setAuthTokens} = useAuth();
    const classes = useStyles();

    function register() {
        return fetch(`http://${API_HOST}:8080/user`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: userName,
                email: email,
                password: password,
                company: 'Татьяна'
            })
        })
            .then(res => {
                if (res.ok) {
                    res.json();
                    return <Redirect to="/login"/>;
                }
            });
    }

    if (isLoggedIn) {
        return <Redirect to="/clients"/>;
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleSecondPassword = (event) => {
        setSecondPassword(event.target.value);
    };

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleUserName = (event) => {
        setUserName(event.target.value);
    };

    return (
        <Grid container align="center" justify="center">
            <Card className={classes.card}>
                <Typography>Начните регистрацию</Typography>
                <Box className={classes.box}>
                    <Box className={classes.box}>
                        <TextField id="outlined-basic"
                                   size={"small"}
                                   label="Логин"
                                   variant="outlined"
                                   onChange={handleUserName}
                                   style={{display: "flex"}}
                        />
                    </Box>
                    <Box className={classes.box}>
                        <TextField
                            size={"small"}
                            id="email-input"
                            label="Почта"
                            type="email"
                            autoComplete="current-password"
                            variant="outlined"
                            onChange={handleEmail}
                            style={{display: "flex"}}
                        />
                    </Box>
                    <Box className={classes.box}>
                        <TextField
                            size={"small"}
                            id="filled-password-input"
                            label="Пароль"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            onChange={handlePassword}
                            style={{display: "flex"}}
                        />
                    </Box>
                    <Box className={classes.box}>
                        <TextField
                            id="secondPassword"
                            label="Повторите Пароль"
                            size={"small"}
                            type="password"
                            onChange={handleSecondPassword}
                            autoComplete="current-password"
                            variant="outlined"
                            style={{display: "flex"}}
                        />
                    </Box>
                    <Box className={classes.box}>
                        <Button variant="outlined" color="primary" size={"small"} onClick={register} style={{margin: 7}}>
                            Создать
                        </Button>

                        <Button variant="outlined" color="primary" size={"small"} component={Link} to={'/login'}>
                            Назад
                        </Button>
                    </Box>
                </Box>
            </Card>
        </Grid>

    );

}

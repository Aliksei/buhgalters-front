import React, {useState} from 'react'
import Button from "@material-ui/core/Button";
import {Card, Grid, makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {useAuth} from "../context/auth";
import {Redirect} from "react-router-dom";
import Box from "@material-ui/core/Box";


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
    const {setAuthTokens} = useAuth();
    const classes = useStyles();


    function postLogin() {
        setAuthTokens("LIL");
        setLoggedIn(true);
    }

    if (isLoggedIn) {
        return <Redirect to="/clients"/>;
    }

    return (
        <Grid container align="center" justify="center">
            <Card className={classes.card}>
                <Box className={classes.box}>

                    <Box className={classes.box}>
                        <TextField id="outlined-basic"
                                   label="Логин"
                                   variant="outlined"
                                   style={{display: "flex"}}
                        />
                    </Box>
                    <Box className={classes.box}>
                        <TextField
                            id="filled-password-input"
                            label="Пароль"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            style={{display: "flex"}}
                        />
                    </Box>
                    <Box className={classes.box}>
                        <Button variant="outlined" color="primary" onClick={postLogin} style={{margin:7}}>
                            Войти
                        </Button>

                        <Button variant="outlined" color="primary" onClick={postLogin}>
                            Регистрация
                        </Button>
                    </Box>
                </Box>
            </Card>
        </Grid>

    );

}

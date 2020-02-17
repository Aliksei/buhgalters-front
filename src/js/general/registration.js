import React, {useState} from 'react'
import Button from "@material-ui/core/Button";
import {Card, Grid, makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {useAuth} from "../context/auth";
import {Link, Redirect} from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {API_HOST} from "../service/actService";
import {userService} from "../service/userService";
import CardHeader from "@material-ui/core/CardHeader";


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

    const [isCreated, setCreated] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [secondPassword, setSecondPassword] = useState("");
    const {setAuthTokens} = useAuth();
    const classes = useStyles();


    const [passwordError, setPassowrdError] = React.useState(false);

    const checkPassword = () => {
        if (password === secondPassword) {
            return true;
        } else {
            setPassowrdError(true);
        }
    };

    const getHelperText= () => {
        return  passwordError ? 'Введенные пароли не совпадают' : null
    };

    function register() {
        if (checkPassword()) {
            userService.createUser({
                    name: userName,
                    email: email,
                    password: password,
                    company: 'Татьяна'
                }
            ).then(res => {
                console.log("Create" );
                console.log(res );
               if (res.ok) {
                   setCreated(true);
               }
            });
        }
    }

    if (isCreated) {
        return (
            <Grid container align="center" justify="center">
                <Card className={classes.card}>
                    <CardHeader subheader="Регистрация прошла успешно"/>
                    <Box className={classes.box}>
                        <Box className={classes.box}>
                            <Button variant="outlined"
                                    color="primary"
                                    size={"small"}
                                    component={Link}
                                    to={'/login'}>
                                Войти в систему
                            </Button>
                        </Box>
                    </Box>
                </Card>
            </Grid>
        );
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
                <CardHeader subheader={"Начните регистрацию"}/>
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
                            error={passwordError}
                            helperText={getHelperText()}
                            onChange={handlePassword}
                            style={{display: "flex"}}
                        />
                    </Box>
                    <Box className={classes.box}>
                        <TextField
                            id="secondPassword"
                            label="Повторите Пароль"
                            size={"small"}
                            helperText={getHelperText()}
                            error={passwordError}
                            type="password"
                            onChange={handleSecondPassword}
                            autoComplete="current-password"
                            variant="outlined"
                            style={{display: "flex"}}
                        />
                    </Box>
                    <Box className={classes.box}>
                        <Button variant="outlined"
                                color="primary"
                                size={"small"}
                                onClick={register}
                                style={{margin: 7}}>
                            Создать
                        </Button>

                        <Button variant="outlined"
                                color="primary"
                                size={"small"}
                                component={Link}
                                to={'/login'}>
                            Назад
                        </Button>
                    </Box>
                </Box>
            </Card>
        </Grid>

    );

}

import React, {useState} from 'react'
import Button from "@material-ui/core/Button";
import {Card, Grid, makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {Link} from "react-router-dom";
import Box from "@material-ui/core/Box";
import {userService} from "../service/userService";
import CardHeader from "@material-ui/core/CardHeader";
import LoaderCircle from "./loading";


const useStyles = makeStyles(theme => ({
    card: {
        minWidth: "30%",
        minHeight: "30%",
        maxWidth:"34%",
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
    const [loading, setLoading] = React.useState(false);
    const classes = useStyles();


    const [passwordError, setPassowrdError] = React.useState(false);

    const checkPassword = () => {
        if (password === secondPassword) {
            setPassowrdError(false);
            return true;
        } else {
            setPassowrdError(true);
        }
    };

    const getHelperText= () => passwordError ? 'Введенные пароли не совпадают' : null;


    const register = () => {
        if (checkPassword()) {
            setLoading(true);
            userService.createUser({
                    name: userName,
                    email: email,
                    password: password,
                    company: 'Татьяна'
                }
            ).then(res => {
                res.text()
                    .then(text => {
                        if (!res.ok) {
                            const data = text && JSON.parse(text);
                            const error = (data && data.message) || res.statusText;
                            setLoading(false);
                            window.alert(error);
                        } else {
                            setCreated(true);
                        }
                    });
            });
        }
    };

    if (isCreated) {
        return (
            <Grid container align="center" justify="center">
                <Card className={classes.card}>
                    <CardHeader
                        title="Регистрация прошла успешно"
                        subheader="Данные вашего пользователя отправлленны на указанную вами почту"
                    />
                    <Box className={classes.box}>
                        <Box className={classes.box}>
                            <Button variant="outlined"
                                    color="primary"
                                    size={"small"}
                                    component={Link}
                                    style={{backgroundColor: 'rgba(0,69,147,0.52)', color: "white"}}
                                    to={'/login'}>
                                Войти в систему
                            </Button>
                        </Box>
                    </Box>
                </Card>
            </Grid>
        );
    }

    const drawLoader = () => {
        if (loading) {
            return (<LoaderCircle/>)
        } else {
            return undefined;
        }
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
                                   onChange={({target}) => setUserName(target.value)}
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
                            onChange={({target}) => setEmail(target.value)}
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
                            onChange={({target}) => setPassword(target.value)}
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
                            onChange={({target}) => setSecondPassword(target.value)}
                            autoComplete="current-password"
                            variant="outlined"
                            style={{display: "flex"}}
                        />
                    </Box>
                    <Box style={{paddingLeft: '41%'}}>
                        {drawLoader()}
                    </Box>
                    <Box className={classes.box}>
                        <Button variant="outlined"
                                color="primary"
                                size={"small"}
                                component={Link}
                                to={'/login'}>
                            Назад
                        </Button>
                        <Button variant="outlined"
                                color="primary"
                                size={"small"}
                                onClick={register}
                                style={{backgroundColor: 'rgba(0,69,147,0.52)', color: "white", margin: 7}}>
                            Зарегестрировать
                        </Button>
                    </Box>
                </Box>
            </Card>
        </Grid>

    );

}

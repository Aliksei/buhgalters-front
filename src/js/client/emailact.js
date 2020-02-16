import React, {useEffect} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from '@material-ui/icons/Close';
import AppBar from "@material-ui/core/AppBar";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import {actService, API_HOST} from "../service/actService";
import {extendedFetcher} from "../rest/fetcher";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(13),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(13),
        color: theme.palette.text.secondary,
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    docView: {
        width: '75%',
        height: '100vh',
        backgroundColor: 'gray'
    },
    propsPanel: {
        width: '25%',
        height: '100vh',
    },
    propsPanelPaper: {
        margin: theme.spacing(2),
        padding: theme.spacing(1)
    }
}));

const Shablons = ({acts, client}) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography>Шаблоны отправки документа</Typography>
            <Template header={"Шаблон 1"} seconHeader={"Отправка акта клииенту"} acts={acts} client={client}/>
            {/*<Template header={"Шаблон 2"} seconHeader={"SECon header 2"} acts={acts} client={client}/>*/}
        </div>
    );
};

export default Shablons;

const Template = ({header, seconHeader, acts, client}) => {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [opened, setOpened] = React.useState(false);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleClick = () => setOpened(true);
    const handleClose = () => setOpened(false);

    return (
        <ExpansionPanel expanded={expanded === `${header}`} onChange={handleChange(`${header}`)}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <Typography className={classes.heading}>{header}</Typography>
                <Typography className={classes.secondaryHeading}>{seconHeader}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
                    Шаблон документа, в который вставляются и правятся данные по клиенту,
                    информация по акту, и отправляетется на почту клиента.
                </Typography>
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
                <Button variant="contained" size={"small"}
                        style={{backgroundColor: 'rgba(0,69,147,0.52)', color: "white"}}
                        onClick={handleClick}>Заполнить</Button>
            </ExpansionPanelActions>
            <FullScreenDialog opened={opened} handleClose={handleClose} acts={acts} client={client}/>
        </ExpansionPanel>
    )
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = ({opened, handleClose, acts, client}) => {
        const classes = useStyles();

        const [act, setAct] = React.useState(null);
        const [actError, setActError] = React.useState(false);
        const [perechen, setPerechen] = React.useState("");
        const [directorSignature, setDirectorSignature] = React.useState("");
        const [cost, setCost] = React.useState("");
        const [dogovor, setDogovor] = React.useState("");
        const [director, setDirector] = React.useState(client.director);


        const [objectUrl, setSrc] = React.useState(null);


        const [name, setName] = React.useState(client.name);

        const updateIframe = () => {

        };

        const close = () => {
            setAct(null);
            setActError(false);
            setPerechen("");
            setSrc(null);
            setDogovor("");
            handleClose();
        };

        useEffect(() => {
            setDirector(client.director)
        }, [client]);

        useEffect(() => {
            if (opened === true && act != null) {
                console.log(perechen);
                let p = {
                    actNumber: act.actNumber,
                    clientName: client.name,
                    clientDirector: director,
                    // date:
                    actMonth: 'Ферфаль',
                    actYear: '2019',
                    ynp: client.ynp,
                    dogovor: dogovor,
                    date: "Xnj-nj",
                    directorSignature: directorSignature,
                    clientAddress: client.address,
                    cost: cost,
                    perechen: perechen
                };

                console.log(p);
                actService.downlaod(p)
                    .then(e => setSrc(e))
            }
        }, [act]);
        // }, [act, perechen]);


        const applyData = () => {
            let p = {
                actNumber: act.actNumber,
                clientName: client.name,
                clientDirector: director,
                // date:
                actMonth: 'Ферфаль',
                actYear: '2019',
                ynp: client.ynp,
                dogovor: dogovor,
                date: "Xnj-nj",
                directorSignature: directorSignature,
                clientAddress: client.address,
                cost: cost,
                perechen: perechen
            };

            console.log(p);
            actService.downlaod(p)
                .then(e => setSrc(e))
        };

        const sendMessage = () => {
            let p = {
                actNumber: act.actNumber,
                clientName: client.name,
                clientDirector: director,
                // date:
                actMonth: 'Ферфаль',
                actYear: '2019',
                ynp: client.ynp,
                dogovor: dogovor,
                date: "Xnj-nj",
                directorSignature: directorSignature,
                clientAddress: client.address,
                cost: cost,
                perechen: perechen
            };

            let body = {
                wordAct: p,
                sendEmailRequest: {
                    from: "",
                    to: "",
                    password: "",
                    text: "Joker"
                }
            }


            extendedFetcher.postRequest(`http://${API_HOST}:8080/sendEmail`, body);
        };

        const handleAct = ({target}) => {
            if (target.value === undefined) {
                setActError(true);
            } else {
                setActError(false);
            }
            let actObject = acts.filter(a => a.id === target.value)[0];
            setAct(actObject);
        };

        const handlePerechen = ({target}) => setPerechen(target.value);
        const handleDogovor = ({target}) => setDogovor(target.value);
        const handleCost = ({target}) => setCost(target.value);
        const handleDirector = ({target}) => setDirector(target.value);


        const drawIframe = () => {
            if (objectUrl === null) {
                return null;
            } else {
                return <iframe src={objectUrl} width={"100%"}
                               height={"100%"}>

                </iframe>
            }
        };

        return (
            <div>
                <Dialog fullScreen open={opened} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={close} aria-label="close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Отмена
                            </Typography>
                            <Button variant="contained" size={"small"}
                                    style={{backgroundColor: 'white'}}
                                    disabled
                                    onClick={sendMessage}
                            >Отправить Документ</Button>
                            <Button variant="contained" size={"small"}
                                    onClick={applyData}
                                    disabled
                                    style={{backgroundColor: 'rgba(0,69,147,0.52)', color: "white"}}
                            >Применить данные</Button>
                        </Toolbar>
                    </AppBar>
                    <Grid container>
                        <div className={classes.propsPanel} style={{overflowY: 'scroll'}}>
                            <Paper className={classes.propsPanelPaper}>
                                <FormControl className={classes.formControl} error={actError} style={{width: "140px"}}>
                                    <InputLabel>Выбранный Акт</InputLabel>
                                    <Select fullWidth
                                            value={act}
                                            onChange={handleAct}
                                    >
                                        {acts.map(u => {
                                            return <MenuItem dense value={u.id}>{u.actNumber}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </Paper>
                            <Paper className={classes.propsPanelPaper}>
                                <Typography className={classes.secondaryHeading}>Получатель : </Typography>
                                <Typography className={classes.heading}>{client.name}</Typography>
                            </Paper>
                            <Paper className={classes.propsPanelPaper}>
                                <Typography className={classes.secondaryHeading}>Почта : </Typography>
                                <Typography className={classes.heading}>{client.email}</Typography>
                            </Paper>
                            <Paper className={classes.propsPanelPaper}>
                                <Typography className={classes.secondaryHeading}>УНП : </Typography>
                                <Typography className={classes.heading}>{client.ynp}</Typography>
                            </Paper>
                            <Paper className={classes.propsPanelPaper}>
                                <Typography className={classes.secondaryHeading}>Адресс : </Typography>
                                <Typography className={classes.heading}>{client.address}</Typography>
                            </Paper>
                            <Paper className={classes.propsPanelPaper}>
                                <Typography className={classes.secondaryHeading}>Сумма акта : </Typography>
                                <TextField
                                    onChange={handleCost}
                                    value={`${act === null ? "" : act.summ} ${cost}`}
                                    placeholder="Сумма"
                                    fullWidth>
                                </TextField>
                            </Paper>
                            <Paper className={classes.propsPanelPaper}>
                                <Typography className={classes.secondaryHeading}>Директор : </Typography>
                                <TextField
                                    onChange={handleDirector}
                                    value={director}
                                    placeholder="Директор"
                                    fullWidth>
                                </TextField>
                            </Paper>
                            <Paper className={classes.propsPanelPaper}>
                                <Typography className={classes.secondaryHeading}>Заключенный договор : </Typography>
                                <TextField
                                    onChange={handleDogovor}
                                    value={dogovor}
                                    placeholder="Информация по договору"
                                    fullWidth
                                >
                                </TextField>
                            </Paper>
                            <Paper className={classes.propsPanelPaper}>
                                <Typography className={classes.secondaryHeading}>Документы : </Typography>
                                <TextField
                                    onChange={handlePerechen}
                                    value={perechen}
                                    placeholder="Перечень документов"
                                    fullWidth
                                    multiline={true}
                                    rows={6}
                                    rowsMax={8}
                                    style={{backgroundColor: "rgb(241, 241, 241)", borderRadius: '5px'}}
                                >
                                </TextField>
                            </Paper>
                        </div>
                        <div className={classes.docView}>
                            {drawIframe()}
                        </div>
                    </Grid>
                </Dialog>
            </div>
        );
    }
;

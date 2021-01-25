import React, {useEffect} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from '@material-ui/icons/Close';
import AppBar from "@material-ui/core/AppBar";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import MenuItem from "@material-ui/core/MenuItem";
import {downlaod, downloadAsWord} from "../service/actService";
import {postAct, putAct, sendEmail} from "../service/clientService";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    progress: {
        display: 'flex'
    },
    box: {
        padding: theme.spacing(2),
        flexDirection: "column"
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
        backgroundColor: 'rgba(0,69,147,0.60)',
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
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    propsPanelPaper: {
        margin: theme.spacing(2),
        padding: theme.spacing(1)
    },
    buttonProgress: {
        color: "grey",
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DocIframe = ({buildBody, pdfSrc, setPdfSrc}) => {

    useEffect(() => {
        const abortController = new AbortController();
        downlaod(buildBody(), abortController.signal)
            .then(e => {
                setPdfSrc(e);
            });
        return () => abortController.abort();

    }, []);

    return <iframe title={'documentView'} src={pdfSrc} width={"100%"} height={"100%"}/>
};


export const ActView = ({opened, handleClose, act, client, forEdit}) => {
        const classes = useStyles();
        const [state, setState] = React.useState({
            values: {},
            errors: new Map(),
        });

        const [pdfSrc, setPdfSrc] = React.useState(null);

        const [emailState, setEmailState] = React.useState({
            otpravlen: false,
            withError: false,
            inProgress: false
        });

        const [saveDataState, setSaveDataState] = React.useState({
            sohranenu: false,
            saveWithError: false,
        });

        const buildBody = () => {
            return {
                id: state.values.id,
                actNumber: state.values.actNumber,
                clientName: state.values.name,
                clientDirector: state.values.director,
                actMonth: state.values.actMonth,
                actYear: '2020',
                ynp: state.values.ynp,
                contractId: state.values.contractId,
                actDate: state.values.actDate,
                directorSignature: state.values.directorSignature,
                clientAddress: state.values.address,
                summ: state.values.summ,
                perechen: state.values.perechen,
                bankInfo: state.values.bankInfo,
                status: state.values.status
            }
        };

        useEffect(() => {
            setState(prevState => {
                const fields = [
                    {name: 'actNumber'},
                    {name: 'actMonth'},
                    {name: 'actDate'},
                    {name: 'status'},
                    {name: 'summ'},
                    {name: 'director'},
                    {name: 'contractId'},
                    {name: 'perechen'},
                    {name: 'bankInfo'},
                    {name: 'directorSignature'},
                ];
                let newState = {
                    values: {...client, ...act},
                    errors: new Map()
                };
                fields.forEach(field => {
                    if (newState.values[field.name] === undefined || newState.values[field.name] === '' || newState.values[field.name] === null) {
                        newState.values[field.name] = '';
                        newState.errors.set(field.name, true)
                    } else {
                        newState.errors.delete(field.name);
                    }
                });
                return newState;
            });

        }, [act, client, opened]);


        if (act === null || act === undefined || act === {}) {
            return null
        }

        const handleChange = ({target}) => {
            let {name, value} = target;
            if (value === '') {
                setState(prevState => {
                    return {
                        values: {...prevState.values, [name]: value},
                        errors: prevState.errors.set(name, true)
                    }
                })
            } else {
                setState(prevState => {
                    prevState.errors.delete(name);
                    return {
                        values: {...prevState.values, [name]: value},
                        errors: prevState.errors
                    }
                })
            }
        };

        const close = () => {
            setState({
                values: {},
                errors: new Map()
            });
            handleClose();
        };

        const downloadDataWord = () => {

            downloadAsWord(buildBody())
                .then(response => {
                    let element = document.createElement('a');
                    element.setAttribute('href', response);
                    element.setAttribute('download', `Акт_${state.values.name}'_'${act.actNumber}.docx`);
                    element.style.display = 'none';
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                })
        };

        const updateAct = () => {
            putAct(buildBody(), client.id)
                .then(res => {
                    setSaveDataState({
                        sohranenu: true,
                        saveWithError: false,
                    })
                }, error => {
                    setSaveDataState({
                        sohranenu: true,
                        saveWithError: true,
                    })
                });
        };

        const createAct = () => {
            postAct(buildBody(), client.id)
                .then(res => {
                    setSaveDataState({
                        sohranenu: true,
                        saveWithError: false,
                    });
                    // close()
                }, error => {
                    setSaveDataState({
                        sohranenu: true,
                        saveWithError: true,
                    })
                });
        };

        const applyData = () => {
            downlaod(buildBody())
                .then(e => setPdfSrc(e))
        };

        const drawSaveOrUpdate = () => {
            if (forEdit) {
                return (<Button variant="contained"
                                size={"small"}
                                disabled={state.errors.size > 0}
                                onClick={updateAct}>Сохранить Изменения</Button>)
            } else {
                return (<Button variant="contained"
                                size={"small"}
                                disabled={state.errors.size > 0}
                                onClick={createAct}>Сохранить Данные</Button>)
            }
        };

        const sendMessage = () => {
            let body = {
                wordAct: buildBody(),
                sendEmailRequest: {
                    from: "",
                    to: state.values.email,
                    password: "",
                    subject: "Акт Выполненных Работ"
                }
            };
            setEmailState({
                otpravlen: false,
                withError: false,
                inProgress: true,
            });
            sendEmail(body)
                .then(r => {
                    setEmailState({
                        otpravlen: true,
                        withError: false,
                        inProgress: false,
                    });
                }, error => {
                    setEmailState({
                        otpravlen: true,
                        withError: true,
                        inProgress: false,
                    });
                })
        };

        const hasError = (name) => state.errors.has(name);
        const getHelperText = (name) => hasError(name) ? 'Поле не может быть пустым' : '';

        const drawIframe = () => {
            if (state.values.id) {
                return <DocIframe buildBody={buildBody} setPdfSrc={setPdfSrc} pdfSrc={pdfSrc}/>;
            } else {
                return null;
            }
        };


        const drawLoader = () => {
            if (emailState.inProgress) {
                return (<div className={classes.progress}>
                    <CircularProgress size={'1rem'} color={'black'}/>
                </div>)
            } else {
                return null;
            }

        };

        const drawAfterEmailSendPopup = () => {
            let message = emailState.withError ? "Не удалось отправить документ на почту : " : "Документ успешно отправлен на почту : ";
            let toClient = message + state.values.email;
            return (
                <Dialog open={emailState.otpravlen} onClose={() => {
                    setEmailState({
                        otpravlen: false,
                        withError: false
                    })
                }}>
                    <DialogContent>
                        <DialogContentText>{toClient}</DialogContentText>
                    </DialogContent>
                </Dialog>
            )
        };

        const drawAfterDataSavedPopup = () => {
            let message = emailState.saveWithError ? "Не удалось сохранить Акт" : "Акт успешно сохранен";
            return (
                <Dialog aria-labelledby="simple-dialog-title" open={saveDataState.sohranenu} onClose={() => {
                    setSaveDataState({
                        sohranenu: false,
                        saveWithError: false,
                    })
                }}>
                    <DialogTitle>{message}</DialogTitle>
                </Dialog>
            )
        };

        return (
            <div>
                <Dialog fullScreen open={opened} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={close} aria-label="close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography variant="subtitle1" className={classes.title}>
                                Закрыть
                            </Typography>
                            <Typography variant="subtitle1" className={classes.title}>
                                Клиент: {state.values.name}
                            </Typography>
                            <ButtonGroup color={'primary'} aria-label="large outlined primary button group">
                                <Button variant="contained" size={"small"}
                                        onClick={sendMessage}
                                        color={'primary'}
                                        disabled={state.errors.size > 0}>Отправить по Email
                                    {drawLoader()}
                                </Button>
                                <Button variant="contained" size={"small"}
                                        onClick={applyData}
                                >Применить данные</Button>
                                <Button variant="contained" size={"small"}
                                        onClick={downloadDataWord}
                                >Скачать WORD</Button>

                                {drawSaveOrUpdate()}
                            </ButtonGroup>
                        </Toolbar>
                    </AppBar>
                    <Grid container>
                        <div className={classes.propsPanel} style={{overflowY: 'scroll'}}>
                            <Paper className={classes.propsPanelPaper}>
                                <TextField
                                    size={'small'}
                                    onChange={handleChange}
                                    value={state.values.email}
                                    type={'email'}
                                    label={'Почта'}
                                    style={{backgroundColor: "rgb(241, 241, 241)", borderRadius: '5px'}}
                                    variant={'outlined'}
                                    name={'email'}
                                    fullWidth>
                                </TextField>
                            </Paper>
                            <Paper className={classes.propsPanelPaper}>
                                <TextField
                                    size={'small'}
                                    onChange={handleChange}
                                    error={hasError('actNumber')}
                                    helperText={getHelperText('actNumber')}
                                    value={state.values.actNumber}
                                    name={'actNumber'}
                                    label={'Номер Акта'}
                                    style={{backgroundColor: "rgb(241, 241, 241)", borderRadius: '5px'}}
                                    variant={'outlined'}
                                    fullWidth>
                                </TextField>
                            </Paper>
                            <Paper className={classes.propsPanelPaper}>
                                <TextField
                                    select
                                    size={'small'}
                                    onChange={handleChange}
                                    value={state.values.actMonth}
                                    helperText={getHelperText('actMonth')}
                                    name={'actMonth'}
                                    style={{backgroundColor: "rgb(241, 241, 241)", borderRadius: '5px'}}
                                    label={'Месяц'}
                                    variant={'outlined'}
                                    fullWidth>
                                    <MenuItem key={1} value={1}>Январь</MenuItem>
                                    <MenuItem key={2} value={2}>Февраль</MenuItem>
                                    <MenuItem key={3} value={3}>Март</MenuItem>
                                    <MenuItem key={4} value={4}>Апрель</MenuItem>
                                    <MenuItem key={5} value={5}>Май</MenuItem>
                                    <MenuItem key={6} value={6}>Июнь</MenuItem>
                                    <MenuItem key={7} value={7}>Июль</MenuItem>
                                    <MenuItem key={8} value={8}>Август</MenuItem>
                                    <MenuItem key={9} value={9}>Сентябрь</MenuItem>
                                    <MenuItem key={10} value={10}>Октябрь</MenuItem>
                                    <MenuItem key={11} value={11}>Ноябрь</MenuItem>
                                    <MenuItem key={12} value={12}>Декабрь</MenuItem>
                                </TextField>
                            </Paper>
                            <Paper className={classes.propsPanelPaper}>
                                <TextField
                                    select
                                    size={'small'}
                                    onChange={handleChange}
                                    error={hasError('status')}
                                    helperText={getHelperText('status')}
                                    value={state.values.status}
                                    name={'status'}
                                    style={{backgroundColor: "rgb(241, 241, 241)", borderRadius: '5px'}}
                                    label={'Статус'}
                                    variant={'outlined'}
                                    fullWidth>
                                    <MenuItem key={1} value={1}>Выставлен</MenuItem>
                                    <MenuItem key={2} value={2}>Оплачен</MenuItem>
                                </TextField>
                            </Paper>
                            <Paper className={classes.propsPanelPaper}>
                                <TextField
                                    onChange={handleChange}
                                    value={state.values.summ}
                                    error={hasError('summ')}
                                    helperText={getHelperText('summ')}
                                    name={'summ'}
                                    size={'small'}
                                    label={'Сумма Акта'}
                                    variant={'outlined'}
                                    style={{backgroundColor: "rgb(241, 241, 241)", borderRadius: '5px'}}
                                    fullWidth>
                                </TextField>
                            </Paper>
                            <Paper className={classes.propsPanelPaper}>
                                <TextField
                                    onChange={handleChange}
                                    value={state.values.actDate}
                                    name={'actDate'}
                                    type={'date'}
                                    error={hasError('actDate')}
                                    helperText={getHelperText('actDate')}
                                    size={'small'}
                                    label={'Дата Акта'}
                                    variant={'outlined'}
                                    style={{backgroundColor: "rgb(241, 241, 241)", borderRadius: '5px'}}
                                    fullWidth>
                                </TextField>
                            </Paper>
                            <Paper className={classes.propsPanelPaper}>
                                <TextField
                                    onChange={handleChange}
                                    value={state.values.director}
                                    name={'director'}
                                    size={'small'}
                                    error={hasError('director')}
                                    helperText={getHelperText('director')}
                                    label={'Директор'}
                                    style={{backgroundColor: "rgb(241, 241, 241)", borderRadius: '5px'}}
                                    variant={'outlined'}
                                    fullWidth>
                                </TextField>
                            </Paper>
                            <Paper className={classes.propsPanelPaper}>
                                <TextField
                                    disabled={true}
                                    // onChange={handleChange}
                                    value={state.values.contractId}
                                    name={'contractId'}
                                    label={'Номер договора'}
                                    error={hasError('contractId')}
                                    helperText={getHelperText('contractId')}
                                    variant={'outlined'}
                                    size={'small'}
                                    style={{backgroundColor: "rgb(241, 241, 241)", borderRadius: '5px'}}
                                    fullWidth>
                                </TextField>
                            </Paper>
                            <Paper className={classes.propsPanelPaper}>
                                <TextField
                                    onChange={handleChange}
                                    value={state.values.perechen}
                                    name={'perechen'}
                                    fullWidth
                                    multiline={true}
                                    error={hasError('perechen')}
                                    helperText={getHelperText('perechen')}
                                    label={'Перечень услуг'}
                                    variant={'outlined'}
                                    size={'small'}
                                    rows={6}
                                    rowsMax={8}
                                    style={{backgroundColor: "rgb(241, 241, 241)", borderRadius: '5px'}}
                                >
                                </TextField>
                            </Paper>
                            <Paper className={classes.propsPanelPaper}>
                                <TextField
                                    disabled={true}
                                    // onChange={handleChange}
                                    value={state.values.bankInfo}
                                    name={'bankInfo'}
                                    fullWidth
                                    multiline={true}
                                    label={'Банковские реквизиты'}
                                    variant={'outlined'}
                                    error={hasError('bankInfo')}
                                    helperText={getHelperText('bankInfo')}
                                    size={'small'}
                                    rows={6}
                                    rowsMax={8}
                                    style={{backgroundColor: "rgb(241, 241, 241)", borderRadius: '5px'}}
                                >
                                </TextField>
                            </Paper>
                            <Paper className={classes.propsPanelPaper}>
                                <TextField
                                    onChange={handleChange}
                                    style={{backgroundColor: "rgb(241, 241, 241)", borderRadius: '5px'}}
                                    value={state.values.directorSignature}
                                    name={'directorSignature'}
                                    label={'Инициалы директора'}
                                    error={hasError('directorSignature')}
                                    helperText={getHelperText('directorSignature')}
                                    variant={'outlined'}
                                    fullWidth
                                    size={'small'}
                                >
                                </TextField>
                            </Paper>
                        </div>
                        <div className={classes.docView}>
                            {drawIframe()}
                            {drawAfterEmailSendPopup()}
                            {drawAfterDataSavedPopup()}
                        </div>
                    </Grid>
                </Dialog>
            </div>
        );
    }
;

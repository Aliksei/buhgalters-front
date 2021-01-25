import React, {Fragment, useEffect} from "react";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {putClient} from "../service/clientService";
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles(theme => ({
    box: {
        padding: theme.spacing(2),
        flexDirection: "row"
    },
    textField: {
        padding: theme.spacing(1),
        backgroundColor: 'rgba(0,109,255,0.07)',
        borderRadius: '6px',
    }
}));

const ClientData = ({client, update}) => {

    const [open, setOpen] = React.useState(false);

    return (
        <Fragment>
                <Table size={"small"} padding="checkbox">
                    <tbody>
                        <ClientsPropertyRow name={"Имя :"} value={client.name}/>
                        <ClientsPropertyRow name={"Почта :"} value={client.email}/>
                        <ClientsPropertyRow name={"Телефон :"} value={client.phoneNumber}/>
                        <ClientsPropertyRow name={"Директор :"} value={client.director}/>
                        <ClientsPropertyRow name={"ФСЗН :"} value={client.fszn}/>
                        <ClientsPropertyRow name={"Адрес :"} value={client.address}/>
                        <ClientsPropertyRow name={"УНП :"} value={client.ynp}/>
                        <ClientsPropertyRow name={"Фонд :"} value={client.fond}/>
                        <ClientsPropertyRow name={"Имнс :"} value={client.imns}/>
                        <ClientsPropertyRow name={"Окпо :"} value={client.okpo}/>
                        <ClientsPropertyRow name={"Номер Договора :"} value={client.contractId}/>
                        <ClientsPropertyRow name={"Договор заключен :"} value={client.contractFrom}/>
                        <ClientsPropertyRow name={"Договор действителен до :"} value={client.contractTill}/>
                        <ClientsPropertyRow name={"Ключ действителен до :"} value={client.keyLifeDate}/>
                        <ClientsPropertyRow name={"Банковские реквизиты :"} value={client.bankInfo}/>
                    </tbody>
                </Table>
            <EditClientDialog client={client} apiCall={putClient}
                              opened={open} handleClose={() => setOpen(false)}
                              title={'Редактирование Клиента'}
                              update={update}/>
            <Box>
                <Button variant="contained" color="inherit" size="small" onClick={() => setOpen(true)}
                        style={{backgroundColor: 'rgba(0,69,147,0.52)', color: "white"}}>
                    Редактировать
                </Button>
            </Box>
        </Fragment>
    )

};

export default ClientData;

const ClientsPropertyRow = ({name, value}) => {
    const style = {fontWeight: "bold", textAlign: "left"};
    return (
        <Fragment>
            <TableRow>
                <td><div><Typography>{name}</Typography></div></td>
                <td><div style={{textOverflow: "ellipsis"}}><Typography style={style}>{value}</Typography></div></td>
            </TableRow>
        </Fragment>
    )
};


export const EditClientDialog = ({title, opened, handleClose, client, update, apiCall}) => {

    const classes = useStyles();
    const [state, setState] = React.useState({
            values: {},
            errors: new Map()
        });

    useEffect(() => {
        setState(prevState => {

            const fields = [
                {name: 'email'},
                {name: 'name'},
                {name: 'fszn'},
                {name: 'director'},
                {name: 'fond'},
                {name: 'keyLifeDate'},
                {name: 'address'},
                {name: 'imns'},
                {name: 'okpo'},
                {name: 'phoneNumber'},
                {name: 'ynp'},
                {name: 'contractId'},
                {name: 'contractTill'},
                {name: 'contractFrom'},
                {name: 'bankInfo'},
            ];

            fields.forEach(field => {
                if (client[field.name] === undefined || client[field.name] ==='') {
                    prevState.errors.set(field.name, true)
                }
            });

            return {values: {...client}, errors: prevState.errors}
        })
    }, [opened, client]);

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

    const handleSave = () => {
        apiCall({
            id: client.id, ...state.values
        })
            .then(res => {
                update(res);
                handleCloseDialog();
            }, (reason) => {
                window.alert("Ошибка Запроса: " + reason);
            })
    };

    const handleCloseDialog = () => {
        handleClose();
    };

    const saveBtn = () => {
        let saveEnabled = state.errors.size > 0;
        let saveStyle = saveEnabled ? {
            color: "black"
        } : {
            backgroundColor: "rgba(0,69,147,0.52)", color: "white"
        };
        return (<Button size={"small"} variant="contained" onClick={handleSave} disabled={saveEnabled} style={saveStyle}>
                Сохранить
            </Button>
        )
    };

    const hasError = (name) => state.errors.has(name);

    const getHelperText = (name) => hasError(name) ? 'Поле не может быть пустым' : '';

    return (
        <Dialog open={opened} fullWidth={true}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Box className={classes.box}>
                    <TextField className={classes.textField}
                               onChange={handleChange}
                               error={hasError('name')}
                               name={'name'}
                               value={state.values.name}
                               size={"small"}
                               label={'Имя Клиента'}
                               helperText={getHelperText('name')}
                               variant="outlined">
                    </TextField>
                    <TextField className={classes.textField}
                               onChange={handleChange}
                               error={hasError('director')}
                               name={'director'}
                               value={state.values.director}
                               size={"small"}
                               label={'Директор'}
                               helperText={getHelperText('director')}
                               variant="outlined">
                    </TextField>
                </Box>
                <Box className={classes.box}>
                    <TextField className={classes.textField}
                               onChange={handleChange}
                               error={hasError('address')}
                               name={'address'}
                               value={state.values.address}
                               size={"small"}
                               label={'Адрес'}
                               helperText={getHelperText('address')}
                               variant="outlined">
                    </TextField>
                    <TextField className={classes.textField}
                               onChange={handleChange}
                               error={hasError('email')}
                               name={'email'}
                               value={state.values.email}
                               size={"small"}
                               label={'Почта'}
                               helperText={getHelperText('email')}
                               variant="outlined">
                    </TextField>
                </Box>
                <Box className={classes.box}>
                    <TextField className={classes.textField}
                               onChange={handleChange}
                               error={hasError('fond')}
                               name={'fond'}
                               type={'number'}
                               value={state.values.fond}
                               size={"small"}
                               label={'Фонд (рублей)'}
                               helperText={getHelperText('fond')}
                               variant="outlined">
                    </TextField>
                    <TextField className={classes.textField}
                               onChange={handleChange}
                               error={hasError('fszn')}
                               name={'fszn'}
                               value={state.values.fszn}
                               size={"small"}
                               label={'ФСЗН'}
                               helperText={getHelperText('fszn')}
                               variant="outlined">
                    </TextField>
                </Box>

                <Box className={classes.box}>
                    <TextField className={classes.textField}
                               onChange={handleChange}
                               error={hasError('imns')}
                               name={'imns'}
                               value={state.values.imns}
                               size={"small"}
                               label={'Имнс'}
                               helperText={getHelperText('imns')}
                               variant="outlined">
                    </TextField>
                    <TextField className={classes.textField}
                               onChange={handleChange}
                               error={hasError('okpo')}
                               name={'okpo'}
                               value={state.values.okpo}
                               size={"small"}
                               label={'ОКПО'}
                               helperText={getHelperText('okpo')}
                               variant="outlined">
                    </TextField>
                </Box>

                <Box className={classes.box}>
                    <TextField className={classes.textField}
                               onChange={handleChange}
                               error={hasError('ynp')}
                               name={'ynp'}
                               value={state.values.ynp}
                               type={'number'}
                               size={"small"}
                               label={'УНП'}
                               helperText={getHelperText('ynp')}
                               variant="outlined">
                    </TextField>
                    <TextField className={classes.textField}
                               onChange={handleChange}
                               error={hasError('phoneNumber')}
                               name={'phoneNumber'}
                               value={state.values.phoneNumber}
                               size={"small"}
                               label={'Телефон'}
                               helperText={getHelperText('phoneNumber')}
                               variant="outlined">
                    </TextField>
                </Box>

                <Box className={classes.box}>
                    <TextField className={classes.textField}
                               onChange={handleChange}
                               error={hasError('contractId')}
                               name={'contractId'}
                               value={state.values.contractId}
                               size={"small"}
                               label={'Номер договора'}
                               helperText={getHelperText('contractId')}
                               variant="outlined">
                    </TextField>
                    <TextField className={classes.textField}
                               onChange={handleChange}
                               type={'date'}
                               error={hasError('keyLifeDate')}
                               name={'keyLifeDate'}
                               value={state.values.keyLifeDate}
                               size={"small"}
                               label={'Ключ действителен до'}
                               helperText={getHelperText('keyLifeDate')}
                               variant="outlined">
                    </TextField>
                </Box>
                <Box className={classes.box}>
                    <TextField className={classes.textField}
                               onChange={handleChange}
                               type={'date'}
                               error={hasError('contractTill')}
                               name={'contractTill'}
                               value={state.values.contractTill}
                               size={"small"}
                               label={'Окончание договора'}
                               helperText={getHelperText('contractTill')}
                               variant="outlined">
                    </TextField>
                    <TextField className={classes.textField}
                               onChange={handleChange}
                               type={'date'}
                               error={hasError('contractFrom')}
                               name={'contractFrom'}
                               value={state.values.contractFrom}
                               size={"small"}
                               label={'Договор заключен'}
                               helperText={getHelperText('contractFrom')}
                               variant="outlined">
                    </TextField>
                </Box>
                <Box className={classes.box}>
                    <TextField className={classes.textField}
                               onChange={handleChange}
                               name={'bankInfo'}
                               error={hasError('bankInfo')}
                               value={state.values.bankInfo}
                               size={"small"}
                               label={'Реквизиты Банка'}
                               helperText={getHelperText('bankInfo')}
                               multiline
                               rows={8}
                               fullWidth={true}
                               variant="outlined">
                    </TextField>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button size={"small"} onClick={handleCloseDialog} variant="contained">Закрыть</Button>
                {saveBtn()}
            </DialogActions>
        </Dialog>
    )

};

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
import {makeStyles} from "@material-ui/core";
import {clientService} from "../service/clientService";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles(theme => ({
    box: {
        padding: theme.spacing(2),
        flexDirection: "row"
    },
    textField: {
        padding: theme.spacing(1),
    }
}));

const ClientData = ({client, update}) => {

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>
                <Table size={"medium"} padding="checkbox">
                    <PropRow name={"Имя :"} value={client.name}/>
                    <PropRow name={"Почта :"} value={client.email}/>
                    <PropRow name={"Директор :"} value={client.director}/>
                    <PropRow name={"ФСЗН :"} value={client.fszn}/>
                    <PropRow name={"Адрес :"} value={client.address}/>
                    <PropRow name={"УНП :"} value={client.ynp}/>
                    <PropRow name={"Фонд :"} value={client.fond}/>
                    <PropRow name={"Имнс :"} value={client.imns}/>
                    <PropRow name={"Окпо :"} value={client.okpo}/>
                </Table>
                <EditDialog client={client}
                            opened={open}
                            handleClose={handleClose}
                            update={update}
                />
                <Box>
                    <Button variant="contained"
                            color="inherit"
                            size="small"
                            onClick={handleOpen}
                            style={{backgroundColor: 'rgba(0,69,147,0.52)', color: "white"}}>
                        Изменить
                    </Button>
                </Box>
            </Fragment>
    )

};

export default ClientData;

const PropRow = ({name, value}) => {

    const style = {fontWeight: "bold", textAlign: "left"};

    return (
        <Fragment>
            <TableRow>
                <td><Typography>{name}</Typography></td>
                <td><Typography style={style}>{value}</Typography></td>
            </TableRow>
        </Fragment>
    )
};


const EditDialog = ({opened, handleClose, client, update}) => {

    const classes = useStyles();

    const [ynp, setYnp] = React.useState(null);
    const [name, setName] = React.useState(null);
    const [email, setEmal] = React.useState(null);
    const [director, setDirector] = React.useState(null);
    const [fond, setFond] = React.useState(null);
    const [address, setAddress] = React.useState(null);
    const [imns, setImns] = React.useState(null);
    const [okpo, setOkpo] = React.useState(null);
    const [fszn, setFszn] = React.useState(null);

    const [ynpError, setYnpError] = React.useState(false);
    const [nameError, setNameError] = React.useState(false);
    const [emailError, setEmalError] = React.useState(false);
    const [directorError, setDirectorError] = React.useState(false);
    const [fondError, setFondError] = React.useState(false);
    const [addressError, setAddressError] = React.useState(false);
    const [imnsError, setImnsError] = React.useState(false);
    const [okpoError, setOkpoError] = React.useState(false);
    const [fsznError, setFsznError] = React.useState(false);


    const handleYnp = ({target}) => fieldStateHandler(setYnp, setYnpError, target);
    const handleName = ({target}) => fieldStateHandler(setName, setNameError, target);
    const handleEmail = ({target}) => fieldStateHandler(setEmal, setEmalError, target);
    const handleDirector = ({target}) => fieldStateHandler(setDirector, setDirectorError, target);
    const handleFond = ({target}) => fieldStateHandler(setFond, setFondError, target);
    const handleAddress = ({target}) => fieldStateHandler(setAddress, setAddressError, target);
    const handleImns = ({target}) => fieldStateHandler(setImns, setImnsError, target);
    const handleOkpo = ({target}) => fieldStateHandler(setOkpo, setOkpoError, target);
    const handleFszn = ({target}) => fieldStateHandler(setFszn, setFsznError, target);

    const fieldStateHandler = (fieldSetter, errorSetter, target) => {
        if (target.value === "") {
            errorSetter(true);
        } else {
            errorSetter(false);
        }
        fieldSetter(target.value);
    };

    const getHelperText = (hasError) => {
        return hasError ? 'Поле не может быть пустым' : null
    };

    useEffect(() => {
        setName(client.name);
        setYnp(client.ynp);
        setEmal(client.email);
        setDirector(client.director);
        setFond(client.fond);
        setAddress(client.address);
        setImns(client.imns);
        setOkpo(client.okpo);
        setFszn(client.fszn);
    }, [client, opened]);

    const handleSave = () => {
        clientService.putClient({
            id: client.id,
            ynp, name, email, director, fond, address, imns, okpo, fszn,
        })
            .then(res => {
                update(res);
                handleCloseDialog();
            })
    };

    const handleCloseDialog = () => {
        setFsznError(false);
        setOkpoError(false);
        setImnsError(false);
        setAddressError(false);
        setFondError(false);
        setDirectorError(false);
        setEmalError(false);
        setNameError(false);
        setYnpError(false);
        handleClose();
    };

    const saveBtn = () => {
        let saveEnabled = nameError || ynpError || emailError || directorError || fondError || addressError || imnsError || okpoError || fsznError;
        let saveStyle = saveEnabled ? {
            color: "black"
        } : {
            backgroundColor: "rgba(0,69,147,0.52)", color: "white"
        };

        return (
            <Button
                size={"small"}
                variant="contained"
                onClick={handleSave}
                disabled={saveEnabled}
                style={saveStyle}>
                Сохранить
            </Button>
        )
    };

    return (
        <Dialog open={opened}>
            <DialogTitle>Редактирование клиента</DialogTitle>
            <DialogContent>
                <Box className={classes.box}>
                    <TextField className={classes.textField}
                               onChange={handleName}
                               error={nameError}
                               value={name}
                               size={"small"}
                               label={"Имя Клиента"}
                               helperText={getHelperText(nameError)}
                               variant="outlined">
                    </TextField>
                    <TextField className={classes.textField}
                               size={"small"}
                               onChange={handleEmail}
                               error={emailError}
                               value={email}
                               type={"email"}
                               label={"Почта"}
                               helperText={getHelperText(emailError)}
                               variant="outlined">
                    </TextField>
                </Box>
                <Box className={classes.box}>
                    <TextField className={classes.textField}
                               onChange={handleFszn}
                               size={"small"}
                               error={fsznError}
                               value={fszn}
                               label={"ФСЗН"}
                               helperText={getHelperText(fsznError)}
                               variant="outlined">
                    </TextField>
                    <TextField className={classes.textField}
                               onChange={handleDirector}
                               error={directorError}
                               size={"small"}
                               value={director}
                               label={"Директор"}
                               helperText={getHelperText(directorError)}
                               variant="outlined">
                    </TextField>
                </Box>

                <Box className={classes.box}>
                    <TextField className={classes.textField}
                               onChange={handleFond}
                               size={"small"}
                               type={"number"}
                               error={fondError}
                               value={fond}
                               label={"Фонд"}
                               helperText={getHelperText(fondError)}
                               variant="outlined">
                    </TextField>
                    <TextField className={classes.textField}
                               onChange={handleAddress}
                               size={"small"}
                               error={addressError}
                               value={address}
                               label={"Адрес"}
                               helperText={getHelperText(addressError)}
                               variant="outlined">
                    </TextField>
                </Box>

                <Box className={classes.box}>
                    <TextField className={classes.textField}
                               onChange={handleImns}
                               size={"small"}
                               error={imnsError}
                               value={imns}
                               label={"Имнс"}
                               helperText={getHelperText(imnsError)}
                               variant="outlined">
                    </TextField>
                    <TextField className={classes.textField}
                               onChange={handleOkpo}
                               size={"small"}
                               error={okpoError}
                               value={okpo}
                               label={"ОКПО"}
                               helperText={getHelperText(okpoError)}
                               variant="outlined">
                    </TextField>
                </Box>

                <Box className={classes.box}>
                    <TextField className={classes.textField}
                               onChange={handleYnp}
                               size={"small"}
                               type={"number"}
                               error={ynpError}
                               value={ynp}
                               label={"УНП"}
                               helperText={getHelperText(ynpError)}
                               variant="outlined">
                    </TextField>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    size={"small"}
                    onClick={handleCloseDialog}
                    variant="contained">
                    Закрыть
                </Button>
                {saveBtn()}
            </DialogActions>
        </Dialog>
    )

};

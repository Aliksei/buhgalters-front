import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import {Box, makeStyles} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React from "react";
import {red} from "@material-ui/core/colors";
import SingleClient from "../client/singeClient";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    card: {
        maxWidth: "90%",
        maxHeight: "240px"
    },
    appBar: {
        position: 'relative',
    },
    avatar: {
        backgroundColor: red[500],
    },
    dialog: {
        minWidth: "400px",
        minHeight: "500px"
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const NewTaskDialog = (props) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(props.open);

    const handleCancel = () => {
        setOpen(false);
    };

    const handleSave = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open}
                onClose={handleSave}
                className={classes.dialog} fullWidth>
            <DialogContent>
                {/*{showTitle()}*/}
                <DialogContentText>
                    <TextField
                        // onChange={handleTempContent}
                        // value={tempContent}
                        fullWidth
                        placeholder="Подробное описание"
                        multiline={true}
                        rows={6}
                        rowsMax={8}
                    />
                    <Box display="flex">
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-">Статус</InputLabel>
                            <Select fullWidth
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={tempStatus}
                                    // onChange={handleTempStatus}
                                    labelWidth={20}
                            >
                                <MenuItem value={0}>Выполняется</MenuItem>
                                <MenuItem value={1}>Сделано</MenuItem>
                                <MenuItem value={2}>Готово к Выполнению</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Создатель</InputLabel>
                            <Select fullWidth
                                    // value={tempCreator}
                                    // onChange={handleTempCreator}
                                    labelWidth={20}
                            >
                                <MenuItem value={"Татьяна"}>Татьяна</MenuItem>
                                <MenuItem value={"Анна"}>Анна</MenuItem>
                                <MenuItem value={"Саша"}>Саша</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Адресат</InputLabel>
                            <Select fullWidth
                                    // value={tempAssignedTo}
                                    // onChange={handleTempAssignedTo}
                                    labelWidth={20}
                            >
                                <MenuItem value={"Татьяна"}>Татьяна</MenuItem>
                                <MenuItem value={"Анна"}>Анна</MenuItem>
                                <MenuItem value={"Саша"}>Саша</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleCancel}
                    color="primary">
                    Отмена
                </Button>
                <Button
                    // onClick={handleSave}
                    color="primary">
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>

    );
};

export default NewTaskDialog;

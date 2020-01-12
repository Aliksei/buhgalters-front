import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import {Box, makeStyles} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React, {useEffect} from "react";
import {red} from "@material-ui/core/colors";
import {taskService} from "../service/taskService";
import MenuItem from "@material-ui/core/MenuItem";
import MuiDialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

const months =
    [
        {id: 1, name: 'Январь'},
        {id: 2, name: 'Февраль'},
        {id: 3, name: 'Март'},
        {id: 4, name: 'Апрель'},
        {id: 5, name: 'Май'},
        {id: 6, name: 'Июнь'},
        {id: 7, name: 'Июль'},
        {id: 8, name: 'Август'},
        {id: 9, name: 'Сентябрь'},
        {id: 10, name: 'Октябрь'},
        {id: 11, name: 'Ноябрь'},
        {id: 12, name: 'Декабрь'},
    ];


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

const NewTaskDialog = ({updateView, userList}) => {
    const classes = useStyles();

    const [openNew, setOpenNew] = React.useState(false);
    const [users, setUsers] = React.useState([]);
    const [title, setTitle] = React.useState("");
    const [text, setText] = React.useState("");
    const [type, setType] = React.useState(0);
    const [month, setMonth] = React.useState(new Date().getMonth() + 1);
    const [assignee, setAssignee] = React.useState(null);

    useEffect(() => {
        setUsers(userList)
    }, [userList]);


    const handleSave = () => {
        taskService
            .postTask({
                assigneeId: assignee,
                text: text,
                type: type,
                month: month,
                title: title,
                status: 0,
                creatorId: 1
            })
            .then(r => {
                handleClose();
                updateView(r)
            });
    };

    const handleType = ({target}) => setType(target.value);
    const handleMonth = ({target}) => setMonth(target.value);
    const handleAssignee = ({target}) => setAssignee(target.value);
    const handleTitle = ({target}) => setTitle(target.value);
    const handleText = ({target}) => setText(target.value);
    const handleOpen = () => setOpenNew(true);

    const handleClose = () => {
        setText("");
        setTitle("");
        setType("0");
        setAssignee(null);
        setOpenNew(false);
    };

    return (
        <Box>
            <Button variant="contained" size={"small"} style={{backgroundColor: 'rgba(0,69,147,0.52)', color: "white"}}
                    onClick={handleOpen}>Добавить Задание</Button>
            <Dialog open={openNew} className={classes.dialog} fullWidth>
                <MuiDialogTitle>
                    <TextField
                        placeholder="Тема Задания"
                        value={title}
                        onChange={handleTitle}>
                    </TextField>
                </MuiDialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <TextField
                            onChange={handleText}
                            value={text}
                            placeholder="Подробное описание"
                            fullWidth
                            multiline={true}
                            rows={6}
                            rowsMax={8}
                            style={{backgroundColor: "rgb(241, 241, 241)", borderRadius: '5px'}}
                        />
                        <Box display="flex">
                            <FormControl className={classes.formControl}>
                                <InputLabel>Адресат</InputLabel>
                                <Select fullWidth
                                        value={assignee}
                                        onChange={handleAssignee}
                                        labelWidth={40}>
                                    {users.map(u => {
                                        return <MenuItem dense value={u.id}>{u.name}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Месяц</InputLabel>
                                <Select fullWidth
                                        value={month}
                                        onChange={handleMonth}
                                        labelWidth={10}
                                >
                                    {months.map(m => (<MenuItem dense value={m.id}>{m.name}</MenuItem>))}
                                </Select>
                            </FormControl>
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <FormControl>
                        <RadioGroup value={type.toString()} onChange={handleType}>
                            <Box display="flex" style={{padding: "0px 70px 0px 0px"}}>
                                <FormControlLabel value="0" control={<Radio/>} label="Low"/>
                                <FormControlLabel value="1" control={<Radio/>} label="Medium"/>
                                <FormControlLabel value="2" control={<Radio/>} label="Critical"/>
                            </Box>
                        </RadioGroup>
                    </FormControl>
                    <Button
                        size={"small"}
                        onClick={handleClose}
                        variant="contained">
                        Отмена
                    </Button>
                    <Button
                        size={"small"}
                        variant="contained"
                        onClick={handleSave}
                        style={{backgroundColor: 'rgba(0,69,147,0.52)', color: "white"}}>
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>


    );
};

export default NewTaskDialog;

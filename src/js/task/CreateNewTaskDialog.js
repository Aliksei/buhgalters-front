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
import React, {useEffect} from "react";
import {red} from "@material-ui/core/colors";
import {companyService} from "../service/companyService";
import {AccountCircle} from "@material-ui/icons";
import {taskService} from "../service/taskService";

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

export default function NewTaskDialog() {
    const classes = useStyles();

    const [openNew, setOpenNew] = React.useState(false);
    const [users, setUsers] = React.useState([]);
    const [status, setStatus] = React.useState(0);
    const [title, setTitle] = React.useState("ndm,asndm,s");
    const [text, setText] = React.useState("");

    const [assignee, setAssignee] = React.useState(null);

    const handleSave = () => {
        taskService
            .postTask({
                assigneeId: assignee,
                text: text,
                title: title,
                status: status,
                creatorId: 1
            });
        handleClose();
    };

    const handleAssignee = (event) => {
        setAssignee(event.target.value)
    };

    const handleTitle = (event) => {
        setTitle(event.target.value)
    };

    const handleText = (event) => {
        setText(event.target.value)
    };

    const handleOpen = () => {
        setOpenNew(true);
    };

    const handleClose = () => {
        setOpenNew(false);
    };

    useEffect(() => {
        companyService.getUserByCompanyId(1)
            .then(users => setUsers(users));
    }, []);

    return (
        <Box>
            <Button variant="contained" size={"small"} color="primary" onClick={handleOpen}>Добавить
                Задание</Button>
            <Dialog open={openNew} className={classes.dialog} fullWidth>
                <DialogContent>
                    <DialogContentText>
                        <TextField
                            onChange={handleText}
                            value={text}
                            fullWidth
                            placeholder="Подробное описание"
                            multiline={true}
                            rows={6}
                            rowsMax={8}
                        />
                        <Box display="flex">
                            <FormControl className={classes.formControl}>
                                <InputLabel>Адресат</InputLabel>
                                <Select fullWidth
                                        value={assignee}
                                        onChange={handleAssignee}
                                        labelWidth={20}
                                >
                                    {users.map(u => {
                                        return <MenuItem value={u.id}>{u.name}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
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
                        color="primary">
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>


    );
};


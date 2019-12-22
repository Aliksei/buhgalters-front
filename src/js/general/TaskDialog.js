import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {Box} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    appBar: {
        position: 'relative',
    },
    dialog: {
        minWidth: "400px",
        minHeight: "500px"
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));


export default function FullScreenDialog() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [editableTitle, setEditableTitle] = React.useState(false);


    const inputLabel = React.useRef("JOKER");
    const [labelWidth, setLabelWidth] = React.useState(0);


    const [content, setContent] = React.useState("");
    const [tempContent, setTempContent] = React.useState("");


    const [title, setTitle] = React.useState("JJJJJJJ");
    const [tempTitle, setTempTitle] = React.useState("");

    const [assignedTo, setAssignedTo] = React.useState({});
    const [tempAssignedTo, setTempAssignedTo] = React.useState({});

    const [creator, setCreator] = React.useState(0);

    const [status, setStatus] = React.useState("");
    const [tempStatus, setTempStatus] = React.useState("");


    const handleEditTitle = () => {
        setEditableTitle(true);
    };

    const handleClickOpen = () => {
        setTempStatus(status);
        setTempTitle(title);
        setTempContent(content);
        setTempAssignedTo(assignedTo);
        setOpen(true);
    };

    const handleTempContent = (event) => {
        setTempContent(event.target.value)
    };

    const handleTempAssignedTo = (event) => {
        setTempAssignedTo(event.target.value)
    };

    const handleTempStatus = (event) => {
        setTempStatus(event.target.value);
    };

    const handleTitleChange = (event) => {
        setTempTitle(event.target.value);
    };

    const handleSave = () => {
        setStatus(tempStatus);
        setContent(tempContent);
        setTitle(tempTitle);
        setEditableTitle(false);
        setAssignedTo(tempAssignedTo);
        setOpen(false);
    };


    const handleCancel = () => {
        setOpen(false);
        setEditableTitle(false);
    };

    const showTitle = () => {
        if (editableTitle === true) {
            return (
                <MuiDialogTitle style={{backgroundColor: 'rgba(0,69,147,0.52)'}}>
                    <TextField
                        value={tempTitle}
                        onChange={handleTitleChange}
                    >
                    </TextField>
                </MuiDialogTitle>
            )
        } else {
            return (
                <DialogTitle>
                    {title}
                    <IconButton size="small">
                        <EditIcon fontSize="small" onClick={handleEditTitle}></EditIcon>
                    </IconButton>
                </DialogTitle>
            )
        }
    };

    return (
        <div>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia/>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {content}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={handleClickOpen}>
                        Открыть
                    </Button>
                    <Typography gutterBottom>
                        Статус : {status}
                    </Typography>
                </CardActions>
            </Card>
            <Dialog open={open} onClose={handleSave} className={classes.dialog} fullWidth>
                <DialogContent>
                    {showTitle()}
                    <DialogContentText>
                        <TextField
                            onChange={handleTempContent}
                            value={tempContent}
                            fullWidth
                            placeholder="Подробное описаие"
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
                                        value={tempStatus}
                                        onChange={handleTempStatus}
                                        labelWidth={20}
                                >
                                    <MenuItem value={"Выполняется"}>Выполняется</MenuItem>
                                    <MenuItem value={"Сделано"}>Сделано</MenuItem>
                                    <MenuItem value={"Готово к Выполнению"}>Готово к Выполнению</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Создатель</InputLabel>
                                <Select fullWidth
                                        value={tempStatus}
                                        onChange={handleTempStatus}
                                        labelWidth={20}
                                >
                                    <MenuItem value={"Выполняется"}>Выполняется</MenuItem>
                                    <MenuItem value={"Сделано"}>Сделано</MenuItem>
                                    <MenuItem value={"Готово к Выполнению"}>Готово к Выполнению</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Адресат</InputLabel>
                                <Select fullWidth
                                        value={tempStatus}
                                        onChange={handleTempStatus}
                                        labelWidth={20}
                                >
                                    <MenuItem value={"Выполняется"}>Выполняется</MenuItem>
                                    <MenuItem value={"Сделано"}>Сделано</MenuItem>
                                    <MenuItem value={"Готово к Выполнению"}>Готово к Выполнению</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

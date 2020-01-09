import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { red } from '@material-ui/core/colors';
import Menu from "@material-ui/core/Menu";

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


const statusesMap = new Map();
statusesMap.set(0, 'Готово к Выполнению');
statusesMap.set(1, 'В процессе');
statusesMap.set(2, 'Сделано');


const TaskEntity = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [editableTitle, setEditableTitle] = React.useState(false);

    const [users, setUsers] = React.useState(props.users);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const inputLabel = React.useRef("");
    const [labelWidth, setLabelWidth] = React.useState(0);

    const [content, setContent] = React.useState(props.task.text);
    const [tempContent, setTempContent] = React.useState("");

    const [title, setTitle] = React.useState(props.task.title);
    const [tempTitle, setTempTitle] = React.useState("");

    const [assignedTo, setAssignedTo] = React.useState(props.task.assigneeId);
    const [tempAssignedTo, setTempAssignedTo] = React.useState("");

    const [creator, setCreator] = React.useState(props.task.creatorId);
    const [tempCreator, setTempCreator] = React.useState("");

    const [status, setStatus] = React.useState(props.task.status);
    const [tempStatus, setTempStatus] = React.useState(-1);

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEditTitle = () => {
        setEditableTitle(true);
    };

    const handleClickOpen = () => {
        setTempStatus(status);
        setTempCreator(creator);
        setTempTitle(title);
        setTempContent(content);
        setTempAssignedTo(assignedTo);
        setOpen(true);
    };

    const handleTempContent = (event) => {
        setTempContent(event.target.value)
    };

    const handleTempCreator = (event) => {
        setTempCreator(event.target.value)
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
        setCreator(tempCreator);
        setEditableTitle(false);
        setAssignedTo(tempAssignedTo);
        setOpen(false);
    };

    const handleTaskDropDown = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleCancel = () => {
        setOpen(false);
        setEditableTitle(false);
    };


    const pokazatNakogo = () => {
        console.log(users);
        return users.get(assignedTo)
    };

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Удалить Задание</MenuItem>
        </Menu>
    );

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
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                R
                            </Avatar>
                        }
                        action={
                            <IconButton  onClick={handleTaskDropDown} aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={pokazatNakogo()}
                        subheader="September 14, 2016"
                    />
                    {renderMenu}
                    <CardContent component="p">
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
                        Статус : {statusesMap.get(status)}
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
                                    <MenuItem value={0}>Готово к Выполнению</MenuItem>
                                    <MenuItem value={1}>В процессе</MenuItem>
                                    <MenuItem value={2}>Сделано</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Создатель</InputLabel>
                                <Select fullWidth
                                        value={tempCreator}
                                        onChange={handleTempCreator}
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
                                        value={tempAssignedTo}
                                        onChange={handleTempAssignedTo}
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
};

export default TaskEntity;

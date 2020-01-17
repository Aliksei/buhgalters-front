import React, {useEffect} from 'react';
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
import {red} from '@material-ui/core/colors';
import Menu from "@material-ui/core/Menu";
import {taskService} from "../service/taskService";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import Radio from "@material-ui/core/Radio";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 80,
    },
    smallIcon: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    card: {
        maxWidth: "370px",
        maxHeight: "210px",
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
statusesMap.set(0, 'к Выполнению');
statusesMap.set(1, 'В процессе');
statusesMap.set(2, 'Сделано');

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


const TaskEntity = ({task, users, updateView}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [editableTitle, setEditableTitle] = React.useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const [content, setContent] = React.useState(task.text);
    const [tempContent, setTempContent] = React.useState("");

    const [title, setTitle] = React.useState(task.title);
    const [tempTitle, setTempTitle] = React.useState("");

    const [type, setType] = React.useState(task.type);
    const [tempType, setTempType] = React.useState(-1);

    const [month, setMonth] = React.useState(task.month);
    const [tempMonth, setTempMonth] = React.useState(-1);

    const [assignedTo, setAssignedTo] = React.useState(task.assigneeId);
    const [tempAssignedTo, setTempAssignedTo] = React.useState("");

    const [creator, setCreator] = React.useState(task.creatorId);
    const [tempCreator, setTempCreator] = React.useState("");

    const [status, setStatus] = React.useState(task.status);
    const [tempStatus, setTempStatus] = React.useState(-1);

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const deleteTask = () => {
        taskService.deleteTask(task.id)
            .then(r => {
                handleMenuClose();
                updateView(new Date())
            })
    };

    const handleEditTitle = () => {
        setEditableTitle(true);
    };

    const handleClickOpen = () => {
        setTempStatus(status);
        setTempCreator(creator);
        setTempType(type);
        setTempMonth(month);
        setTempTitle(title);
        setTempContent(content);
        setTempAssignedTo(assignedTo);
        setOpen(true);
    };

    const handleTempContent = ({target}) => setTempContent(target.value);
    const handleTempType = ({target}) => setTempType(target.value);
    const handleTempMonth = ({target}) => setTempMonth(target.value);
    const handleTempCreator = ({target}) => setTempCreator(target.value);
    const handleTempAssignedTo = ({target}) => setTempAssignedTo(target.value);
    const handleTempStatus = ({target}) => setTempStatus(target.value);
    const handleTitleChange = ({target}) => setTempTitle(target.value);

    const handleTaskDropDown = ({currentTarget}) => setAnchorEl(currentTarget);

    const nameById = (id) => users.filter(u => u.id === id).map(u => u.name)[0];

    const handleCancel = () => {
        setOpen(false);
        setEditableTitle(false);
    };

    const handleSave = () => {
        setStatus(tempStatus);
        setType(tempType);
        setMonth(tempMonth);
        setContent(tempContent);
        setTitle(tempTitle);
        setCreator(tempCreator);
        setEditableTitle(false);
        setAssignedTo(tempAssignedTo);
        setOpen(false);
        taskService.putTask({
            id: task.id,
            type: tempType,
            month: tempMonth,
            text: tempContent,
            title: tempTitle,
            creatorId: tempCreator,
            assigneeId: tempAssignedTo,
            status: tempStatus
        })
            .then(r => updateView(r))
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
            <MenuItem dense onClick={deleteTask}>Удалить Задание</MenuItem>
        </Menu>
    );

    const drawType = () => {
        let color = type === 0 ? 'rgba(18,167,21,0.42)'
            : type === 1 ? 'rgba(0, 55, 195, 0.71)'
                : type === 2 ? 'red'
                    : '';
        let tooltipMessage = type === 0 ? "Низкий приоритет"
            : type === 1 ? "Средний приоритет"
                : type === 2 ?"Высокий приоритет" : null;

        return (
            <Tooltip arrow title={tooltipMessage}>
                <Avatar className={classes.smallIcon} style={{backgroundColor: color}}>
                    <ErrorOutlineOutlinedIcon/>
                </Avatar>
            </Tooltip>
        )
    };

    const showTitle = () => {
        if (editableTitle === true) {
            return (
                <MuiDialogTitle>
                    <TextField
                        value={tempTitle}
                        onChange={handleTitleChange}>
                        inputProps={{maxLength: 22}}
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
                        style={{margin: "0px 0px -30px 0px"}}
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                {nameById(assignedTo)}
                            </Avatar>
                        }
                        action={<IconButton onClick={handleTaskDropDown}
                                            aria-label="settings"><MoreVertIcon/></IconButton>}
                        title={'aдресат:  ' + nameById(assignedTo)}
                        subheader={task.updateDate}
                    />
                    {renderMenu}
                    <CardContent component="p">
                        <Typography gutterBottom noWrap variant="h5" component="h2">
                            {title}
                        </Typography>
                        <Typography variant="body2" noWrap color="textSecondary" component="p">
                            {content}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" style={{backgroundColor: 'rgba(0,69,147,0.52)', color: "white"}}
                            variant="contained" onClick={handleClickOpen}>
                        Открыть
                    </Button>
                    <Typography gutterBottom>
                        Статус : {statusesMap.get(status) + "   " + ""}
                    </Typography>
                    {drawType()}
                </CardActions>
            </Card>
            <Dialog open={open} className={classes.dialog} fullWidth>
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
                            style={{backgroundColor: "rgb(241, 241, 241)", borderRadius: '5px'}}
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
                                    <MenuItem dense value={0}>к Выполнению</MenuItem>
                                    <MenuItem dense value={1}>В процессе</MenuItem>
                                    <MenuItem dense value={2}>Сделано</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Создатель</InputLabel>
                                <Select fullWidth
                                        value={tempCreator}
                                        onChange={handleTempCreator}
                                        labelWidth={20}
                                >
                                    {users.map(u => (<MenuItem dense value={u.id}>{u.name}</MenuItem>))}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Адресат</InputLabel>
                                <Select fullWidth
                                        value={tempAssignedTo}
                                        onChange={handleTempAssignedTo}
                                        labelWidth={20}
                                >
                                    {users.map(u => (<MenuItem dense value={u.id}>{u.name}</MenuItem>))}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Месяц</InputLabel>
                                <Select fullWidth
                                        value={tempMonth}
                                        onChange={handleTempMonth}
                                        labelWidth={5}
                                >
                                    {months.map(m => (<MenuItem dense value={m.id}>{m.name}</MenuItem>))}
                                </Select>
                            </FormControl>
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <FormControl>
                        <RadioGroup value={tempType.toString()} onChange={handleTempType}>
                            <Box display="flex" style={{padding: "0px 70px 0px 0px"}}>
                                <FormControlLabel value="0" control={<Radio/>} label="Low"/>
                                <FormControlLabel value="1" control={<Radio/>} label="Medium"/>
                                <FormControlLabel value="2" control={<Radio/>} label="Critical"/>
                            </Box>
                        </RadioGroup>
                    </FormControl>
                    <Button onClick={handleCancel} variant="contained" size="small">
                        Отмена
                    </Button>
                    <Button onClick={handleSave} style={{backgroundColor: 'rgba(0,69,147,0.52)', color: "white"}}
                            variant="contained" size="small">
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TaskEntity;

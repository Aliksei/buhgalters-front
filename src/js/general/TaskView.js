import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import TaskEntity from "./TaskDialog";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {Box} from "@material-ui/core";
import TaskFilter from "../task/taskFilter";
import {taskService} from "../service/taskService";
import {employeeService} from "../service/userService";
import {companyService} from "../service/companyService";

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 250,
    },
    box: {
        padding: theme.spacing(1),
    },
    column: {
        // backgroundColor: "grey",
        minHeight: "100%"
    },
    media: {
        height: 40,
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        backgroundColor: 'rgba(0,69,147,0.52)',
        padding: theme.spacing(0),
    },
    typography: {
        fontcolor: 'rgba(0,117,255,0)',
        textAlign: 'center',
    },
    control: {
        padding: theme.spacing(2),
    },
}));

export default function MediaCard() {
    const classes = useStyles();

    const [tasks, setTasks] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [iii, setIii] = React.useState({});

    useEffect(() => {
        const fetchData  = async () => {
            let t = await taskService.getTasks();
            let u = await companyService.getUsersByCompanyId(1);
            setTasks(t);
            setUsers(u);
        };
        fetchData();
    }, [iii]);

    const drawToDo = () => drawColumn(0);
    const drawInProgress = () => drawColumn(1);
    const drawDone = () => drawColumn(2);

    const drawColumn = (status) => {
        return tasks
            .filter(t => t.status === status)
            .map(t => {
                return (
                    <Box className={classes.box}>
                        <TaskEntity task={t}
                                    refre={setIii}
                                    users={users}/>
                    </Box>
                )
            })
    };

    return (
        <Grid>
            <TaskFilter refre={setIii}/>
            <Grid container spacing={3}>
                <Grid
                    item xs={4}
                    direction="row"
                    alignContent="center"
                    className={classes.column}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.typography} variant="h6">К Выполнению</Typography>
                    </Paper>
                    {drawToDo()}
                </Grid>
                <Grid container alignItems="stretch" item xs={4} direction="column" className={classes.column}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.typography} variant="h6">В Процессе</Typography>
                    </Paper>
                    {drawInProgress()}
                </Grid>
                <Grid container alignItems="stretch" item xs={4} direction="column" className={classes.column}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.typography} variant="h6">В Процессе</Typography>
                    </Paper>
                    {drawDone()}
                </Grid>
            </Grid>
        </Grid>
    );
}

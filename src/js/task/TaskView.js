import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import TaskEntity from "./TaskDialog";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {Box} from "@material-ui/core";
import TaskFilter from "./taskFilter";
import {taskService} from "../service/taskService";
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
    const [update, setUpdate] = React.useState({});
    const [month, setMonth] = React.useState(-1);

    const [low, setLow] = React.useState(true);
    const [medium, setMedium] = React.useState(true);
    const [critical, setCritical] = React.useState(true);

    useEffect(() => {
        const fetchData  = async () => {
            let t = await taskService.getTasks(month);
            let u = await companyService.getUsersByCompanyId(1);
            console.log("Cделали запрос");
            setTasks(t);
            setUsers(u);
        };
        fetchData();
    }, [update, month, low, medium, critical]);

    const drawToDo = () => drawColumn(0);
    const drawInProgress = () => drawColumn(1);
    const drawDone = () => drawColumn(2);

    const drawColumn = (status) => {
        let types = [];
        if (low) {
            types.push(0);
        }
        if (medium) {
            types.push(1);
        }
        if (critical) {
            types.push(2);
        }

        console.log("Фильтруем статус " + status);

        return tasks
            .filter(t => t.status === status)
            .filter(t => {
                let contains = types.includes(t.type);

                return contains;
            })
            .map(t => {
                console.log("types : ", "type: ", t.type, t , types);
                return (
                    <Box className={classes.box}>
                        <TaskEntity task={t}
                                    updateView={setUpdate}
                                    users={users}/>
                    </Box>
                )
            })
    };

    if (Object.keys(tasks).length === 0 && Object.keys(users).length === 0) {
        console.log("Не рисуем");
        return <div></div>;
    } else {
        console.log("Рисуем");
        return (
            <Grid>
                <TaskFilter updateView={setUpdate}
                            month={month}
                            userList={users}
                            applyFilter={setMonth}
                            low={low}
                            medium={medium}
                            critical={critical}
                            setLow={setLow}
                            setCritical={setCritical}
                            setMedium={setMedium}
                />
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
                            <Typography className={classes.typography} variant="h6">Готово</Typography>
                        </Paper>
                        {drawDone()}
                    </Grid>
                </Grid>
            </Grid>
        );
    }

}

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
        const fetchData = async () => {
            let t = await taskService.getTasks(month);
            let u = await companyService.getUsersByCompanyId(1);
            setTasks(t);
            setUsers(u);
        };
        fetchData();
    }, [update, month]);


    const filterToDoTasks = () => transformByUrgency(tasks.filter(t => t.status === 0));
    const filterProgressTasks = () => transformByUrgency(tasks.filter(t => t.status === 1));
    const filterReadyTasks = () => transformByUrgency(tasks.filter(t => t.status === 2));

    const transformByUrgency = (tasks) => {
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
        return tasks.map(t => {
            if (!types.includes(t.type)) {
                t.opacity = 0.35
            } else {
                t.opacity = undefined;
            }
            return t;
        })
    };


    const ColumnContainer = ({header, items = []}) => {
        const content = items.map(item => {
            let opac = item.opacity === undefined ? 1 : item.opacity;
            return (
                <Box className={classes.box} style={{opacity: `${opac}`}}>
                    <TaskEntity task={item}
                                updateView={setUpdate}
                                users={users}/>
                </Box>
            )
        });

        return (
            <Grid container alignItems="stretch" item xs={4} direction="column" className={classes.column}>
                <Paper className={classes.paper}>
                    <Typography className={classes.typography} variant="h6">{header}</Typography>
                </Paper>
                {content}
            </Grid>
        )
    };

    if (Object.keys(tasks).length === 0 && Object.keys(users).length === 0) {
        return <div></div>;
    } else {
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
                    <ColumnContainer items={filterToDoTasks()} header="К выполнению"/>
                    <ColumnContainer items={filterProgressTasks()} header="В процессе"/>
                    <ColumnContainer items={filterReadyTasks()} header="Готово"/>
                </Grid>
            </Grid>
        );
    }


}

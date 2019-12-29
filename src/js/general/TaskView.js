import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import TaskEntity from "./TaskDialog";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {Box} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import NewTaskDialog from "./CreateNewTaskDialog";

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

    const [checkedToDo, setCheckedToDo] = React.useState(true);
    const [checkedInProgress, setCheckedInProgress] = React.useState(true);
    const [checkedReady, setCheckedReady] = React.useState(true);

    const [openNew, setOpenNew] = React.useState(true);

    const handleCheckedToDo = (event) => {
        setCheckedToDo(event.target.checked);
    };

    const handleCheckInProgress= (event) => {
        setCheckedInProgress(event.target.checked);
    };

    const handleCheckedReady = (event) => {
        setCheckedReady(event.target.checked);
    };

    function filter() {
        return (
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Switch
                            size="small"
                            checked={checkedToDo}
                            onChange={handleCheckedToDo}
                            value="checkedToDo"
                            color="primary"
                        />
                    }
                    label="К Выполнению"
                />
                <FormControlLabel
                    control={
                        <Switch
                            size="small"
                            checked={checkedInProgress}
                            onChange={handleCheckInProgress}
                            value="checkedInProgress"
                            color="primary"
                        />
                    }
                    label="В процессе"
                />
                <FormControlLabel
                    control={
                        <Switch
                            size="small"
                            checked={checkedReady}
                            onChange={handleCheckedReady}
                            value="checkedReady"
                            color="primary"
                        />
                    }
                    label="Выполненные"
                />
            </FormGroup>
        )
    }

    const handleCreateNew = () => {
        // console.log(openNew)
        setOpenNew(true);
        // console.log(openNew)
    };

    const handleNot = () => {
        // console.log(openNew)
        setOpenNew(false);
        // console.log(openNew)
    };

    return (
        <Grid>
            {console.log(openNew)}
            <Paper style={{padding: "15px 0px 15px 20px"}}>
                <Box display="flex">
                    {filter()}
                    <NewTaskDialog open={openNew}/>
                    <Button variant="contained" color="primary" onClick={handleCreateNew}>
                        Добавить
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleNot}>
                        YtДобавить
                    </Button>
                </Box>
            </Paper>
            <Grid container spacing={3}>
                <Grid
                    item xs={4}
                    direction="row"
                    alignContent="center"
                    className={classes.column}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.typography} variant="h6">К Выполнению</Typography>
                    </Paper>
                    <Box className={classes.box}>
                        <TaskEntity/>
                    </Box>
                    <Box className={classes.box}>
                        <TaskEntity/>
                    </Box>
                    <Box className={classes.box}>
                        <TaskEntity/>
                    </Box>
                </Grid>
                <Grid container alignItems="stretch" item xs={4} direction="column" className={classes.column}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.typography} variant="h6">В Процессе</Typography>
                    </Paper>
                    <Box className={classes.box}>
                        <TaskEntity/>
                    </Box>
                    <Box className={classes.box}>
                        <TaskEntity/>
                    </Box>
                </Grid>
                <Grid container alignItems="stretch" item xs={4} direction="column" className={classes.column}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.typography} variant="h6">В Процессе</Typography>
                    </Paper>
                    <Box className={classes.box}>
                        <TaskEntity/>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
}

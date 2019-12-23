import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import TaskEntity from "./TaskDialog";

const useStyles = makeStyles(theme => ({
    card: {
        // maxWidth: 250,
    },
    column: {
        backgroundColor: "grey",
        minHeight: "90%"
    },
    media: {
        height: 40,
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        minHeight: "80%",
        // width: '30%',
    },
    control: {
        padding: theme.spacing(2),
    },
}));

export default function MediaCard() {
    const classes = useStyles();

    return (
        <Grid container spacing={3}>
            <Grid item xs={4} className={classes.column}>
                <TaskEntity/>
            </Grid>
            <Grid item xs={4} className={classes.column}>
                <TaskEntity/>
                <TaskEntity/>
                <TaskEntity/>
            </Grid>
            <Grid item xs={4} className={classes.column}>
                <TaskEntity/>
            </Grid>
        </Grid>
    );
}

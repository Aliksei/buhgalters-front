import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FullScreenDialog from "./TaskDialog";

const useStyles = makeStyles(theme => ({
    card: {
        // maxWidth: 250,
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
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();

    return (
        <Grid container spacing={3}>
            <Grid item xs={4}>
                <Paper className={classes.paper}>
                    <FullScreenDialog/>
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper className={classes.paper}>
                    <FullScreenDialog/>
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper className={classes.paper}>
                    <FullScreenDialog/>
                </Paper>
            </Grid>
        </Grid>
    );
}

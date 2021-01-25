import {makeStyles, Paper, Typography} from "@material-ui/core";
import React from "react";


const useStyles = makeStyles(theme => ({
    card: {
        minWidth: 250,
        minHeight: 250,

    }
}));

const Profile = (props) => {

    const classes = useStyles();


    return (
        <Paper className={classes.card}>
            <Typography> Профиль</Typography>
            <Typography>Tatiana</Typography>
        </Paper>
    );

};

export default Profile;
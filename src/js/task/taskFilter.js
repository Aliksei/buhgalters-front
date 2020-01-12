import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import React from "react";
import Paper from "@material-ui/core/Paper";
import {Box} from "@material-ui/core";
import NewTaskDialog from "./CreateNewTaskDialog";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";

const months =
    [
        {id: -1, name: "Все месяцы"},
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

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(0),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


const TaskFilter = ({
                        updateView,
                        userList,
                        applyFilter,
                        month,
                        low,
                        medium,
                        critical,
                        setLow,
                        setMedium,
                        setCritical
                    }) => {

    const classes = useStyles();

    const handleLow = ({target}) => {
        console.log(target.checked);
        setLow(target.checked)
    };
    const handleMedium = ({target}) => {
        console.log(target.checked);
        setMedium(target.checked);
    };
    const handleCritical = ({target}) => {
        console.log(target.checked);
        setCritical(target.checked)
    };
    const handleMonth = ({target}) => applyFilter(target.value);

    return (
        <Paper>
            <Box display="flex" p={1}>
                <Box flexGrow={1} p={1}>
                    <FormGroup row>
                        <FormControlLabel control=
                                              {
                                                  <Switch size="small" checked={low}
                                                          onChange={handleLow}
                                                          color="primary"/>
                                              } label="Low"/>
                        <FormControlLabel control=
                                              {<Switch size="small" checked={medium}
                                                       onChange={handleMedium} color="primary"
                                              />} label="Medium"
                        />
                        <FormControlLabel control=
                                              {
                                                  <Switch size="small" checked={critical}
                                                          onChange={handleCritical} color="primary"
                                                  />} label="Critical"/>
                        <FormControl className={classes.formControl}>
                            <Select fullWidth
                                    value={month}
                                    onChange={handleMonth}
                                    labelWidth={10}
                            >
                                {months.map(m => (
                                    <MenuItem dense value={m.id}>{m.name}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </FormGroup>
                </Box>
                <Box p={1}><NewTaskDialog updateView={updateView} userList={userList}/></Box>
            </Box>
        </Paper>
    )
};

export default TaskFilter;

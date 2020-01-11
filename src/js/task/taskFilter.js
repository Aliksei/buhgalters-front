import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import React from "react";
import Paper from "@material-ui/core/Paper";
import {Box} from "@material-ui/core";
import NewTaskDialog from "./CreateNewTaskDialog";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import useTheme from "@material-ui/core/styles/useTheme";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
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

const TaskFilter = ({updateView, userList, applyFilter, month, applyTypeFilter}) => {

    const [checkedToDo, setCheckedToDo] = React.useState(true);
    const [checkedInProgress, setCheckedInProgress] = React.useState(true);
    const [checkedReady, setCheckedReady] = React.useState(true);

    const handleCheckedToDo = ({target}) => {
        setCheckedToDo(target.checked);
        applyTypeFilter(target.checked)
    };
    const handleCheckInProgress = ({target}) => setCheckedInProgress(target.checked);
    const handleCheckedReady = ({target}) => setCheckedReady(target.checked);
    const handleMonth = ({target}) => applyFilter(target.value);

    return (
        <Paper style={{padding: "15px 0px 15px 20px"}}>
            <Box display="flex">
                <FormGroup row>
                    <FormControlLabel control=
                                          {
                                              <Switch size="small" checked={checkedToDo} onChange={handleCheckedToDo}
                                                      value={0} color="primary"/>
                                          } label="Low"/>
                    <FormControlLabel control=
                                          {<Switch size="small" checked={checkedInProgress}
                                                   onChange={handleCheckInProgress}
                                                   value={1} color="primary"
                                          />} label="Medium"
                    />
                    <FormControlLabel control=
                                          {
                                              <Switch size="small" checked={checkedReady} onChange={handleCheckedReady}
                                                      value={2} color="primary"
                                              />} label="Critical"/>
                </FormGroup>
                <FormControl>
                    <InputLabel>Месяц</InputLabel>
                    <Select fullWidth
                            value={month}
                            onChange={handleMonth}
                            labelWidth={10}
                    >
                        {months.map(m => (<MenuItem value={m.id}>{m.name}</MenuItem>))}
                    </Select>
                </FormControl>
                <NewTaskDialog updateView={updateView} userList={userList}/>
            </Box>
        </Paper>
    )
};

export default TaskFilter;

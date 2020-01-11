import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import React from "react";
import Paper from "@material-ui/core/Paper";
import {Box} from "@material-ui/core";
import NewTaskDialog from "./CreateNewTaskDialog";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";

const TaskFilter = ({updateView, userList}) => {

    const [checkedToDo, setCheckedToDo] = React.useState(true);
    const [checkedInProgress, setCheckedInProgress] = React.useState(true);
    const [checkedReady, setCheckedReady] = React.useState(true);
    const [month, setMonth] = React.useState("");

    const handleCheckedToDo = ({target}) => setCheckedToDo(target.checked);
    const handleCheckInProgress = ({target}) => setCheckedInProgress(target.checked);
    const handleCheckedReady = ({target}) => setCheckedReady(target.checked);
    const handleMonth = ({target}) => setMonth(target.value);

    return (
        <Paper style={{padding: "15px 0px 15px 20px"}}>
            <Box display="flex">
                <FormGroup row>
                    <FormControlLabel control=
                                          {
                                              <Switch size="small" checked={checkedToDo} onChange={handleCheckedToDo}
                                                      value="checkedToDo" color="primary"/>
                                          } label="К Выполнению"/>
                    <FormControlLabel control=
                                          {<Switch size="small" checked={checkedInProgress}
                                                   onChange={handleCheckInProgress}
                                                   value="checkedInProgress" color="primary"
                                          />} label="В процессе"
                    />
                    <FormControlLabel control=
                                          {
                                              <Switch size="small" checked={checkedReady} onChange={handleCheckedReady}
                                                      value="checkedReady" color="primary"
                                              />} label="Выполненные"/>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={month}
                            onChange={setMonth}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </FormGroup>
                <NewTaskDialog updateView={updateView} userList={userList}/>
            </Box>
        </Paper>
    )
};

export default TaskFilter;
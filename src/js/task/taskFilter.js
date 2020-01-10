import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import React from "react";
import Paper from "@material-ui/core/Paper";
import {Box, Typography} from "@material-ui/core";
import NewTaskDialog from "./CreateNewTaskDialog";

const TaskFilter = (props) => {

    const [checkedToDo, setCheckedToDo] = React.useState(true);
    const [checkedInProgress, setCheckedInProgress] = React.useState(true);
    const [checkedReady, setCheckedReady] = React.useState(true);

    const handleCheckedToDo = (event) => {
        setCheckedToDo(event.target.checked);
    };

    const handleCheckInProgress = (event) => {
        setCheckedInProgress(event.target.checked);
    };

    const handleCheckedReady = (event) => {
        setCheckedReady(event.target.checked);
    };

    return (
        <Paper style={{padding: "15px 0px 15px 20px"}}>
            <Box display="flex">
                <FormGroup row>
                    <FormControlLabel control={
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

                <NewTaskDialog refre={props.refre}/>
            </Box>
        </Paper>
    )
};

export default TaskFilter;
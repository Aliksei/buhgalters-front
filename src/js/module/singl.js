import React, {Fragment, useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ListItemText from "material-ui/List/ListItemText";

export default function ClientData() {

    // const theme = useTheme();
    const [name, setName] = useState('joekr');
    const [edit, setEdit] = useState(false);

    function consol() {
        console.log(name);
    }

    function showEditable() {
        return (
            <Fragment>
                <Button>Сохрнить</Button>
                <TextField></TextField>
            </Fragment>
        )
    }

    function showNotEditable() {
        return (
            <Fragment>
                <Button>Изменить</Button>
                <ListItemText>Joker</ListItemText>
            </Fragment>
        )
    }

    return (
        {edit ? showEditable() : showNotEditable()}
    )


}
import React, {Fragment, useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ListItemText from "@material-ui/core/ListItemText";
import {Box} from "@material-ui/core";

export default class ClientData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            client: {},
            editable: false,
            val: 'JJJJJJ'
        }
    }

    componentDidMount() {
        this.setState({client: this.props.client});
        console.log(this.props.client)
        console.log("this.props.client")
    }

    showEditable() {
        return (
            <Fragment>
                <Box>
                    <Box display="flex">
                        <ListItemText>Имя : </ListItemText>
                        <TextField value={this.props.client.name} onChange={this.setVal}></TextField>
                    </Box>
                    <Box display="flex">
                        <ListItemText>Почта : </ListItemText>
                        <TextField value={this.props.client.email} onChange={this.setVal}></TextField>
                    </Box>
                    <Box display="flex">
                        <ListItemText>Директор : </ListItemText>
                        <TextField value={this.props.client.director} onChange={this.setVal}></TextField>
                    </Box>
                    <Box display="flex">
                        <ListItemText>УНП : </ListItemText>
                        <TextField value={this.props.client.ynp} onChange={this.setVal}></TextField>
                    </Box>
                    <Box display="flex">
                        <ListItemText>Фонд : </ListItemText>
                        <TextField value={this.props.client.fond} onChange={this.setVal}></TextField>
                    </Box>
                    <Box display="flex">
                        <ListItemText>Имнс : </ListItemText>
                        <TextField value={this.props.client.imns} onChange={this.setVal}></TextField>
                    </Box>
                    <Box display="flex">
                        <ListItemText>Окпо : </ListItemText>
                        <TextField value={this.props.client.okpo} onChange={this.setVal}></TextField>
                    </Box>
                    <Box display="flex">
                        <ListItemText>Окпо : </ListItemText>
                        <TextField value={this.props.client.okpo} onChange={this.setVal}></TextField>
                    </Box>

                </Box>

                <Button variant="contained" color="inherit" size="small" onClick={this.save.bind(this)}>Сохранить</Button>


                {/*<Button onClick={this.save.bind(this)}>Сохрнить</Button>*/}
                {/*<TextField value={this.state.val} onChange={this.setVal}></TextField>*/}
            </Fragment>
        )
    }

    edit() {
        this.setState({editable: true});
    }

    setVal = (event) => {
        console.log(event.target.value);
        this.setState({val: event.target.value})
    };

    save() {
        this.setState({editable: false})
    }

    showNotEditable() {
        return (
            <Box>
                <Box display="flex">
                    <ListItemText>Имя : </ListItemText>
                    <ListItemText>{this.props.client.name}</ListItemText>
                </Box>
                <Box display="flex">
                    <ListItemText>Почта : </ListItemText>
                    <ListItemText>{this.props.client.email}</ListItemText>
                </Box>
                <Box display="flex">
                    <ListItemText>Директор : </ListItemText>
                    <ListItemText>{this.props.client.director}</ListItemText>
                </Box>
                <Box display="flex">
                    <ListItemText>УНП : </ListItemText>
                    <ListItemText>{this.props.client.ynp}</ListItemText>
                </Box>
                <Box display="flex">
                    <ListItemText>Фонд : </ListItemText>
                    <ListItemText>{this.props.client.fond}</ListItemText>
                </Box>
                <Box display="flex">
                    <ListItemText>Имнс : </ListItemText>
                    <ListItemText>{this.props.client.imns}</ListItemText>
                </Box>
                <Box display="flex">
                    <ListItemText>Окпо : </ListItemText>
                    <ListItemText>{this.props.client.okpo}</ListItemText>
                </Box>
                <Box display="flex">
                    <ListItemText>Окпо : </ListItemText>
                    <ListItemText>{this.props.client.okpo}</ListItemText>
                </Box>
                    <Button variant="contained" color="inherit" size="small" onClick={this.edit.bind(this)}>
                        Изменить
                    </Button>
            </Box>
        )
    }

    render() {
        if (this.state.editable) {
            return this.showEditable();
        } else {
            return this.showNotEditable();
        }
    }

}

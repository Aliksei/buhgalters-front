import React, {Fragment, useState} from "react";
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {Link} from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";


const ClientData = ({client}) =>  {

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid>
            <div>
                <Table size={"medium"} padding="checkbox">
                    <TableRow>
                        <td>Имя : </td>
                        <td>{client.name}</td>
                    </TableRow>
                    <TableRow>
                        <td>Почта : </td>
                        <td>{client.email}</td>
                    </TableRow>
                    <TableRow>
                        <td>Директор : </td>
                        <td>{client.director}</td>
                    </TableRow>
                    <TableRow>
                        <td>УНП : </td>
                        <td>{client.ynp}</td>
                    </TableRow>
                    <TableRow>
                        <td>Фонд : </td>
                        <td>{client.fond}</td>
                    </TableRow>
                    <TableRow>
                        <td>Имнс : </td>
                        <td>{client.imns}</td>
                    </TableRow>
                    <TableRow>
                        <td>Окпо : </td>
                        <td>{client.okpo}</td>
                    </TableRow>
                </Table>
                <Dialog open={open}>
                    <DialogTitle>Редактирование клиента</DialogTitle>
                    <DialogContent>Joker</DialogContent>
                    <DialogActions>
                        <Button
                            size={"small"}
                            onClick={handleClose}
                            variant="contained">
                            Закрыть
                        </Button>
                        <Button variant="contained" size={"small"} style={{backgroundColor: 'rgba(0,69,147,0.52)', color: "white"}}
                                onClick={handleOpen}>Сохранить</Button>
                    </DialogActions>
                </Dialog>
                <Button variant="contained" color="inherit" size="small" onClick={handleOpen}>
                    Изменить
                </Button>
                <Link to='/clients'>
                    <Button variant="contained" color="default" size="small">
                        <ArrowBackIcon/>
                    </Button>
                </Link>
            </div>
        </Grid>
    )

};

export default ClientData;

const ViewRow = ({title, val}) => {

    return (
        <Box display={"flex"}>
            <Typography>${`${title} : `}</Typography>
            <Typography>{val}</Typography>
        </Box>
    )

};


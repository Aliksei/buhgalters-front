import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from '@material-ui/icons/Close';
import AppBar from "@material-ui/core/AppBar";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
// import { Document, Page } from 'react-pdf';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    docView: {
        width: '80%',
        height: '100vh',
        backgroundColor: 'gray'
    },
    propsPanel: {
        width: '20%',
        height: '100vh',
    },
    propsPanelPaper: {
        margin: theme.spacing(2),
        padding: theme.spacing(1)
    }
}));

const Shablons = ({acts, client}) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography>Шаблоны отправки документа</Typography>
            <Template header={"Шаблон 1"} seconHeader={"SECon header 1"} acts={acts} client={client}/>
            <Template header={"Шаблон 2"} seconHeader={"SECon header 2"} acts={acts} client={client}/>
            <Template header={"Шаблон 3"} seconHeader={"SECon header 3"} acts={acts} client={client}/>
            <Template header={"Шаблон 4"} seconHeader={"SECon header 24"} acts={acts} client={client}/>
        </div>
    );
};

export default Shablons;

const Template = ({header, seconHeader, acts, client}) => {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [opened, setOpened] = React.useState(false);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleClick = () => setOpened(true);
    const handleClose = () => setOpened(false);

    return (
        <ExpansionPanel expanded={expanded === `${header}`} onChange={handleChange(`${header}`)}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <Typography className={classes.heading}>{header}</Typography>
                <Typography className={classes.secondaryHeading}>{seconHeader}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                    maximus est, id dignissim quam.
                </Typography>
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
                <Button variant="contained" size={"small"}
                        style={{backgroundColor: 'rgba(0,69,147,0.52)', color: "white"}}
                        onClick={handleClick}>Заполнить</Button>
            </ExpansionPanelActions>
            <FullScreenDialog opened={opened} handleClose={handleClose} acts={acts} client={client}/>
        </ExpansionPanel>
    )
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = ({opened, handleClose, acts, client}) => {
    const classes = useStyles();

    const [pages, setPages] = React.useState();
    const [act, setAct] = React.useState(null);
    const [actError, setActError] = React.useState(false);
    const [perechen, setPerechen] = React.useState("");

    const handlePages = (num) => {
        setPages(num)
    };

    const handleAct = ({target}) => {
        if (target.value === undefined) {
            setActError(true);
        } else {
            setActError(false);
        }
        setAct(target.value);
    };

    const handlePerechen = ({target}) => {
        setPerechen(target.value);
    };


    return (
        <div>
            <Dialog fullScreen open={opened} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Отмена
                        </Typography>
                        <Button variant="contained" size={"small"}
                                style={{backgroundColor: 'white'}}
                        >Отправить Документ</Button>
                    </Toolbar>
                </AppBar>
                <Grid container>
                    <div className={classes.propsPanel}>
                        <FormControl className={classes.formControl} error={actError}>
                            <InputLabel>Выбранный Акт</InputLabel>
                            <Select fullWidth
                                    value={act}
                                    onChange={handleAct}
                            >
                                {acts.map(u => {
                                    return <MenuItem dense value={u.id}>{u.actNumber}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <Paper className={classes.propsPanelPaper}>
                            <Typography className={classes.secondaryHeading}>Получатель : </Typography>
                            <Typography className={classes.heading}>{client.name}</Typography>
                        </Paper>
                        <Paper className={classes.propsPanelPaper}>
                            <Typography className={classes.secondaryHeading}>Почта : </Typography>
                            <Typography className={classes.heading}>{client.email}</Typography>
                        </Paper>
                        <Paper className={classes.propsPanelPaper}>
                            <Typography className={classes.secondaryHeading}>Документы : </Typography>
                            <TextField
                                onChange={handlePerechen}
                                value={perechen}
                                placeholder="Перечень документов"
                                fullWidth
                                multiline={true}
                                rows={6}
                                rowsMax={8}
                                style={{backgroundColor: "rgb(241, 241, 241)", borderRadius: '5px'}}
                            >
                            </TextField>
                        </Paper>
                    </div>
                    <div className={classes.docView}>
                        {/*<iframe src="https://docs.google.com/gview?url=http://ieee802.org/secmail/docIZSEwEqHFr.doc&embedded=true"></iframe>*/}
                        {/*<iframe src="https://drive.google.com/file/d/1ejPtYX56eX7wCsQY6Dy0UbdcUxmNY6Td/view"></iframe>*/}

                        {/*<Document*/}
                        {/*    file="src/Aliksei-Tkachuk-CV.pdf"*/}
                        {/*    onLoadSuccess={handlePages}*/}
                        {/*>*/}
                        {/*    <Page pageNumber={pages} width={600} />*/}
                        {/*</Document>*/}
                    </div>
                </Grid>
            </Dialog>
        </div>
    );
};
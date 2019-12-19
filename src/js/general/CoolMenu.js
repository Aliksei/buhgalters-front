import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import StorageIcon from '@material-ui/icons/Storage';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ForumIcon from '@material-ui/icons/Forum';
import Clients from "./clientsTable";
import {Link, Route} from "react-router-dom";
import {AnimatedSwitch} from 'react-router-transition';
import React from "react";
import Acts from "./actsTable";
import Reports from "./reportsTable";
import LoginForm from "./login";
import MediaCard from "./TaskView";
import SingleClient from "../client/singeClient";

const drawerWidth = 190;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));


const ClientsRouting = () => (
    <AnimatedSwitch atEnter={{opacity: 1}}
                    atLeave={{opacity: 1}}
                    atActive={{opacity: 1}}>
        <Route exact path='/clients' component={Clients}/>
        <Route path='/clients/:id' component={SingleClient}/>
    </AnimatedSwitch>
);

export default function MiniDrawer() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={clsx(classes.appBar, {[classes.appBarShift]: open,})}>
                <Toolbar>
                    <IconButton
                        color="inherit" aria-label="open drawer" onClick={handleDrawerOpen}
                        edge="start" className={clsx(classes.menuButton, {[classes.hide]: open,})}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Программа учета Клиентов
                    </Typography>

                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
                open={open}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <ListItem component={Link} to={'/clients'} button key='Клиенты'>
                        <ListItemIcon><PeopleAltIcon/></ListItemIcon>
                        <ListItemText primary='Клиенты'/>
                    </ListItem>
                    <ListItem component={Link} to={'/acts'} button key='Акты'>
                        <ListItemIcon><StorageIcon/></ListItemIcon>
                        <ListItemText primary='Акты'/>
                    </ListItem>
                    <ListItem component={Link} to={'/reports'} button key='Отчетности'>
                        <ListItemIcon><InboxIcon/></ListItemIcon>
                        <ListItemText primary='Отчетности'/>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem component={Link} to={'/tasks'} button key='Акты'>
                        <ListItemIcon><ForumIcon/></ListItemIcon>
                        <ListItemText primary='Задания'/>
                    </ListItem>
                    <ListItem component={Link} to={'/profile'} button key='Профиль'>
                        <ListItemIcon><AccountCircleIcon/></ListItemIcon>
                        <ListItemText primary='Профиль'/>
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <AnimatedSwitch atEnter={{opacity: 0.9}}
                                atLeave={{opacity: 1}}
                                atActive={{opacity: 1}}

                >
                    <Route path='/clients' component={ClientsRouting}/>
                    <Route path='/acts' component={Acts}/>
                    <Route path='/reports' component={Reports}/>
                    <Route path='/tasks' component={MediaCard}/>
                    <Route path='/login' component={LoginForm}/>
                    <Route path='/profile' component={Acts}/>
                </AnimatedSwitch>
            </main>
        </div>
    );

}

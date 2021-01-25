import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import StorageIcon from '@material-ui/icons/Storage';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ForumIcon from '@material-ui/icons/Forum';
import Clients from "./clientsTable";
import {Link, Route, Switch} from "react-router-dom";
import React, {Fragment} from "react";
import Acts from "./actsTable";
import Reports from "./reportsTable";
import MediaCard from "../task/TaskView";
import SingleClient from "../client/singeClient";
import PrivateRoute from "../auth/PrivateRoute";
import Login from "./login";
import {AuthContext} from "../context/auth";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {AccountCircle} from "@material-ui/icons";
import Badge from "@material-ui/core/Badge";
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import RegistrationFrom from "./registration";
import Tooltip from "@material-ui/core/Tooltip";


const drawerWidth = 185;

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
            width: theme.spacing(7) + 1,
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
    direction: theme.direction
}));


export default function MiniDrawer() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const [authTokens, setAuthTokens] = React.useState();
    const [currentUser, setUser] = React.useState();

    const setTokens = (data) => {
        localStorage.setItem("tokens", JSON.stringify(data));
        setAuthTokens(data);
    };

    const TopMenu = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleMenuClose = () => setAnchorEl(null);
        const logOut = () => {
            setAuthTokens();
            handleMenuClose();
        };

        const showTopButtons = () => {
            if (!authTokens) {
                return null;
            }
            return (
                <Fragment>
                    <IconButton
                        // component={Link} to={'/tasks'}
                        aria-label="show 4 new mails" color="inherit">
                        <Badge color="secondary">
                            <MailIcon/>
                        </Badge>
                    </IconButton>
                    <IconButton aria-label="show 17 new notifications" color="inherit">
                        <Badge color="secondary">
                            <NotificationsIcon/>
                        </Badge>
                    </IconButton>
                    <IconButton edge="end" aria-label="account of current user" aria-haspopup="true"
                                onClick={(event) => {
                                    setAnchorEl(event.currentTarget);
                                }} color="inherit">
                        <AccountCircle/>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                        keepMounted
                        transformOrigin={{vertical: 'top', horizontal: 'right'}}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >
                        {/*<MenuItem dense component={Link} to={'/profile'} onClick={handleMenuClose}>Профиль</MenuItem>*/}
                        <MenuItem dense onClick={logOut}>Выйти</MenuItem>
                    </Menu>
                </Fragment>
            )
        };

        return (
            <AppBar position="fixed" className={clsx(classes.appBar, {[classes.appBarShift]: open,})}>
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer" onClick={() => setOpen(true)} edge="start"
                                className={clsx(classes.menuButton, {[classes.hide]: open,})}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Программа учета Клиентов
                    </Typography>
                    {showTopButtons()}
                </Toolbar>

            </AppBar>);
    };

    const LeftMenu = () => (
        <Drawer variant="permanent"
                className={clsx(classes.drawer, {[classes.drawerOpen]: open, [classes.drawerClose]: !open,})}
                classes={{paper: clsx({[classes.drawerOpen]: open, [classes.drawerClose]: !open,}),}}
                open={open}>
            <div className={classes.toolbar}>
                <IconButton onClick={() => setOpen(false)}><ChevronLeftIcon/></IconButton>
            </div>
            <LeftMenuItems authorized={authTokens}/>
        </Drawer>
    );

    return (
        <div className={classes.root}>
            <AuthContext.Provider value={{authTokens, setAuthTokens: setTokens, setUser, currentUser}}>
                <CssBaseline/>
                <TopMenu/>
                <LeftMenu/>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Switch>
                        <PrivateRoute path='/clients' component={ClientsRouting}/>
                        <PrivateRoute path='/acts' component={Acts}/>
                        <PrivateRoute path='/reports' component={Reports}/>
                        <PrivateRoute path='/tasks' component={MediaCard}/>
                        <Route path='/login' render={() => <Login/>}/>
                        <Route path='/registration' render={() => <RegistrationFrom/>}/>
                        {/*<PrivateRoute path='/profile' component={Profile}/>*/}
                    </Switch>
                </main>
            </AuthContext.Provider>
        </div>
    );
}

const ClientsRouting = () => (
    <Switch>
        <Route exact path='/clients' component={Clients}/>
        <Route path='/clients/:id' component={SingleClient}/>
    </Switch>
);

const MyListMenuItem = ({onClick, to, name, component: SomeIcon}) => {
    return (
        <div onClick={onClick}>
            <ListItem component={Link} to={to} button key={name}>
                <Tooltip title={name}>
                    <ListItemIcon><SomeIcon/></ListItemIcon>
                </Tooltip>
                <ListItemText primary={name}/>
            </ListItem>
        </div>
    )
};

const LeftMenuItems = ({authorized}) => {

    if (!authorized) {
        return null;
    }

    return (
        <Fragment>
            <Divider/>
            <List>
                <MyListMenuItem to={'/clients'} name={'Клиенты'} component={PeopleAltIcon}/>
                <MyListMenuItem to={'/acts'} name={'Акты'} component={StorageIcon}/>
                <MyListMenuItem to={'/reports'} name={'Отчетности'} component={InboxIcon}/>
            </List>
            <Divider/>
            <List>
                <MyListMenuItem to={'/tasks'} name={'Задания'} component={ForumIcon}/>
                {/*<MyListMenuItem to={'/profile'} name={'Профиль'} component={AccountCircleIcon}/>*/}
            </List>
        </Fragment>
    )
};
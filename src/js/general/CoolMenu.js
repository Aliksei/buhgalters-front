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
}));


const ClientsRouting = () => (
    <AnimatedSwitch
        // atEnter={{opacity: 1}}
        // atLeave={{opacity: 1}}
        // atActive={{opacity: 1}}
    >
        <Route exact path='/clients' component={Clients}/>
        <Route path='/clients/:id' component={SingleClient}/>
    </AnimatedSwitch>
);

export default function MiniDrawer() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [authTokens, setAuthTokens] = React.useState();
    const setTokens = (data) => {
        localStorage.setItem("tokens", JSON.stringify(data));
        setAuthTokens(data);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    function logOut() {
        setAuthTokens();
        handleMenuClose();
    }

    const isMenuOpen = Boolean(anchorEl);

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem component={Link} to={'/profile'} onClick={handleMenuClose}>Профиль</MenuItem>
            <MenuItem onClick={logOut}>Выйти</MenuItem>
        </Menu>
    );

    return (
        <div className={classes.root}>
            <AuthContext.Provider value={{authTokens, setAuthTokens: setTokens}}>
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
                        <IconButton component={Link} to={'/tasks'} aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <MailIcon/>
                            </Badge>
                        </IconButton>
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon/>
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle/>
                        </IconButton>
                    </Toolbar>
                    {
                        renderMenu
                    }
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
                        <ListItem component={Link} to={'/clients'} button key='Клиенты' title="Клиенты">
                            <ListItemIcon><PeopleAltIcon/></ListItemIcon>
                            <ListItemText primary='Клиенты'/>
                        </ListItem>
                        <ListItem component={Link} to={'/acts'} button key='Акты' title="Акты">
                            <ListItemIcon><StorageIcon/></ListItemIcon>
                            <ListItemText primary='Акты'/>
                        </ListItem>
                        <ListItem component={Link} to={'/reports'} button key='Отчетности' title="Профиль">
                            <ListItemIcon><InboxIcon/></ListItemIcon>
                            <ListItemText primary='Отчетности'/>
                        </ListItem>
                    </List>
                    <Divider/>
                    <List>
                        <ListItem component={Link} to={'/tasks'} button key='Акты' title="Задания">
                            <ListItemIcon><ForumIcon/></ListItemIcon>
                            <ListItemText primary='Задания'/>
                        </ListItem>
                        <ListItem component={Link} to={'/profile'} button key='Профиль' title="Профиль">
                            <ListItemIcon><AccountCircleIcon/></ListItemIcon>
                            <ListItemText primary='Профиль'/>
                        </ListItem>
                    </List>
                </Drawer>

                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <AnimatedSwitch
                        // atEnter={{opacity: 0.9}}
                        // atLeave={{opacity: 1}}
                        // atActive={{opacity: 1}}
                    >
                        <PrivateRoute path='/clients' component={ClientsRouting}/>
                        <PrivateRoute path='/acts' component={Acts}/>
                        <PrivateRoute path='/reports' component={Reports}/>
                        <PrivateRoute path='/tasks' component={MediaCard}/>
                        <Route path='/login' component={Login}/>
                        <Route path='/registration' component={RegistrationFrom}/>
                        <PrivateRoute path='/profile' component={Acts}/>
                    </AnimatedSwitch>
                </main>
            </AuthContext.Provider>
        </div>
    );

}

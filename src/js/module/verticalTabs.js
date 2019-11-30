import React from 'react';
import PropTypes, {func} from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Clients from "./clientsTable";
import Acts from "./actsTable";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export default function VerticalTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    function updateKey(newValue) {
        if (newValue === 0 ) {
            return newValue + 1;
        }
    }

    return (
        <div>
            <div className={classes.root}>
                <Tabs orientation="vertical"
                      variant="standard"
                      value={value}
                      onChange={handleChange}
                      className={classes.tabs}
                      style={{overflow: 'visible'}}
                >
                    <Tab label="Клиенты" {...a11yProps(0)}/>
                    <Tab label="Отчетности" {...a11yProps(1)} />
                    <Tab label="Акты" {...a11yProps(2)} />
                    <Tab label="Задания" {...a11yProps(3)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Clients key={updateKey(value)}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Acts key={updateKey(value)} />
                </TabPanel>
            </div>
        </div>

    );
}

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import {Drawer} from "@material-ui/core";
import MiniDrawer from "./js/module/CoolMenu";

const Home = () => (
    <div>
        <h1>Welcome to the Tornadoes Website!</h1>
    </div>
);

const FullRoster = () => (
    <div>
        <ul>
            {
                PlayerAPI.all().map(p => (
                    <li key={p.number}>
                        <Link to={`/roster/${p.number}`}>{p.name}</Link>
                    </li>
                ))
            }
        </ul>
    </div>
);

const PlayerAPI = {
    players: [
        {number: 1, name: "Ben Blocker", position: "G"},
        {number: 2, name: "Dave Defender", position: "D"},
        {number: 3, name: "Sam Sweeper", position: "D"},
        {number: 4, name: "Matt Midfielder", position: "M"},
        {number: 5, name: "William Winger", position: "M"},
        {number: 6, name: "Fillipe Forward", position: "F"}
    ],
    all: function () {
        return this.players
    },
    get: function (id) {
        const isPlayer = p => p.number === id;
        return this.players.find(isPlayer)
    }
};

const Player = (props) => {
    const player = PlayerAPI.get(
        parseInt(props.match.params.number, 10)
    );
    if (!player) {
        return <div>Sorry, but the player was not found</div>
    }
    return (
        <div>
            <h1>{player.name} (#{player.number})</h1>
            <h2>Position: {player.position}</h2>
            <Link to='/roster'>Back</Link>
        </div>
    )
};

const Schedule = () => (
    <div>
        <ul>
            <li>6/5 @ Evergreens</li>
            <li>6/8 vs Kickers</li>
            <li>6/14 @ United</li>
        </ul>
    </div>
);

const Roster = () => (
    <Switch>
        <Route exact path='/roster' component={FullRoster}/>
        <Route path='/roster/:number' component={Player}/>
    </Switch>
);

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/roster' component={Roster}/>
            <Route path='/schedule' component={Schedule}/>
        </Switch>
    </main>
);

// const App = () => (
//     <div>
//         <Header/>
//         <Main/>
//     </div>
// );

const App = () => (
    <div>
        <MiniDrawer/>
    </div>
);


const Header = () => (
    <header>
        {/*<Link to='/'><Button>Home</Button></Link>*/}
        {/*<Link to='/roster'><Button>Roster</Button></Link>*/}
        {/*<Link to='/schedule'><Button>Schedule</Button></Link>*/}

        <Drawer>
            <MenuItem component={Link} to={'/'}>Home</MenuItem>
            <MenuItem component={Link} to={'/roster'}>Roster</MenuItem>
            <MenuItem component={Link} to={'/schedule'}>Schedule</MenuItem>
        </Drawer>

        {/*<button><Link to='/'>Home</Link></button>*/}
        {/*<button><Link to='/roster'>Roster</Link></button>*/}
        {/*<button><Link to='/schedule'>Schedule</Link></button>*/}
    </header>
);

const ClientSingle = () => (
    <Switch>
        <Route exact path='/roster' component={FullRoster}/>
        <Route path='/roster/:number' component={Player}/>
    </Switch>
);

// ReactDOM.render(<FullWidthTabs/>, document.getElementById('root'));
ReactDOM.render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

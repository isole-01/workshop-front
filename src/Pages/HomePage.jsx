import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import CategoryIcon from '@material-ui/icons/Category';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import UpdateIcon from '@material-ui/icons/Update';
import StarIcon from '@material-ui/icons/Star';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {Route, Switch,useRouteMatch} from "react-router-dom";
import SignInPage from "./SignInPage";
import {Link} from "react-router-dom";
import SignUpPage from "./SignUpPage";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Collapse from "@material-ui/core/Collapse";
import {ExpandLess, ExpandMore, StarBorder} from "@material-ui/icons";
import HomePage1 from "./HomePage1";
import SvgIcon from "@material-ui/core/SvgIcon";
import LoginPage from "../views/LoginPage/LoginPage";
import WorkshopPage from "./WorkshopPage";
import Tst from "./CssTest";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import SearchPage from "./SearchPage";

const drawerWidth = 300;


const useStyles = makeStyles(theme => ({
    root: {
        'display': 'flex',
        'justify-content': 'space-between'
    },
    drawer: {
        // [theme.breakpoints.up('sm')]: {
        //     width: drawerWidth,
        //     flexShrink: 0,
        // },
    },
    appBar: {
        backgroundColor: "black"
        // [theme.breakpoints.up('sm')]: {
        //     width: `calc(100% - ${drawerWidth}px)`,
        //     marginLeft: drawerWidth,
        // },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        // [theme.breakpoints.up('sm')]: {
        //     display: 'none',
        // },
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },

    loginButton: {
        'justify-self': 'flex-end'
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function HideOnScroll(props) {
    const {children, window} = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({target: window ? window() : undefined});

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const a = ['Categories', 'Latest Workshops', 'Most Popular Workshops', 'Contact Us', 'About Us'];
const Categories = ({classes}) => {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <React.Fragment>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <CategoryIcon/>
                </ListItemIcon>
                <ListItemText primary="Categories"/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <SvgIcon> </SvgIcon>
                        </ListItemIcon>
                        <ListItemText primary="Cooking"/>
                    </ListItem>
                </List>
            </Collapse>
        </React.Fragment>
    );
}

function ResponsiveDrawer(props) {
    const {container} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const drawer = (
        <div>
            <div className={classes.toolbar}/>
            <Divider/>
            <List>
                <Categories classes={classes}/>
                <ListItem button>
                    <ListItemIcon><UpdateIcon/></ListItemIcon>
                    <ListItemText primary="Latest Workshops"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon><StarIcon/></ListItemIcon>
                    <ListItemText primary="Highest Rated Workshops"/>
                </ListItem>
            </List>
        </div>
    );
    const match=useRouteMatch();

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <HideOnScroll>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar style={{backgroundColor:"#00acc1",'justify-content': 'space-between'}}>
                        <CssBaseline/>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Link style={{'textDecoration': 'none', 'color': 'white'}} to={'/home'}><Button size="large"
                                                                                                        className={classes.loginButton}
                                                                                                        color="inherit">Hashem</Button>
                        </Link>
                        <Link style={{'textDecoration': 'none', 'color': 'white'}} to={'/sign-in'}><Button
                            className={classes.loginButton} color="inherit">Login</Button> </Link>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                {/*<Hidden smUp implementation="css">*/}
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <HomePage1/>
                {/*<Switch>*/}
                {/*    <Route path={`${match.path}/login`}>*/}
                {/*        <LoginPage/>*/}
                {/*    </Route>*/}
                {/*    <Route path={`${match.path}/home`}>*/}
                {/*        <HomePage1/>*/}
                {/*    </Route>*/}
                {/*    <Route path={`${match.path}/signup`}>*/}
                {/*        <SignUpPage/>*/}
                {/*    </Route>*/}
                {/*    <Route path={`${match.path}/workshop`}>*/}
                {/*        <WorkshopPage/>*/}
                {/*    </Route>*/}
                {/*    <Route path={`${match.path}/search`}>*/}
                {/*        <SearchPage/>*/}
                {/*    </Route>*/}
                {/*</Switch>*/}
            </main>
        </div>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

export default ResponsiveDrawer;
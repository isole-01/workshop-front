import React from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import HomePage1 from "./Pages/HomePage1";
import SearchPage from "./Pages/SearchPage";
import WorkshopPage from "./Pages/WorkshopPage";
import Header from "./components/Header/Header";
import HeaderLinks from "components/Header/HeaderLinks";
import classNames from "classnames";

import Parallax from "./components/Parallax/Parallax";

import Footer from "./components/Footer/Footer";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {CssBaseline} from "@material-ui/core";

const useStyles = makeStyles(styles);




const Pages = (probs) => {
    const {...rest} = probs;
    const classes = useStyles();
    const match=useRouteMatch();
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
    return (
        <div>
            <Header
                color="transparent"
                brand="Workshop Title"
                rightLinks={<HeaderLinks/>}
                fixed
                changeColorOnScroll={{
                    height: 200,
                    color: "white"
                }}
                {...rest}
            />
            <Parallax small filter image={require("assets/img/profile-bg.jpg")}/>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
                    <div className={classes.container}>
                        <CssBaseline/>
                        <Switch>
                            <Route path={match.path+'/home'}> <HomePage1/></Route>
                            <Route path={match.path+'/search/:type/:query'} component={SearchPage}/>
                            {/*<Route path={'pages/search'}/>*/}
                            {/*<Route path={"/pages/workshop/:workshopId"} component={WorkshopPage}/>*/}
                            <Route path={match.path+"/workshop/:workshopId"} component={WorkshopPage}/>                        </Switch>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>

    )
};
export default Pages;



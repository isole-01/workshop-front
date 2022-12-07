import Grid from "@material-ui/core/Grid";
import React, {useEffect} from "react";

import ProductCategories from "assets/onepirate/modules/views/ProductCategories.jsx";
import MyCarousel from "../myComponents/MyCarousel";
import {Container} from "@material-ui/core";
import GridContainer from "../components/Grid/GridContainer";
import SnackbarContent from "../components/Snackbar/SnackbarContent";
import Button from '../components/CustomButtons/Button.js';
import WorkshopCard from "../myComponents/WorkshopCard";
import GridItem from "../components/Grid/GridItem";
import Typography from "../assets/onepirate/modules/components/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import RegularButton from "../components/CustomButtons/Button";
import RegisterPage from "./ResgisterPage";
import {Link} from "react-router-dom";
import CardBody from "../components/Card/CardBody";
import Card from "../components/Card/Card";

import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";

import {cardTitle} from "assets/jss/material-kit-react.js";
import makeStyles from "@material-ui/core/styles/makeStyles";
import axios from "axios";

const styles = {
    ...imagesStyles,
    cardTitle,
};

const useStyles = makeStyles(styles);


const HomePage1 = () => {
    const classes = useStyles();
    const [workshops,setWorkshops]=React.useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:8081/api/v1/sessions/all`,
            )
            .then((res) => {
                console.log(res);
                setWorkshops(res.data);
            })
            .catch((e) => console.log(e.response))
    },[]);
    return (
        <GridContainer direction={"column"} justify={"center"} style={{marginLeft: "-115px"}}>
            {/*<Container  style={{backgroundColor:"red",width:"90%"}}>*/}
            <CssBaseline/>
            <GridContainer direction={"column"}>
                <SnackbarContent
                    message={
                        <GridContainer direction={"row"} justify={"space-between"}>
                        <span>
              JOIN US NOW!
            </span>
                            <RegularButton component={Link} to={'/register'}>Register</RegularButton>
                        </GridContainer>


                    }
                    close
                    color="info"
                    icon="info_outline"
                />
                <MyCarousel/>
                <ProductCategories/>
                <Typography variant="h4" align="center" component="h2">
                    Latest Workshops:
                </Typography>
                <GridContainer direction={"row"} justify={"center"} spacing={4}>
                    {workshops.map((workshop,idx)=>{
                        if(idx<3)
                        return(
                        <GridItem style={{width: "25rem"}}><Card
                            style={{width: "18rem", marginRight: "17px", marginLeft: "17px"}}>
                            <div
                                style={{
                                    backgroundImage: 'url(https://source.unsplash.com/random)',
                                    height: "180px",
                                    width: "100%",
                                    display: "block"
                                }}
                                className={classes.imgCardTop}
                            />
                            <CardBody>
                                <h4 className={classes.cardTitle}>{workshop.name}</h4>
                                <p>by {workshop.instructorName}</p>
                                {<p>${workshop.cachePrice ? workshop.cachePrice:"Free"}</p>}
                                <Button component={Link} to={`/pages/workshop/${workshop.id}`} color="primary">Show</Button>
                            </CardBody>
                        </Card></GridItem>)

                    })}
                    {/*<GridItem style={{width: "25rem"}}><Card*/}
                    {/*    style={{width: "18rem", marginRight: "17px", marginLeft: "17px"}}>*/}
                    {/*    <div*/}
                    {/*        style={{*/}
                    {/*            backgroundImage: 'url(https://source.unsplash.com/random)',*/}
                    {/*            height: "180px",*/}
                    {/*            width: "100%",*/}
                    {/*            display: "block"*/}
                    {/*        }}*/}
                    {/*        className={classes.imgCardTop}*/}
                    {/*    />*/}
                    {/*    <CardBody>*/}
                    {/*        <h4 className={classes.cardTitle}>Math</h4>*/}
                    {/*        <p>by Dr Sadri</p>*/}
                    {/*        {<p>$100</p>}*/}
                    {/*        <Button component={Link} to={`/pages/workshop/${2}`} color="primary">Show</Button>*/}
                    {/*    </CardBody>*/}
                    {/*</Card></GridItem>*/}
                    {/*<GridItem style={{width: "25rem"}}><Card*/}
                    {/*    style={{width: "18rem", marginRight: "17px", marginLeft: "17px"}}>*/}
                    {/*    <div*/}
                    {/*        style={{*/}
                    {/*            backgroundImage: 'url(https://source.unsplash.com/random)',*/}
                    {/*            height: "180px",*/}
                    {/*            width: "100%",*/}
                    {/*            display: "block"*/}
                    {/*        }}*/}
                    {/*        className={classes.imgCardTop}*/}
                    {/*    />*/}
                    {/*    <CardBody>*/}
                    {/*        <h4 className={classes.cardTitle}>Advanced Programming</h4>*/}
                    {/*        <p>by Ali Hamze</p>*/}
                    {/*        {<p>free</p>}*/}
                    {/*        <Button component={Link} to={`/pages/workshop/${3}`} color="primary">Show</Button>*/}
                    {/*    </CardBody>*/}
                    {/*</Card></GridItem>*/}
                    {/*<GridItem style={{width: "25rem"}}><Card*/}
                    {/*    style={{width: "18rem", marginRight: "17px", marginLeft: "17px"}}>*/}
                    {/*    <div*/}
                    {/*        style={{*/}
                    {/*            backgroundImage: 'url(https://source.unsplash.com/random)',*/}
                    {/*            height: "180px",*/}
                    {/*            width: "100%",*/}
                    {/*            display: "block"*/}
                    {/*        }}*/}
                    {/*        className={classes.imgCardTop}*/}
                    {/*    />*/}
                    {/*    <CardBody>*/}
                    {/*        <h4 className={classes.cardTitle}>Basic Programming</h4>*/}
                    {/*        <p>by Ahmad Tohidi</p>*/}
                    {/*        {<p>free</p>}*/}
                    {/*        <Button component={Link} to={`/pages/workshop/${1}`} color="primary">Show</Button>*/}
                    {/*    </CardBody>*/}
                    {/*</Card>*/}
                    {/*</GridItem>*/}
                </GridContainer>
            </GridContainer>
        </GridContainer>
    )
};
export default HomePage1;
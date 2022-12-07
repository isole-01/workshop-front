import React, {useEffect, useState} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";

import profile from "assets/img/faces/christian.jpg";

import studio1 from "assets/img/examples/studio-1.jpg";
import studio2 from "assets/img/examples/studio-2.jpg";
import studio3 from "assets/img/examples/studio-3.jpg";
import studio4 from "assets/img/examples/studio-4.jpg";
import studio5 from "assets/img/examples/studio-5.jpg";
import work1 from "assets/img/examples/olu-eletu.jpg";
import work2 from "assets/img/examples/clem-onojeghuo.jpg";
import work3 from "assets/img/examples/cynthia-del-rio.jpg";
import work4 from "assets/img/examples/mariya-georgieva.jpg";
import work5 from "assets/img/examples/clem-onojegaw.jpg";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import CardBody from "../../components/Card/CardBody";
import Card from "../../components/Card/Card";
import {Link, useParams} from "react-router-dom"
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import RegularButton from "../../components/CustomButtons/Button";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
    const params = useParams();
    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useState(false);
    const [instructors, setInstructors] = useState([]);
    const [students, setStudents] = useState([]);
    const [graders, setGraders] = useState([]);




    useEffect(() => {
        async function getStuff(){
            try {
                let response= await axios.get(`http://localhost:8081/api/v1/users/${params.userId}`, {})
                console.log(response.data);
                await setUser(response.data);
                response=await axios.get(`http://localhost:8081/api/v1/users/${params.userId}/students`);
                await setStudents(response.data);
                response=await axios.get(`http://localhost:8081/api/v1/users/${params.userId}/graders`);
                await setGraders(response.data);
                response=await axios.get(`http://localhost:8081/api/v1/users/${params.userId}/instructors`);
                await setInstructors(response.data);
                console.log("res");
                console.log(response.data);
                console.log("instructors");
                console.log(instructors);
                setLoaded(true);

            }
            catch (e) {
                console.log(e);
            }

        }
        getStuff();
    }, []);

    const classes = useStyles();
    const {...rest} = props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
    if (!loaded)
        return <GridContainer justify={"center"} style={{height: "60vh", alignContent: "center"}}><CircularProgress/>
        </GridContainer>;
    return (
        <div>
            <Header
                color="transparent"
                brand="Material Kit React"
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
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={6}>
                                <div className={classes.profile}>
                                    <div>
                                        <img src={profile} alt="..." className={imageClasses}/>
                                    </div>
                                    <div className={classes.name}>
                                        <h3 className={classes.title}>{user.firstName} {user.lastName}</h3>
                                        <h6>{user.email}</h6>
                                        <Button justIcon link className={classes.margin5}>
                                            <i className={"fab fa-twitter"}/>
                                        </Button>
                                        <Button justIcon link className={classes.margin5}>
                                            <i className={"fab fa-instagram"}/>
                                        </Button>
                                        <Button justIcon link className={classes.margin5}>
                                            <i className={"fab fa-facebook"}/>
                                        </Button>
                                    </div>
                                </div>
                            </GridItem>
                        </GridContainer>
                        {/*<div className={classes.description}>*/}
                        {/*  <p>*/}
                        {/*    An artist of considerable range, Chet Faker — the name taken by*/}
                        {/*    Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs*/}
                        {/*    and records all of his own music, giving it a warm, intimate*/}
                        {/*    feel with a solid groove structure.{" "}*/}
                        {/*  </p>*/}
                        {/*</div>*/}
                        <GridContainer justify="center">
                            <GridItem className={classes.navWrapper} style={{width: "100%"}}>
                                <NavPills
                                    alignCenter
                                    color="primary"
                                    tabs={[
                                        {
                                            tabButton: "Student",
                                            tabIcon: Camera,
                                            tabContent: (
                                                <GridContainer justify="center">
                                                    {
                                                        students.map((el,idx)=>{
                                                                return(
                                                                    <GridItem xs={12} sm={12} md={4}>
                                                                        <Card style={{width: "18rem", marginRight: "17px", marginLeft: "17px"}}>
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
                                                                                <h4 className={classes.cardTitle}>{el.sessionName}</h4>
                                                                                <p>by {el.instructorName}</p>
                                                                                <Button component={Link} to={`/pages/workshop/${el.sessionId}`} color="primary">Show</Button>

                                                                            </CardBody>
                                                                        </Card>
                                                                    </GridItem>
                                                                )
                                                            }
                                                        )

                                                    }
                                                </GridContainer>
                                            )
                                        },
                                        {
                                            tabButton: "Instructor",
                                            tabIcon: Palette,
                                            tabContent: (
                                                <GridContainer justify="center">
                                                    {
                                                        instructors.map((el,idx)=>{
                                                            return(
                                                                <GridItem xs={12} sm={12} md={4}>
                                                                    <Card style={{width: "18rem", marginRight: "17px", marginLeft: "17px"}}>
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
                                                                            <h4 className={classes.cardTitle}>{el.session.name}</h4>
                                                                            <p>by {el.session.instructorName}</p>
                                                                            {el.session.cachePrice ? <p>price {el.session.cachePrice}$</p> : <p>Free</p>}
                                                                            <Button component={Link} to={`/pages/workshop/${el.session.id}`} color="primary">Show</Button>

                                                                        </CardBody>
                                                                    </Card>
                                                                </GridItem>
                                                            )
                                                        }
                                                    )

                                                    }
                                                </GridContainer>
                                            )
                                        },
                                        {
                                            tabButton: "Grader",
                                            tabIcon: Favorite,
                                            tabContent: (
                                                <GridContainer justify="center">
                                                    {
                                                        graders.map((el,idx)=>{
                                                                return(
                                                                    <GridItem xs={12} sm={12} md={4}>
                                                                        <Card style={{width: "18rem", marginRight: "17px", marginLeft: "17px"}}>
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
                                                                                <h4 className={classes.cardTitle}>{el.session.name}</h4>
                                                                                <p>by {el.session.instructorName}</p>
                                                                                {el.session.cachePrice ? <p>price {el.session.cachePrice}$</p> : <p>Free</p>}
                                                                                <Button component={Link} to={`/pages/workshop/${el.session.id}`} color="primary">Show</Button>
                                                                            </CardBody>
                                                                        </Card>
                                                                    </GridItem>
                                                                )
                                                            }
                                                        )

                                                    }

                                                </GridContainer>
                                            )
                                        }
                                    ]}
                                />
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

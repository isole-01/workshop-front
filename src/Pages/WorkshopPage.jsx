import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import {Box, Card, CardContent, Container, Typography} from "@material-ui/core";
import GridContainer from "../components/Grid/GridContainer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Build, Chat, Face, Payment} from "@material-ui/icons";
import CustomTabs from "../components/CustomTabs/CustomTabs";
import GridItem from "../components/Grid/GridItem";
import {Link} from "react-router-dom";
import DescriptionIcon from '@material-ui/icons/Description';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import CardHeader from "../components/Card/CardHeader.jsx";
import CardBody from "../components/Card/CardBody";
import {useParams} from "react-router-dom"
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import RegularButton from "../components/CustomButtons/Button";
import InfoArea from "../components/InfoArea/InfoArea";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/core/SvgIcon/SvgIcon";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import modalStyle from "../assets/jss/material-kit-react/modalStyle";

import {Redirect} from "react-router-dom"
import moment from "moment";

const useStylesModal = makeStyles(modalStyle);


const useStyles = makeStyles({
    topheader: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        width: "70vw",
        height: "450px",
        marginDown: "10px",
        alignSelf: "center"
    },
    description: {
        width: "60vw",
    },
    textCenter: {
        textAlign: "center"
    },
    tabs: {
        marginTop: "300px"
    }
});
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const WorkshopPage = () => {
    const [simpleSelect, setSimpleSelect] = React.useState();
    const handleSimple = event => {
        setSimpleSelect(event.target.value);
    };
    const [workshop, setWorkshop] = useState();
    const [loaded, setLoaded] = useState(false);
    const [enrolled, setEnrolled] = useState(false);

    const [modal, setModal] = React.useState(false);
    const [enrollModal, setEnrollModal] = React.useState(false);

    const [errorMessage, setErrorMessage] = React.useState('Something Went Wrong');


    const classes = useStyles();
    const modalClasses = useStylesModal();
    const params = useParams();
    useEffect(() => {
        axios.get(`http://localhost:8081/api/v1/sessions/${params.workshopId}`,
            {})
            .then((res) => {

                console.log(res.data);
                setWorkshop(res.data);
                setLoaded(true)
            })
            .catch((e) => {
                    if (e.response && e.response.data && e.response.data.message)
                        alert(e.response.data.message);
                    console.log(e.response)
                }
            )
    }, []);
    if (enrolled)
        return <Redirect to={'/pages/home'}/>;
    if (!loaded)
        return <GridContainer justify={"center"} style={{height: "60vh", alignContent: "center"}}><CircularProgress/>
        </GridContainer>;
    return (
        <Grid container direction={"row"} justify={"center"}>
            <div>
                <Dialog
                    classes={{
                        root: modalClasses.center,
                        paper: modalClasses.modal
                    }}
                    open={modal}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => setModal(false)}
                    aria-labelledby="modal-slide-title"
                    aria-describedby="modal-slide-description"
                >
                    <DialogTitle
                        id="classic-modal-slide-title"
                        disableTypography
                        className={modalClasses.modalHeader}
                    >
                        <IconButton
                            className={modalClasses.modalCloseButton}
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={() => setModal(false)}
                        >
                            <Close className={modalClasses.modalClose}/>
                        </IconButton>
                        <h4 className={modalClasses.modalTitle} style={{color: "red"}}>Error</h4>
                    </DialogTitle>
                    <DialogContent
                        id="modal-slide-description"
                        className={modalClasses.modalBody}
                    >
                        <h5>{errorMessage}</h5>
                    </DialogContent>
                    <DialogActions
                        className={modalClasses.modalFooter + " " + modalClasses.modalFooterCenter}
                    >
                        <Button onClick={() => setModal(false)}>Ok</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog
                    classes={{
                        root: modalClasses.center,
                        paper: modalClasses.modal
                    }}
                    open={enrollModal}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => setEnrollModal(false)}
                    aria-labelledby="modal-slide-title"
                    aria-describedby="modal-slide-description"
                >
                    <DialogTitle
                        id="classic-modal-slide-title"
                        disableTypography
                        className={modalClasses.modalHeader}
                    >
                        <IconButton
                            className={modalClasses.modalCloseButton}
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={() => setEnrollModal(false)}
                        >
                            <Close className={modalClasses.modalClose}/>
                        </IconButton>
                        <h4 className={modalClasses.modalTitle} style={{color: "green"}}>Done!</h4>
                    </DialogTitle>
                    <DialogContent
                        id="modal-slide-description"
                        className={modalClasses.modalBody}
                    >
                        <h5>You Enrolled Successfully</h5>
                    </DialogContent>
                    <DialogActions
                        className={modalClasses.modalFooter + " " + modalClasses.modalFooterCenter}
                    >
                        <Button onClick={() => setEnrollModal(false)}>Ok</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Grid container direction={"column"} justify={"center"} style={{alignContent: "center"}} spacing={10}
                  style={{marginTop: "1vh", width: "90vw"}}>

                <Card item className={classes.topheader}>
                    <Grid container direction={"row"}>

                    </Grid>
                </Card>
                <GridItem>
                    <GridContainer direction={"row"} justify={"center"} style={{"align-content": "center"}}>
                        <Typography className={classes.textCenter} style={{"margin-top": "10px"}}
                                    variant={'h3'}>{workshop.name}</Typography>
                        <Typography className={classes.textCenter} style={{"margin-top": "10px"}}
                                    variant={'h6'}>by <Link
                            to={`/profile/${workshop.instructorId}`}>{workshop.instructorName}</Link></Typography>
                    </GridContainer>
                </GridItem>
                <Grid item>
                    <CustomTabs
                        className={classes.tabs}
                        headerColor="primary"
                        tabs={[
                            {
                                tabName: "Description",
                                tabIcon: DescriptionIcon,
                                tabContent: (
                                    <p className={classes.textCenter}>
                                        {
                                            workshop.description ?
                                                <p className={classes.textCenter}>{workshop.description}</p> :
                                                <p className={classes.textCenter}>
                                                    I think that’s a responsibility that I have, to push
                                                    possibilities, to show people, this is the level that
                                                    things could be at. I will be the leader of a company
                                                    that ends up being worth billions of dollars, because
                                                    I got the answers. I understand culture. I am the
                                                    nucleus. I think that’s a responsibility that I have,
                                                    to push possibilities, to show people, this is the
                                                    level that things could be at.
                                                </p>
                                        }
                                    </p>
                                )
                            },
                            {
                                tabName: "Date",
                                tabIcon: EventAvailableIcon,
                                tabContent: (
                                    <p className={classes.textCenter}>

                                        <p className={classes.textCenter}>Start Date: {moment(workshop.startDate).format("MMMM Do YYYY")}</p>
                                        <p className={classes.textCenter}>End Date: {moment(workshop.endDate).format("MMMM Do YYYY")}</p>:

                                    </p>
                                )
                            },
                            // {
                            //     tabName: "prerequisites",
                            //     tabIcon: LibraryBooksIcon,
                            //     tabContent: (
                            //         <p className={classes.textCenter}>
                            //             think that’s a responsibility that I have, to push
                            //             possibilities, to show people, this is the level that
                            //             things could be at. So when you get something that has
                            //             the name Kanye West on it, it’s supposed to be pushing
                            //             the furthest possibilities. I will be the leader of a
                            //             company that ends up being worth billions of dollars,
                            //             because I got the answers. I understand culture. I am
                            //             the nucleus.
                            //         </p>
                            //     )
                            // },
                        ]}
                    />
                    <GridContainer direction={"row"} justify={"center"} style={{alignContent: "center"}}>
                        <GridItem xs={12} sm={12} md={6} style={{
                            alignSelf: "center",
                            display: "flex",
                            direction: "row",
                            justifyContent: "center"
                        }}>
                            <InfoArea
                                title="Place"
                                description={workshop.place}
                                icon={Payment}
                                iconColor="rose"
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6} style={{
                            alignSelf: "center",
                            display: "flex",
                            direction: "row",
                            justifyContent: "center"
                        }}>
                            <InfoArea
                                title="Payment"
                                description={`Cash Price: ${workshop.cachePrice ? workshop.cachePrice : "free"} Installment Price: ${workshop.installmentPrice ? workshop.installmentPrice : ""}
                              Number of installment: ${workshop.numberOfInstallments ? workshop.numberOfInstallments : ""}  ${workshop.paymentDescription ? workshop.paymentDescription : ""}`}
                                icon={Payment}
                                iconColor="rose"
                            />
                        </GridItem>
                    </GridContainer>
                    <GridContainer direction={"row"} justify={"center"} style={{marginTop: "5vh"}}>
                        {localStorage.getItem("userId") ? (
                                <GridContainer direction={"row"} justify={"center"} style={{}}>
                                    <GridItem style={{width: "20vw"}}>
                                        <FormControl fullWidth className={classes.selectFormControl}>
                                            <InputLabel
                                                htmlFor="simple-select"
                                                className={classes.selectLabel}
                                            >
                                                Payment
                                            </InputLabel>
                                            <Select
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                value={simpleSelect}
                                                onChange={handleSimple}
                                                inputProps={{
                                                    name: "simpleSelect",
                                                    id: "simple-select"
                                                }}
                                            >
                                                <MenuItem
                                                    disabled
                                                    classes={{
                                                        root: classes.selectMenuItem
                                                    }}
                                                >
                                                    Type
                                                </MenuItem>
                                                <MenuItem
                                                    selected={true}
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="register_cache"
                                                >
                                                    Cash
                                                </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="register_installment"
                                                >
                                                    Installment
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem style={{
                                        marginTop: "5vh",
                                        display: "flex",
                                        direction: "row",
                                        justifyContent: "center"
                                    }}>
                                        <RegularButton color={"success"}
                                                       onClick={() => {
                                                           axios.post(
                                                               `http://localhost:8081/api/v1/users/${localStorage.getItem("userId")}/${simpleSelect}/${workshop.id}`,
                                                               {
                                                                   headers: {
                                                                       "Content-Type": "application/json; charset=UTF-8",
                                                                       'Access-Control-Allow-Origin': '*'
                                                                   }
                                                               })
                                                               .then((res) => {
                                                                   const temp= async ()=>{
                                                                       await setTimeout(() => null, 2000);
                                                                       setEnrolled(true);
                                                                   }
                                                                   console.log(res);
                                                                   setEnrollModal(true);
                                                               })
                                                               .catch((e) => {
                                                                   if (e.response && e.response.data && e.response.data.message) {
                                                                       setErrorMessage(e.response.data.message);
                                                                       console.log(e.response);
                                                                       setModal(true);
                                                                   } else
                                                                       alert(e);
                                                               })
                                                       }
                                                       }
                                        >Enroll NOW!</RegularButton>
                                    </GridItem>
                                </GridContainer>) :

                            <RegularButton color={"success"} component={Link} to={'/login'}>login to
                                enroll</RegularButton>
                        }
                    </GridContainer>
                </Grid>

                <Grid item className={classes.description}>

                </Grid>
            </Grid>
        </Grid>
    );
};


export default WorkshopPage;
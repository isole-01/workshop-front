import React from "react";
import axios from "axios";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";
import {Link as Rlink} from "react-router-dom";
import {Link} from "@material-ui/core";
import {useForm} from "react-hook-form";
import modalStyle from "../../assets/jss/material-kit-react/modalStyle";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/core/SvgIcon/SvgIcon";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const useStylesModal = makeStyles(modalStyle);

const useStyles = makeStyles(styles);
export default function LoginPage(props) {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [modal, setModal] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('Wrong Information');


    const handleEmail = (e) => {
        setEmail(e.target.value)
    };
    const handlePassword = (e) => {
        setPassword(e.target.value)
    };
    // const {register, handleSubmit, watch, errors} = useForm();


    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const modalClasses = useStylesModal();
    const {...rest} = props;
    return (
        <div>
            <Header
                absolute
                color="transparent"
                brand="Workshop Management System"
                rightLinks={<HeaderLinks/>}
                {...rest}
            />
            <div
                className={classes.pageHeader}
                style={{
                    backgroundImage: "url(" + image + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "top center"
                }}
            >
                <div className={classes.container}>
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
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={4}>
                            <Card className={classes[cardAnimaton]}>
                                <form className={classes.form} onSubmit={(e) => {
                                }}>
                                    <CardHeader color="primary" className={classes.cardHeader}>
                                        <h4>Login</h4>
                                        <div className={classes.socialLine}>

                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        {/*<CustomInput*/}
                                        {/*    labelText="First Name..."*/}
                                        {/*    id="first"*/}
                                        {/*    formControlProps={{*/}
                                        {/*      fullWidth: true*/}
                                        {/*    }}*/}
                                        {/*    inputProps={{*/}
                                        {/*      type: "text",*/}
                                        {/*      endAdornment: (*/}
                                        {/*          <InputAdornment position="end">*/}
                                        {/*            <People className={classes.inputIconsColor} />*/}
                                        {/*          </InputAdornment>*/}
                                        {/*      )*/}
                                        {/*    }}*/}
                                        {/*/>*/}
                                        <CustomInput
                                            labelText="Email..."
                                            id="email"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "email",
                                                value: `${email}`,
                                                onChange: (e) => {
                                                    handleEmail(e)
                                                },
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Email className={classes.inputIconsColor}/>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        <CustomInput
                                            labelText="Password"
                                            id="pass"
                                            formControlProps={{
                                                fullWidth: true,

                                            }}
                                            inputProps={{
                                                type: "password",
                                                value: `${password}`,
                                                onChange: (e) => {
                                                    handlePassword(e)
                                                },
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Icon className={classes.inputIconsColor}>
                                                            lock_outline
                                                        </Icon>
                                                    </InputAdornment>
                                                ),
                                                autoComplete: "off"
                                            }}
                                        />
                                    </CardBody>
                                    <CardFooter className={classes.cardFooter}>
                                        <GridContainer direction={"column"}>
                                            <Button simple color="primary" size="lg" onClick={() => {
                                                axios.post("http://localhost:8081/api/v1/users/login",
                                                    {
                                                        email: email,
                                                        "password": `${password}`
                                                    },
                                                    {
                                                        headers: {
                                                            "Content-Type": "application/json; charset=UTF-8",
                                                            'Access-Control-Allow-Origin': '*'
                                                        }
                                                    })
                                                    .then((res) => {
                                                        console.log(res);
                                                        localStorage.setItem("userId", res.data.id);
                                                        window.location.reload();
                                                    })
                                                    .catch((e) => {
                                                        if (e.response.data && e.response.data.message) {
                                                            setErrorMessage(e.response.data.message);
                                                            console.log(e.response);
                                                            setModal(true);

                                                        } else
                                                            setModal(true);

                                                    })
                                            }}>
                                                Login
                                            </Button>
                                            <Rlink to={'/register'}>
                                                <Link fullWidth style={{display: "block"}}>
                                                    Don't have an account? Sign Up
                                                </Link>
                                            </Rlink>
                                        </GridContainer>
                                    </CardFooter>
                                </form>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
                <Footer whiteFont/>
            </div>
        </div>
    );
};
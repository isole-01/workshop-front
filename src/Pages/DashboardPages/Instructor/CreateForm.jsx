import React, {useState} from "react";
import {Container} from "@material-ui/core";
import RegularButton from "../../../components/CustomButtons/Button";
import Button from "@material-ui/core/Button";
import CustomInput from "../../../components/CustomInput/CustomInput";
import Input from "@material-ui/core/Input";
import GridContainer from "../../../components/Grid/GridContainer";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import GridItem from "../../../components/Grid/GridItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import styles from "../../../assets/jss/material-dashboard-pro-react/customSelectStyle";
import makeStyles from "@material-ui/core/styles/makeStyles";
import axios from "axios";
import {useParams} from "react-router-dom"
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/core/SvgIcon/SvgIcon";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import modalStyle from "assets/jss/material-kit-react/modalStyle";
const useStylesModal = makeStyles(modalStyle);


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
const useStyles = makeStyles(styles);

const CreateForm = () => {
    const modalClasses = useStylesModal();
    const [enrollModal, setEnrollModal] = React.useState(false);


    const [name,setName]=React.useState();
    const params=useParams();
    const classes = useStyles();
    const [simpleSelect, setSimpleSelect] = React.useState("");
    const handleSimple = event => {
        setSimpleSelect(event.target.value);
    };
    const handleName = event => {
        setName(event.target.value);
    };


    const [questions, setQuestions] = useState([""]);
    const addQuestion = (e) => {
        setQuestions(questions.concat(""));
    };
    const handleChange = (e) => {
        const index = parseInt(e.target.name);
        let newQuestions = [...questions];
        newQuestions[index] = e.target.value;
        setQuestions(newQuestions);
    };
    const handleDelete = (i) => {
        questions.splice(i, 1);
        let newQuestions = [...questions];
        setQuestions(newQuestions);
    }
    return (
        <Container style={{paddingLeft: "30px"}}>
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
                        <h5>Form Was Created Successfully</h5>
                    </DialogContent>
                    <DialogActions
                        className={modalClasses.modalFooter + " " + modalClasses.modalFooterCenter}
                    >
                        <Button onClick={() => setEnrollModal(false)}>Ok</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <GridContainer direction={"row"} justify={"space-between"}>
                <CustomInput labelText={"Name"} formControlProps={{onChange: handleName}}
                             inputProps={{value:name}}/>
                <GridItem style={{width: "20%"}}>
                    <FormControl fullWidth className={classes.selectFormControl}>
                        <InputLabel
                            htmlFor="simple-select"
                            className={classes.selectLabel}
                        >
                            Type
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
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                }}
                                value="INDIVIDUAL"
                            >
                                INDIVIDUAL
                            </MenuItem>
                            <MenuItem
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                }}
                                value="GROUP"
                            >
                                GROUP
                            </MenuItem>
                        </Select>
                    </FormControl>
                </GridItem>
                <RegularButton
                    style={{justifySelf: "flex-end", alignSelf: "center", height: "60%"}}
                    round color={"info"} onClick={(e) => addQuestion(e)}>+</RegularButton>
            </GridContainer>
            <GridContainer direction={"column"}>
                {
                    questions.map((question, index) =>
                        <GridContainer direction={"row"}>
                            <div style={{paddingLeft: "0px", paddingRight: "30px", flexGrow: "4"}}>
                                <CustomInput

                                    style={{paddingRight: "10px", flexGrow: "4"}}
                                    formControlProps={{onChange: (e) => handleChange(e), fullWidth: true}} key={index}
                                    inputProps={{name: `${index}`, value: `${question}`}}
                                />
                            </div>
                            <RegularButton name={`${index}`} round sm color={"danger"}
                                           style={{justifySelf: "flex-end", alignSelf: "center", height: "60%"}}
                                           onClick={() => handleDelete(index)}
                            >-</RegularButton>
                        </GridContainer>
                    )
                }
                <RegularButton style={{marginLeft: "0px", marginTop: "40px", width: "200px"}}
                               color={"success"}
                               onClick={() => {
                                   const type=simpleSelect;
                                   const sessionId=params.workshopId;
                                   console.log(name);
                                   axios.post(
                                       `http://localhost:8081/api/v1/forms/create/${type}/${sessionId}/${name}`,
                                       [...questions]
                                       ,

                                       {
                                           headers: {
                                               "Content-Type": "application/json; charset=UTF-8",
                                               'Access-Control-Allow-Origin': '*'
                                           }
                                       })
                                       .then((res) => {
                                           console.log(res);
                                           setEnrollModal(true);
                                           // setTimeout(() => null, 3000).then(() => setEnrolled(true))
                                       })
                                       .catch((e) => {
                                           // setErrorMessage(e.response.data.message);
                                           console.log(e.response);
                                           // setModal(true);
                                       })
                               }
                               }
                >submit</RegularButton>
            </GridContainer>
        </Container>
    );
};

export default CreateForm;

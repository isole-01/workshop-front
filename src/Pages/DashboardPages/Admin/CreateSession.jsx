import React, {useEffect} from "react";
import {Container} from "@material-ui/core";
import GridContainer from "../../../components/Grid/GridContainer";
import InputAdornment from "@material-ui/core/InputAdornment";
import Email from "@material-ui/core/SvgIcon/SvgIcon";
import CustomInput from "../../../components/CustomInput/CustomInput";
import Table from "../../../components/Table/Table";

import extendedTablesStyle from "../../../assets/jss/material-dashboard-pro-react/views/extendedTablesStyle";
import Checkbox from "@material-ui/core/Checkbox";
import {Check, Close} from "@material-ui/icons";
import makeStyles from "@material-ui/core/styles/makeStyles";
import RegularButton from "../../../components/CustomButtons/Button";
import GridItem from "../../../components/Grid/GridItem";
import axios from "axios";
import Select from 'react-select';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Datetime from "react-datetime";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import modalStyle from "assets/jss/material-kit-react/modalStyle";
const useStylesModal = makeStyles(modalStyle);


function arrtostring(arr) {
    let res = "";
    console.log("array:", arr);
    arr.forEach((el, i) => {
            if (i === 0)
                res = res.concat(`${el}`);
            else
                res = res.concat(` ${el}`)
        }
    );
    console.log("string:", res);
    return res;
}


const useStyles = makeStyles(extendedTablesStyle);
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
})

const CreateSession = () => {
    const [name, setName] = React.useState("");
    const modalClasses = useStylesModal();
    const [enrollModal, setEnrollModal] = React.useState(false);

    const [dateValid, setDateValid] = React.useState(true);
    // const [newCategory, setNewCategory] = React.useState("");
    //
    // const handleNewCategory = (e) => {
    //     setNewCategory(e.target.value)
    // };
    // const [open, setOpen] = React.useState(false);

    const [startDate, setStartDate] = React.useState(null);
    const handleStartDate = (e) => {
        if (typeof e === "string") {
            setDateValid(false);
        }

        setStartDate(e)
    };

    const [endDate, setEndDate] = React.useState(null);
    const handleEndDate = (e) => {
        setEndDate(e)
    };


    const handleName = (e) => {
        setName(e.target.value)
    };

    const [workshops, setWorkshops] = React.useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8081/api/v1/workshops/all/`)
            .then((res) => {
                console.log(res.data);
                setWorkshops(res.data);
            })
            .catch((e) => console.log(e.response))
    }, []);
    const [users, setUsers] = React.useState([
            {value: 'chocolate', label: 'Chocolate'},
            {value: 'strawberry', label: 'Strawberry'},
            {value: 'vanilla', label: 'Vanilla'},
        ]
    );

    const [user, setUser] = React.useState({value: "", label: "Search User"});


    const handleUser = selectedOption => {
        console.log(selectedOption);
        setUser(selectedOption);
        // if (selectedOption.value === "New") {
        //     setOpen(true);
        // } else
        //     setOpen(false);
    };


    useEffect(() => {
        axios.get(`http://localhost:8081/api/v1/users/all/`)
            .then((res) => {
                console.log(res.data);
                setUsers(res.data.map((cat) => {
                        return ({
                                ...cat,
                                value: cat.email, label: cat.email
                            }
                        )
                    }
                ))
            })
            .catch((e) => console.log(e.response))
    }, []);

    const [cashPrice, setCashPrice] = React.useState();

    const handleCashPrice = (e) => {
        setCashPrice(e.target.value)
    };
    const [installment, setInstallment] = React.useState();

    const handleInstallment = (e) => {
        setInstallment(e.target.value)
    };
    const [installmentNumber, setInstallmentNumber] = React.useState();
    const handleInstallmentNumber = (e) => {
        setInstallmentNumber(e.target.value)
    };

    const [description, setDescription] = React.useState();
    const handleDescription = (e) => {
        setDescription(e.target.value)
    };

    const [capacity, setCapacity] = React.useState();
    const handleCapacity = (e) => {
        setCapacity(e.target.value)
    };

    const [place, setPlace] = React.useState();
    const handlePlace = (e) => {
        setPlace(e.target.value)
    };

    const [paymentDescription, setPaymentDescription] = React.useState();
    const handlePaymentDescription = (e) => {
        setPaymentDescription(e.target.value)
    };

    const [selectedWorkshop, setSelectedWorkshop] = React.useState();
    const isChecked = (value) => {
        if (value === selectedWorkshop)
            return true;
        return false;
    };
    const handleSelectedWorkshop = (value) => {
        console.log(value);
        setSelectedWorkshop(value);
    };


    const [preChecked, setPreChecked] = React.useState([]);
    const handleToggle = value => {
        const currentIndex = preChecked.indexOf(value);
        const newChecked = [...preChecked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setPreChecked(newChecked);
        console.log(newChecked);
    };
    const classes = useStyles();

    return (
        <Container>
            <GridContainer direction={"column"}>
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
                            <h5>Sessiom Was Created Successfully</h5>
                        </DialogContent>
                        <DialogActions
                            className={modalClasses.modalFooter + " " + modalClasses.modalFooterCenter}
                        >
                            <Button onClick={() => setEnrollModal(false)}>Ok</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <GridContainer direction={"row"} jutify={"space-between"} style={{alignContent: "center"}}>
                    <GridItem style={{width: "25%"}}>
                        <CustomInput
                            labelText="Name"
                            id="name"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "text",
                                value: `${name}`,
                                onChange: (e) => {
                                    handleName(e)
                                },
                                // endAdornment: (
                                //     <InputAdornment position="end">
                                //         <Email className={classes.inputIconsColor}/>
                                //     </InputAdornment>
                                // )
                            }}
                        />
                    </GridItem>
                    <GridItem style={{width: "25%"}}>
                        <Select
                            value={user}
                            onChange={handleUser}
                            options={users}
                        />

                    </GridItem>
                    {/*{*/}
                    {/*    open ? <GridItem style={{width: "25%"}}>*/}
                    {/*        <CustomInput*/}
                    {/*            labelText="New Category"*/}
                    {/*            id="newcategory"*/}
                    {/*            formControlProps={{*/}
                    {/*                fullWidth: true*/}
                    {/*            }}*/}
                    {/*            inputProps={{*/}
                    {/*                type: "text",*/}
                    {/*                value: `${newCategory}`,*/}
                    {/*                onChange: (e) => {*/}
                    {/*                    handleNewCategory(e)*/}
                    {/*                },*/}
                    {/*                // endAdornment: (*/}
                    {/*                //     <InputAdornment position="end">*/}
                    {/*                //         <Email className={classes.inputIconsColor}/>*/}
                    {/*                //     </InputAdornment>*/}
                    {/*                // )*/}
                    {/*            }}*/}
                    {/*        />*/}
                    {/*    </GridItem> : null*/}
                    {/*}*/}
                    {/*<RegularButton style={{height: "50px", marginTop: "5px"}}*/}
                    {/*               color={"success"}*/}
                    {/*               onClick={() => {*/}
                    {/*                   const finalCat = newCategory ? newCategory : category.value;*/}

                    {/*                   axios.post(*/}
                    {/*                       `http://localhost:8081/api/v1/workshops/create`,*/}
                    {/*                       [...checked]*/}
                    {/*                       ,*/}

                    {/*                       {*/}
                    {/*                           params: {*/}
                    {/*                               wname: name,*/}
                    {/*                               category: finalCat*/}
                    {/*                           },*/}
                    {/*                           headers: {*/}
                    {/*                               "Content-Type": "application/json; charset=UTF-8",*/}
                    {/*                               'Access-Control-Allow-Origin': '*'*/}
                    {/*                           }*/}
                    {/*                       })*/}
                    {/*                       .then((res) => {*/}
                    {/*                           console.log(res);*/}
                    {/*                           // setEnrollModal(true);*/}
                    {/*                           // setTimeout(() => null, 3000).then(() => setEnrolled(true))*/}
                    {/*                       })*/}
                    {/*                       .catch((e) => {*/}
                    {/*                           // setErrorMessage(e.response.data.message);*/}
                    {/*                           console.log(e.response);*/}
                    {/*                           // setModal(true);*/}
                    {/*                       })*/}
                    {/*               }*/}
                    {/*               }*/}
                    {/*>Create</RegularButton>*/}

                </GridContainer>
                <GridContainer direction={"row"}>
                    <GridItem style={{width: "40%"}}>
                        <div>
                            <InputLabel className={classes.label}>
                                Start Date
                            </InputLabel>
                            <br/>
                            <FormControl fullWidth>
                                <Datetime
                                    onChange={(e) => handleStartDate(e)}
                                    value={startDate}
                                    inputProps={{placeholder: "Start Date Picker Here"}}
                                />
                            </FormControl>
                        </div>
                    </GridItem>
                    <GridItem style={{width: "40%"}}>
                        <div>
                            <InputLabel className={classes.label}>
                                End Date
                            </InputLabel>
                            <br/>
                            <FormControl fullWidth>
                                <Datetime
                                    onChange={handleEndDate}
                                    value={endDate}
                                    inputProps={{placeholder: "End Date Picker Here"}}
                                />
                            </FormControl>
                        </div>
                    </GridItem>
                </GridContainer>
                <GridContainer direction={"row"}>
                    <GridItem style={{width: "30%"}}>
                        <CustomInput
                            labelText="Cash Price"
                            id="cashprice"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "number",
                                value: `${cashPrice}`,
                                onChange: (e) => {
                                    handleCashPrice(e)
                                },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        $
                                    </InputAdornment>
                                )
                            }}
                        />
                    </GridItem>
                    <GridItem style={{width: "30%"}}>
                        <CustomInput
                            labelText="Installment Price"
                            id="installmentprice"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "number",
                                value: `${installment}`,
                                onChange: (e) => {
                                    handleInstallment(e)
                                },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        $
                                    </InputAdornment>
                                )
                            }}
                        />
                    </GridItem>
                    <GridItem style={{width: "15%"}}>
                        <CustomInput
                            labelText="Installment No."
                            id="installmentnumber"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "number",
                                value: `${installmentNumber}`,
                                onChange: (e) => {
                                    handleInstallmentNumber(e)
                                },
                            }}
                        />
                    </GridItem>
                    <GridItem style={{width: "15%"}}>
                        <CustomInput
                            labelText="Capacity"
                            id="installmentnumber"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "number",
                                value: `${capacity}`,
                                onChange: (e) => {
                                    handleCapacity(e)
                                },
                            }}
                        />
                    </GridItem>
                </GridContainer>
                <GridContainer direction={"row"}>
                    <GridItem style={{width: "35%"}}>
                        <TextareaAutosize rowsMin={3}
                                          value={paymentDescription}
                                          onChange={handlePaymentDescription}
                                          aria-label="maximum height"
                                          placeholder="Payment Description"
                        />
                    </GridItem>
                    <GridItem style={{width: "35%"}}>
                        <TextareaAutosize rowsMin={3}
                                          value={place}
                                          onChange={handlePlace}
                                          aria-label="maximum height"
                                          placeholder="Place and Address"/>
                    </GridItem>
                </GridContainer>
                <GridContainer direction={"row"}>
                    <GridItem style={{width: "35%"}}>
                        <TextareaAutosize rowsMin={3}
                                          value={description}
                                          onChange={handleDescription}
                                          aria-label="maximum height"
                                          placeholder="Session Description"/>
                    </GridItem>
                </GridContainer>

                <h3>Choose Prerequisites</h3>
                <Table
                    striped
                    tableHead={["#", "", "", "", "Workshop Name", "", ""]}
                    tableData={
                        workshops.map((workshop, index) => {
                            return [
                                `${index + 1}`,
                                <Checkbox
                                    tabIndex={-1}
                                    onClick={() => handleToggle(index + 1)}
                                    checkedIcon={<Check className={classes.checkedIcon}/>}
                                    icon={<Check className={classes.uncheckedIcon}/>}
                                    classes={{
                                        checked: classes.checked
                                    }}
                                />,
                                "", "", `${workshop.name}`, "", ""
                            ]
                        })

                    }

                    customCellClasses={[
                        classes.center,
                        classes.right,
                        classes.right
                    ]}
                    // 0 is for classes.center, 5 is for classes.right, 6 is for classes.right
                    customClassesForCells={[0, 5, 6]}
                    customHeadCellClasses={[
                        classes.center,
                        classes.right,
                        classes.right
                    ]}
                    // 0 is for classes.center, 5 is for classes.right, 6 is for classes.right
                    customHeadClassesForCells={[0, 5, 6]}
                />

                <h3>Choose Workshop</h3>
                <Table
                    striped
                    tableHead={["#", "", "", "", "Workshop Name", "", ""]}
                    tableData={
                        workshops.map((workshop, index) => {
                            return [
                                `${index + 1}`,
                                <Checkbox
                                    tabIndex={-1}
                                    checked={isChecked(index + 1)}
                                    onClick={() => handleSelectedWorkshop(index + 1)}
                                    checkedIcon={<Check className={classes.checkedIcon}/>}
                                    icon={<Check className={classes.uncheckedIcon}/>}
                                    classes={{
                                        checked: classes.checked
                                    }}
                                />,
                                "", "", `${workshop.name}`, "", ""
                            ]
                        })
                    }

                    customCellClasses={[
                        classes.center,
                        classes.right,
                        classes.right
                    ]}
                    // 0 is for classes.center, 5 is for classes.right, 6 is for classes.right
                    customClassesForCells={[0, 5, 6]}
                    customHeadCellClasses={[
                        classes.center,
                        classes.right,
                        classes.right
                    ]}
                    // 0 is for classes.center, 5 is for classes.right, 6 is for classes.right
                    customHeadClassesForCells={[0, 5, 6]}
                />
                <RegularButton style={{height: "50px", marginTop: "5px"}}
                               color={"success"}
                               onClick={() => {
                                   const wkid = selectedWorkshop;
                                   const swkids = arrtostring(preChecked);
                                   console.log(swkids);

                                   axios.post(
                                       `http://localhost:8081/api/v1/sessions/create/${wkid}/${user.id}`,
                                       {

                                               name,
                                               cachePrice: cashPrice,
                                               installmentPrice: installment,
                                               numberOfInstallments: installmentNumber,
                                               description,
                                               paymentDescription,
                                               startDate: startDate.format(),
                                               endDate: endDate.format(),
                                               place,
                                               studentStatus: "NEED",
                                               graderStatus: "NEED",

                                       }
                                       ,

                                       {
                                           params: {
                                               swkids,
                                           },
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
                >Create</RegularButton>

            </GridContainer>
        </Container>
    )
};
export default CreateSession;


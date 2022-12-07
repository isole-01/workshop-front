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
import modalStyle from "assets/jss/material-kit-react/modalStyle";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
const useStylesModal = makeStyles(modalStyle);

const useStyles = makeStyles(extendedTablesStyle);
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
})

const CreateWorkshop = () => {
    const [name, setName] = React.useState("");
    const [newCategory, setNewCategory] = React.useState("");

    const modalClasses = useStylesModal();
    const [enrollModal, setEnrollModal] = React.useState(false);

    const handleNewCategory = (e) => {
        setNewCategory(e.target.value)
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
    const [categories, setCategories] = React.useState([
            {value: 'chocolate', label: 'Chocolate'},
            {value: 'strawberry', label: 'Strawberry'},
            {value: 'vanilla', label: 'Vanilla'},
        ]
    );

    const [category, setCategory] = React.useState({value: "New", label: "New"});
    const [open, setOpen] = React.useState(true);


    const handleCategory = selectedOption => {
        console.log(selectedOption);
        setCategory(selectedOption);
        if (selectedOption.value === "New") {
            setOpen(true);
        } else
            setOpen(false);
    };


    useEffect(() => {
        axios.get(`http://localhost:8081/api/v1/categories/all/`)
            .then((res) => {
                console.log(res.data.push({name: "New", label: "New"}));
                setCategories(res.data.map((cat) => {
                        return ({
                                value: cat.name, label: cat.name
                            }
                        )
                    }
                ))
            })
            .catch((e) => console.log(e.response))
    }, []);


    const [checked, setChecked] = React.useState([]);
    const handleToggle = value => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
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
                            <h5>Workshop Was Created Successfully</h5>
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
                            value={category}
                            onChange={handleCategory}
                            options={categories}
                        />

                    </GridItem>
                    {
                        open ? <GridItem style={{width: "25%"}}>
                            <CustomInput
                                labelText="New Category"
                                id="newcategory"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: "text",
                                    value: `${newCategory}`,
                                    onChange: (e) => {
                                        handleNewCategory(e)
                                    },
                                    // endAdornment: (
                                    //     <InputAdornment position="end">
                                    //         <Email className={classes.inputIconsColor}/>
                                    //     </InputAdornment>
                                    // )
                                }}
                            />
                        </GridItem> : null
                    }
                    <RegularButton style={{height: "50px", marginTop: "5px"}}
                                   color={"success"}
                                   onClick={() => {
                                       const finalCat = newCategory ? newCategory : category.value;

                                       axios.post(
                                           `http://localhost:8081/api/v1/workshops/create`,
                                           [...checked]
                                           ,

                                           {
                                               params: {
                                                   wname: name,
                                                   category: finalCat
                                               },
                                               headers: {
                                                   "Content-Type": "application/json; charset=UTF-8",
                                                   'Access-Control-Allow-Origin': '*'
                                               }
                                           })
                                           .then((res) => {
                                               console.log(res);
                                               // alert("Workshop Created successfully");
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
            </GridContainer>
        </Container>
    )
};
export default CreateWorkshop;

//
// [
//     "1",
//     <Checkbox
//         tabIndex={-1}
//         onClick={() => handleToggle(1)}
//         checkedIcon={<Check className={classes.checkedIcon}/>}
//         icon={<Check className={classes.uncheckedIcon}/>}
//         classes={{
//             checked: classes.checked
//         }}
//     />,
//     "Moleskine Agenda", "Office", "25", "€ 49", "€ 1,225"
// ],
//     [
//         "2",
//         <Checkbox
//             tabIndex={-1}
//             onClick={() => handleToggle(2)}
//             checkedIcon={<Check className={classes.checkedIcon}/>}
//             icon={<Check className={classes.uncheckedIcon}/>}
//             classes={{
//                 checked: classes.checked
//             }}
//         />,
//         "Stabilo Pen", "Office", "30", "€ 10", "€ 300"
//
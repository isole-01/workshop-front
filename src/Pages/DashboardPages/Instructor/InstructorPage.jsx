import React, {useEffect, useState} from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import RegularButton from "../../../components/CustomButtons/Button";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Link} from "react-router-dom";
import moment from "moment";

const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1"
        }
    }
};

const useStyles = makeStyles(styles);

export default function TableList() {
    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useState(false);
    const [instructors, setInstructors] = useState([]);
    const [students, setStudents] = useState([]);
    const [graders, setGraders] = useState([]);


    useEffect(() => {
        async function getStuff() {
            try {
                let response = await axios.get(`http://localhost:8081/api/v1/users/${localStorage.getItem("userId")}`, {})
                setUser(response.data);
                response = await axios.get(`http://localhost:8081/api/v1/users/${localStorage.getItem("userId")}/instructors`);
                console.log(response.data);
                setInstructors(response.data);
                setLoaded(true);
            } catch (e) {
                console.log(e);
                if (e.response.data.message !== undefined) {
                    console.log(e);
                    alert(e.response.data.message);
                }
                alert(e);
            }
        }

        getStuff();
    }, []);
    const classes = useStyles();
    if (!loaded)
        return (
            <GridContainer justify={"center"} style={{height: "60vh", alignContent: "center"}}><CircularProgress/>
            </GridContainer>
        );
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Current Workshops</h4>
                        {/*<p className={classes.cardCategoryWhite}>*/}
                        {/*    Here is a subtitle for this table*/}
                        {/*</p>*/}
                    </CardHeader>
                    <CardBody>
                        <Table
                            hover
                            tableHeaderColor="primary"
                            tableHead={["Name", "Start Date", "End Date", ""]}
                            tableData={
                                instructors.map((el)=>([el.session.name,moment(el.session.startDate).format("MM Do YYYY"),moment(el.session.endDate).format("MM Do YYYY"),
                                    <RegularButton component={Link} to={`/dashboard/instructor/${el.session.id}`} color={"info"}>Show</RegularButton>]))
                            }
                        />
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Past Workshops</h4>
                        {/*<p className={classes.cardCategoryWhite}>*/}
                        {/*    Here is a subtitle for this table*/}
                        {/*</p>*/}
                    </CardHeader>
                    <CardBody>
                        <Table
                            hover
                            tableHeaderColor="primary"
                            tableHead={["Name", "Start Date", "End Date", ""]}
                            tableData={[]}
                            // tableData={[
                            //     ["Dakota Rice", "Niger", "Oud-Turnhout",
                            //         <RegularButton color={"info"}>Show</RegularButton>],
                            //     ["Minerva Hooper", "Curaçao", "Sinaai-Waas",
                            //         <RegularButton color={"info"}>Show</RegularButton>],
                            //     ["Sage Rodriguez", "Netherlands", "Baileux",
                            //         <RegularButton color={"info"}>Show</RegularButton>],
                            //     ["Philip Chaney", "Korea, South", "Overland Park",
                            //         <RegularButton color={"info"}>Show</RegularButton>],
                            //     ["Doris Greene", "Malawi", "Feldkirchen in Kärnten",
                            //         <RegularButton color={"info"}>Show</RegularButton>],
                            //     ["Mason Porter", "Chile", "Gloucester",
                            //         <RegularButton color={"info"}>Show</RegularButton>]
                            // ]}
                        />
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}

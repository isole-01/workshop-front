import React, {useEffect, useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import RegularButton from "../../../components/CustomButtons/Button";
import {Link} from "react-router-dom";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
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
    const [sessions,setSessions]=useState([]);
    const [workshops,setWorkshops]=useState([]);

    useEffect(() => {
        async function getStuff(){
            try {

                let response=await axios.get(`http://localhost:8081/api/v1/sessions/all`);
                setSessions(response.data);
                response=await axios.get(`http://localhost:8081/api/v1/workshops/all`);
                setWorkshops(response.data);
                setLoaded(true);
            }
            catch (e) {
                console.log(e);
                if (e.response.data.message !== undefined)
                    alert(e.response.data.message);
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
                        <h4 className={classes.cardTitleWhite}>Workshop Sessions</h4>
                        {/*<p className={classes.cardCategoryWhite}>*/}
                        {/*    Here is a subtitle for this table*/}
                        {/*</p>*/}
                    </CardHeader>
                    <CardBody>
                        <Table
                            hover
                            tableHeaderColor="primary"
                            tableHead={["Name", "Start Date", "End Date", <RegularButton component={Link} to={'/dashboard/admin/createsession'}           target="_blank"
                                                                                         color={"success"}>Add new</RegularButton>]}
                            tableData={
                                sessions.map((el)=>([el.name,moment(el.startDate).format("MM Do YYYY"),moment(el.endDate).format("MM Do YYYY"),
                                    <RegularButton target="_blank" component={Link} to={`/pages/workshop/${el.id}`} color={"info"}>Show</RegularButton>]))
                            }
                        />
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Workshops</h4>
                        {/*<p className={classes.cardCategoryWhite}>*/}
                        {/*    Here is a subtitle for this table*/}
                        {/*</p>*/}
                    </CardHeader>
                    <CardBody>
                        <Table
                            hover
                            tableHeaderColor="primary"
                            tableHead={["Name", "", "", <RegularButton component={Link} to={`/dashboard/admin/create`} color={"info"}>Add Workshop</RegularButton>]}
                            tableData={
                                workshops.map((el)=>{
                                    return [el.name,"","",""]
                                })
                            }
                        />
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}

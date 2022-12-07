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
import {Link,useParams} from "react-router-dom";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

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

    const [workshop,setWorkshop]=React.useState({id:"2"});
    const [loaded, setLoaded] = useState(false);

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
                    if (e.response&& e.response.data && e.response.data.message)
                        alert(e.response.data.message);
                    console.log(e.response)
                }
            )
    }, []);
    const classes = useStyles();
    if (!loaded)
        return <GridContainer justify={"center"} style={{height: "60vh", alignContent: "center"}}><CircularProgress/>
        </GridContainer>;
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Current Groups</h4>
                        {/*<p className={classes.cardCategoryWhite}>*/}
                        {/*    Here is a subtitle for this table*/}
                        {/*</p>*/}
                    </CardHeader>
                    <CardBody>
                        <Table
                            hover
                            tableHeaderColor="primary"
                            tableHead={["No.", "No. of Students", "No. of Graders", ""]}
                            tableData={[
                                ["1", "20", "3", ""],
                                ["2", "30", "3", ""],
                                ["3", "10", "1", ""],
                            ]}
                        />
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="danger">
                        <GridContainer direction={"row"}>
                            <h4 style={{marginLeft:"15px"}} className={classes.cardTitleWhite}>Forms</h4>
                            {/*<RegularButton component={Link} color={"rose"}>Add Form</RegularButton>*/}
                            {/*<p className={classes.cardCategoryWhite}>*/}
                            {/*    Here is a subtitle for this table*/}
                            {/*</p>*/}
                        </GridContainer>
                    </CardHeader>
                    <CardBody>
                        <Table
                            hover
                            tableHeaderColor="warning"
                            tableHead={["No.", "Name", "Type",<RegularButton component={Link} to={`/dashboard/instructor/${workshop.id}/formdesign`} color={"rose"}>Add Form</RegularButton> ]}
                            tableData={workshop.forms.map((form,i)=>[form.id,form.name,form.formType,<RegularButton component={Link} to={`/dashboard/instructor/${workshop.id}/formdesign`} color={"info"}>Show Form</RegularButton>])}
                        />
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>

            </GridItem>

        </GridContainer>
    );
}

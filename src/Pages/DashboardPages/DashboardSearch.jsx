import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import CustomInput from "components/CustomInput/CustomInput";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import {makeStyles, Toolbar} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import Button from 'components/CustomButtons/Button.js';
import {Link, useParams, useLocation} from "react-router-dom"
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";

import {cardTitle} from "assets/jss/material-kit-react.js";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "assets/jss/material-dashboard-pro-react/customSelectStyle";

const useStylesSelect = makeStyles(styles);

const useStyles = makeStyles(
    {
        root: {
            width: "95vw"
        },
        searchbar: {}
    }
);
const SearchBar = (probs) => {
    const classes = useStylesSelect();
    const type = useParams().type;
    const [simpleSelect, setSimpleSelect] = React.useState(type);
    const handleSimple = event => {
        setSimpleSelect(event.target.value);
    };
    const location = useLocation();
    return (
        <Toolbar style={{display: "flex", width: "95%", justifyContent: "space-between", flexWrap: "wrap"}}>
            <GridItem style={{width: "30%"}}>
                <CustomInput
                    style={{display: "inline", backgroundColor: "red", paddingRight: "10px"}}
                    labelText="Search"
                    // id="float"
                    formControlProps={{
                        fullWidth: true, onChange: (e) => {
                            probs.handleQuery(e)
                        }
                    }}
                    inputProps={{value: `${probs.query}`}}
                    fullWidth={true}
                    size={"large"}
                />
            </GridItem>
            <GridItem style={{width: "22%"}}>
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
                            value="0"
                        >
                            All
                        </MenuItem>
                        <MenuItem
                            classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                            }}
                            value="1"
                        >
                            Current Workshops
                        </MenuItem>
                        <MenuItem
                            classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                            }}
                            value="2"
                        >
                            Past Workshops
                        </MenuItem>
                        <MenuItem
                            classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                            }}
                            value="3"
                        >
                            Grader Open Workshops
                        </MenuItem>

                    </Select>
                </FormControl>
            </GridItem>
            <Button component={Link} to={`dashboard/search/${simpleSelect}/${probs.query}`} round>
                <SearchIcon style={{display: "inline", alignSelf: "center",}} fontSize={"large"}/>
            </Button>

        </Toolbar>

    );

};
// material-ui components
// core components


const cardStyles = {
    ...imagesStyles,
    cardTitle,
};

const useStylesCard = makeStyles(cardStyles);

function Cards(probs) {
    const classes = useStylesCard();
    return (
        <React.Fragment>
            <Card style={{width: "18rem",marginRight:"17px",marginLeft:"17px"}}>
                <img
                    style={{height: "180px", width: "100%", display: "block"}}
                    className={classes.imgCardTop}
                    src="..."
                    alt="Card-img-cap"
                />
                <CardBody>
                    <h4 className={classes.cardTitle}>Card title</h4>
                    <p>Some quick example text to build on the card title and make up the bulk of the card's
                        content.</p>
                    <Button color="primary">Do something</Button>
                </CardBody>
            </Card>
            <Card style={{width: "18rem",marginRight:"17px",marginLeft:"17px"}}>
                <img
                    style={{height: "180px", width: "100%", display: "block"}}
                    className={classes.imgCardTop}
                    src="..."
                    alt="Card-img-cap"
                />
                <CardBody>
                    <h4 className={classes.cardTitle}>Card title</h4>
                    <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <Button color="primary">Do something</Button>
                </CardBody>
            </Card>
            <Card style={{width: "18rem",marginRight:"17px",marginLeft:"17px"}}>
                <img
                    style={{height: "180px", width: "100%", display: "block"}}
                    className={classes.imgCardTop}
                    src="..."
                    alt="Card-img-cap"
                />
                <CardBody>
                    <h4 className={classes.cardTitle}>Card title</h4>
                    <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <Button color="primary">Do something</Button>
                </CardBody>
            </Card>
            <Card style={{width: "18rem",marginRight:"17px",marginLeft:"17px"}}>
                <img
                    style={{height: "180px", width: "100%", display: "block"}}
                    className={classes.imgCardTop}
                    src="..."
                    alt="Card-img-cap"
                />
                <CardBody>
                    <h4 className={classes.cardTitle}>Card title</h4>
                    <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <Button color="primary">Do something</Button>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}


const DashboardSearch = () => {
    const params = useParams();
    const [query, setQuery] = useState(params.query);
    const classes = useStyles();
    const handleQuery = (e) => {
        setQuery(e.target.value)
    };
    return (
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth={"xl"}>
                <GridContainer item direction={"column"} justify={"space-around"}>
                    <SearchBar query={query} handleQuery={handleQuery}/>
                </GridContainer>
                <GridContainer direction={"row"} justify={"center"} wrap={true}>
                    <Cards/>
                </GridContainer>
            </Container>
        </React.Fragment>

    );
};
export default DashboardSearch;
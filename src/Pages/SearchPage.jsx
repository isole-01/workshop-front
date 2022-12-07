import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import CustomInput from "../components/CustomInput/CustomInput";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import {makeStyles, Toolbar} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import Button from '../components/CustomButtons/Button.js';
import {Link, useParams, useLocation} from "react-router-dom"
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";

import imagesStyles from "../assets/jss/material-kit-react/imagesStyles.js";

import {cardTitle} from "../assets/jss/material-kit-react.js";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "../assets/jss/material-dashboard-pro-react/customSelectStyle";
import axios from "axios";

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
    let categories;
    const params = useParams();
    const [query, setQuery] = useState(params.query);
    const handleQuery = (e) => {
        setQuery(e.target.value)
    };

    const classes = useStylesSelect();
    const type = useParams().type;
    const [simpleSelect, setSimpleSelect] = React.useState(type);
    const handleSimple = event => {
        setSimpleSelect(event.target.value);
    };
    const location = useLocation();
    useEffect(() => {
        console.log(simpleSelect);
        axios.get(`http://localhost:8081/api/v1/sessions/search/${simpleSelect}/${query}`,
            {
                params: {category: null}
            })
            .then((res) => {
                console.log(res.data);
                probs.setWorkshops(res.data);
            })
            .catch((e) => console.log(e.response))
    }, [simpleSelect, query]);
    return (
        <Toolbar style={{display: "flex", width: "95%", justifyContent: "space-between", flexWrap: "wrap"}}>
            <GridItem style={{width: "30%"}}>
                <CustomInput
                    style={{display: "inline", backgroundColor: "red", paddingRight: "10px"}}
                    labelText="Search"
                    // id="float"
                    formControlProps={{
                        fullWidth: true, onChange: (e) => {
                            handleQuery(e)
                        }
                    }}
                    inputProps={{value: `${query}`}}
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
                            value="ALL"
                        >
                            All
                        </MenuItem>
                        <MenuItem
                            classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                            }}
                            value="STUDENT"
                        >
                            Current Workshops
                        </MenuItem>
                        {/*<MenuItem*/}
                        {/*    classes={{*/}
                        {/*        root: classes.selectMenuItem,*/}
                        {/*        selected: classes.selectMenuItemSelected*/}
                        {/*    }}*/}
                        {/*    value="PAST"*/}
                        {/*>*/}
                        {/*    Past Workshops*/}
                        {/*</MenuItem>*/}
                        <MenuItem
                            classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                            }}
                            value="GRADER"
                        >
                            Grader Open Workshops
                        </MenuItem>

                    </Select>
                </FormControl>
            </GridItem>
            {/*<Button component={Link} to={`/pages/search/${simpleSelect}/${query}`} round onClick={() => {*/}
            {/*    axios.get(`http://localhost:8081/api/v1/sessions/search/${simpleSelect}/${query}`,*/}
            {/*        {*/}
            {/*            params: {category: null}*/}
            {/*        })*/}
            {/*        .then((res) => {*/}
            {/*            console.log(res);*/}
            {/*            probs.setWorkshops(res.data);*/}
            {/*        })*/}
            {/*        .catch((e) => console.log(e.response))*/}
            {/*}}>*/}
            {/*    <SearchIcon style={{display: "inline", alignSelf: "center",}} fontSize={"large"}/>*/}
            {/*</Button>*/}

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

function Cards({workshops}) {
    const classes = useStylesCard();
    return (
        <React.Fragment>
            {
                workshops.map((workshop) => (
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
                            <h4 className={classes.cardTitle}>{workshop.name}</h4>
                            <p>by {workshop.instructorName}</p>
                            {workshop.cachePrice ? <p>price {workshop.cachePrice}$</p> : <p>Free</p>}
                            <Button component={Link} to={`/pages/workshop/${workshop.id}`} color="primary">Show</Button>
                        </CardBody>
                    </Card>
                ))
            }



        </React.Fragment>
    );
}


const SearchPage = () => {
    const [workshops, setWorkshops] = useState([]);

    return (
        <div style={{overflowY: "visible"}}>
            <CssBaseline/>
            <Container maxWidth={"xl"}>
                <GridContainer item direction={"column"} justify={"space-around"}>
                    <SearchBar setWorkshops={setWorkshops}/>
                </GridContainer>
                <GridContainer direction={"row"} justify={"center"} wrap={true}>
                    <Cards workshops={workshops}/>
                </GridContainer>
            </Container>
        </div>

    );
};

export default SearchPage;
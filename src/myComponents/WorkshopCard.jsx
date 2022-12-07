import React from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";

import { cardTitle } from "assets/jss/material-kit-react.js";

const styles = {
    ...imagesStyles,
    cardTitle,
};

const useStyles = makeStyles(styles);

export default function WorkshopCard() {
    const classes = useStyles();
    return (
        <Card style={{width: "20rem"}}>
            <div
                style={{height: "180px", width: "100%", display: "block"}}
                className={classes.imgCardTop}
                src='../assets/img/bg3.jpg'
                alt="Card-img-cap"
            />
            <CardBody>
                <h4 className={classes.cardTitle}>Card title</h4>
                <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <Button color="primary">Do something</Button>
            </CardBody>
        </Card>
    );
}
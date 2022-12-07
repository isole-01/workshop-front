import React from "react";
import TextField1 from "../components/FormField_1";
import {Button, FormControlLabel, makeStyles} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import MaterialUIPickers from "../components/DatePicker";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        dsaf: "adsof",
        height: '100vh'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignUpPage = () => {
    const classes = useStyles();

    return (
        <Grid className={classes.root} component="main" container>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <TextField1
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="first-name"
                        label="First Name"
                        name="first-name"
                        autoFocus
                    />
                    <TextField1
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="last-name"
                        label="Last Name"
                        name="last-name"
                        autoFocus
                    />
                    <TextField1
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField1
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        autoFocus
                    />
                    <MaterialUIPickers/>
                    <FormControlLabel control={
                        <Checkbox value="checkedA"/>
                    } label='I Agree Terms And Conditions'/>
                    <Button
                        style={{marginTop: '13px'}}
                        color="primary"
                        type="submit"
                        variant="contained"
                        fullWidth
                    >
                        Sign Up
                    </Button>

                </div>
            </Grid>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
        </Grid>
    );

}

export default SignUpPage;
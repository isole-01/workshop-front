import React,{useState} from "react";

import {Route, Switch, Redirect, Link} from "react-router-dom";
import Pages from "./Pages";
import Dashboard from "./Dashboard";
import LoginPage from "./views/LoginPage/LoginPage";
import ProfilePage from "./views/ProfilePage/ProfilePage";
import RegisterPage from "./Pages/ResgisterPage";
import axios from "axios";
import SearchIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Button from "./components/CustomButtons/Button";

localStorage.setItem('userId',1);
const App = (props) => {
    const [userId, setUserId] = useState(0);

    return (
        <Switch>
            <Route path='/pages' component={Pages}/>
            <Route path='/dashboard' render={(props)=>(!localStorage.getItem("userId")) ? (<Redirect to={"/login"}/>) : <Dashboard {...props}/>}/>
            <Route path={'/login'}  render={(props)=>(localStorage.getItem("userId")) ? (<Redirect to={"/dashboard/admin"}/>) : <LoginPage {...props}/>}/>
            <Route path={'/register'} component={RegisterPage}/>
            <Route path={'/profile/:userId'} component={ProfilePage}/>
            <Route path={'/test'} render={()=><Button round onClick={() => {
                axios.post(`http://localhost:8081/api/v1/fake2`,
                    {},{
                    params:{
                        headers: {
                            "Content-Type": "application/json; charset=UTF-8",
                            'Access-Control-Allow-Origin': '*'
                        },
                        params:["yek","do"]
                    }
                })
                    .then((res) => {
                        console.log(res);
                        localStorage.setItem("userId",res.data.id)
                    })
                    .catch((e) => console.log(e.response))
            }}>
                <SearchIcon style={{display: "inline", alignSelf: "center",}} fontSize={"large"}/>
            </Button>}/>

        </Switch>
    )
};

export default App;

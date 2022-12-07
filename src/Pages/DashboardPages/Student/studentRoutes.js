import React from "react";
import {Switch,Route} from "react-router-dom"
import StudentPage from "./StudentPage";
import StudentWorkshop from "./StudentWorkshop";

export default function studentRoutes(probs) {
    return(
        <Switch>
            <Route exact path={'/dashboard/student'} component={StudentPage}/>
            <Route path={'/dashboard/student/:workshopId'} component={StudentWorkshop}/>
        </Switch>
    )

}
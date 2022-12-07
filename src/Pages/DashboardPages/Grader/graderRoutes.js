import React from "react";
import {Switch,Route} from "react-router-dom"


export default function studentRoutes(probs) {
    return(
        <Switch>
            <Route exact path={'/dashboard/grader'} component={}/>
            <Route path={'/dashboard/grader/:workshopId'} component={}/>
        </Switch>
    )

}
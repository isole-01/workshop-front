import React from "react";
import {Switch,Route} from "react-router-dom";
import InstructorPage from "./InstructorPage";
import Workshop from "./WorkshopForms";
import CreateForm from "./CreateForm";


const InstructorRoutes=()=>{
    return(
        <Switch>
            <Route exact path={'/dashboard/instructor'}  component={InstructorPage}/>
            <Route exact path={'/dashboard/instructor/:workshopId'} component={Workshop}/>
            <Route exact path={'/dashboard/instructor/:workshopId/formdesign'} component={CreateForm}/>
        </Switch>

    );
};

export default InstructorRoutes;

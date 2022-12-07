import React, {useEffect} from "react";
import {Switch, Route} from "react-router-dom";
import AdminHome from "./AdminHome";
import CreateWorkshop from "./CreateWorkshop";
import axios from "axios";
import CreateSession from "./CreateSession";

const AdminPage = () => {
    const [workshops, setWorkshops] = React.useState([]);
    useEffect(()=>{
        axios.get(`http://localhost:8081/api/v1/workshops/all/`)
            .then((res) => {
                console.log(res.data);
                setWorkshops(res.data);
            })
            .catch((e) => console.log(e.response))
    },[]);
    if (localStorage.getItem("userId")!=="1")
        return (
            <p>You Are Not Admin</p>
        );
    return (
        <Switch>
            <Route path={'/dashboard/admin'} component={AdminHome} exact/>
            <Route path={'/dashboard/admin/create'} component={CreateWorkshop}/>
            <Route path={'/dashboard/admin/createsession'} component={CreateSession}/>
        </Switch>
    );
};

export default AdminPage;
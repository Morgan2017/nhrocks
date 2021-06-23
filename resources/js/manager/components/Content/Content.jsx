import React from "react";

import { Route, Switch, Redirect } from 'react-router-dom';

import Home from "../../pages/home";
import UserPage from "../../pages/users";
import NoMatch from "../../pages/errors/404";

class Content extends React.Component
{
    render() {
        return (
            <div className="content-wrapper">
                <Switch>
                    <Route path="/manager/users">
                        <UserPage />
                    </Route>
                    {/* <Route path="/manager/policies">
                        <PolicyPage />
                    </Route> */}
                    <Route exact path="/manager/dashboard">
                        <Home />
                    </Route>
                    <Route path="*">
                        <NoMatch />
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default Content;
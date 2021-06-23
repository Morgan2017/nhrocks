import React from "react";
import { Link, Route, Switch } from "react-router-dom";

import Form from "../../components/Form";
import Table from "../../components/Table";
import NoMatch from "../errors/404";

class Users extends React.Component
{
    getColumnNames()
    {
        return [ "id", "name", "email", "status", "password" ];
    }

    getFormFields()
    {
        return [ 
            {
                name: "id", 
                type: "hidden", 
                value: "", 
                placeholder: "", 
                label: "ID"
            }, {
                name: "name", 
                type: "text", 
                value: "", 
                placeholder: "Type a name...", 
                label: "Name"
            }, {
                name: "email", 
                type: "email", 
                value: "", 
                placeholder: "Type an email...", 
                label: "Email"
            }, {
                name: "password", 
                type: "password", 
                value: "", 
                placeholder: "Type a password...", 
                label: "Password"
            }, {
                name: "status",
                type: "switch",
                value: "",
                placeholder: "",
                label: "Is the user a resident?",
            },
        ];
    }

    /*
     * The main method of the object
    */
    render()
    {
        return (
            <>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Users</h1>
                        </div>
                        <div className="col-sm-6">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb float-md-end">
                                    <li className="breadcrumb-item">
                                        <Link to="/manager/dashboard">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">Users</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <Switch>
                        <Route exact path="/manager/users/create">
                            <Form 
                                fields={ this.getFormFields() }
                                currentText="Create an user"
                                indexLink="/manager/users" />
                        </Route>
                        <Route exact path="/manager/users/edit/:id">
                            <Form 
                                fields={ this.getFormFields() }
                                currentText="Edit the user"
                                indexLink="/manager/users" />
                        </Route>
                        <Route exact path="/manager/users">
                            <Table 
                                columnNames={ this.getColumnNames() } 
                                indexLink="/manager/users" />
                        </Route>
                        <Route path="*">
                            <NoMatch />
                        </Route>
                    </Switch>
                </div>
            </section>
            </>
        );
    }
}

export default Users;
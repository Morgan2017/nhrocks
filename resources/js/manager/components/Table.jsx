import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Spinner from "./Spinner";

class Table extends React.Component
{
    constructor(props) 
    {
        super(props);
        this.state = {
            items: [],
            isRendered: false,
        };

        this.handleLoad = this.handleLoad.bind(this);
        this.renderTableHeader = this.renderTableHeader.bind(this);
        this.renderTableBody = this.renderTableBody.bind(this);
    }

    componentDidMount()
    {
        this.handleLoad();
    }

    handleLoad()
    {
        fetch("/manager/get-users")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    items: this.prepareData(data),
                    isRendered: true
                });
            })
            .catch(error => console.error("We've got an error!", error));
    }

    prepareData( $data )
    {
        let $bulkData = [];

        if ( Array.isArray( $data ) ) {
            $bulkData = $data.map(element => {
                delete element.created_at;
                delete element.updated_at;
                delete element.email_verified_at;
                element.password = "••••••••";
                return element;
            });
        }

        return $bulkData;
    }

    renderTable()
    {
        return (
            <div className="table-responsive">
                <table className="table table-hover text-nowrap mb-5">
                    <thead>
                        { this.renderTableHeader() }
                    </thead>
                    <tbody>
                        { this.renderTableBody() }
                    </tbody>
                </table>
            </div>
        );
    }

    renderTableHeader()
    {
        let output = [];

        if ( this.props.columnNames ) {
            
            let i, item = null;

            this.props.columnNames.map((value, index) => {
                item = (
                    <th key={ index }>
                        { value }
                    </th>
                );
                output.push(item);
                i++;
            });

            output.push(<th key={ i } width="20px"></th>);
        }

        return ( <tr>{ output }</tr> );
    }

    renderTableBody()
    {
        if (this.state.items) {
            return this.state.items.map((value, index) => {
                return (
                    <tr key={ index }>
                        { this.renderTableBodyRow(value) }
                    </tr>
                );
            });
        }

        return;
    }

    renderTableBodyRow( item ) 
    {
        let i = 0;
        let output = [];
        for (let prop in item) {
            if ( item.hasOwnProperty( prop ) ) {
                output.push(
                    <th key={ i++ }>
                        { item[prop] }
                    </th>
                );
            }
        }
        output.push(
            <th key={ i++ }>
                <div className="btn-group">
                    <span
                        className="btn btn-light btn-sm dropdown-toggle"
                        data-bs-toggle="dropdown"
                        data-bs-display="static"
                        aria-expanded="false">

                        <FontAwesomeIcon 
                            icon={ ["fas", "ellipsis-h"] } 
                            size="1x" />
                        
                    </span>
                    <ul className="dropdown-menu dropdown-menu-lg-end">
                        <li>
                            <Link 
                                to={ this.props.indexLink + "/edit/" + item.id }
                                className="dropdown-item"
                            >
                                Edit
                            </Link>
                        </li>
                    </ul>
                </div>
            </th>
        );
        return output;
    }

    /*
     * The main method of the object
    */
    render() 
    {
        const { isRendered } = this.state;

        return (
            <div className="card">
                <div className="card-body">
                    <Link 
                        to="/manager/users/create" 
                        className="btn btn-sm btn-primary mb-2" 
                        title="Add an user"
                    >
                        Create
                    </Link>

                    { isRendered ? this.renderTable() : <Spinner /> }

                </div>
            </div>
        );
    }
}

export default Table;
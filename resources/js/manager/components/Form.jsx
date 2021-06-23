import React from "react";
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from "prop-types";

import Spinner from "./Spinner";

class Form extends React.Component
{
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            item: {},
            isRendered: false,
            isSubmitted: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillUnmount()
    {
        this.setState({
            item: {},
        });
    }

    componentDidMount()
    {
        if ( this.props.match.params.id ) {
            let fetchParams = {
                method: "POST",
                headers: {
                    "X-CSRF-Token": document.querySelector("meta[name=csrf-token]").content,
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({
                    "user-id": this.props.match.params.id
                }),
            };
    
            fetch("/manager/get-user", fetchParams)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        item: this.prepareData(data),
                        isRendered: true
                    });
                })
                .catch(error => console.error("We've got an error!", error));
        } else if ( this.props.match.url ) {
            let match = this.props.match.url.match( new RegExp("\/create$", "i") ) || [];
            if ( match.length > 0 ) {
                this.setState({
                    isRendered: true,
                });
            }
        } else {
            throw new Error("Something went wrong related to the URL!");
        }
    }

    handleSubmit( e )
    {
        e.preventDefault();

        console.dir(this.state.item);

        let fetchParams = {
            method: "POST",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-Token": document.querySelector("meta[name=csrf-token]").content,
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(this.state.item),
        };

        fetch("/manager/edit-user", fetchParams)
            // .then(response => response.json())
            .then(data => {
                console.dir(data);
                // this.setState({
                //     attributes: this.getAttributes(),
                //     item: this.prepareData(data),
                //     isRendered: true
                // });
            })
            .catch(error => console.error("We've got an error!", error));
    }

    handleChange( e )
    {
        const target = e.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState((prevState) => {
            let prevItem = prevState.item;
            prevItem[ name ] = value;
            return {
                item: prevItem,
            };
        });
    }

    prepareData( $data )
    {
        let output = {};

        if (
            Object.prototype.toString.call( $data ) === "[object Object]" &&
            !Array.isArray( $data )
        ) {
            delete $data.created_at;
            delete $data.updated_at;
            delete $data.email_verified_at;
            $data.password = "";
            output = $data;
        }

        return output;
    }

    getLabel( valueObject, index )
    {
        let $label = false;

        if (
            valueObject.value !== "" && 
            valueObject.value !== false &&
            valueObject.type === "hidden" 
        ) {
            $label = (
                <span className="text-secondary">{ "ID: " + valueObject.value }</span>
            );
        } else if ( valueObject.type === "switch" ) {
            $label = (
                <label className="form-check-label" htmlFor={ "flexSwitchCheck-" + index }>
                    { valueObject.label }
                </label>
            );
        } else if ( valueObject.type !== "hidden" ) {
            $label = (
                <label className="form-label" htmlFor={ "input-" + index }>
                    { valueObject.label }
                </label>
            );
        }

        return $label;
    }

    getInputElement( valueObject, index, label = null )
    {
        let $inputElement = false,
            $autocomplete = false;

        if ( valueObject.type === "textarea" ) {
            $inputElement = (
                <textarea
                    id={ "input-" + index }
                    className="form-control"
                    name={ valueObject.name } 
                    placeholder={ valueObject.placeholder }
                    defaultValue={ valueObject.value }
                    onChange={ this.handleChange } />
            );
        } else if ( valueObject.type === "switch" ) {
            $inputElement = (
                <div key={ index } className="form-check form-switch my-4">
                    <input 
                        id={ "flexSwitchCheck-" + index }
                        className="form-check-input" 
                        name={ valueObject.name } 
                        type="checkbox"
                        onChange={ this.handleChange }
                        defaultChecked={
                            valueObject.value === 200 ? "checked" : "" 
                        } />
                    { label !== null ? label : "" }
                </div>
            );
        } else {
            if ( valueObject.type === "password" ) {
                if ( valueObject.value !== "" ) {
                    $autocomplete = "current-password";
                } else {
                    $autocomplete = "new-password";
                }
            } 
            $inputElement = (
                <input 
                    key={ index }
                    id={ "input-" + index }
                    className="form-control"
                    name={ valueObject.name }
                    type={ valueObject.type }  
                    placeholder={ valueObject.placeholder }
                    defaultValue={ valueObject.value }
                    autoComplete={ $autocomplete ? $autocomplete : "" }
                    // onInput={ this.handleInput }
                    onChange={ this.handleChange } />
            );
        }

        return $inputElement;
    }

    getFormElements()
    {
        let $output = [],
            $label,
            $inputElement;

        if ( Object.keys( this.props.fields ).length > 0 ) {
            this.props.fields.map((value, index) => {

                // Set a value of an input element
                if ( this.state.item[ value.name ] ) {
                    value.value = this.state.item[ value.name ];
                }

                // Set a label for an input
                $label = this.getLabel( value, index );

                // Set an input element
                $inputElement = this.getInputElement( value, index, $label );

                // Set a container and push this one into the output array
                if ( $label && value.type !== "switch" ) {
                    $output.push(
                        <div key={ index } className="mb-3">
                            { $label }
                            { $inputElement }
                        </div>
                    );
                } else {
                    $output.push( $inputElement );
                }
            });
        }

        return $output;
    }

    rednerForm()
    {
        return (
            <form onSubmit={ this.handleSubmit }>

                { this.getFormElements() }

                <input type="submit" value="Submit" className="btn btn-primary"/>
            </form>
        );
    }

    /*
     * The main method of the object
    */
    render()
    {
        const { isRendered } = this.state;

        return (
            <div className="card">
                <div className="card-header">
                    <Link 
                        to={ this.props.indexLink }
                        className="btn btn-link"
                        data-object="expandable"
                    >
                        <FontAwesomeIcon 
                            icon={ ["fas", "chevron-left"] } 
                            size="1x" />
                        <span>
                            Back to all
                        </span>
                    </Link>
                    <span className="border-start ps-2">{ this.props.currentText }</span>
                </div>
                <div className="card-body">

                    { isRendered ? this.rednerForm() : <Spinner /> }
                    
                </div>
            </div>
        );
    }
}

export default withRouter( Form );
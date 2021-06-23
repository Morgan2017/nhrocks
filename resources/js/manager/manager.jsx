import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import "../../css/bootstrap5.css";
import "../../css/adminlte.css";
import "../../css/manager.css";
import "../bootstrap5.bundle.js";
import "./fontawesome";

const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
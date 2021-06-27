"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var App_1 = require("./App");
//write html using react
ReactDOM.render(React.createElement("div", null,
    React.createElement(App_1.default, null)), document.querySelector('#root'));

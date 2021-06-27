"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function CustomDate() {
    var _a = React.useState(""), date = _a[0], setDate = _a[1];
    var getDate = function () {
        setDate(new Date().toDateString());
    };
    return (React.createElement("div", null,
        date,
        React.createElement("button", { onClick: getDate }, "Get the date")));
}
exports.default = CustomDate;

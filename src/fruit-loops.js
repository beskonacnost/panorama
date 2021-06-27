"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function FruitLoops(props) {
    return (React.createElement("ul", null, props.fruit.map(function (value, index) {
        return React.createElement("li", { key: index },
            value,
            " ");
    })));
}
exports.default = FruitLoops;

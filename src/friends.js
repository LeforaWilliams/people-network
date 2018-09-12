import React from "react";
import axios from "./axios.js";

class Friends extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        axios.get("/relations").then(() => {
            //not sure what to do here
        });
    }
}

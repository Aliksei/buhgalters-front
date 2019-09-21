import React from "react";

export default class Greetings extends React.Component{

    constructor(props) {
        super(props)
    }


    render() {
        if (this.props.hello == undefined) {
            return null
        }
        return <h1>{this.props.hello.name}</h1>
    }
}

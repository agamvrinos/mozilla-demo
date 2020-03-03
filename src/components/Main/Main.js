import React, { Component } from 'react';

import Output from '../Output/Output';
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from './Main.module.css';

class Main extends Component {
    state = {
        input: '',
        output: []
    }

    componentDidMount() {
        const output = [
            "This is a random text to be highlighted in the demo app",
            "Guess what, this is another random text to be highlighted in the demo app",
            "Just some more output"
        ]
        this.setState({ output: output });
    }

    inputChangedHandler = (event) => {
        this.setState({ input: event.target.value });        
    }

    render() {
        return (
            <div className={classes.Main}>
                <div className={classes.Filter}>
                    <input type="text" placeholder="Search in logs" onChange={this.inputChangedHandler} value={this.state.input}/>
                    <button>
                        <FontAwesomeIcon icon={faAngleUp} />
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faAngleDown} />
                    </button>
                    <button>Match Case</button>
                </div>
                <Output 
                    input={this.state.input}
                    output={this.state.output} />
            </div>
        );
    }
}

export default Main;

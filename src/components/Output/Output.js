import React, { Component } from 'react';
import Highlighter from "react-highlight-words";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from './Output.module.css';

class Output extends Component {
    render() {
        let renderedText = this.props.output.map(msg => {
            return  (
                <div className={classes.Message}>
                    <FontAwesomeIcon style={{marginRight: '5px'}}icon={faCaretRight} />
                    {msg}
                </div>
            );
        });
        if (this.props.input) {
            renderedText = 
                <div className={classes.Message}>
                    <Highlighter
                        activeClassName={classes.active}
                        activeIndex={0}
                        highlightClassName="YourHighlightClass"
                        searchWords={[this.props.input]}
                        autoEscape={true}
                        textToHighlight={this.props.output.join(" ")} />;
                </div>
        }

        return (
            <div className={classes.MessageContainer}>
                {renderedText}
            </div>
        );
    }
}

export default Output;

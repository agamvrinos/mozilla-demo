import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

import classes from './MessageBody.module.css';

class MessageBody extends React.Component {
    getHighlightedText = (text, highlight) => {
        let match = 0
        const parts = this.getSplitParts(text, highlight);
        return (
            <div> 
                <FontAwesomeIcon style={{marginRight: '5px'}}icon={faCaretRight} />
                { parts.map((part, i) => {
                    let highlightClass = []
                    if (part.toLowerCase() === highlight.toLowerCase()) {
                        highlightClass.push(classes.Highlight)
                    }
                    return (
                        <span 
                            key={i} 
                            className={highlightClass.join(" ")}>
                            { part }
                        </span>)
                })} 
            </div>
        );
    }

    getSplitParts = (text, highlight) => {
        let regex = new RegExp(`(${highlight})`, "gi");
        if (this.props.matchCase) {
            regex = new RegExp(`(${highlight})`);
        }
        return text.split(regex);
    }

    render() {
        const firstPart = this.props.parts[0];
        const l = this.getHighlightedText(firstPart, this.props.input);

        return <div>{l}</div>;
    }
}
  
const mapStateToProps = ( state ) => {
    return { 
        visibleMessages: state.visibleMessages,
        input: state.input,
        output: state.output,
        matchCase: state.matchCase,
        caretIndex: state.caretIndex
    };
 };

export default connect(mapStateToProps)(MessageBody);

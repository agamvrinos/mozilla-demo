import React, { Component } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

import Message from '../Message/Message';

import classes from './Highlighter.module.css'

class Highlighter extends Component {

    getHighlightedText = (text, highlight) => {
        let match = 0
        const toRet = text.map((entry, j) => {
            const parts = this.getSplitParts(entry, highlight);
            return (
                <Message key={j}> 
                    <FontAwesomeIcon style={{marginRight: '5px'}}icon={faCaretRight} />
                    { parts.map((part, i) => {
                        let highlightClass = []
                        if (part.toLowerCase() === highlight.toLowerCase()) {
                            if (match === this.props.caretIndex) {
                                highlightClass.push(classes.HighlightActive)
                            } else {
                                highlightClass.push(classes.Highlight)
                            }
                            match += 1;
                        }
                        return (
                            <span 
                                key={i} 
                                className={highlightClass.join(" ")}>
                                { part }
                            </span>)
                    })} 
                </Message>
            )
        })
        return toRet;
    }

    getSplitParts = (text, highlight) => {
        let regex = new RegExp(`(${highlight})`, "gi");
        if (this.props.matchCase) {
            regex = new RegExp(`(${highlight})`);
        }
        return text.split(regex);
    }

    render() {
        const highlighter = this.getHighlightedText(this.props.output, this.props.input)
        return (
            <div>
                {highlighter}
            </div>
        )
    }
}

export default Highlighter;

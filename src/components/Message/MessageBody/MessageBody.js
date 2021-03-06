import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

import actions from '../../../store/actions';
import classes from './MessageBody.module.css';

class MessageBody extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.input !== nextProps.input ||
            this.props.matchCase !== nextProps.matchCase ||
            this.props.caretIndex !== nextProps.caretIndex) {
                return true;
            }
            return false;
    }

    getHighlightedText = (text, i, highlight) => {
        const parts = this.getSplitParts(text, highlight);
        return (
            <div key={i}> 
                <FontAwesomeIcon style={{marginRight: '5px'}} icon={faCaretRight} />

                { parts.map((part, i) => {
                    let highlightClass = []
                    if (part.toLowerCase() === highlight.toLowerCase()) {
                         if (this.props.totalMatches === this.props.caretIndex) {
                                highlightClass.push(classes.HighlightActive)
                            } else {
                                highlightClass.push(classes.Highlight)
                            }
                        this.props.onIncrementTotalMatches();
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
        const renderedParts = this.props.parts.map((part, i) => {
            return this.getHighlightedText(part, i, this.props.input);
        })

        return renderedParts;
    }
}

const mapStateToProps = ( state ) => {
    return { 
        input: state.input,
        matchCase: state.matchCase,
        caretIndex: state.caretIndex,
        totalMatches: state.totalMatches
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrementTotalMatches: () => dispatch({type: actions.INCREMENT_TOTAL_MATCHES}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBody);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

import actions from '../../../store/actions';
import classes from './MessageBody.module.css';

class MessageBody extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.visibleMessages !== nextProps.visibleMessages || 
            this.props.input !== nextProps.input ||
            this.props.matchCase !== nextProps.matchCase ||
            this.props.caretIndex !== nextProps.caretIndex) {
                return true;
            }
            return false;
    }

    getHighlightedText = (text, highlight) => {
        const parts = this.getSplitParts(text, highlight);
        return (
            <div> 
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
        const firstPart = this.props.parts[0];
        const l = this.getHighlightedText(firstPart, this.props.input);

        return <div>{l}</div>;
    }
}

const mapStateToProps = ( state ) => {
    return { 
        visibleMessages: state.visibleMessages,
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

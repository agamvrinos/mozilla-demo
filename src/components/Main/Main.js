import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchBar from '../SearchBar/SearchBar';
import Message from '../Message/Message';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

import actions from '../../store/actions';
import classes from './Main.module.css';

class Main extends Component {

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
        return (
            <div className={classes.Main}>
                <SearchBar />
                <div className={classes.MessageContainer}>
                    {this.getHighlightedText(this.props.output, this.props.input)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ( state ) => {
    return { 
        input: state.input,
        output: state.output,
        matchCase: state.matchCase,
        caretIndex: state.caretIndex,
        totalMatches: state.totalMatches
    };
 };

const mapDispatchToProps = dispatch => {
    return {
        onUpdateInput: (event) => dispatch({type: actions.UPDATE_INPUT, input: event.target.value}),
        onToggleMatchCase: () => dispatch({type: actions.TOGGLE_MATCH_CASE}),
        onIncrementCaret: () => dispatch({type: actions.INCREMENT_CARET}),
        onDecrementCaret: () => dispatch({type: actions.DECREMENT_CARET}),
    };
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Main);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Message from '../Message/Message';
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

import actions from '../../store/actions';
import classes from './Main.module.css';

class Main extends Component {

    getHighlightedText = (text, highlight) => {
        let match = 0
        const toRet = text.map((entry, j) => {
            // Split on highlight term and include term into parts, ignore case
            let regex = new RegExp(`(${highlight})`, "gi");
            if (this.props.matchCase) {
                regex = new RegExp(`(${highlight})`);
            }
            const parts = entry.split(regex);
            console.log(parts);

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
        console.log(match);
        return [match, toRet];
    }

    render() {
        let matchCaseButton = <button onClick={this.props.onToggleMatchCase}>Match Case</button>
        if (this.props.matchCase) {
            matchCaseButton = <button className={classes.ButtonClicked} onClick={this.props.onToggleMatchCase}>Match Case</button>
        }

        let ret = this.getHighlightedText(this.props.output, this.props.input);

        return (
            <div className={classes.Main}>
                <div className={classes.Filter}>
                    <input 
                        type="text" 
                        placeholder="Search in logs" 
                        onChange={this.props.onUpdateInput} 
                        value={this.props.input}/>
                    <span style={{fontSize: '11px'}}>{this.props.caretIndex + 1} of {ret[0]}</span>
                    <button onClick={this.props.onIncrementCaret}>
                        <FontAwesomeIcon icon={faAngleUp} />
                    </button>
                    <button onClick={this.props.onDecrementCaret}>
                        <FontAwesomeIcon icon={faAngleDown} />
                    </button>
                    {matchCaseButton}
                </div>
                <div className={classes.MessageContainer}>
                    {ret[1]}
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
        caretIndex: state.caretIndex
    };
 };

const mapDispatchToProps = dispatch => {
    return {
        onUpdateInput: (event) => dispatch({type: actions.UPDATE_INPUT, input: event.target.value}),
        onToggleMatchCase: () => dispatch({type: actions.TOGGLE_MATCH_CASE}),
        onIncrementCaret: () => dispatch({type: actions.INCREMENT_CARET}),
        onDecrementCaret: () => dispatch({type: actions.DECREMENT_CARET})
    };
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Main);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

import actions from '../../store/actions';
import classes from './SearchBar.module.css'

class SearchBar extends Component {
    render() {
        let matchCaseButton = <button onClick={this.props.onToggleMatchCase}>Match Case</button>
        if (this.props.matchCase) {
            matchCaseButton = <button className={classes.ButtonClicked} onClick={this.props.onToggleMatchCase}>Match Case </button>;
        }

        return (
            <div className={classes.SearchBar}>
                <input 
                    type="text" 
                    className={classes.SearchBarInput}
                    placeholder="Search in logs" 
                    onChange={this.props.onUpdateInput} 
                    value={this.props.input}/>
                {this.props.totalMatches > 0 ? <span style={{fontSize: '11px', margin: '0 6px'}}>{this.props.caretIndex + 1} of {this.props.totalMatches}</span> :  null}
                <button onClick={this.props.onIncrementCaret}>
                    <FontAwesomeIcon icon={faAngleUp} />
                </button>
                <button onClick={this.props.onDecrementCaret}>
                    <FontAwesomeIcon icon={faAngleDown} />
                </button>
                {matchCaseButton}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        input: state.input,
        matchCase: state.matchCase,
        caretIndex: state.caretIndex,
        totalMatches: state.totalMatches
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateInput: (event) => dispatch({type: actions.UPDATE_INPUT, input: event.target.value}),
        onToggleMatchCase: () => dispatch({type: actions.TOGGLE_MATCH_CASE}),
        onIncrementCaret: () => dispatch({type: actions.INCREMENT_CARET}),
        onDecrementCaret: () => dispatch({type: actions.DECREMENT_CARET}),
    };
}
 
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

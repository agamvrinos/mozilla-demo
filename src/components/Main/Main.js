import React, { Component } from 'react';

import Message from '../Message/Message';
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

import classes from './Main.module.css';

class Main extends Component {
    state = {
        input: 'a',
        output: [],
        matchCase: false,
        caretIndex: 0,
        totalMatches: 0
    }

    componentDidMount() {
        const output = [
            "This is a random text to be highlighted in the demo app",
            "Guess what, this is another random text to be highlighted in the demo app",
            "Just some more output"
        ]
        this.setState({ output: output });
    }

    incrementCaretCounterHandler = () => {
        this.setState((prevState) => {
            return {
                caretIndex: prevState.caretIndex + 1,
            }
        })
    }

    decrementCaretCounterHandler = () => {
        if (this.state.caretIndex > 0) {
            this.setState((prevState) => {
                return {
                    caretIndex: prevState.caretIndex - 1,
                }
            })
        }
    }

    inputChangedHandler = (event) => {
        this.setState({ input: event.target.value });        
    }

    matchCaseHandler = () => {
        this.setState((prevState) => {
            return {
                matchCase: !prevState.matchCase,
            }
        })
    }

    getHighlightedText = (text, highlight) => {
        let match = 0
        const toRet = text.map((entry, j) => {
            // Split on highlight term and include term into parts, ignore case
            let regex = new RegExp(`(${highlight})`, "gi");
            if (this.state.matchCase) {
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
                            if (match === this.state.caretIndex) {
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
        // this.setState({totalMatches: match})
        // this.doYourTang(match);
        return [match, toRet];
    }

    render() {
        let matchCaseButton = <button onClick={this.matchCaseHandler}>Match Case</button>
        if (this.state.matchCase) {
            matchCaseButton = <button className={classes.ButtonClicked} onClick={this.matchCaseHandler}>Match Case</button>
        }

        let ret = this.getHighlightedText(this.state.output, this.state.input);

        return (
            <div className={classes.Main}>
                <div className={classes.Filter}>
                    <input 
                        type="text" 
                        placeholder="Search in logs" 
                        onChange={this.inputChangedHandler} 
                        value={this.state.input}/>
                    <span style={{fontSize: '11px'}}>{this.state.caretIndex + 1} of {ret[0]}</span>
                    <button onClick={this.incrementCaretCounterHandler}>
                        <FontAwesomeIcon icon={faAngleUp} />
                    </button>
                    <button onClick={this.decrementCaretCounterHandler}>
                        <FontAwesomeIcon icon={faAngleDown} />
                    </button>
                    {matchCaseButton}
                </div>
                <div className={classes.MessageContainer}>
                    {ret[1]}
                </div>
                {/* <Output  */}
                    {/* input={this.state.input} */}
                    {/* output={this.state.output} /> */}
            </div>
        );
    }
}

export default Main;

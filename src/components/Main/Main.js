import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchBar from '../SearchBar/SearchBar';
import Highlighter from '../Highlighter/Highlighter';

import classes from './Main.module.css';

class Main extends Component {

    render() {
        return (
            <div className={classes.Main}>
                <SearchBar />
                <div className={classes.MessageContainer}>
                    <Highlighter 
                        input={this.props.input}
                        output={this.props.output}
                        matchCase={this.props.matchCase}
                        caretIndex={this.props.caretIndex}/>
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

export default connect(mapStateToProps)(Main);

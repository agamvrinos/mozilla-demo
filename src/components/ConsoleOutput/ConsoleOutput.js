import React, { Component } from 'react';
import { connect } from 'react-redux';

import MessageContainer from '../MessageContainer/MessageContainer';

import classes from './ConsoleOutput.module.css';

class ConsoleOutput extends Component {

    render() {
        const messageNodes = this.props.visibleMessages.map(messageId => {
            return <MessageContainer 
                    key={messageId}
                    messageId={messageId} />
        });

        return (
            <div className={classes.ConsoleOutput}>
                {messageNodes}
            </div>
        );
    }
}

const mapStateToProps = ( state ) => {
    return { 
        visibleMessages: state.visibleMessages
    };
 };

export default connect(mapStateToProps)(ConsoleOutput);

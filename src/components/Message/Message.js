import React, { Component } from 'react';

import MessageBody from './MessageBody/MessageBody';

import classes from './Message.module.css';

class Message extends Component {

    render() {
        // mock parts
        const parts = [this.props.messageText];

        return (
            <div className={classes.Message}>
                <MessageBody parts={parts} />
            </div>
        );
    }
}

export default Message;

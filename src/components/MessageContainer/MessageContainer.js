import React, { Component } from 'react';

import Message from '../Message/Message';

import classes from './MessageContainer.module.css';

class MessageContainer extends Component {

    mockGetMessage = (id) => {
        if (id == 1) {
            return "This is a random text to be highlighted in the demo app";
        } else if (id == 2) {
            return "Guess what, this is another random text to be highlighted in the demo app";
        } else if (id == 3) {
            return "Just some more output";
        }
        return null;
    }

    render() {
        return (
            React.createElement("div",
                { className: classes.MessageContainer },
                React.createElement(Message, { 
                    id: this.props.messageId,
                    messageText: this.mockGetMessage(this.props.messageId) 
                })
            )
        );
    }
}

export default MessageContainer;

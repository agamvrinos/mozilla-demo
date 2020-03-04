import React, { Component } from 'react';

import classes from './Message.module.css';

class Message extends Component {
    render() {
        return (
            <div className={classes.Message}>
                {this.props.children}
            </div>
        );
    }
}

export default Message;

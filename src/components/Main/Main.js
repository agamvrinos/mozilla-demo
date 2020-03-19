import React, { Component } from 'react';

import SearchBar from '../SearchBar/SearchBar';
import ConsoleOutput from '../ConsoleOutput/ConsoleOutput';

import classes from './Main.module.css';

class Main extends Component {

    render() {
        return (
            <div className={classes.Main}>
                <SearchBar />
                <ConsoleOutput />
            </div>
        );
    }
}

export default Main;

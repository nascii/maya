'use strict';

import React, { AsyncStorage, View, ScrollView, WebView, StyleSheet, Text, Image, ListView, TouchableWithoutFeedback } from 'react-native';

import {tokenStream, usersStream} from '../../stores/stores.js';

import Auth from '../Auth/Auth.js';

export default class App extends React.Component {
	constructor(props) {
		super();
		this.state = {

		};
	}

    componentDidMount() {
        tokenStream.observe(token => {
            console.log('token recived', token);
            this.setState({token});
        });
        tokenStream.observe(users => this.setState({users}));
    }

	render() {
        return (
			<View>
                <Auth />
			</View>
		);
	}
}

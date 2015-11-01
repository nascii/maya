'use strict';

import url from 'url';

import React, {ActivityIndicatorIOS, AsyncStorage, View, ScrollView, WebView, StyleSheet, Text, Image, ListView, TouchableWithoutFeedback } from 'react-native';

import {VK_AUTH_URL, APP_HOSTNAME, APP_URL} from '../../config.js';

import {setToken} from '../../actions/actions.js';

import styles from './Auth.styles.js';

export default class Auth extends React.Component {
	constructor() {
		super();
	}

	render() {
		const url = VK_AUTH_URL;

        return (
			<View style={styles.container}>
				<ActivityIndicatorIOS
					animating={true}
					style={[styles.centering, {height: 80}]}
					size="large"
				/>
				<WebView
					url={url}
					javaScriptEnabledAndroid={true}
					onNavigationStateChange={
	                    (navigationState) => this.onNavigationStateChange(navigationState)
	                }
					startInLoadingState={true}
				/>
			</View>
		);
	}

	onNavigationStateChange(navigationState) {
		console.log(navigationState);
		const currentUrl = url.parse(navigationState.url);
		if (currentUrl.hostname === APP_HOSTNAME) {
			const query = currentUrl.query;
			console.log(query);
			const hasCode = query ? query.includes('code') : false;
			const code = hasCode ? query.split('code=')[1].split('&')[0] : null;

			if (code) {
				setToken({code});
			}
		}
	}
}

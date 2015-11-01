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
		const currentUrl = url.parse(navigationState.url);

		if (currentUrl.hostname === APP_HOSTNAME) {
			const hash = currentUrl.hash;
			const hasToken = hash ? hash.includes('access_token') : false;
			const hasUserId = hash ? hash.includes('user_id') : false;
			const access_token = hasToken ? hash.split('access_token=')[1].split('&')[0] : null;
			const user_id = hasUserId ? hash.split('user_id=')[1].split('&')[0] : null;

			if (access_token && user_id) {
				console.log('We have token!', access_token, user_id);
				setToken({token: access_token, user_id: user_id});
			}
		}
	}
}

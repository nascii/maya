'use strict';

import url from 'url';

import React, { AsyncStorage, View, ScrollView, WebView, StyleSheet, Text, Image, ListView, TouchableWithoutFeedback } from 'react-native';

import {VK_AUTH_URL} from '../../config.js';

import {setToken} from '../../actions/actions.js';

import styles from './Auth.styles.js';

export default class Auth extends React.Component {
	constructor() {
		super();
	}

	render() {
		const url = VK_AUTH_URL;

        return (
			<WebView
				automaticallyAdjustContentInsets={false}
				url={url}
				style={styles.webView}
				javaScriptEnabledAndroid={true}
				onNavigationStateChange={
                    (navigationState) => this.onNavigationStateChange(navigationState)
                }
				startInLoadingState={true}
			/>
		);
	}

	async onNavigationStateChange(navigationState) {
        console.log(navigationState);
		const currentUrl = url.parse(navigationState.url);
		const hash = currentUrl.hash;
		const hasToken = hash ? hash.includes('access_token') : false;
		const token = hasToken ? hash.split('#access_token=')[1].split('&')[0] : null;

		if (token) {
			console.log(token);
			AsyncStorage.setItem('token', token);

			setToken(token);
		}
	}

	async getUsers(params) {
		const urlObj = {
			hostname: VK_API_HOSTNAME,
			protocol: 'https',
			pathname: 'method/users.search',
			query: params
		}
		const requestUrl = url.format(urlObj);

		return fetch(requestUrl)
			.then(response => response.json())
			.then(responseJSON => Promise.resolve(responseJSON.response.items))
			.catch(e => console.warn(e));
	}
}

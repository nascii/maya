'use strict';

import React, { View, ScrollView, WebView, StyleSheet, Text, Image, ListView } from 'react-native';
import url from 'url';
import querystring from 'querystring';

const CLIENT_ID = 5119199;
const APP_NAME = 'maya';
const APP_URL = 'http://example.com';
const VK_API_HOSTNAME = 'api.vk.com';
// const API_TOKEN = 'gYn9y6R9Oh6I9xlD7qsM';

// TODO: add url parser so we can add params via addParam methods
const VK_AUTH_URL = `https://oauth.vk.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${APP_URL}&response_type=token&state=huy`;

let navStates = [];

export class User extends React.Component {
	constructor() {
		super()
		this.state = {};
	}

	render() {
		const user = this.props.user;

		return (
			<Image source={{uri: user.photo_50}} style={styles.userPhoto}/>
		);
	}
}

export class AuthWebView extends React.Component {
	constructor() {
		super()
		this.state = { usersDS: new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id}) };
	}

	render() {
		const url = VK_AUTH_URL;
		const users = this.state.users;

		if (users) {
			return (
				<View style={styles.listViewContainer}>
					<ListView
						showVerticalScrollIndicator={true}
						style={styles.usersList}
						dataSource={this.state.usersDS.cloneWithRows(users)}
						renderRow={ (user) => <User user={user} /> }
					/>
				</View>
			);
		} else {
			return (
				<WebView
					automaticallyAdjustContentInsets={false}
					url={url}
					style={styles.webView}
					javaScriptEnabledAndroid={true}
					onNavigationStateChange={this.onNavigationStateChange.bind(this)}
					startInLoadingState={true}
					scalesPageToFit={this.state.scalesPageToFit}
				/>
			);
		}
	}

	onNavigationStateChange(navigationState) {
		const currentUrl = url.parse(navigationState.url);
		const hash = currentUrl.hash;
		const hasToken = hash ? hash.includes('access_token') : false;
		const token = hasToken ? hash.split('#access_token=')[1].split('&')[0] : null;

		if (token) {
			this.getUsers({
				access_token: token,
				city: 1,
				sex: 1,
				count: 35,
				v: '5.8',
				fields: 'photo_50'
			})
			.then(response => response.json())
			.then(responseJSON => {
				this.setState({users: responseJSON.response.items});
			})
			.catch(e => console.warn(e));
		}
	}

	getUsers(params) {
		const urlObj = {
			hostname: VK_API_HOSTNAME,
			protocol: 'https',
			pathname: 'method/users.search',
			query: params
		}
		const requestUrl = url.format(urlObj);

		return fetch(requestUrl);
	}
}


const styles = StyleSheet.create({
	webView: {
		backgroundColor: 'rgba(255,255,255,0.8)',
		width: 500
	},

	userPhoto: {
		height: 50,
		width: 50,
		flexDirection: 'row',
		justifyContent: 'space-around'
	},

	usersList: {
	    flex: 1
	},

	listViewContainer: {
		overflow: 'hidden'
	}
});
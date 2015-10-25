'use strict';

import React, { View, ScrollView, WebView, StyleSheet, Text, Image, ListView, TouchableWithoutFeedback } from 'react-native';
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
		this.state = {isOpened: false, photos: []};
	}

	render() {
		const user = this.props.user;
		const photos = this.state.photos;

		return (
			<View>
				<View style={userStyles.container}>
					<TouchableWithoutFeedback onPress={e => {this._onPress(e)}}>
						<Image source={{uri: user.photo_100}} style={styles.userPhoto} />
					</TouchableWithoutFeedback>
					<View style={userStyles.data}>
						<Text style={userStyles.text}>{user.first_name}</Text>
						<Text style={userStyles.text}>{user.last_name}</Text>
					</View>
				</View>
				{photos.map(photo => (<Image source={{uri: photo.photo_130}} style={styles.userPhoto} />))}
			</View>
		);
	}

	async _onPress() {
		var photos = await this.getUserPhotos();
		console.log(photos);

		this.setState({
			isOpened: !this.state.isOpened,
			photos
		})
	}

	async getUserPhotos() {
		const user = this.props.user;

		const urlObj = {
			hostname: VK_API_HOSTNAME,
			protocol: 'https',
			pathname: 'method/photos.getAll',
			query: {
				owner_id: user.id,
				access_token: token
			}
		}
		const requestUrl = url.format(urlObj);

		return fetch(requestUrl)
			.then(response => response.json())
			.then(responseJSON => Promise.resolve(responseJSON))
			.catch(e => console.warn(e));
	}
}

const userStyles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		flex: 1,
		flexDirection: 'row'
	},

	userPhoto: {
		height: 100,
		width: 100
	},

	data: {
		marginLeft: 15
	},

	text: {
		fontSize: 20
	}
});


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
				<ListView
					showVerticalScrollIndicator={true}
					style={styles.usersList}
					dataSource={this.state.usersDS.cloneWithRows(users)}
					renderRow={ (user) => <User user={user} /> }
				/>
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

	async onNavigationStateChange(navigationState) {
		const currentUrl = url.parse(navigationState.url);
		const hash = currentUrl.hash;
		const hasToken = hash ? hash.includes('access_token') : false;
		const token = hasToken ? hash.split('#access_token=')[1].split('&')[0] : null;

		if (token) {
			let users = await this.getUsers({
				access_token: token,
				city: 1,
				sex: 1,
				offset: 100,
				count: 40,
				v: '5.8',
				fields: 'photo_100'
			})

			this.setState({users});
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


const styles = StyleSheet.create({
	webView: {
		backgroundColor: 'rgba(255,255,255,0.8)',
		height: 500,
		width: 414
	},

	userPhoto: {
		height: 100,
		width: 100,
		flexDirection: 'row',
		justifyContent: 'space-around'
	},

	usersList: {
	    flex: 1
	}
});

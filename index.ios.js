/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {AppRegistry, StyleSheet, Text, View, WebView} from 'react-native';
import App from './components/App/App.js';

class maya extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<View>
				<App />
			</View>
		);
	}
}

var styles = StyleSheet.create({
	container: {
		// flex: 1,
		// justifyContent: 'center',
		// alignItems: 'center',
		backgroundColor: '#FAFAFA',
		flex: 1
	}
});

AppRegistry.registerComponent('maya', () => maya);

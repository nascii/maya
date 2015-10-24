/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {AppRegistry, StyleSheet, Text, View, WebView} from 'react-native';
import { AuthWebView } from './vk';

class maya extends React.Component {
	
	constructor() {
		super()
		this.state = {};
	}

	render() {
		return (
			<View>
				<AuthWebView style={styles.container}/>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	container: {
		// flex: 1,
		// justifyContent: 'center',
		// alignItems: 'center',
		backgroundColor: '#FAFAFA'
	}
});

AppRegistry.registerComponent('maya', () => maya);

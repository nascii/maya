'use strict';

import React, {TabBarIOS, Navigator, AsyncStorage, View, ScrollView, WebView, StyleSheet, Text, Image, ListView, TouchableWithoutFeedback } from 'react-native';

import {tokenStream, usersStream} from '../../stores/stores.js';

import Auth from '../Auth/Auth.js';
import Users from '../Users.js';

export default class App extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'featured'
        };
    }

    componentDidMount() {
        // tokenStream.observe(token => {
        //     console.log('token recived', token);
        //     this.setState({token});
        // });
        // usersStream.observe(users => this.setState({users}));
    }

	render() {
		// var content = this.state.token ? <Main /> : <Auth />;
        return (
			<TabBarIOS selectedTab={this.state.selectedTab}>
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'featured'}
                    icon={{uri:'featured'}}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'featured'
                        });
                    }}>
                    <Main/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'search'}
                    icon={{uri:'search'}}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'search'
                        });
                    }}>
                    <Main/>
                </TabBarIOS.Item>
            </TabBarIOS>
		);
	}
}

class Main extends React.Component {
	render() {
		return (
			<View style={mainStyles.container}>
                <Text>Hello1</Text>
				<Text style={mainStyles.menu}>Hello2</Text>
			</View>
		);
	}
}

const mainStyles = StyleSheet.create({
	container: {
		paddingTop: 30,
		height: window.height,
		position: 'absolute',
		top: 0,
		bottom: 0
	},

	userPhoto: {
		height: 1000,
		width: 400
	},

	data: {
		marginLeft: 15
	},

	text: {
		fontSize: 20
	},

	photosList: {
		flex: 1
	},

	menu: {
		position: 'absolute',
		bottom: 0
	},

	navigationBar: {
		width: 400,
		height: 100
	}
});

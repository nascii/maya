/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {TabBarIOS, AppRegistry, StyleSheet, Text, View, WebView} from 'react-native';
// import App from './components/App/App.js';
import Users from './components/Users.js';
import Auth from './components/Auth';
import Favorites from './components/Favorites.js';
import Search from './components/Search.js';
import {appModel} from './stores/stores.js';

class maya extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
			token: appModel.get('token'),
            selectedTab: 'search'
        };
    }

	componentDidMount() {
        appModel.on('change:token', () => {
			console.log('Change token');
			this.setState({token: appModel.get('token')})
		});
    }

	render() {
		console.log('index', this.state.token);
		if (this.state.token) {
			return (
				<TabBarIOS selectedTab={this.state.selectedTab}>
	                <TabBarIOS.Item
	                    selected={this.state.selectedTab === 'featured'}
	                    icon={{uri: 'wedding-photo'}}
						title='Spy'
	                    onPress={() => {
	                        this.setState({
	                            selectedTab: 'featured'
	                        });
	                    }}>
						<Favorites />
	                </TabBarIOS.Item>
	                <TabBarIOS.Item
	                    selected={this.state.selectedTab === 'search'}
	                    icon={{uri: 'female'}}
						title='Girls'
	                    onPress={() => {
	                        this.setState({
	                            selectedTab: 'search'
	                        });
	                    }}>
						<Users />
	                </TabBarIOS.Item>
					<TabBarIOS.Item
	                    selected={this.state.selectedTab === 'options'}
	                    icon={{uri: 'binoculars'}}
						title='Find More'
	                    onPress={() => {
	                        this.setState({
	                            selectedTab: 'options'
	                        });
	                    }}>
	                    <Search />
	                </TabBarIOS.Item>
	            </TabBarIOS>
			);
		} else {
			return <Auth />
		}
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

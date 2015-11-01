'use strict';

import React, {TabBarIOS, Navigator, AsyncStorage, View, ScrollView, WebView, StyleSheet, Text, Image, ListView, TouchableWithoutFeedback } from 'react-native';

import User from './User.js';
import R from 'ramda';

import {subscribedUsers} from '../stores/stores.js';

export default class Favorites extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => true});
		this.state = {
            subscribedUsers: ds.cloneWithRows(subscribedUsers.toJSON())
		};
    }

    componentDidMount() {
        subscribedUsers.on('add remove change reset', () => {
            this.setState({
                subscribedUsers: this.state.subscribedUsers.cloneWithRows(subscribedUsers.toJSON())
            });
        });
    }

	render() {
        return (
            <ListView
                dataSource={this.state.subscribedUsers}
                renderRow={user =>  <User key={user.id} user={user} />}
                contentContainerStyle={styles.contentContainerStyle}
                showVerticalScrollIndicator={true}
            />
		);
	}
}

const styles = StyleSheet.create({
	contentContainerStyle: {
	}
});

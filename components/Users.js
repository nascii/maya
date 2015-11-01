'use strict';

import React, {TabBarIOS, Navigator, AsyncStorage, View, ScrollView, WebView, StyleSheet, Text, Image, ListView, TouchableWithoutFeedback } from 'react-native';

import User from './User.js';

import {girls} from '../stores/stores.js';

export default class Users extends React.Component {
	constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {return (r1.id !== r2.id) || (r1.liked !== r2.liked)}});
console.log(girls.toJSON());
        this.state = {
            users: ds.cloneWithRows(girls.toJSON())
		};
    }

    componentDidMount() {
        girls.on('add remove change reset', () => {
            console.log(girls.toJSON());
            this.setState({
                users: this.state.users.cloneWithRows(girls.toJSON())
            });
        });
    }

	render() {
        return (
            <ListView
                contentContainerStyle={styles.contentContainerStyle}
                dataSource={this.state.users}
                renderRow={user => {
                    return <User key={user.id} user={user} />
                }}
            />
		);
	}
}

const styles = StyleSheet.create({
	contentContainerStyle: {
	}
});

'use strict';

import React, {TabBarIOS, Navigator, AsyncStorage, View, ScrollView, WebView, StyleSheet, Text, Image, ListView, TouchableWithoutFeedback } from 'react-native';

import User from './User.js';
import R from 'ramda';

import {girls} from '../stores/stores.js';

var filterLiked = R.filter(R.propEq('liked', true));

export default class Favorites extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {console.log('rowHasChanged', (r1.id !== r2.id) || (r1.liked !== r2.liked)); return (r1.id !== r2.id) || (r1.liked !== r2.liked)}});
		this.state = {
            users: ds.cloneWithRows(filterLiked(girls.toJSON()))
		};
    }

    componentDidMount() {
        girls.on('add remove change reset', () => {
            this.setState({
                users: this.state.users.cloneWithRows(filterLiked(girls.toJSON()))
            });
        });
    }

	render() {
        return (
            <ListView
                dataSource={this.state.users}
                renderRow={user => {
                    return <User key={user.id} user={user} />
                }}
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

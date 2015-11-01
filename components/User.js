'use strict';

import React, {TouchableOpacity, TouchableHighlight, TabBarIOS, Navigator, AsyncStorage, View, ScrollView, WebView, StyleSheet, Text, Image, ListView, TouchableWithoutFeedback } from 'react-native';

import {toggleUser} from '../actions/actions.js';

export default class User extends React.Component {
	constructor(props) {
        super(props);
    }

    componentDidMount() {
        // tokenStream.observe(token => {
        //     console.log('token recived', token);
        //     this.setState({token});
        // });
        // usersStream.observe(users => this.setState({users}));
    }

	render() {
        var user = this.props.user;
        var icon = user.liked ? 'dislike' : 'in-love';
        var iconStyle = user.liked ? styles.dislike : styles.like;
        return (
            <View style={styles.container}>
                <Image source={{uri: user.photo_100}} style={styles.userPhoto} />
                <View style={styles.innerContainer}>
                    <View style={styles.innerInnerContainer}>
                        <Text style={styles.text}>{user.first_name}</Text>
                        <TouchableOpacity
                            onPress={() => toggleUser(user.id)}
                            >
                            <Image source={{uri: icon}} style={iconStyle} />
                        </TouchableOpacity>
                    </View>
                    <View style={
                        {
                            position: 'absolute',
                            bottom: 0,
                            height: 5,
                            backgroundColor: '#cccccc',
                            width: 20
                        }
                    } />
                </View>
            </View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
		flexDirection: 'row'
	},

    innerContainer: {
        position: 'relative',
        flex: 1,
        marginLeft: 12,
        borderBottomWidth: 1,
        borderColor: '#eeeeee',
        flexDirection: 'column',
        paddingVertical: 6,
        justifyContent: 'space-between'
    },

    innerInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

	userPhoto: {
        borderRadius: 25,
		height: 50,
		width: 50,
        marginVertical: 6
	},

    like: {
        width: 25,
        height: 25,
        tintColor: '#e74c3c'
    },

    dislike: {
        width: 25,
        height: 25,
        tintColor: '#2c3e50'
    },

	text: {
        alignSelf: 'center',
		fontSize: 16
	},

    fav: {
        width: 44,
        height: 44,
        backgroundColor: 'black'
    },

    liked: {
        width: 44,
        height: 44,
        backgroundColor: 'red'
    }
});

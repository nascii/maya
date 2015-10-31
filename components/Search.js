'use strict';

import React, {PickerIOS, PickerItemIOS, TouchableOpacity, TouchableHighlight, TabBarIOS, Navigator, AsyncStorage, View, ScrollView, WebView, StyleSheet, Text, Image, ListView, TouchableWithoutFeedback } from 'react-native';

export default class Search extends React.Component {
	constructor(props) {
        super(props);

        this.state = {
            curr: 'moscow'
        };
    }

	render() {
        return (
            <View style={styles.container}>
                <PickerIOS selectedValue={this.state.curr} onValueChange={(curr) => this.setState({curr})}>
                    <PickerItemIOS key={'moscow'} value={'moscow'} label={'moscow'} />
                    <PickerItemIOS key={'spb'} value={'spb'} label={'spb'} />
                </PickerIOS>
            </View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1
	}
});

'use strict';

import React, {PickerIOS, TouchableOpacity, TouchableHighlight, TabBarIOS, Navigator, AsyncStorage, View, ScrollView, WebView, StyleSheet, Text, Image, ListView, TouchableWithoutFeedback } from 'react-native';

export default class Search extends React.Component {
	constructor(props) {
        super(props);

        this.state = {
            currentCity: 'moscow'
        };
    }

	render() {
        return (
            <View style={styles.container}>
                <PickerIOS selectedValue={this.state.currentCity} onValueChange={(currentCity) => this.setState({currentCity})}>
                    <PickerIOS.Item key={'moscow'} value={'moscow'} label={'moscow'} />
                    <PickerIOS.Item key={'spb'} value={'spb'} label={'spb'} />
                    <PickerIOS.Item key={'1'} value={'1'} label={'spb'} />
                    <PickerIOS.Item key={'2'} value={'2'} label={'spb'} />
                    <PickerIOS.Item key={'3'} value={'3'} label={'spb'} />
                    <PickerIOS.Item key={'4'} value={'4'} label={'spb'} />
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

'use strict';

import React, {PickerIOS,
	TouchableOpacity,
	TouchableHighlight,
	TabBarIOS,
	Navigator,
	AsyncStorage,
	View,
	ScrollView,
	WebView,
	StyleSheet,
	Text,
	Image,
	ListView,
	TextInput,
	TouchableWithoutFeedback } from 'react-native';

import {citySearch} from '../actions/actions.js';
import {foundUsers} from '../stores/stores.js';
import User from './User.js';

export default class Search extends React.Component {
	constructor(props) {
        super(props);

		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => (r1.id !== r2.id) });
        this.state = {
            foundUsers: ds.cloneWithRows(foundUsers.toJSON()),
			contentOffset: 0
		};
    }

	componentDidMount() {
        foundUsers.on('add remove change reset', () => {
            this.setState({
                foundUsers: this.state.foundUsers.cloneWithRows(foundUsers.toJSON())
            });
        });
    }

	render() {
        return (
            <View style={styles.container}>
                <PickerIOS
					selectedValue={this.state.currentCity}
					onValueChange={(val) => this.onValueChange(val)}
					>
					{cities.map(city => <PickerIOS.Item key={city.id} value={city.id} label={city.title} />)}
                </PickerIOS>
				<ListView
					contentContainerStyle={styles.contentContainerStyle}
					dataSource={this.state.foundUsers}
					renderRow={user => <User key={user.id} user={user} />}
				/>
            </View>
		);
	}

	onScroll(e) {
		this.setState({contentOffset: e.nativeEvent.contentOffset.y});
	}

	onValueChange(val) {
		this.setState({currentCity: val});
		citySearch(val);
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1
	},

	textInputContainer: {
		marginHorizontal: 50,
		marginVertical: 10
	},

	textInput: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		marginVertical: 5,
		padding: 5
	}
});

const cities = [  {
id: 1,
title: 'Москва',
important: 1
},  {
id: 2,
title: 'Санкт-Петербург',
important: 1
},{
id: 130,
title: 'Смоленск',
important: 1
}, {
id: 10,
title: 'Волгоград'
},{
id: 37,
title: 'Владивосток'
}, {
id: 153,
title: 'Хабаровск'
}, {
id: 49,
title: 'Екатеринбург'
}, {
id: 60,
title: 'Казань'
}, {
id: 61,
title: 'Калининград'
}, {
id: 72,
title: 'Краснодар'
}, {
id: 73,
title: 'Красноярск'
}, {
id: 95,
title: 'Нижний Новгород'
}, {
id: 99,
title: 'Новосибирск'
}, {
id: 104,
title: 'Омск'
}, {
id: 110,
title: 'Пермь'
}, {
id: 119,
title: 'Ростов-на-Дону'
}, {
id: 123,
title: 'Самара'
}, {
id: 151,
title: 'Уфа'
}, {
id: 158,
title: 'Челябинск'
}]

'use strict';

import {StyleSheet} from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1
	},

	userPhoto: {
		height: 100,
		width: 100,
		flexDirection: 'row',
		justifyContent: 'space-around'
	},

	usersList: {
	    flex: 1
	},

	centering: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    gray: {
      backgroundColor: '#cccccc',
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    }
});

'use strict'

import R from 'ramda';
import React, {AsyncStorage} from 'react-native';
import most from 'most';
import Backbone from 'backbone';
import url from 'url';
import {VK_API_HOSTNAME, SERVER_HOSTNAME, SERVER_PORT} from '../config.js';
import {tokenStream, toggledUsersStream, citySearchStream} from '../actions/actions.js';

export {tokenStream} from '../actions/actions.js';

export var usersStream = tokenStream.flatMap(function (authData) {
    console.log('tokenStream authData', authData);
    return most.fromPromise(getFriends(authData));
});

export var searchUsersStream = citySearchStream.flatMap(function (cityId) {
    console.info('cityId', cityId);
    return most.fromPromise(searchUsersByCityId(cityId));
});

tokenStream.observe((token) => { appModel.set(token); });
usersStream.observe((girlsColleciton) => { girls.reset(girlsColleciton);});
searchUsersStream.observe((usersCollection) => {foundUsers.reset(usersCollection);});

var Girl = Backbone.Model.extend({});
var Girls = Backbone.Collection.extend({model: Girl});
var FoundUser = Backbone.Model.extend({});
var FoundUsers = Backbone.Collection.extend({model: FoundUser});
var SubscribedUser = Backbone.Model.extend({});
var SubscribedUsers = Backbone.Collection.extend({model: SubscribedUser});
var AppModel = Backbone.Model.extend({});

export var appModel = new AppModel();
export var girls = new Girls();
export var foundUsers = new FoundUsers();
export var subscribedUsers = new SubscribedUsers();

subscribedUsers.on('add', (user) => {
    setTimeout(function() {
        user.set('coef', user.get('last_name') === 'Асмус' ? 14 : randomCoef(100));
    }, randomTime(10) * 1000 );

});

function randomTime(n) {
    return Math.round(Math.random() * n) + 3;
}

function randomCoef(n) {
    return Math.round(Math.random() * 100);
}

toggledUsersStream.observe(function (id) {
    var girl = subscribedUsers.get(id);

    if (girl) {
        subscribedUsers.remove(girl);
    } else {
        girl = girls.get(id) || foundUsers.get(id);
        subscribedUsers.add(girl.toJSON());
    }
});

function sendToken(token) {
    const urlObj = {
        hostname: SERVER_HOSTNAME,
        protocol: 'http',
        pathname: 'api/v1/auth'
    }
    const requestUrl = url.format(urlObj);

    return fetch(requestUrl, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
    		access_token: token
    	})
    })
        .then(response => console.log(response))
        .catch(e => console.warn(e));
}

function getFriends(data) {

    const urlObj = {
        hostname: VK_API_HOSTNAME,
        protocol: 'https',
        pathname: 'method/friends.get',
        query: {
            user_id: data.user_id,
            fields: ['sex', 'photo_100'].join(','),
            v: '5.37'
        }
    }
    const requestUrl = url.format(urlObj);
    console.log('getFriends', requestUrl);

    // return Promise.resolve(_users);
    return fetch(requestUrl, {
        method: 'get',
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => {console.log(response); return response.json();})
        .then(responseJSON => responseJSON.response.items.filter(friend => friend.sex === 1))
        .catch(e => console.warn(e));
}

function searchUsersByCityId(cityId) {
    const urlObj = {
        hostname: VK_API_HOSTNAME,
        protocol: 'https',
        pathname: 'method/users.search',
        query: {
            city_id: cityId,
            sex: 1,
            age_from: 20,
            age_to: 35,
            fields: ['sex', 'photo_100'].join(','),
            v: '5.37',
            count: 100,
            access_token: appModel.get('token')
        }
    }
    const requestUrl = url.format(urlObj);

    // return Promise.resolve(_users);
    return fetch(requestUrl, {
        method: 'get',
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => {console.log(response); return response.json();})
        .then(responseJSON => responseJSON.response.items)
        .catch(e => console.warn(e));
}

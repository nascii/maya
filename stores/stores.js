'use strict'

import R from 'ramda';
import React, {AsyncStorage} from 'react-native';

import most from 'most';
import Backbone from 'backbone';

import url from 'url';

import {VK_API_HOSTNAME, SERVER_HOSTNAME, SERVER_PORT} from '../config.js';

import {tokenStream, toggledUsersStream} from '../actions/actions.js';

export {tokenStream} from '../actions/actions.js';

// export var usersStream = tokenStream.flatMap(function (token) {
    // return most.fromPromise(getUsers(token));
// });
tokenStream.observe(function (token) {
    appModel.set(token);
});
// usersStream.observe(function (girlsColleciton) {
//     girls.reset(girlsColleciton);
// });

var _users = [
    {"id":5085316,"first_name":"Елена","last_name":"Лисичкина","sex":1,"nickname":"","photo_100":"https://pp.vk.me/c624623/v624623316/34321/usu3z_QPRMo.jpg","online":0},{"id":26544316,"first_name":"Alena","last_name":"Lermontova","sex":1,"nickname":",","photo_100":"https://pp.vk.me/c627531/v627531316/d8f0/xSLMqK827xk.jpg","online":0},{"id":29008136,"first_name":"Людмила","last_name":"Морозова","sex":1,"nickname":"","photo_100":"https://pp.vk.me/c629119/v629119136/19ed5/M44uiMB-qI8.jpg","online":0},{"id":181035188,"first_name":"Светлана","last_name":"Щербакова","sex":1,"nickname":"","photo_100":"https://pp.vk.me/c625520/v625520188/3a33a/obJA_WOoqyQ.jpg","online":0},{"id":189365066,"first_name":"Ирина","last_name":"Щербакова","sex":1,"nickname":"","photo_100":"https://pp.vk.me/c625226/v625226066/383db/fonOHFIWmHY.jpg","online":0},{"id":190044548,"first_name":"Екатерина","last_name":"Кабес","sex":1,"nickname":"","photo_100":"https://pp.vk.me/c320718/v320718548/5c13/AOW2Y_GSVfY.jpg","online":0},{"id":262610426,"first_name":"Мария","last_name":"Семенова","sex":1,"nickname":"","photo_100":"https://pp.vk.me/c619718/v619718426/f1d7/NUtwI8Ra3HU.jpg","online":0},{"id":327490472,"first_name":"Надежда","last_name":"Куркина","sex":1,"nickname":"","photo_100":"https://pp.vk.me/c627519/v627519472/1a49c/222arTMwLrI.jpg","online":0}
];

var Girl = Backbone.Model.extend({

});

var Girls = Backbone.Collection.extend({
    model: Girl
});

var AppModel = Backbone.Model.extend({

});

export var appModel = new AppModel();

export var girls = new Girls();

toggledUsersStream.observe(function (id) {
    var girl = girls.get(id);
    if (girl.get('liked')) {
        girls.get(id).set('liked', false);
    } else {
        girls.get(id).set('liked', true);
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

function getUsers(token) {
    const urlObj = {
        hostname: SERVER_HOSTNAME,
        protocol: 'http',
        pathname: 'api/v1/getFriends',
        query: {
            code: token.code
        }
    }
    const requestUrl = url.format(urlObj);

    // return Promise.resolve(_users);
    return fetch(requestUrl, {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => {console.log(response); return response.json();})
        .then(responseJSON => console.log(responseJSON))
        .catch(e => console.warn(e));
}

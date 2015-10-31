'use strict'

import most from 'most';

import {VK_API_HOSTNAME, SERVER_HOSTNAME, SERVER_PORT} from '../config.js';

import {tokenStream} from '../actions/actions.js';

export {tokenStream} from '../actions/actions.js';

export var usersStream = tokenStream.flatMap(function (token) {
    return most.fromPromise(getUsers(token));
});


function sendToken(token) {
    const urlObj = {
        method: post,
        hostname: SERVER_HOSTNAME,
        port: SERVER_PORT,
        protocol: 'http',
        pathname: 'api/v1/auth',
        body: JSON.stringify({
    		access_token: token
    	})
    }
    const requestUrl = url.format(urlObj);

    return fetch(requestUrl)
        .then(response => response.json())
        .then(responseJSON => {
            console.log(responseJSON);
            Promise.resolve(responseJSON.response.items)
        })
        .catch(e => console.warn(e));
}



function getUsers(token) {
    const urlObj = {
        hostname: VK_API_HOSTNAME,
        protocol: 'https',
        pathname: 'method/users.search',
        query: {
            access_token: token,
            city: 1,
            sex: 1,
            offset: 100,
            count: 40,
            v: '5.8',
            fields: 'photo_100'
        }
    }
    const requestUrl = url.format(urlObj);

    return fetch(requestUrl)
        .then(response => response.json())
        .then(responseJSON => Promise.resolve(responseJSON.response.items))
        .catch(e => console.warn(e));
}

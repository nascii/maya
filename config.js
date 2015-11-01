'use strict';

import url from 'url';

const CLIENT_ID = 5119199;
const APP_NAME = 'maya';
const APP_URL = 'http://127.0.0.1';
export const APP_HOSTNAME = '127.0.0.1';
export const VK_API_HOSTNAME = 'api.vk.com';
const VK_AUTH_HOSTNAME = 'oauth.vk.com';
export const SERVER_HOSTNAME = '104.238.189.178';
export const SERVER_PORT = 993;


// const API_TOKEN = 'gYn9y6R9Oh6I9xlD7qsM';

export const VK_AUTH_URL = url.format({
    hostname: VK_AUTH_HOSTNAME,
    protocol: 'https',
    pathname: 'authorize',
    query: {
        client_id: CLIENT_ID,
        redirect_uri: APP_URL,
        response_type: 'token',
        display: 'mobile',
        scope: 'notify,friends,wall,photos,notifications,offline',
        v: '5.37'
    }
});

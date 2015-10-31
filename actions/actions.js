'use strict'

import most from 'most';

export var setToken;
export var tokenStream = most.create(add => {setToken = add});

export var toggleUser;
export var toggledUsersStream = most.create(add => {toggleUser = add});
toggledUsersStream.drain();

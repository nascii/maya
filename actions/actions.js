'use strict'

import most from 'most';

export var setToken;
export var tokenStream = most.create(add => {setToken = add});

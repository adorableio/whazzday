import filter                              from 'redux-storage-decorator-filter'
import thunk                               from 'redux-thunk';
import promiseMiddleware                   from 'redux-promise';
import {Provider}                          from 'react-redux';
import {compose,
        createStore,
        applyMiddleware,
        combineReducers}                   from 'redux';

import * as storage                        from 'redux-storage'
import createEngine                        from 'redux-storage-engine-reactnativeasyncstorage';

import * as reducers                       from './reducers';

const reducer = storage.reducer(combineReducers({...reducers}));

const engine = createEngine('cardigan-app');
export const loadStoreFromAsyncStorage = storage.createLoader(engine);

// Do not save our app state to AsyncStorage, let us resolve that on our own
engine = filter(engine, [], [
  // ['app', 'isLoaded'],
]);

// Blacklisted actions will not trigger a save to redux-storage
const BLACKLISTED_ACTIONS = [
  // actions.SET_NETWORK_CONNECTED,
  // actions.SET_PERMISSION_STATUS
];

const WHITELISTED_ACTIONS = [];

const middlewares = [
  thunk,
  promiseMiddleware,
  storage.createMiddleware(engine, BLACKLISTED_ACTIONS, WHITELISTED_ACTIONS)
];

let composeStrategy = compose;
// if (__DEV__) {
//  composeStrategy = require('remote-redux-devtools').composeWithDevTools;
// }

const storeWithMiddleware = createStore(reducer,
  composeStrategy(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default storeWithMiddleware;

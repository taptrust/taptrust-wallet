import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';

import { LOGIN, SAVE_REQUEST, SAVE_PROFILE, LOGOUT } from '../actions/auth';

// Initial state
const initialState = {
    isLoggedIn: false,
    pubkey: null,
    userName: null,
    request_id: null,
    privateKey: null,
    token: null
};

// Reducer
const auth = (state = initialState, action) => {
  console.log('auth Reducer was called with action ', action);
    switch (action.type) {
        case LOGIN:
            let randomFactors;
            console.log("LOGIN_SUCCESS");
            randomFactors = state.randomFactors;
            console.log('previous random factors', randomFactors);
            if (!randomFactors){
              randomFactors = {};
            }
            randomFactors[action.formData.formData.username] = action.formData.randomFactor;
            console.log('new random factors', randomFactors);
            return {
                ...state,
                isLoggedIn: true,
                pubkey: action.formData.formData.pubkey,
                userName: action.formData.formData.username,
                privateKey: action.formData.privateKey,
                randomFactors: randomFactors
            };
        case SAVE_PROFILE:
            console.log('saving profile', action.profile);
            return {
                ...state,
                profile: action.profile
            };
        case SAVE_REQUEST:
            console.log('Saving request_id');
            return {
                ...state,
                request_id: action.request_id,
            }
        case LOGOUT:
        console.log('LOG_OUT');
            return {
                ...state,
                isLoggedIn: false,
                pubkey: null,
                userName: null,
                request_id: null,
            }
        default:
            return state;
    }
}

const persistConfig = {
    key: 'auth',
    storage,
};

export default persistReducer(persistConfig, auth);

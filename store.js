import { createStore, combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';

const appInitialState = {
  heartBeat: false,
  mapData : {},
};

const SET_HEART_BEAT = 'SET_HEART_BEAT';
const SET_LAT_LONG = 'SET_LAT_LONG';

export const setHeartBeat = createAction(SET_HEART_BEAT);
export const setLatLong = createAction(SET_LAT_LONG);

const App = handleActions(
  {
    [SET_HEART_BEAT]: (state, { payload }) => ({
      ...state,
      heartBeat: payload,
    }),
  },
  appInitialState,
);
const Map = handleActions(
  {
    [SET_LAT_LONG]: (state, { payload }) => ({
      ...state,
      mapData: payload,
    }),
  },
  appInitialState,
);
const rootReducer = combineReducers({
   Map, App
});

const configureStore = () => createStore(rootReducer);
export const store = configureStore();

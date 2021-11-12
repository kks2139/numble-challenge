import { combineReducers } from 'redux';
import app from './app';
import homePage from './homePage';

const rootReducer = combineReducers({
    app,
    homePage,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
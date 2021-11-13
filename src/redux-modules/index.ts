import { combineReducers } from 'redux';
import app from './app';
import bookContentPage from './bookContentPage';

const rootReducer = combineReducers({
    app,
    bookContentPage,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
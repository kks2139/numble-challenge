import { combineReducers } from 'redux';
import app from './app';
import bookContentPage from './bookContentPage';
import cartPage from './cartPage';

const rootReducer = combineReducers({
    app,
    bookContentPage,
    cartPage
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
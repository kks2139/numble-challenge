import {BookData} from '../utils/interfaces';

const SET_BOOKS = 'homePage/SET_BOOKS' as const;

export const setBooks = (arg: BookData[])=> ({ 
    type : SET_BOOKS,
    payload : arg
});

type actionType = 
    | ReturnType<typeof setBooks>

type stateType = {
    books: BookData[]
}

const initState: stateType = {
    books: []
};

function homePage(state: stateType = initState, action: actionType) {
    switch (action.type) {
        case SET_BOOKS:
            return {
                ...state,
                books: action.payload.slice()
            };
        default:
            return state;
  }
}

export default homePage;
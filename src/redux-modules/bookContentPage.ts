import {BookData, BookType} from '../utils/interfaces';

const SET_BOOKS = 'bookContentPage/SET_BOOKS' as const;
const SET_BOOK_TYPES = 'bookContentPage/SET_BOOK_TYPES' as const;

export const setBooks = (arg: BookData[])=> ({ 
    type : SET_BOOKS,
    payload : arg
});
export const setBookTyps = (arg: BookType[])=> ({ 
    type : SET_BOOK_TYPES,
    payload : arg
});

type actionType = 
    | ReturnType<typeof setBooks>
    | ReturnType<typeof setBookTyps>

type stateType = {
    books: BookData[]
    bookTypes: BookType[]
}

const initState: stateType = {
    books: [],
    bookTypes: [],
};

function bookContentPage(state: stateType = initState, action: actionType) {
    switch (action.type) {
        case SET_BOOKS:
            return {
                ...state,
                books: action.payload.slice()
            };
        case SET_BOOK_TYPES:
            return {
                ...state,
                bookTypes: action.payload.slice()
            };
        default:
            return state;
  }
}

export default bookContentPage;
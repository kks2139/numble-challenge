import {User, BookData} from '../utils/interfaces';

const ADD_BOOK = 'cartPage/ADD_BOOK' as const;
const REMOVE_BOOK = 'cartPage/REMOVE_BOOK' as const;
const ADD_CHECKED_BOOK = 'cartPage/ADD_CHECKED_BOOK' as const;
const REMOVE_CHECKED_BOOK = 'cartPage/REMOVE_CHECKED_BOOK' as const;
const ADD_ALL_CHECKED_BOOKS = 'cartPage/ADD_ALL_CHECKED_BOOKS' as const;
const REMOVE_ALL_CHECKED_BOOKS = 'cartPage/REMOVE_ALL_CHECKED_BOOKS' as const;

export const addBook = (arg: BookData)=> ({ 
    type : ADD_BOOK,
    payload : arg
});
export const removeBook = (arg: number)=> ({ 
    type : REMOVE_BOOK,
    payload : arg
});
export const addCheckedBook = (arg: BookData)=> ({ 
    type : ADD_CHECKED_BOOK,
    payload : arg
});
export const removeCheckedBook = (arg: number)=> ({ 
    type : REMOVE_CHECKED_BOOK,
    payload : arg
});
export const addAllCheckedBooks = (arg: BookData[])=> ({ 
    type : ADD_ALL_CHECKED_BOOKS,
    payload : arg
});
export const removeAllCheckedBooks = ()=> ({ 
    type : REMOVE_ALL_CHECKED_BOOKS,
});

type actionType = 
    | ReturnType<typeof addBook>
    | ReturnType<typeof removeBook>
    | ReturnType<typeof addCheckedBook>
    | ReturnType<typeof removeCheckedBook>
    | ReturnType<typeof addAllCheckedBooks>
    | ReturnType<typeof removeAllCheckedBooks>

type stateType = {
    cartList: BookData[],
    checkedList: BookData[]
}

const initState: stateType = {
    cartList: [],
    checkedList: [],
};

function cartPage(state: stateType = initState, action: actionType) {
    switch (action.type) {
        case ADD_BOOK:
            return {
                ...state,
                cartList: state.cartList.concat(action.payload)
            };
        case REMOVE_BOOK:
            return {
                ...state,
                cartList: state.cartList.filter(book => book.id !== action.payload)
            };
        case ADD_CHECKED_BOOK:
            return {
                ...state,
                checkedList: state.checkedList.concat(action.payload)
            };
        case REMOVE_CHECKED_BOOK:
            return {
                ...state,
                checkedList: state.checkedList.filter(book => book.id !== action.payload)
            };
        case ADD_ALL_CHECKED_BOOKS:
            return {
                ...state,
                checkedList: action.payload.slice().map(b => ({...b}))
            };
        case REMOVE_ALL_CHECKED_BOOKS:
            return {
                ...state,
                checkedList: []
            };
        default:
            return state;
  }
}

export default cartPage;
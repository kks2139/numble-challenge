import {User, BookData} from '../utils/interfaces';

const ADD_BOOK = 'cartPage/ADD_BOOK' as const;
const REMOVE_BOOK = 'cartPage/REMOVE_BOOK' as const;

export const addBook = (arg: BookData)=> ({ 
    type : ADD_BOOK,
    payload : arg
});
export const removeBook = (arg: number)=> ({ 
    type : REMOVE_BOOK,
    payload : arg
});

type actionType = 
    | ReturnType<typeof addBook>
    | ReturnType<typeof removeBook>

type stateType = {
    cartList: BookData[]
}

const initState: stateType = {
    cartList: []
};

function myRidi(state: stateType = initState, action: actionType) {
    switch (action.type) {
        case ADD_BOOK:
            return {
                ...state,
                cartList: state.cartList.concat(action.payload)
            };
        case REMOVE_BOOK:
            return {
                ...state,
                cartList: state.cartList.map(book => book.id !== action.payload)
            };
        default:
            return state;
  }
}

export default myRidi;
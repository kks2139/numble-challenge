import {BookData, BookType, IconInfo, Event} from '../utils/interfaces';

const SET_BOOKS = 'bookContentPage/SET_BOOKS' as const;
const SET_EVENTS = 'bookContentPage/SET_EVENTS' as const;
const SET_BOOK_TYPES = 'bookContentPage/SET_BOOK_TYPES' as const;

export const setBooks = (arg: BookData[])=> ({ 
    type : SET_BOOKS,
    payload : arg
});
export const setEvents = (arg: Event[])=> ({ 
    type : SET_EVENTS,
    payload : arg
});
export const setBookTyps = (arg: BookType[])=> ({ 
    type : SET_BOOK_TYPES,
    payload : arg
});

type actionType = 
    | ReturnType<typeof setBooks>
    | ReturnType<typeof setEvents>
    | ReturnType<typeof setBookTyps>

type stateType = {
    books: BookData[]
    bookTypes: BookType[]
    icons: IconInfo[]
    events: Event[]
}

const initState: stateType = {
    books: [],
    bookTypes: [],
    icons: [ 
        {title : '신간', color : 'rgb(232, 203, 153)', cont : 'NEW'},
        {title : '베스트', color : 'rgb(185, 190, 241)', cont : 'Best'},
        {title : '이벤트', color : 'rgb(153, 209, 203)', cont : 'Event'},
        {title : '신작캘린더', color : 'rgb(153, 192, 225)', cont : 'Calen'},
        {title : '십오야', color : 'rgb(241, 192, 167)', cont : 'Moon'},
        {title : 'MD 추천', color : 'rgb(213, 173, 235)', cont : 'MD'},
        {title : '리디ONLY', color : 'rgb(232, 180, 206)', cont : 'RIDI'},
        {title : '50화 무료', color : 'rgb(171, 220, 186)', cont : 'FREE'},
        {title : '위클리쿠폰', color : 'rgb(240, 185, 185)', cont : 'Coup'}
    ],
    events: []
};

function bookContentPage(state: stateType = initState, action: actionType) {
    switch (action.type) {
        case SET_BOOKS:
            return {
                ...state,
                books: action.payload.slice()
            };
        case SET_EVENTS:
            return {
                ...state,
                events: action.payload.slice()
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
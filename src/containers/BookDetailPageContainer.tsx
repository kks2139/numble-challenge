import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {RootState} from '../redux-modules/index';
import {BookDetailPage} from '../components/index';
import { addBook } from '../redux-modules/cartPage';
import { pushMsg } from '../redux-modules/app';
import { BookData, MessageInfo } from '../utils/interfaces';
import {ToastMessageContainer} from '../containers/index';

function BookDetailPageContainer() {
    const dispatch = useDispatch();

    const toCart = (book: BookData)=>{
        dispatch(addBook(book));
    }
    
    const showMsg = (msgInfo: MessageInfo)=>{
        dispatch(pushMsg(<ToastMessageContainer {...msgInfo}/>));
    }
    
    return <BookDetailPage toCart={toCart} showMsg={showMsg}/>;
}

export default BookDetailPageContainer;

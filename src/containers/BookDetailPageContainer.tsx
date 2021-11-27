import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {RootState} from '../redux-modules/index';
import {BookDetailPage} from '../components/index';
import { addBook } from '../redux-modules/cartPage';
import { BookData } from '../utils/interfaces';

function BookDetailPageContainer() {
    const dispatch = useDispatch();

    const toCart = (book: BookData)=>{
        dispatch(addBook(book));
    }

    return (
        <div>
            <BookDetailPage toCart={toCart}/>
        </div>
    );
}

export default BookDetailPageContainer;

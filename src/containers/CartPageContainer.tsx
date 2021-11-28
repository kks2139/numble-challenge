import React, { useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux-modules/index';
import {CartPage} from '../components/index';
import {BookData, User} from '../utils/interfaces';
import {setUser} from '../redux-modules/app';
import { removeBook, removeCheckedBook } from '../redux-modules/cartPage';

function CartPageContainer() {
    const dispatch = useDispatch();
    const {cartList, checkedList} = useSelector((state: RootState)=> state.cartPage);

    const onBookDelete = (book: BookData)=>{
        dispatch(removeBook(book.id));
        dispatch(removeCheckedBook(book.id));
    }

    return <CartPage bookList={cartList} checkedList={checkedList} onBookDelete={onBookDelete}/>;
}

export default CartPageContainer;

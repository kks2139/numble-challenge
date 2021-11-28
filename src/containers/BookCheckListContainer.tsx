import React, { useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useDispatch} from 'react-redux';
import {RootState} from '../redux-modules/index';
import {BookCheckList} from '../components/index';
import { addCheckedBook, removeCheckedBook, addAllCheckedBooks, removeAllCheckedBooks } from '../redux-modules/cartPage';
import {BookData} from '../utils/interfaces';

interface Props {
    bookList: BookData[]
    onDelete: (param: BookData)=> void
}

function BookCheckedListContainer({bookList, onDelete}: Props) {
    const dispatch = useDispatch();

    const checkedBookChanged = (book: BookData, value: boolean)=>{
        if(value){
            dispatch(addCheckedBook(book));
        }else{
            dispatch(removeCheckedBook(book.id));
        }
    }

    const checkedAllBooksChanged = (books: BookData[], value: boolean)=>{
        if(value){
            dispatch(addAllCheckedBooks(books));
        }else{
            dispatch(removeAllCheckedBooks());
        }
    }

    return <BookCheckList 
                onDelete={onDelete} 
                bookList={bookList}
                checkedBookChanged={checkedBookChanged}
                checkedAllBooksChanged={checkedAllBooksChanged}/>;
}

export default BookCheckedListContainer;

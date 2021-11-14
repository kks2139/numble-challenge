import React, { useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux-modules/index';
import {setBooks, setBookTyps} from '../redux-modules/bookContentPage';
import {BookContentPage} from '../components/index';
import { BookData } from '../utils/interfaces';
import { translate, request } from '../utils/util';
import {useParams} from 'react-router-dom';

interface Props {
    // category: string
}

function BookContentPageContainer({}: Props) {
    const {category='fantasy'} = useParams(); 
    const dispatch = useDispatch();
    const {books, bookTypes} = useSelector((state: RootState)=> state.bookContentPage);

    const onClickType = (value: string)=>{
        const changedSelType = bookTypes.map(b => ({
            ...b,
            selected: translate(b.type) === value
        }));
        dispatch(setBookTyps(changedSelType));
    }

    const getBookList = async ()=>{
        const res: BookData[] = await request('getBooks');

        const filtedBooks = res.filter(book => book.category.indexOf(category) > -1);
        const bookTypes = filtedBooks.map((book, i) => {
            return {
                type: book.type,
                selected: i === 0
            };
        }).filter((d, i, arr) => arr.findIndex(a => a.type === d.type) === i);

        dispatch(setBooks(filtedBooks));
        dispatch(setBookTyps(bookTypes));
    }

    useEffect(()=>{
        getBookList();
    }, [category]);

    return (
        <div css={style}>
            <BookContentPage books={books} types={bookTypes} category={category} onClickType={onClickType}/>
        </div>
    );
}

const style = css`
`;

export default BookContentPageContainer;

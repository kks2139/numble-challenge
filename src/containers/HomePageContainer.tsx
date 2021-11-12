import React, { useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux-modules/index';
import {setBooks} from '../redux-modules/homePage';
import {HomePage} from '../components/index';
import { BookData } from '../utils/interfaces';
import { request } from '../utils/util';

function HomePageContainer() {
    const dispatch = useDispatch();
    const {books} = useSelector((state: RootState)=> state.homePage);

    const getBookList = async ()=>{
        const res = await request('getBooks');
        dispatch(setBooks(res));
     }

     useEffect(()=>{
        getBookList();
    }, []);

    return (
        <div css={style}>
            <HomePage bookList={books}/>
        </div>
    );
}

const style = css`
`;

export default HomePageContainer;

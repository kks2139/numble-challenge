import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {BookData} from '../../utils/interfaces';

interface Props {
    type: 'general' | 'romance' | 'fantasy' | 'webtoon' | 'bl';
    bookList: BookData[]
}

function BookContentPage({bookList, type}: Props) {
    return (
        <div css={style}>
            {type} 책 정보조회
        </div>
    );
}

const style = css`

`;

export default BookContentPage;

import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {BookData} from '../utils/interfaces';

interface Props {
    book: BookData
    gridType?: boolean 
}

function BookSliderItem({book, gridType=false}: Props) {
    return (
        <div css={style}>

        </div>
    );
}

const style = css`
`;

export default BookSliderItem;

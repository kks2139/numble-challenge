import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {BookData} from '../utils/interfaces';
import {BookSliderItem} from './index';

interface Props {
    bookList: BookData[]
    gridType?: boolean 
}

function BookSlider({bookList, gridType=false}: Props) {
    return (
        <div css={style}>

        </div>
    );
}

const style = css`

`;

export default BookSlider;

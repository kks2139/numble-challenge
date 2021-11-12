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
            {type !== 'general' ?
                <div className='bar-wrapper'>
                    <div className='bar'>
                        <div className='txt'>웹소설</div>
                        <div className='wall'></div>
                        <div className='txt'>e북</div>
                    </div>
                </div>
            : null}
        </div>
    );
}

const style = css`
    .bar-wrapper {
        display: flex;
        justify-content: center;
        .bar {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 48px;
            .wall {
                width: 1px;
                height: 14px;
                background-color: var(--dodgeblue_20);
                margin: 4px 10px 0 10px;
            }
        }
    }
`;

export default BookContentPage;

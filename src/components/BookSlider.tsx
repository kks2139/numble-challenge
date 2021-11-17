import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {BookData} from '../utils/interfaces';
import {BookCard} from './index';

interface Props {
    bookList: BookData[]
    gridType?: boolean 
    hideRate?: boolean
    hideTotal?: boolean
    hidePrice?: boolean
    width?: number
    badge?: 'waitFree' | 'discount';
}

function BookSlider({bookList, gridType=false, hideRate=true, hideTotal=true, hidePrice=true, width=110, badge='waitFree'}: Props) {
    return (
        <div css={style}>
            <div className='wrapper'>
                    {bookList.map(book => (
                        <div className='card'>
                            <BookCard 
                                key={book.id}
                                book={book}
                                hideRate={hideRate}
                                hideTotal={hideTotal}
                                hidePrice={hidePrice}
                                width={width}
                                badge={badge}/>
                        </div>
                    ))}
            </div>
        </div>
    );
}

const style = css`
    max-width: 1000px;
    > .wrapper {
        display: flex;
        width: 100%;
        padding: 10px 0 0 9px;
        overflow: hidden;
        .card {
            &:not(:first-child) {
                margin-left: 22px;
            }
        }
    }
`;

export default BookSlider;

import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {BookData, BookType} from '../../utils/interfaces';
import {translate} from '../../utils/util';

interface Props {
    books: BookData[]
    types: BookType[]
    category: string
    onClickType: (param: string)=> void
}

function BookContentPage({books, types, category, onClickType}: Props) {
    const onClickBookType = (e: React.MouseEvent<HTMLDivElement>)=>{
        onClickType(e.currentTarget.textContent || '');
    }

    useEffect(()=>{

    }, []);

    return (
        <div css={style}>
            {/* {category} !! */}
            <div className='bar-wrapper'>
                <div className='bar'>
                    {types.map((type, i, arr) => (
                        <section key={type.type}>
                            <div className={`txt ${type.selected ? 'sel' : ''}`} onClick={onClickBookType}>{translate(type.type)}</div>
                            {i !== arr.length-1 ? <div className='wall'></div> : null}
                        </section>
                    ))}
                </div>
            </div>
            <div className='top-slider-box'>
                
            </div>
            <div className='cate-icons'>
                
            </div>
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
            section {
                display: flex;
                .txt {
                    font-size: 16px;
                    color: var(--slategray_50);
                    cursor: pointer;
                    &.sel {
                        font-weight: bold;
                        color: var(--dodgeblue_50);
                    }
                }
                .wall {
                    width: 2px;
                    height: 12px;
                    background-color: var(--slategray_10);
                    margin: 7px 15px 0 15px;
                    border-radius: 3px;
                }
            }
        }
    }
`;

export default BookContentPage;

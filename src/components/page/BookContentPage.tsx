import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {BookData, BookType, IconInfo} from '../../utils/interfaces';
import {translate} from '../../utils/util';
import {ImageSlider, Icon, Panel, BookSlider} from '../index';

interface Props {
    books: BookData[]
    types: BookType[]
    icons: IconInfo[]
    onClickType: (param: string)=> void
}

function BookContentPage({books, types, icons, onClickType}: Props) {
    const onClickBookType = (e: React.MouseEvent<HTMLDivElement>)=>{
        onClickType(e.currentTarget.textContent || '');
    }

    const filterHighRateBooks = ()=> books.filter(book => book.starRate.rate > 4);

    const filterWaitFree = ()=> books.filter(book => book.waitFree);
    
    useEffect(()=>{

    }, []);

    return (
        <div css={style}>
            {/* {category} !! */}
            <section className='bar-wrapper'>
                <div className='bar'>
                    {types.map((type, i, arr) => (
                        <section key={type.type}>
                            <div className={`txt ${type.selected ? 'sel' : ''}`} onClick={onClickBookType}>{translate(type.type)}</div>
                            {i !== arr.length-1 ? <div className='wall'></div> : null}
                        </section>
                    ))}
                </div>
            </section>
            <section className='main-slider-box'>
                <ImageSlider bookList={filterHighRateBooks()}/>
            </section>
            <section className='cate-icons'>
                <div className='wrapper'>
                    {icons.map(ic => (
                        <Icon color={ic.color} title={ic.title}>
                            <span>{ic.cont}</span>
                        </Icon>
                    ))}
                </div>
            </section>
            <section className='book-list-box'>
                <Panel title='특별기간 기다리면 무료'>
                    <BookSlider bookList={filterWaitFree()}/>
                </Panel>
            </section>
        </div>
    );
}

const style = css`
    .bar-wrapper {
        display: flex;
        justify-content: center;
        > .bar {
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
    .cate-icons {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 95px;
        margin-bottom: 40px;
        > .wrapper {
            max-width: 1000px;
            width: 1000px;
            display: flex;
            justify-content: space-between;
        }
    }
    .book-list-box {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export default BookContentPage;

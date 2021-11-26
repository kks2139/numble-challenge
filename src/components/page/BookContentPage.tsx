import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {BookData, BookType, Event, IconInfo} from '../../utils/interfaces';
import {translate} from '../../utils/util';
import {ImageSlider, Icon, Panel, BookSlider, BookGridSlider} from '../index';
import {useNavigate} from 'react-router-dom';

interface Props {
    books: BookData[]
    events: Event[]
    types: BookType[]
    icons: IconInfo[]
    onClickType: (param: string)=> void
}

function BookContentPage({books, events, types, icons, onClickType}: Props) {
    const navigate = useNavigate();

    const onClickBookType = (e: React.MouseEvent<HTMLDivElement>)=>{
        onClickType(e.currentTarget.textContent || '');
    }

    const filterHighRateBooks = ()=> books.filter(book => book.starRate.rate > 3);

    const filterWaitFree = ()=> books.filter(book => book.waitFree);

    const filterLotsOfAwards = ()=> books.filter(book => book.author.awards.length > 2);

    const filterLotsAuthorCareer = ()=> books.filter(book => book.author.representatives.length > 1);

    const filterForGridSlider = ()=> books.slice(0, 9);
    
    const getHourMin = ()=> {
        const arr = new Date().toTimeString().split(':');
        return `${arr[0]}시 ${arr[1]}분`;
    }

    const onClickImage = (imgUrl: string)=>{
        navigate('/event', {
            state: {
                details: events.filter(ev => ev.thumbnail === imgUrl)[0].details
            }
        });
    }
    
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
            <section className='img-slide-box'>
                <ImageSlider eventList={events} onClickImage={onClickImage}/>
            </section>
            <section className='cate-icons'>
                <div className='wrapper'>
                    {icons.map(ic => (
                        <Icon color={ic.color} title={ic.title}>
                            <span style={{whiteSpace: 'pre'}}>{ic.cont}</span>
                        </Icon>
                    ))}
                </div>
            </section>
            <section className='book-list-box'>
                <Panel title='수상 경력이 다양한 작가의 작품!' dark={true} titleLink={false}>
                    <BookSlider bookList={filterLotsOfAwards()} dark={true}  badge='discount' hideRate={true} hideTotal={true} hidePrice={true}/>
                </Panel>
                <Panel title='사람들이 지금 많이 읽고있는 책' titleLink={false} label={getHourMin()}>
                    <BookGridSlider bookList={filterForGridSlider()} width={50} height={70}/>
                </Panel>
                <Panel title='특별기간 기다리면 무료'>
                    <BookSlider bookList={filterWaitFree()} badge='waitFree'/>
                </Panel>
                <Panel title='베스트 셀러'>
                    <BookGridSlider bookList={filterForGridSlider()} width={80} height={113}/>
                </Panel>
                <Panel title='오늘, 리디의 발견'>
                    <BookSlider bookList={filterLotsAuthorCareer()} hideRate={true}  hidePrice={true} hideTotal={true}/>
                </Panel>
                <Panel title='금주의 추천도서'>
                    <BookSlider bookList={filterHighRateBooks()}  hidePrice={true} hideTotal={true}/>
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
        margin-bottom: 30px;
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

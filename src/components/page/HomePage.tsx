import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {Link} from 'react-router-dom';
import {BookData} from '../../utils/interfaces';
import {Routes, Route, Outlet} from 'react-router-dom';
import {BookContentPage, CategoryListPage} from '../index';
import { NavLink } from 'react-router-dom';

interface Props {
    bookList: BookData[]
}

function HomePage({bookList}: Props) {
    const getClass = (isActive: boolean)=> isActive ? 'sel' : '';

    return (
        <div css={style}>
            <div className='link-wrapper'>
                <div className='link-box'>
                    <Link to='category/list'>
                        <div className='icon'>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </Link>
                    <NavLink to='general' className={({isActive})=> getClass(isActive)}>일반</NavLink>
                    <NavLink to='romance-serial' className={({isActive})=> getClass(isActive)}>로맨스</NavLink>
                    <NavLink to='fantasy-serial' className={({isActive})=> getClass(isActive)}>판타지</NavLink>
                    <NavLink to='webtoon' className={({isActive})=> getClass(isActive)}>만화</NavLink>
                    <NavLink to='bl-webnovel' className={({isActive})=> getClass(isActive)}>BL</NavLink>
                </div>
            </div>
            <div className='content-box'>
                {/* <Outlet/> --> 파라미터를 넘겨줄 방법이 없는듯하여 App 말고 여기서 다시 Route 분기 */}
                <Routes>
                    <Route path='category/list' element={<CategoryListPage/>}/>
                    <Route path='' element={<BookContentPage bookList={bookList} type='general'/>}/>
                    <Route path='general' element={<BookContentPage bookList={bookList} type='general'/>}/>
                    <Route path='romance-serial' element={<BookContentPage bookList={bookList} type='romance'/>}/>
                    <Route path='fantasy-serial' element={<BookContentPage bookList={bookList} type='fantasy'/>}/>
                    <Route path='webtoon' element={<BookContentPage bookList={bookList} type='webtoon'/>}/>
                    <Route path='bl-webnovel' element={<BookContentPage bookList={bookList} type='bl'/>}/>
                </Routes>
            </div>
        </div>
    );
}

const style = css`
    background-color: white;
    .link-wrapper {
        border-bottom: 1px solid var(--slategray_20);
        .link-box {
            display: flex;
            align-items: center;
            max-width: 1000px;
            padding: 16px 20px;
            > * {
                cursor: pointer;
                &:hover {
                    color: var(--slategray_40);
                }
            }
            .icon {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                &:hover > div {
                    background-color: var(--slategray_50);
                }
                div {
                    height: 2px;
                    border-radius: 3px;
                    background-color: var(--slategray_60);
                    margin: 2px 0;
                }
                div:nth-child(1) {width: 22px;}
                div:nth-child(2) {width: 16px;}
                div:nth-child(3) {width: 8px;}
            }
            a {
                font-size: 16px;
                font-weight: bold;
                color: var(--slategray_80);
                padding: 0 12px;
                margin: 0 10px;
                &.sel {
                    color: var(--dodgeblue_60);
                }
            }
        }
    }
`;

export default HomePage;

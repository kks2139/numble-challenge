import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import {CategoryListPage} from '../index';
import { Link } from 'react-router-dom';
import {categories} from '../../utils/util';
import {BookContentPageContainer} from '../../containers/index';

interface Props {
}

function HomePage({}: Props) {
    const divRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();

    const onClickLink = (e: React.MouseEvent<HTMLAnchorElement>)=>{
        toggleSelected(e.currentTarget);
        navigate(e.currentTarget.pathname);
    }

    const toggleSelected = (node: HTMLElement)=>{
        divRef.current?.querySelectorAll('a.sel').forEach(el => el.classList.remove('sel'));
        node.classList.add('sel');
    }

    useEffect(()=>{
        // navigate('fantasy');
    }, []);

    return (
        <div css={style} ref={divRef}>
            <div className='link-wrapper'>
                <div className='link-box'>
                    <Link to='category/list' onClick={onClickLink}>
                        <div className='icon'>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </Link>
                    {categories.map((cate, i) => (
                        <Link 
                            className={i === 0 ? 'sel' : ''}
                            key={cate.data} 
                            to={cate.data} 
                            onClick={onClickLink}>
                            {cate.label}
                        </Link>
                    ))}
                </div>
            </div>
            <div className='content-box'>
                <Routes>
                    <Route path='category/list' element={<CategoryListPage/>}/>
                    <Route path='' element={<BookContentPageContainer/>}/>
                    <Route path=':category' element={<BookContentPageContainer/>}/>
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
                // font-weight: bold;
                color: var(--slategray_80);
                padding: 0 12px;
                margin: 0 10px;
                &.sel {
                    font-weight: bold;
                    color: var(--dodgeblue_60);
                }
            }
        }
    }
`;

export default HomePage;

import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {Link} from 'react-router-dom';
import {BookData} from '../../utils/interfaces';
import {request} from '../../utils/util';

function HomePage() {
    const [bookData, setBookData] = useState<BookData[]>([]);

    const getBooks = async ()=>{
       const res = await request('getBooks');
        setBookData(res);
    }

    useEffect(()=>{
        getBooks();
    }, []);

    return (
        <div css={style}>
            <div className='category-box'>
                <Link to=''>
                    <div className='icon'>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </Link>
                <Link to='/general' className='sel'>일반</Link>
                <Link to='/romance-serial'>로맨스</Link>
                <Link to='/fantasy-serial'>판타지</Link>
                <Link to='/webtoon'>만화</Link>
                <Link to='/bl-webnovel'>BL</Link>
            </div>
        </div>
    );
}

const style = css`
    background-color: white;
    border-bottom: 1px solid var(--slategray_20);
    .category-box {
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
                background-color: var(--slategray_40);
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
                font-size: 17px;
            }
        }
    }
`;

export default HomePage;

import React, { Provider, useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {IoMdSearch} from 'react-icons/io';
import {IoCloseOutline} from 'react-icons/io5';

interface Props {
    onSearch: (param: string)=> void;
}

function SearchBar({onSearch}: Props) {
    const [searchText, setSearchText] = useState('');
    const [recentSearch, setRecentSearch] = useState<string[]>([]);
    const [show, setShow] = useState({
        cancelBox: false,
        resultBox: false
    });
    const SEARCH_HISTORY = 'searchHistory';

    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.currentTarget;
        setSearchText(value);
        setShow({
            cancelBox: value ? true : false,
            resultBox: true
        });
    }

    const onFocus = (e: React.FocusEvent<HTMLInputElement>)=>{
        if(e.currentTarget.name === 'searchBar'){
            setShow({
                cancelBox: searchText ? true : false,
                resultBox: true
            });
        }
    }
    const onBlur = (e: React.FocusEvent<HTMLDivElement>)=>{
        if(e.relatedTarget) return;
        setShow({
            cancelBox: false,
            resultBox: false
        });
    }

    const onClickClearText = ()=>{
        setShow({
            ...show,
            cancelBox: false,
        });
        setSearchText('');
    }

    const onClickRemoveRecent = (e: React.MouseEvent<HTMLElement>)=>{
        const text = e.currentTarget.parentNode?.querySelector('[data-recent]')?.textContent;
        removeSearchHistory(text || '');
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === 'Enter'){
            addSearchHistory(searchText);
            onSearch(searchText);
            setShow({
                cancelBox: false,
                resultBox: false
            });
        }
    }

    const addSearchHistory = (addText: string)=>{
        const newList = getSearchHistoryList().slice();
        newList.unshift(addText);
        if(newList.length > 5){
            newList.pop();
        }
        localStorage.setItem(SEARCH_HISTORY, JSON.stringify(newList));
    }
    
    const removeSearchHistory = (removeText: string)=>{
        const list = getSearchHistoryList();
        const newList = list.filter(txt => txt !== removeText);

        localStorage.setItem(SEARCH_HISTORY, JSON.stringify(newList));
        setRecentSearch(newList);
    }

    const getSearchHistoryList = ():string[] =>{
        return JSON.parse(localStorage.getItem(SEARCH_HISTORY) || '[]');
    }

    useEffect(()=>{
        setRecentSearch(getSearchHistoryList());
    }, [show]);

    return (
        <div css={style} tabIndex={0} onBlur={onBlur}>
            <div className='icon'>
                <IoMdSearch size='24' color='#b8bfc4'/>
            </div>
            <div className='input-box'>
                <input 
                    name='searchBar'
                    placeholder='제목, 저자, 출판사 검색' 
                    autoComplete='off' 
                    onFocus={onFocus}
                    onKeyDown={onKeyDown} 
                    onChange={onChange} 
                    value={searchText}/>
                <div className={`cancel-box ${show.cancelBox ? 'show' : ''}`} onClick={onClickClearText}>
                    <div className='btn-x'>
                        <div className='line-1'></div>
                        <div className='line-2'></div>
                    </div>
                </div>
            </div>
            <div className={`result-box ${show.resultBox ? 'show' : ''}`}>
                <div className='recent-box'>
                    <div className='last-txt'>최근 검색어</div>
                    <div className='last-txt-list-box'>
                        {recentSearch.map(txt => (
                            <div className='row' key={txt}>
                                <div className='txt' data-recent>{txt}</div>
                                <div className='remove' onClick={onClickRemoveRecent}>
                                    <IoCloseOutline color='#d1d5d9' size='20'/>
                                </div>
                            </div>
                        ))}
                        {recentSearch.length === 0 ? 
                            <div className='no-recent'>최근 검색어 내역이 없습니다.</div> 
                        : null}
                    </div>
                    <div className='option-box'>
                        검색어 저장 끄기
                    </div>
                </div>
                <div className='filter-box'>
                    <div className='books-box'>
                        t
                    </div>
                    <div className='ebooks-box'>
                        e
                    </div>
                    <div className='ontion-box'>
                        b
                    </div>
                </div>
            </div>
        </div>
    );
}

const style = css`
    --radius: 3px;
    display: flex;
    width: 340px;
    height: 36px;
    border-radius: var(--radius);
    background-color: white;
    .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 34px;
        border-radius: var(--radius);
    }
    .input-box {
        flex-grow: 1;
        display: flex;
        input {
            border: 0;
            border-radius: var(--radius);
            width: 100%;
            height: 100%;
            font-size: 16px;
        }
        .cancel-box {
            &.show {
                display: flex;
            }
            display: none;
            justify-content: center;
            align-items: center;
            width: 34px;
            overflow: hidden;
            cursor: pointer;
            .btn-x {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 15px;
                height: 15px;
                border-radius: 50%;
                background-color: var(--slategray_40);
                [class*='line'] {
                    position: absolute;
                    width: 8px;
                    height: 1px;
                    background-color: white;
                }
                .line-1 {
                    transform: rotate(45deg);
                }
                .line-2 {
                    transform: rotate(-45deg);
                }
            }
        }
    }
    .result-box {
        &.show {
            display: flex;
        }
        display: none;
        flex-direction: column;
        z-index: 10;
        position: absolute;
        top: 54px;
        width: 380px;
        background-color: white;
        border-radius: var(--radius);
        // box-shadow: 3px 3px 25px -10px black;
        box-shadow: rgb(0 0 0 / 30%) 3px 3px 10px 3px;
        .recent-box {
            font-size: 14px;
            .last-txt {
                padding: 12px 16px;
                color: var(--slategray_50); 
            }
            .last-txt-list-box {
                .row {
                    display: flex;
                    padding: 12px 16px;
                    transition: .3s;
                    cursor: pointer;
                    &:hover {
                        background-color: var(--slategray_5);
                    }
                    .txt {
                        
                    }
                    .remove {
                        position: absolute;
                        right: 20px;
                        border: var(--test);
                        svg {
                            display: flex;
                            align-items: center;
                        }
                    }
                }
                .no-recent {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 160px;
                    color: var(--slategray_40);
                }
            }
            .option-box {
                padding: 12px 16px;
                color: var(--gray_30);
                background-color: var(--gray_5);
                border-radius: 0 0 var(--radius) var(--radius);
            }
        }
        .filter-box {
            display: none;
            .books-box {
    
            }
            .ebooks-box {
    
            }
            .option-box {
    
            }
        }
    }
`;

export default SearchBar;

import React, { Provider, useState } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {IoMdSearch} from 'react-icons/io';

interface Props {
    
}

function SearchBar({}: Props) {
    const [searchText, setSearchText] = useState('');
    const [show, setShow] = useState(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.currentTarget;
        setSearchText(value);
        setShow(value ? true : false);
    }

    const onFocus = (e: React.FocusEvent<HTMLInputElement>)=>{
        if(e.target.name === 'searchBar' && searchText){
            setShow(true);
        }
    }
    const onBlur = (e: React.FocusEvent<HTMLInputElement>)=>{
        if(e.target.name === 'searchBar'){
            setShow(false);
        }
    }

    const onMouseDown = ()=>{
        // onClick 이벤트로 하려 했으나 blur 가 click 보다 먼저 실행되고 click 이벤트가 발생하지 않음.
        // 일단은 mousedown 이벤트로 해결함.(mousedown 이 blur 보다 먼저 실행됨)
        setSearchText('');
    }

    return (
        <div css={style}>
            <div className='icon'>
                <IoMdSearch size='24' color='#b8bfc4'/>
            </div>
            <div className='input-box'>
                <input name='searchBar' placeholder='제목, 저자, 출판사 검색' onBlur={onBlur} onFocus={onFocus} onChange={onChange} value={searchText}></input>
                <div className={`cancel-box ${show ? 'show' : ''}`} onMouseDown={onMouseDown}>
                    <div className='btn-x'>
                        <div className='line-1'></div>
                        <div className='line-2'></div>
                    </div>
                </div>
            </div>
            <div className='result-box'>
                <div className='recent-box'>
                    <div className='last-txt'></div>
                    <div className='last-txt-list-box'>
                        <div className='txt'></div>
                        <div className='remove'></div>
                    </div>
                    <div className='option-box'>

                    </div>
                </div>
                <div className='filter-box'>
                    <div className='books-box'>

                    </div>
                    <div className='ebooks-box'>

                    </div>
                    <div className='ontion-box'>

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
        position: absolute;
        width: 380;
        border-radius: var(--radius);
        .recent-box {
            .last-txt {
                padding: 12px 16px;
            }
            .last-txt-list-box {
                padding: 12px 16px;
                .txt {
                    
                }
                .remove {
                    
                }
            }
            .option-box {
                
            }
        }
        .filter-box {
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

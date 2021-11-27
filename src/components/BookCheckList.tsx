import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {BookCard, Checkbox, BookRow} from './index';
import {BookData} from '../utils/interfaces';
import { useNavigate } from 'react-router-dom';

interface Props {
    bookList: BookData[]
    onDelete: (param: BookData)=> void
    checkedBookChanged: (param: BookData, param2: boolean)=> void
    checkedAllBooksChanged: (param: BookData[], param2: boolean)=> void
}

function BookCheckList({bookList, onDelete, checkedBookChanged, checkedAllBooksChanged}: Props) {
    const navigate = useNavigate();
    const listRef = useRef<HTMLDivElement | null>(null);
    const [checkAll, setCheckAll] = useState(true);

    const onClickToDetail = (book: BookData)=>{
        navigate('/bookdetail', {
            state: {
                book
            }
        });
    }

    const onClickDelete = (book: BookData)=>{
        const ret = window.confirm('책을 삭제하시겠습니까?');
        if(ret){
            onDelete(book);
        }
    }

    const onClickDeleteChecked = (e: React.MouseEvent<HTMLDivElement>)=>{

    }

    const totalCheckChanged = (check: boolean)=>{
        setCheckAll(check);
        checkedAllBooksChanged(bookList, check);
    }

    useEffect(()=>{
        checkedAllBooksChanged(bookList, checkAll);
    }, []);

    return (
        <div css={style}>
            <div className='all'>
                <Checkbox label='전체선택' value={checkAll} onCheckChanged={totalCheckChanged}/>
                <div className='btn-box'>
                    <div className='sub-button-white'>선택 위시리스트로 이동</div>
                    <div className='sub-button-white' onClick={onClickDeleteChecked}>선택 삭제</div>
                </div>
            </div>
            <div className='list-box' ref={listRef}>
                {bookList.map(book => (
                    <div className='row'>
                        <BookRow 
                            key={book.id} 
                            book={book} 
                            checkValue={checkAll} 
                            onClickToDetail={onClickToDetail} 
                            onClickDelete={onClickDelete}
                            onBookCheckChanged={(b, val)=> checkedBookChanged(b, val)}/>
                    </div>
                ))}
            </div>
            <div className='all'>
                <Checkbox label='전체선택' value={checkAll} onCheckChanged={totalCheckChanged}/>
                <div className='btn-box'>
                    <div className='sub-button-white'>선택 위시리스트로 이동</div>
                    <div className='sub-button-white' onClick={onClickDeleteChecked}>선택 삭제</div>
                </div>
            </div>
        </div>
    );
}

const style = css`
    padding: 0 20px;
    .all {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin: 15px 0;
        .btn-box {
            display: flex;
            .sub-button-white {
                height: 28px;
                padding: 7px;
                margin-left: 5px;
            }
        }
    }
    .list-box {
        .row {
            border-top: 1px solid var(--gray_10);
            padding: 20px 0;
            &:last-child {
                border-bottom: 1px solid var(--gray_10);
            }
            
        }
    }
`;

export default BookCheckList;

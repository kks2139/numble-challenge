import React, { useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useLocation, useNavigate} from 'react-router-dom';
import {DescPanel, BookCard} from '../index';
import {BookData} from '../../utils/interfaces'; 
import {FaStar, FaStarHalfAlt, FaHeart, FaShoppingCart, FaGift} from 'react-icons/fa';
import {IoBookSharp} from 'react-icons/io5';
import {BsHeadphones, BsFillPencilFill} from 'react-icons/bs';
import {RiFilePaper2Line, RiAppleFill} from 'react-icons/ri';
import {AiFillAndroid, AiFillWindows} from 'react-icons/ai';
import {GrAppleAppStore} from 'react-icons/gr';

interface Params {
    book: BookData
}

function BookDetailPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const {book}: Params = location.state;
    const rateRef = useRef<HTMLDivElement | null>(null);
    const [showImgModal, setShowImgModal] = useState(false);
    const [isAuthor, setIsAutor] = useState(true);

    const getStars = ()=>{
        let num = book.starRate.rate;
        return (
            <>
                {Array(5).fill(1).map((a, i)=>{
                    let result = <FaStar size='15' color='#cccccc'/>;
                    if(num - (i+1) >= 0){
                        result = <FaStar size='15' color='#FA722E'/>;
                    }else{
                        if((num + '').indexOf('.') > -1){
                            result = <FaStarHalfAlt size='12' color='#FA722E'/>
                            num = Number(num.toFixed());
                        }
                    }
                    return result;
                })}
            </>
        );
    }

    const toggleImageModal = ()=>{
        setShowImgModal(pre => !pre);
    }
    
    const onMouseOverStar = (e: React.MouseEvent<HTMLOrSVGElement>)=>{
        const idx = e.currentTarget.dataset.idx;
        const texts = rateRef.current?.querySelectorAll('[class*="rt-"]');
        texts?.forEach(el => {
            if(el instanceof HTMLDivElement){
                el.style.display = idx === el.dataset.idx ? 'block' : 'none';
            }
        })
        console.log(123);
        
        
    }

    const onMouseLeave = ()=>{
        const texts = rateRef.current?.querySelectorAll('[class*="rt-"]');
        texts?.forEach(el => {
            if(el instanceof HTMLDivElement){
                el.style.display = '0' === el.dataset.idx ? 'block' : 'none';
            }
        })
    }
    
    const onClickPerson = (e: React.MouseEvent<HTMLDivElement>)=>{
        const trans = e.currentTarget!.dataset.trans;
        setIsAutor(!trans);
    }

    const onBookClick = (book: BookData)=>{
        navigate('/books', {
            state: {
                book: book
            }
        });
    }

    return (
        <div css={style(isAuthor)}>
            {showImgModal ? 
                <div className='img-modal' onClick={toggleImageModal}>
                    <div className='wrapper'>
                        <div className='close'></div>
                        <img src={book.thumbnail}></img>
                    </div>
                </div>
            : null}
            <section className='book-box'>
                <div className='simple-info'>
                    <div className='preview'>
                        <div className='img-box' onClick={toggleImageModal}>
                            <img src={book.thumbnail}></img>
                            <div className='cover-shadow'></div>
                        </div>
                        <div className='main-button-white' onClick={toggleImageModal}><IoBookSharp/>미리보기</div>
                    </div>
                    <div className='detail'>
                        <div className='cate'>{book.category}</div>
                        <div className='title'>{book.title}</div>
                        <div className='star'>
                            {getStars()}
                            <div className='rt'>{book.starRate.rate}<span>점</span></div>
                            <span className='num'>({book.starRate.rateBuyerNum}명)</span>
                        </div>
                        <div className='maker'>
                            <div className='mk'><span>{book.author.name}</span> 저</div>
                            <div className='mk'><span>{book.publisher}</span> 출판</div>
                        </div>
                        <div className='purchase'>
                            <div className='field'>구매</div>
                            <div className='prices'>
                                <div className='row'>
                                    <div className='txt'>종이책 정가</div>
                                    <div className='pr'>
                                        <div className='discount'>{book.buySalePercent}</div>
                                        <div className='price'>{book.buyPrice.toLocaleString()}원</div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='txt'>전자책 정가</div>
                                    <div className='pr'>
                                        <div className='discount'>{book.buySalePercent}</div>
                                        <div className='price'>{book.buyPrice.toLocaleString()}원</div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='txt'>판매가</div>
                                    <div className='pr'>
                                        <div className='discount red'>{book.buySalePercent}</div>
                                        <div className='price blue'>{book.buyPrice.toLocaleString()}원</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='benefit-duration'>혜택 기간: 11.08.(월)~11.30.(화)</div>
                        <div className='buttons'>
                            <div className='sub-button-white'><FaHeart size='19'/></div>
                            <div className='sub-button-white'><FaShoppingCart size='19'/></div>
                            <div className='sub-button-white'><FaGift size='19'/></div>
                            <div className='main-button-blue'>구매하기</div>
                        </div>
                    </div>
                </div>
                <div className='support-box'>
                    <div className='row'>
                        <div className='txt'>출간 정보</div>
                        <div className='val'>2021.10.29. 전자책, 종이책 동시 출간</div>
                        <div className='txt'>듣기 기능</div>
                        <div className='val'><BsHeadphones size='15'/>듣기 가능</div>
                    </div>
                    <div className='row'>
                        <div className='txt'>파일 정보</div>
                        <div className='val'>EPUB15.1MB약 20만 자</div>
                        <div className='txt'>지원 기기</div>
                        <div className='val'><RiFilePaper2Line size='15'/>PAPER <RiAppleFill size='15'/>iOS <AiFillAndroid size='15'/>Android <AiFillWindows size='15'/>PC <GrAppleAppStore size='15'/>Mac</div>
                    </div>
                    <div className='row'>
                        <div className='txt'>ISBN</div>
                        <div className='val'>0123456789</div>
                    </div>
                </div>
                <DescPanel title='작품 소개' summary={book.index} desc={book.description} showSpread={true}/>
                <DescPanel title='저자 프로필'>
                    <div className='about-author'>
                        <div className='auth-trans'>
                            <div className='person'>
                                <div className='txt'>저자</div>
                                <div className='nm' onClick={onClickPerson}>{book.author.name}</div>
                            </div>
                            <div className='wall'></div>
                            <div className='person'>
                                <div className='txt'>번역</div>
                                <div className='nm' data-trans onClick={onClickPerson}>{book.translator.name}</div>
                            </div>
                        </div>
                        <div className='name'>{book.author.name}</div>
                        <div className='main-button-white'>+ 작가 신간알림•소식</div>
                        {isAuthor ? 
                            <div className='row'>
                                <div className='txt'>수상</div>
                                <div className='aw'>
                                    {book.author.awards.map((a, i) => (
                                        <div key={i}>{a}</div>
                                    ))}
                                </div>
                            </div> :
                            <>
                                <div className='row'>
                                    <div className='txt'>국적</div>
                                    <div className='val'>{book.translator.nationality}</div>
                                </div>
                                <div className='row'>
                                    <div className='txt'>경력</div>
                                    <div className='val'>{book.translator.career}</div>
                                </div>
                            </>
                        }

                        <div className='update-btn'>
                            2015.09.30. 업데이트
                            <div className='sub-button-white'><BsFillPencilFill/>작가 프로필 수정 요청</div>
                        </div>

                        <div className='line'></div>

                        <div className='representatives'>
                            <div className='head'>
                                <div className='tit'>대표 저서</div>
                                <ul>
                                    <li>인기순</li>
                                    <li>최신순</li>
                                    <li>평점순</li>
                                </ul>
                            </div>
                            <div className='book-list'>
                                {book.author.representatives.map(b => (
                                    <div className='book'>
                                        <div className='img-box'>
                                            <img src={b.thumbnail}></img>
                                            <div className='cover-shadow'></div>
                                        </div>
                                        <div className='nm'>{b.name}</div>
                                    </div>
                                ))}
                            </div>
                            <div className='sub-btn'>
                                <div className='sub-button-white'>출간작 전체보기</div>
                            </div>
                        </div>
                    </div>
                </DescPanel>
                <DescPanel title='리뷰'>
                    <div className='evaluate-box'>
                        <div className='rate-box'>
                            <div className='buyer-rate'>구매자 별점</div>
                            <div className='rate'>{('' + book.starRate.rate).length === 1 ? book.starRate.rate + '.0' : book.starRate.rate}</div>
                            <div className=''>{getStars()}</div>
                            <ul className='each-rate'>
                                {Array(5).fill(1).map((a, i)=> (
                                    <li key={i}>
                                        <FaStar size='10'/><span>{5-i}</span>
                                        <div className='bar'>
                                            <div style={{width: `${5-i}0px`}}></div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className='rate-num'>
                                <span>{book.starRate.rateBuyerNum}</span>명이 평가함
                            </div>
                        </div>
                        <div className='input-rate' ref={rateRef}>
                            <div className='eval-text'>
                                <div className='rt-0' data-idx='0'>이 책을 평가해주세요!</div>
                                <div className='rt-1' data-idx='1'>별로에요</div>
                                <div className='rt-2' data-idx='2'>그저 그래요</div>
                                <div className='rt-3' data-idx='3'>보통이에요</div>
                                <div className='rt-4' data-idx='4'>좋아요</div>
                                <div className='rt-5' data-idx='5'>최고에요</div>
                            </div>
                            <div className='star-box'>
                                {Array(5).fill(1).map((d, i) => (
                                    <div key={i} className='stars'>
                                        <FaStar data-idx={i+1} data-sel size='39' color='#d1d5d9' onMouseEnter={onMouseOverStar} onMouseLeave={onMouseLeave}/>
                                        <FaStar data-idx={i+1} data-empty size='39' color='#FA722E' onMouseEnter={onMouseOverStar} onMouseLeave={onMouseLeave}/>
                                    </div>
                                ))}
                            </div>
                            <textarea placeholder='리뷰 작성 시 광고 및 욕설, 비속어나 타인을 비방하는 문구를 사용하시면 비공개될 수 있습니다.'></textarea>
                        </div>
                    </div>
                </DescPanel>
            </section>
            <section className='rank-box'>

            </section>
        </div>
    );
}

const style = (isAuthor: boolean)=> (css`
    width: 1016px;
    display: flex;
    padding: 0 20px 30px 45px;
    .img-modal {
        z-index: 999;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        background-color: rgb(0,0,0,0.75);
        .wrapper {
            .close {
                height: 40px;
                display: flex;
                justify-content: flex-end;
                cursor: zoom-out;
                &:hover {
                    &::before {
                        color: var(--gray_5);
                    }    
                }
                &::before {
                    content: '×';
                    font-size: 27px;
                    font-weight: bold;
                    color: var(--gray_30);
                }
            }
            img {
                width: 60vh;
                height: 87vh;
                max-width: 900px;
                min-width: 200px;
                object-fit: cover;
            }
        }
    }
    .book-box {
        padding-top: 40px;
        margin-right: 35px;
        .simple-info {
            display: flex;
            .preview {
                display: flex;
                flex-direction: column;
                align-items: center;
                .img-box {
                    position: relative;
                    margin-bottom: 10px;
                    cursor: zoom-in;
                    img {
                        z-index: 1;
                        position: relative;
                        width: 200px;
                        height: 302px;
                    }
                    .cover-shadow {
                        z-index: 10;
                        position: absolute;
                        top: 0;
                        width: 100%;
                        height: 302px;
                        box-shadow: inset 13px 0 15px -7px var(--gray_70), inset -13px 0 15px -7px var(--gray_70);
                    }
                }
            }
            .detail {
                width: 100%;
                margin-left: 35px;
                .cate {
                    font-size: 12px;
                    color: var(--gray_70);
                    transition: .2s;
                    cursor: pointer;
                    &:hover {
                        color: var(--dodgeblue_40);
                    }
                }
                .title {
                    font-size: 30px;
                    font-weight: bold;
                    margin: 10px 0 20px 0;
                }
                .star {
                    display: flex;
                    align-items: center;
                    margin-bottom: 25px;
                    .rt {
                        font-size: 14px;
                        font-weight: 500;
                        margin: 0 3px;
                        color: #FA722E;
                    }
                    .num {
                        font-size: 12px;
                        color: var(--gray_70);
                    }
                }
                .maker {
                    padding-bottom: 20px;
                    border-bottom: 2px solid var(--gray_10);
                    .mk {
                        font-size: 13px;
                        color: var(--gray_60);
                        span {
                            font-weight: bold;
                        }
                    }
                }
                .purchase {
                    width: 100%;
                    display: flex;
                    margin-top: 14px;
                    border-top: 1px solid var(--gray_10);
                    border-bottom: 1px solid var(--gray_10);
                    .field {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-width: 170px;
                        height: 88px;
                        background-color: var(--bluegray_5);
                        font-size: 13px;
                        font-weight: bold;
                        color: var(--slategray_80);
                        border-right: 1px solid var(--gray_10);
                    }
                    .prices {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        .row {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            padding: 0 10px;
                            flex-grow: 1;
                            font-size: 13px;
                            color: var(--gray_50);
                            .txt {

                            }
                            .pr {
                                display: flex;
                                align-items: center;
                                font-weight: bold;
                                .discount {
                                    margin-right: 10px;
                                    &::after {
                                        content: '% ↓';
                                        font-size: 16px;
                                    }
                                    &.red {
                                        color: red; 
                                    }
                                }
                                .price {
                                    &.blue {
                                        color: var(--dodgeblue_50);
                                    }
                                }
                            }
                        }
                    }
                }
                .benefit-duration {
                    position: relative;
                    font-size: 12px;
                    color: var(--slategray_50);
                    text-align: right;
                    margin: 10px 0 20px 0;
                    &::before {
                        position: absolute;
                        content: '';
                        top: 6px;
                        transform: translateX(-9px);
                        width: 4px;
                        height: 4px;
                        background-color: var(--slategray_50);
                    }
                }
                .buttons {
                    display: flex;
                    justify-content: flex-end;
                    div {
                        margin-left: 5px;
                    }
                }
            }
        }
        .support-box {
            margin: 20px 0 50px 0;
            border: 4px solid var(--gray_5);
            display: flex;
            flex-direction: column;
            height: 110px;
            padding: 15px;
            .row {
                flex-grow: 1;
                display: flex;
                align-items: center;
                font-size: 12px;
                color: var(--gray_60);
                padding-left: 15px;
                .txt {
                    width: 60px;
                    font-weight: bold;
                }
                .val {
                    display: flex;
                    align-items: center;
                    min-width: 220px;
                    svg {
                        margin: 0 3px 0 5px;
                    }
                }
            }
        }
        .about-author {
            .auth-trans {
                display: flex;
                align-items: center;
                margin-bottom: 20px;
                border-bottom: 1px solid var(--bluegray_10);
                .person {
                    display: flex;
                    font-size: 12px;
                    color: var(--slategray_40);
                    padding-bottom: 5px;
                    .txt {
                        margin-right: 10px;
                    }
                    .nm {
                        cursor: pointer;
                        font-weight: bold;
                        &:hover {
                            color: var(--slategray_70);
                        }
                    }
                    ${isAuthor ? '&:first-child .nm' : '&:last-child .nm'} {
                        color: var(--slategray_70);
                    }
                }
                .wall {
                    width: 1px;
                    height: 10px;
                    background-color: var(--bluegray_10);
                    margin: 0 20px;
                }
            }
            .name {
                font-size: 20px;
                font-weight: bold;
                color: var(--gray_80);
            }
            .row {
                display: flex;
                font-size: 13px;
                color: var(--gray_80);
                .txt {
                    color: var(--gray_50);
                    margin-right: 7px;
                }
            }
            .main-button-white {
                height: 30px;
                font-size: 12px;
                margin: 17px 0 14px 0;
            }
        }
        .update-btn {
            display: flex;
            align-items: center;
            font-size: 13px;
            color: var(--slategray_40);
            justify-content: flex-end;
            .sub-button-white {
                display: flex;
                align-items: center;
                font-size: 11px;
                font-weight: bold;
                height: 21px;
                padding: 3px 10px;
                margin-left: 10px;
                svg {
                    margin-right: 3px;
                }
            }
        }
        .line {
            width: 100%;
            height: 1px;
            margin: 20px 0 30px 0;
            background-color: var(--slategray_10);
        }
        .representatives {
            .head {
                display: flex;
                justify-content: space-between;
                .tit {
                    font-size: 16px;
                    font-weight: bold;
                    color: var(--gray_80);
                }
                ul {
                    display: flex;
                    li {
                        color: var(--gray_40);
                        font-size: 11px;
                        font-weight: bold;
                        cursor: pointer;
                        &:hover {
                            color: var(--gray_80);
                        }
                        &:not(:first-child) {
                            &::before {
                                content: '|';
                                margin: 0 7px;
                                color: var(--gray_20);
                            }
                        }
                    }
                }
            }
            .book-list {
                display: flex;
                .book {
                    width: 90px;
                    margin-right: 40px;
                    .img-box {
                        position: relative;
                        img {
                            width: 90px;
                            height: 134px;
                        }
                        .cover-shadow {
                            z-index: 10;
                            position: absolute;
                            top: 0;
                            width: 100%;
                            height: 134px;
                            box-shadow: inset 10px 0 12px -7px var(--gray_70), inset -10px 0 12px -7px var(--gray_70);
                        }
                    }
                    .nm {
                        font-size: 13px;
                        font-weight: bold;
                        color: var(--gray_80);
                    }
                }
            }
            .sub-btn {
                display: flex;
                justify-content: flex-end;
                margin-top: 10px;
                .sub-button-white {
                    height: 23px;
                    &::after {
                        content: '›';
                        font-size: 18px;
                        transform: translate(3px, -3px) scaleY(1.3);
                    }
                }
            }
        }
        .evaluate-box {
            margin-top: 30px;
            display: flex;
            .rate-box {
                display: flex;
                flex-direction: column;
                align-items: center;
                .buyer-rate {
                    color: var(--slategray_50);
                    font-size: 12px;
                    font-weight: bold;
                }
                .rate {
                    color: var(--bluegray_80);
                    font-size: 32px;
                    font-weight: bold;
                    margin: 12px 0 10px 0;
                }
                .each-rate {
                    li {
                        display: flex;
                        align-items: center;
                        color: var(--bluegray_30);
                        svg {
                            margin-right: 3px;
                        }
                        span {
                            font-weight: bold;
                            font-size: 12px;
                        }
                        .bar {
                            margin-left: 6px;
                            width: 79px;
                            background-color: #e8edf3;
                            height: 8px; 
                            box-shadow: inset 0 2px 3px -3px black;
                            div {
                                background-color: var(--bluegray_20);
                                height: 100%;
                                width: 0;
                                box-shadow: inset 0px -2px 5px -3px black;
                            }    
                        }

                    }
                }
                .rate-num {
                    width: 110px;
                    text-align: center;
                    border-top: 1px solid var(--gray_10);
                    font-size: 12px;
                    color: var(--bluegray_20);
                    padding-top: 3px;
                    span {
                        font-weight: bold;
                    }
                }
            }
            .input-rate {
                flex-grow: 1; 
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 0 0 0 15px;
                .eval-text {
                    text-align: center;
                    font-size: 18px;
                    font-weight: bold;
                    color: var(--gray_40);
                    margin-bottom: 13px;
                    [class*='rt-'] {
                        display: none;
                    }
                }
                .star-box {
                    display: flex;
                    .stars {
                        display: flex;
                        align-items: center;
                        &:not(:first-child) {
                            &::before {
                                content: '|';
                                font-size: 7px;
                                color: var(--slategray_5);
                                transform: translate(0,0) scaleY(3.5);
                                margin: 0 10px;
                            }
                        }
                        svg {

                        }
                    }
                    [data-empty] {
                        display: none;
                    }
                }
                textarea {
                    width: 100%;
                    min-height: 120px;
                    margin-top: 27px;
                    padding: 15px;
                    border: 2px solid var(--gray_20);
                    color: var(--gray_50);
                    font-size: 13px;
                    font-weight: bold;
                    border-radius: 4px;
                    line-height: 22px;
                    &::placeholder {
                        color: var(--gray_50);
                    }
                }
            }
        }
    }
    .rank-box {
        min-width: 180px;
        border-left: 1px solid var(--gray_20); 
    }
`);

export default BookDetailPage;

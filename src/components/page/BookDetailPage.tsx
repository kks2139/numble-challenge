import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useLocation, useNavigate} from 'react-router-dom';
import {DescPanel, Checkbox} from '../index';
import {BookData} from '../../utils/interfaces'; 
import {FaStar, FaStarHalfAlt, FaHeart, FaShoppingCart, FaGift} from 'react-icons/fa';
import {IoBookSharp} from 'react-icons/io5';
import {BsHeadphones, BsFillPencilFill} from 'react-icons/bs';
import {RiFilePaper2Line, RiAppleFill} from 'react-icons/ri';
import {AiFillAndroid, AiFillWindows} from 'react-icons/ai';
import {GrAppleAppStore} from 'react-icons/gr';
import {GiHazardSign} from 'react-icons/gi';
import {MessageInfo} from '../../utils/interfaces';

type Div = React.MouseEvent<HTMLDivElement>;

interface Params {
    book: BookData
}

interface Props {
    toCart: (param: BookData)=> void
    showMsg: (param: MessageInfo)=> void
}

function BookDetailPage({toCart, showMsg}: Props) {
    const navigate = useNavigate();
    const location = useLocation();
    const {book}: Params = location.state;
    const divRef = useRef<HTMLDivElement | null>(null);
    const rateRef = useRef<HTMLDivElement | null>(null);
    const [showImgModal, setShowImgModal] = useState(false);
    const [isAuthor, setIsAutor] = useState(true);
    const [starRate, setStarRate] = useState(-1);
    const [isInputDone, setIsInputDone] = useState(false);
    
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
                            result = <FaStarHalfAlt size='15' color='#FA722E'/>
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

    const setStarHover = (index: string)=> {
        const texts = rateRef.current?.querySelectorAll('[class*="rt-"]');
        texts?.forEach(el => {
            if(el instanceof HTMLDivElement){
                el.style.display = index === el.dataset.idx ? 'flex' : 'none';
            }
        });
        if(index === '0' && starRate > -1){
            const selText = rateRef.current?.querySelector('.rt-selected') as HTMLDivElement;
            selText.style.display = 'flex';
        }
    }
    
    const onMouseOverStar = (e: Div)=>{
        const idx = e.currentTarget.dataset.idx;
        setStarHover(idx || '0');
    }

    const onMouseLeave = ()=>{
        setStarHover('0');
        // colorSelectedStars();
    }
    
    const onClickPerson = (e: Div)=>{
        const trans = e.currentTarget!.dataset.trans;
        setIsAutor(!trans);
    }
    
    const onClickStarCancel = (e: Div)=>{
        setStarRate(-1);
    }

    const onClickCaution = (e: Div)=>{
        e.currentTarget.classList.toggle('sel');
        divRef.current?.querySelector('.caution')?.classList.toggle('open');
    }

    const onClickCheckbox = (value: boolean)=>{
        // e.currentTarget.classList.toggle('sel');
    }

    const onClickStar = (e: Div)=>{
        const {idx} = e.currentTarget.dataset!;
        setStarRate(pre => Number(idx));
        colorSelectedStars();
    }

    const onClickReview = ()=>{
        alert('dd');
        if(!isInputDone){
            showMsg({
                msg: '별점을 먼저 남겨주세요.',
                warn: true
            });   
        }
    }
    
    const onClickToCart = ()=>{
        toCart(book);
        showMsg({
            msg: '카트에 담았습니다.',
            link: '카트 보기',
            linkCallback: ()=>{
                navigate('/cart');
            }
        });  
    }

    const colorSelectedStars = ()=>{
        const starList = rateRef.current?.querySelectorAll(`.star-box .stars`);
        if(starRate > -1) {
            starList?.forEach(s => {
                s.classList.remove('sel');
            });
            for(let i=1; i<=starRate; i++){
                const star = rateRef.current?.querySelector(`.star-box .stars[data-idx='${i}']`) as HTMLDivElement;
                star.classList.add('sel');
            }
        }else{
            starList?.forEach(s => {
                s.classList.remove('sel');
            });
        }
    }

    const onKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>)=>{
        const el = e.currentTarget;
        let breaks = el.value.split('\n').length + 2;
        breaks = breaks < 0 ? 0 : breaks;

        el.style.height = `${breaks * 22 < 50 ? 110 : breaks * 22}px`;
        setIsInputDone(checkInputDone());
    }

    const checkInputDone = ()=>{
        const ta = divRef.current?.querySelector('[name=review]') as HTMLTextAreaElement;
        return starRate > -1 && ta.value && ta.value.length > 9 ? true : false;
    }

    const addPointNumber = (n: number)=> ('' + n).length === 1 ? n + '.0' : n;

    useEffect(()=>{
        setStarHover('0');
    }, []);

    useEffect(()=>{
        colorSelectedStars();
        setIsInputDone(checkInputDone());
    }, [starRate]);

    return (
        <div css={style(isAuthor, starRate)} ref={divRef}>
            {showImgModal ? 
                <div className='img-modal' onClick={toggleImageModal}>
                    <div className='wrapper'>
                        <div className='close'></div>
                        <img src={book.thumbnail}></img>
                    </div>
                </div>
            : null}
            <div className='wrapper'>
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
                            <div className='cate'>
                                {book.category.map(c => (
                                    <div>{c}</div>
                                ))}
                            </div>
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
                                <div className='sub-button-white' onClick={onClickToCart}><FaShoppingCart size='19'/></div>
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
                                <div className='rate'>{addPointNumber(book.starRate.rate)}</div>
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
                                    {starRate > -1 ? 
                                        <div className='rt-selected' data-star-sel>
                                            <div className='txt'>내가 남긴 별점</div>
                                            <div className='num'>{addPointNumber(starRate)}</div>
                                            <div className='cancel' onClick={onClickStarCancel}>취소</div>
                                        </div> :
                                        <div className='rt-0' data-idx='0'>이 책을 평가해주세요!</div>
                                    }
                                    <div className='rt-1 blue' data-idx='1'>별로에요</div>
                                    <div className='rt-2 blue' data-idx='2'>그저 그래요</div>
                                    <div className='rt-3 blue' data-idx='3'>보통이에요</div>
                                    <div className='rt-4 blue' data-idx='4'>좋아요</div>
                                    <div className='rt-5 blue' data-idx='5'>최고에요</div>
                                </div>
                                <div className='star-box'>
                                    {Array(5).fill(1).map((d, i) => (
                                        <div key={i} className='stars' data-idx={5-i} onClick={onClickStar} onMouseEnter={onMouseOverStar} onMouseLeave={onMouseLeave}>
                                            <FaStar data-empty size='40' color='#d1d5d9'/>
                                            <FaStar data-full size='40' color='#FA722E'/>
                                        </div>
                                    ))}
                                </div>
                                <textarea name='review' onKeyUp={onKeyUp} placeholder='리뷰 작성 시 광고 및 욕설, 비속어나 타인을 비방하는 문구를 사용하시면 비공개될 수 있습니다.'></textarea>
                                <div className='foot'>
                                    <div className='submit-box'>
                                        <div className='sub-button-white' onClick={onClickCaution}><GiHazardSign size='15'/>리뷰 작성 유의사항</div>
                                        <div className='ch'>
                                            <Checkbox label='스포일러가 있습니다.' onCheckChanged={onClickCheckbox}/>
                                            <button className='main-button-blue' disabled={!isInputDone} onClick={onClickReview}>리뷰 남기기</button>
                                        </div>
                                    </div>
                                    <div className='caution'>
                                        <span className='bold'>건전한 리뷰 정착 및 양질의 리뷰를 위해 아래 해당하는 리뷰는 비공개 조치될 수 있음을 안내드립니다.</span>
                                        <br/>
                                        <br/><span>1. 타인에게 불쾌감을 주는 욕설</span>
                                        <br/><span>2. 비속어나 타인을 비방하는 내용</span>
                                        <br/><span>3. 특정 종교, 민족, 계층을 비방하는 내용</span>
                                        <br/><span>4. 해당 도서의 줄거리나 리디북스 서비스 이용과 관련이 없는 내용</span>
                                        <br/><span>5. 의미를 알 수 없는 내용</span>
                                        <br/><span>6. 광고 및 반복적인 글을 게시하여 서비스 품질을 떨어트리는 내용</span>
                                        <br/><span>7. 저작권상 문제의 소지가 있는 내용</span>
                                        <br/><span>8. 다른 리뷰에 대한 반박이나 논쟁을 유발하는 내용</span>
                                        <br/><span>* 결말을 예상할 수 있는 리뷰는 자제하여 주시기 바랍니다.</span>
                                        <br/><br/>
                                        <span className='bold'>이 외에도 건전한 리뷰 문화 형성을 위한 운영 목적과 취지에 맞지 않는 내용은 담당자에 의해 리뷰가 비공개 처리가 될 수 있습니다.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DescPanel>
                </section>
                <section className='rank-box'>

                </section>
                </div>
        </div>
    );
}

const style = (isAuthor: boolean, starRate: number) => (css`
    display: flex;
    justify-content: center;
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
    > .wrapper {
        width: 1016px;
        display: flex;
        padding: 0 20px 30px 45px;
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
                        display: flex;
                        font-size: 12px;
                        color: var(--gray_70);
                        transition: .2s;
                        div {
                            display: flex;
                            align-items: center;
                            cursor: pointer;
                            &:hover {
                                color: var(--dodgeblue_40);
                            }
                            &:not(:first-child)::before {
                                content: '›';
                                font-weight: bold;
                                margin: 0 8px;
                                transform: scale(1.3, 1.9) translateY(-2px);
                                &:hover {
                                    color: var(--gray_70);
                                }
                            }
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
                    overflow: hidden;
                    .book {
                        width: 90px;
                        margin-right: 40px;
                        cursor: pointer;
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
                    margin-top: 15px;
                    .sub-button-white {
                        height: 30px;
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
                    position: relative;
                    flex-grow: 1; 
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 0 0 0 15px;
                    .eval-text {
                        position: absolute;
                        // text-align: center;
                        font-size: 18px;
                        font-weight: bold;
                        color: var(--gray_40);
                        margin-bottom: 13px;
                        [class*='rt-'] {
                            display: none;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            &.blue {
                                color: white;
                                width: 110px;
                                height: 32px;
                                transform: translateY(-10px);
                                font-size: 14px;
                                border-radius: 4px;
                                background-color: var(--dodgeblue_50);
                                &::before {
                                    content: '';
                                    position: absolute;
                                    bottom: -4px;
                                    left: 50%;
                                    transform: translateX(-50%) rotate(45deg);
                                    width: 9px;
                                    height: 9px;
                                    background-color: var(--dodgeblue_50);
                                }
                            }
                        }
                        .rt-selected {
                            ${starRate > -1 ? 'display: flex;' : 'display: none;'}
                            transform: translateY(-10px);
                            .txt {
                                font-size: 14px;
                                color: var(--slategray_60);
                            }
                            .num {
                                font-size: 30px;
                                font-weight: bold;
                                color: var(--orange_40);   
                                margin: 0 9px;
                                transform: translateY(-3px);
                            }
                            .cancel {
                                font-size: 12px;
                                color: var(--slategray_30);
                                cursor: pointer;
                                transition: .3s;
                                &:hover {
                                    color: var(--dodgeblue_50);
                                }
                            }
                        }
                    }
                    .star-box {
                        display: flex;
                        flex-direction: row-reverse;
                        margin-top: 38px;
                        cursor: pointer;
                        .stars {
                            display: flex;
                            align-items: center;
                            padding: 0 10px;
                            &:not(:first-child) {
                                border-right: 1px solid var(--slategray_5); 
                            }
                            &:hover {
                                [data-full], & ~ .stars [data-full] {
                                    display: block !important;
                                }
                                [data-empty], & ~ .stars [data-empty] {
                                    display: none !important;
                                }
                            }
                            [data-full] {
                                display: none;
                            }
                            &.sel {
                                [data-full] {
                                    display: block;
                                }
                                [data-empty] {
                                    display: none;
                                }
                            }
                        }
                    }
                    textarea {
                        width: 100%;
                        min-height: 110px;
                        margin-top: 27px;
                        padding: 15px;
                        border: 2px solid var(--gray_20);
                        color: var(--gray_20);
                        font-size: 13px;
                        font-weight: bold;
                        border-radius: 4px;
                        line-height: 22px;
                        resize: none;
                        overflow-wrap: break-word;
                        overflow: hidden;
                        &::placeholder {
                            color: var(--gray_50);
                            font-size: 12px;
                        }
                        &:focus {
                            color: var(--gray_50);
                            border-color: var(--gray_50);
                            &::placeholder {
                                color: var(--gray_20);
                            }
                        }
                    }
                    .foot {
                        width: 100%;
                        margin-top: 12px;
                        display: flex;
                        flex-direction: column;
                        .submit-box {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .sub-button-white {
                                height: 31px;
                                svg {
                                    margin-right: 5px;
                                }   
                                &.sel {
                                    color: var(--gray_70);
                                }
                            }
                            .ch {
                                display: flex;
                                .main-button-blue {
                                    height: 32px;
                                    font-size: 13px;
                                    padding: 0 16px;
                                }
                            }
                        }
                        .caution {
                            display: none;
                            width: 100%;
                            padding: 20px;
                            margin-top: 10px;
                            background-color: var(--slategray_5);
                            white-space: pre-line;
                            &.open {
                                display: block;
                            }
                            span {
                                color: var(--slategray_50);
                                font-size: 12px;
                                &.bold {
                                    font-weight: bold;
                                    color: black;
                                }
                            }
                        }
                    }
                }
            }
        }
        .rank-box {
            min-width: 180px;
            border-left: 1px solid var(--gray_20); 
        }
    }
`);

export default BookDetailPage;

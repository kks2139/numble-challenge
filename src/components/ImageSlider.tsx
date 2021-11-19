import React, {useEffect, useRef, useState} from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {BookData} from '../utils/interfaces';
import {ImageItem, SliderMoveButton} from './index';

interface Props {
    bookList: BookData[]
}

function ImageSlider({bookList}: Props) {
    const divRef = useRef<HTMLDivElement | null>(null);
    const intervalId = useRef(0);
    const [list, setList] = useState<BookData[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const center = Math.floor(bookList.length / 2);
    const isOdd = bookList.length % 2 === 0;

    const [circulate, setCirculate] = useState(false);

    // center 정렬이라 가운데 아이템을 currentIndex = 0 이라고 잡음
    // currentIndex 를 기준으로 + - 값을 가지고 translateX 값으로써 좌우 이동을 만듬
    // currentIndex 가 기준이므로 index는 0 기준 좌우로 음수, 양수 값을 가지게 됨

    const onClickSlide = (dir: string)=>{
        if(dir === 'left'){
            if(center + currentIndex < 2){
                circulateList(dir);
                setCirculate(true);
            }else{
                setCurrentIndex(currentIndex - 1);
                setCirculate(false);
            }
        }else{
            if(center + currentIndex > bookList.length - 3){
                circulateList(dir);
                setCirculate(true);
            }else{
                setCurrentIndex(currentIndex + 1);
                setCirculate(false);
            }
        }
    }

    const circulateList = (dir: string)=>{
        const newList = list.slice();
        const moveNode = dir === 'left' ? newList.pop() : newList.shift();
        if(moveNode){
            if(dir=== 'left'){
                newList.unshift(moveNode);
            }else{
                newList.push(moveNode);
            }
        }
        setList(newList);
    }

    useEffect(()=>{
        setList(bookList);
    }, [bookList]);
    
    useEffect(()=>{
        intervalId.current = window.setInterval(()=> onClickSlide('right'), 10000);
        return ()=> clearInterval(intervalId.current);
    });

    return (
        <div css={style} ref={divRef}>
            <div className='wrapper'>
                {list.map((b, i) => (
                    <div key={b.id} className='box' data-move-box>
                        <ImageItem index={-1 * (center - i)} currentIndex={currentIndex} imgUrl={b.thumbnail} isOdd={isOdd} circulate={circulate}/>
                    </div>
                ))}
            </div>
            <div className='buttons'>
                <SliderMoveButton direction='left' type='light' onMoveButtonClick={onClickSlide}/>
                <SliderMoveButton direction='right' type='light' onMoveButtonClick={onClickSlide}/>
            </div>
        </div>
    );
}

const style = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;
        width: 100%;
        height: 296px;
        overflow-x: hidden;
        .box {
            display: flex;
            align-items: center;
            min-width: 414px;
            height: 276px;
            border-radius: 10px;
            cursor: pointer;
            @include nodrag;
        }
    }
    .buttons {
        position: absolute;
        width: 600px;
        display: flex;
        justify-content: space-between;
        svg {
            cursor: pointer;
        }
    }

    @keyframe slide {
        
    }
`;

export default ImageSlider;

import React, {useEffect, useRef, useState} from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {Event} from '../utils/interfaces';
import {ImageItem, SliderMoveButton} from './index';

interface Props {
    eventList: Event[]
    onClickImage: (param: string)=> void
}

function ImageSlider({eventList, onClickImage}: Props) {
    const divRef = useRef<HTMLDivElement | null>(null);
    const intervalId = useRef(0);
    const [currentIndex, setCurrentIndex] = useState(0); 

    const onClickSlide = (dir: string)=>{
        if(dir === 'left'){
            setCurrentIndex(pre => pre - 1);
        }else{
            setCurrentIndex(pre => pre + 1);
        }
    }


    useEffect(()=>{

    }, [eventList]);
    
    useEffect(()=>{
        // intervalId.current = window.setInterval(()=> onClickSlide('right'), 10000);
        // return ()=> clearInterval(intervalId.current);
    });

    return (
        <div css={style} ref={divRef}>
            <div className='wrapper'>
                {eventList.map((ev, i) => (
                    <div key={i} className='box'>
                        <ImageItem index={i} imgUrl={ev.thumbnail} currentIndex={currentIndex} onClickImage={onClickImage}/>
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
        align-items: center;
        flex-wrap: nowrap;
        width: 1242px;
        height: 296px;
        overflow-x: hidden;
        .box {
            display: flex;
            align-items: center;
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
`;

export default ImageSlider;

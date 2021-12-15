import React, {useEffect, useRef, useState, useMemo} from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {Event} from '../utils/interfaces';
import {ImageItem, SliderMoveButton} from './index';

interface Props {
    eventList: Event[]
    onClickImage: (param: string)=> void
}

function ImageSlider({eventList, onClickImage}: Props) {
    // const imageList = useMemo(()=> eventList.concat(JSON.parse(JSON.stringify(eventList))), [eventList]);
    const imageList = useMemo(()=> [eventList[eventList.length - 1]].concat(eventList), [eventList]);
    const intervalId = useRef(0);
    const [move, setMove] = useState(-1); 

    const onClickSlide = (dir: string)=>{
        if(dir === 'left'){
            setMove(pre => pre - 1);
        }else{
            setMove(pre => pre + 1);
        }
    }

    useEffect(()=>{
        // intervalId.current = window.setInterval(()=> onClickSlide('right'), 10000);
        // return ()=> clearInterval(intervalId.current);
    });

    return (
        <div css={style}>
            {move}
            <div className='wrapper'>
                {imageList.map((ev, i) => (
                    <ImageItem 
                        key={i}
                        imgUrl={ev.thumbnail} 
                        index={i}
                        move={move}
                        itemLength={imageList.length}
                        onClickImage={onClickImage}/>
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
        position: relative;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        width: 1242px;
        height: 296px;
        overflow-x: hidden;
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

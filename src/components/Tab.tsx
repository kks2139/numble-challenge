import React, {useState, useRef, useEffect} from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';

interface Props {
    names: string[]
    children: JSX.Element
    selectedIndex?: number
    onClickTab?: ()=> void
    width?: number
}

function Tab({names, children, selectedIndex=0, onClickTab, width=0}: Props){
    const [index, setIndex] = useState(0);
    const divRef = useRef<HTMLDivElement | null>(null);
    const child = children.props.children ? children.props.children : children;

    const onClick = (e: React.MouseEvent<HTMLDivElement>)=>{
        selectChild(e);
        if(onClickTab){
            onClickTab();
        }
    }

    const selectChild = (e: React.MouseEvent<HTMLDivElement> | number)=>{
        const selected = divRef.current?.querySelector('.sel');
        if(typeof e === 'number'){
            selected?.classList.remove('sel');
            divRef.current?.querySelector(`[data-idx="${e}"]`)?.classList.add('sel');
            setIndex(e);
        }else{
            selected?.classList.remove('sel');
            e.currentTarget.classList.add('sel');
            setIndex(Number(e.currentTarget.dataset.idx));
        }
    }

    useEffect(()=>{
        selectChild(selectedIndex);
    }, []);

    return (
        <div css={style(width)} ref={divRef}>
            <div className='tabs'>
                {names.map((n, i) => (
                    <div key={n} className='tab' data-idx={i} onClick={onClick}>{n}</div>
                ))}
            </div>
            <div className='content'>
                {Array.isArray(child) ? child[index] : child}
            </div>
        </div>
    );
}

const style = (width: number)=>(css`
    width: 618px;
    border: 1px solid var(--slategray_20);
    .tabs {
        display: flex;
        .tab {
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 44px;
            color: var(--slategray_90);
            font-size: 14px;
            font-weight: bold;
            border-bottom: 1px solid var(--gray_10);  
            background-color: var(--slategray_5);
            cursor: pointer;
            &.sel {
                border-color: transparent;
                background-color: white;
                &:first-child {
                    border-right: 1px solid var(--gray_10);
                }
                &:last-child {
                    border-left: 1px solid var(--gray_10);
                }
            }
        }
    }
    .content {
        background-color: white;
        // padding: 15px 20px;
    }
`);

export default Tab;

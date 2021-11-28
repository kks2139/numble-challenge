import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {RootState} from '../redux-modules/index';
import {ToastMessage} from '../components/index';
import {MessageInfo} from '../utils/interfaces';
import {shiftMsg} from '../redux-modules/app';


function ToastMessageContainer({msg, warn, link, linkCallback}: MessageInfo) {
    const dispatch = useDispatch();

    const onRemove = ()=>{
        dispatch(shiftMsg());
    } 

    return <ToastMessage msg={msg} warn={warn} link={link} linkCallback={linkCallback} onRemove={onRemove}/>
}

export default ToastMessageContainer;

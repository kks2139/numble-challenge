import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {RootState} from '../redux-modules/index';
import {MyRidiPage} from '../components/index';
import {User} from '../utils/interfaces';
import {setCurrentPath} from '../redux-modules/app';
import { useNavigate } from 'react-router-dom';

function MyRidiPageContainer() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogout = ()=>{
        sessionStorage.setItem('user', 'null');
        navigate('/');
        dispatch(setCurrentPath('/'));
    }

    return  <MyRidiPage onLogout={onLogout}/>
}

export default MyRidiPageContainer;

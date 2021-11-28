import React, { useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux-modules/index';
import {NotificationPage} from '../components/index';
import { setAlerts } from '../redux-modules/app';
import { request } from '../utils/util';
import { Alert } from '../utils/interfaces';

function NotificationPageContainer() {
    const dispatch = useDispatch();
    const {alerts} = useSelector((state: RootState)=> state.app);

    const getAlerts = async ()=>{
        const res: Alert[] = await request('getAlerts');
        dispatch(setAlerts(res));
    }

    useEffect(()=>{
        getAlerts();
    });

    return <NotificationPage alerts={alerts}/>;
}

export default NotificationPageContainer;

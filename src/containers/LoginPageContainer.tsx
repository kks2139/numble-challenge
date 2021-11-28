import React, { useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux-modules/index';
import {LoginPage} from '../components/index';
import {User} from '../utils/interfaces';
import {setUser} from '../redux-modules/app';

function LoginPageContainer() {
    const dispatch = useDispatch();
    const {currentPath} = useSelector((state: RootState)=> state.app);

    const onLogin = (user: User)=>{
        dispatch(setUser(user));
    }

    return <LoginPage onLogin={onLogin} currentPath={currentPath}/>;
}

export default LoginPageContainer;

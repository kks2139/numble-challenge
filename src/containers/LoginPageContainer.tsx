import React, { useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useDispatch} from 'react-redux';
import {RootState} from '../redux-modules/index';
import {LoginPage} from '../components/index';
import {User} from '../utils/interfaces';
import {setUser} from '../redux-modules/app';

function LoginPageContainer() {
    const dispatch = useDispatch();

    const onLogin = (user: User)=>{
        dispatch(setUser(user));
    }

    return (
        <div css={style}>
            <LoginPage onLogin={onLogin}/>
        </div>
    );
}

const style = css`
`;

export default LoginPageContainer;

import React, { useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux-modules/index';
import {Header} from '../components/index';
import { setCurrentPath } from '../redux-modules/app';

function HeaderContainer() {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState)=> state);
    const {currentUser, currentPath} = state.app;
    const {cartList} = state.cartPage;

    const onLink = (path: string)=>{
        dispatch(setCurrentPath(path));
    }

    return (
        <div css={style}>
            <Header currentUser={currentUser} onLink={onLink} currentPath={currentPath} cartItems={cartList.length}/>
        </div>
    );
}

const style = css`
`;

export default HeaderContainer;

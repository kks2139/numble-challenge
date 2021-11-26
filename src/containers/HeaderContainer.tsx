import React, { useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux-modules/index';
import {Header} from '../components/index';
import { setCurrentPath } from '../redux-modules/app';

function HeaderContainer() {
    const dispatch = useDispatch();
    const {currentUser, currentPath} = useSelector((state: RootState)=> state.app);

    const onLink = (path: string)=>{
        dispatch(setCurrentPath(path));
    }

    return (
        <div css={style}>
            <Header currentUser={currentUser} onLink={onLink} currentPath={currentPath}/>
        </div>
    );
}

const style = css`
`;

export default HeaderContainer;

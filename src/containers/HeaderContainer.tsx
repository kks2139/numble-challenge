import React, { useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useSelector} from 'react-redux';
import {RootState} from '../redux-modules/index';
import {Header} from '../components/index';

function HeaderContainer() {
    const {currentUser} = useSelector((state: RootState)=> state.app);

    return (
        <div css={style}>
            <Header currentUser={currentUser}/>
        </div>
    );
}

const style = css`
`;

export default HeaderContainer;

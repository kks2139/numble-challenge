import React, { useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import { checkSession } from '../../utils/util';
import { useNavigate } from 'react-router-dom';

function NotificationPage() {
    const navigate = useNavigate();

    useEffect(()=>{
        // if(checkSession()){
        //     navigate('/login');
        // }
    }, []);

    return (
        <div css={style}>
            알림
        </div>
    );
}

const style = css`

`;

export default NotificationPage;

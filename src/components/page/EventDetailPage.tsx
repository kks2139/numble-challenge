import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useLocation} from 'react-router-dom';

interface Props {
}

function EventDetailPage({}: Props) {
    const location = useLocation();
    
    return (
        <div css={style}>
            <img src={location.state.details}></img>
        </div>
    );
}

const style = css`
    display: flex;
    justify-content: center;
    img {
        width: 900px;
        object-fit: contain;
        margin: 30px 0;
    }
`;

export default EventDetailPage;

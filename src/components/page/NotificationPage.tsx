import React, { useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import { checkSession } from '../../utils/util';
import { useNavigate } from 'react-router-dom';
import { Alert } from '../../utils/interfaces';
import {BsFillBellFill} from 'react-icons/bs';

interface Props {
    alerts: Alert[]
}

function NotificationPage({alerts}: Props) {
    const navigate = useNavigate();

    return (
        <div css={style}>
            <div className='wrapper'>
                <div className='title'>알림</div>
                <div className='content'>

                    <div className='empty'>
                        <BsFillBellFill size='60'/>
                        <div>새로운 알림이 없습니다.</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const style = css`
    display: flex;
    justify-content: center;
    .wrapper {
        width: 950px;
        min-height: 620px;
        .title {
            font-size: 21px;
            font-weight: bold;
            color: var(--slategray_90);
            margin: 15px 0;
        }
        .content {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            .empty {
                display: flex;
                flex-direction: column;
                align-items: center;
                color: var(--slategray_10);
                div {
                    margin-top: 26px;
                    font-size: 14px;
                    color: var(--slategray_50);
                }
            }
        }
    }
`;

export default NotificationPage;

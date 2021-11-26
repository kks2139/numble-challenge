import React, { useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux-modules/index';
import {CartPage} from '../components/index';
import {User} from '../utils/interfaces';
import {setUser} from '../redux-modules/app';

function CartPageContainer() {
    const dispatch = useDispatch();
    const {cartList} = useSelector((state: RootState)=> state.cartPage);

    return (
        <div css={style}>
            <CartPage />
        </div>
    );
}

const style = css`
`;

export default CartPageContainer;

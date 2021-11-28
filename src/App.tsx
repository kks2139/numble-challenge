import React, { useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import {HomePage, Footer, SignupPage, ToastMessage} from './components/index';
import {HeaderContainer, LoginPageContainer, NotificationPageContainer, CartPageContainer, MyRidiPageContainer} from './containers/index';
import {useSelector} from 'react-redux';
import {RootState} from './redux-modules/index';

function App() {
  const navigate = useNavigate();

  const {messageList} = useSelector((state: RootState)=> state.app);

  useEffect(()=>{
    navigate('/');
  }, []);

  return (
    <div className="App" css={style}>
      <div className='header'>
        <HeaderContainer/>
      </div>
      <main>
        <Routes>
          <Route path='/*' element={<HomePage/>}/>
          <Route path='/notification' element={<NotificationPageContainer/>}/>
          <Route path='/cart' element={<CartPageContainer/>}/>
          <Route path='/myridi' element={<MyRidiPageContainer/>}/>
          <Route path='/login' element={<LoginPageContainer/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
        </Routes>
      </main>
      <div className='footer'>
        <Footer/>
      </div>
      {messageList.map((el,i) => (
        <div key={i}>
          {el}
        </div>
      ))}
    </div>
  );
}

const style = css`
  min-height: 100vh;
`;

export default App;

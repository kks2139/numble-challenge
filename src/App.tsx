import React, { useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import {HomePage, NotificationPage, CartPage, MyRidiPage, Header, Footer, LoginPage} from './components/index';

function App() {
  const navigate = useNavigate();

  useEffect(()=>{
    navigate('/');
  }, []);

  return (
    <div className="App" css={style}>
      <div className='header'>
        <Header/>
      </div>
      <main>
        <Routes>
          <Route path='/*' element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/notification' element={<NotificationPage/>}/>
          <Route path='/cart' element={<CartPage/>}/>
          <Route path='/myridi' element={<MyRidiPage/>}/>
        </Routes>
      </main>
      <div className='footer'>
        <Footer/>
      </div>
    </div>
  );
}

const style = css`
  min-height: 100vh;
  > .header {

  }
  main {
    
  }
  > .footer {

  }
`;

export default App;

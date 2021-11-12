import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import {HomePage, NotificationPage, CartPage, MyRidiPage, Header} from './components/index';
import { HomePageContainer } from './containers';

function App() {
  const navigate = useNavigate();

  return (
    <div className="App" css={style}>
      <div className='header'>
        <Header/>
      </div>
      <main>
        <Routes>
          <Route path='/*' element={<HomePageContainer/>}>
          </Route>
          <Route path='/notification' element={<NotificationPage/>}/>
          <Route path='/cart' element={<CartPage/>}/>
          <Route path='/myridi' element={<MyRidiPage/>}/>
        </Routes>
      </main>
      <div className='footer'>

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

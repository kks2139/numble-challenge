import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import {HomePage} from './components/index';

function App() {
  const navigate = useNavigate();
  return (
    <div className="App" css={style}>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
      </Routes>
    </div>
  );
}

const style = css`
  min-height: 100vh;
`;

export default App;

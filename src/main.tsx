import React from 'react';
import ReactDOM from 'react-dom';
import Container from './three/container';
import RotatingBox from './three/virtualObj/rotating-box';
import './main.css';

ReactDOM.render(
  <React.StrictMode>
    <div className='container-wrap'>
      <div style={{ width: '300px', height: '300px' }}>
        <Container>
          <RotatingBox />
        </Container>
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

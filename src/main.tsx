import React from 'react';
import ReactDOM from 'react-dom';
import Container from './three/container';
import FirstBox from './three/virtualObj/first-box';

ReactDOM.render(
  <React.StrictMode>
    <Container>
      <FirstBox position={[-1.2, 0, 0]} />
      <FirstBox position={[1.2, 0, 0]} />
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);

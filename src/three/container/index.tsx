import React from 'react';
import { Canvas } from '@react-three/fiber';

export default function Container(props: any) {
  const { children } = props;
  return (
    <Canvas camera={{ position: [0, 0, 200] }}>
      <ambientLight />
      <pointLight position={[80, 80, 80]} />
      {children}
    </Canvas>
  );
}

import React from 'react';
import { Canvas } from '@react-three/fiber';

export default function Container(props: any) {
  const { children } = props;
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {children}
    </Canvas>
  );
}

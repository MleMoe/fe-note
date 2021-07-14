import React, { useRef, useState } from 'react';

import { useFrame } from '@react-three/fiber';
import { useSpring, animated, config } from '@react-spring/three';

function RotatingBox() {
  const myMesh = useRef<THREE.Mesh>(null!);
  const myMesh2 = useRef<THREE.Mesh>(null!);

  const [active, setActive] = useState(false);

  const { scale } = useSpring({
    scale: active ? 1.5 : 1,
    config: config.wobbly,
  });

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.x = a;
    myMesh2.current.rotation.z = a;
  });
  return (
    <>
      <animated.mesh
        position={[-30, -30, 30]}
        scale={scale}
        onClick={() => setActive(!active)}
        ref={myMesh}
      >
        <boxBufferGeometry args={[50, 50, 50]} />
        <meshPhongMaterial color='red' />
      </animated.mesh>
      <mesh ref={myMesh2} position={[30, 30, 30]}>
        <boxBufferGeometry args={[50, 50, 50]} />
        <meshPhongMaterial color='royalblue' />
      </mesh>
    </>
  );
}

export default RotatingBox;

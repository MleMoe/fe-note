# react-three-fiber

## 介绍

react-three-fiber 是一个 react 版本的“渲染器”，把 three.js 中的 Object 转化为可重用的 React 组件，使之能拥有状态 state，并能以 react 的方式在帧循环中响应用户交互。

## 为什么？

使用可重用、自包含的组件来**声明式**地构建三维场景。这些组件可对状态做出反应，易于交互，且可以利用 React 生态。

> Build your scene declaratively with re-usable, self-contained components that react to state, are readily interactive and can tap into React's ecosystem.

使用到的 React 生态有：

- @react-three/gltfjsx
  turns GLTFs into JSX components

- @react-three/drei
  useful helpers for react-three-fiber

- @react-three/postprocessing
  post-processing effects

- @react-three/flex
  flexbox for react-three-fiber

- @react-three/xr
  VR/AR controllers and events

- @react-three/cannon
  physics based hooks

- @react-three/a11y
  accessibility tools for react-three-fiber

- zustand
  state management

- react-spring
  a spring-physics-based animation library

- react-use-gesture
  mouse/touch gestures

## 安装

```bash
npm install three @react-three/fiber
```

## 基础组件

### 容器

`<Canvas />` 组件作为绘制区域的容器组件，使用如下方式导入。

```js
import { Canvas } from '@react-three/fiber';

export default function App() {
  return (
    <div id='canvas-container'>
      <Canvas />
    </div>
  );
}
```

Canvas 组件做了一些场景的初始化工作：

- 创建了一个 Scene 和一个 Camera
- 自动处理 resizing，Canvas 大小默认取决于上层容器的大小
  > the Canvas will be resized to fit the parent div, so you can control how big it is by just changing the `width` and `height` of `#canvas-container` in your css.
- Canvas 会在每一帧都渲染 Scene（即一个渲染循环）

### 物体

Mesh，网格，是 three.js 中的基本对象，用于保存几何体和材质数据。这里可以通过组件 `<mesh/>` 使用它。

> note: 注意 mesh 是小写

作为例子，使用 BoxGeometry 组件为几何体和 MeshPhongMaterial 组件为材料创建一个新网格。

```js
<mesh>
  <boxGeometry />
  <meshPhongMaterial />
</mesh>
```

把该网格对象加入场景，只需要把其组件对象加入`<Canvas />` children 内。

```js
import { Canvas } from '@react-three/fiber';

export default function App() {
  return (
    <div id='canvas-container'>
      <Canvas>
        <mesh>
          <boxGeometry />
          <meshPhongMaterial />
        </mesh>
      </Canvas>
    </div>
  );
}
```

> 在这里 three.js 原生对象会自动转为 JSX 元素。就像写 `<div />` 或者 `<span />` 一样。一般规则是，Fiber 组件命名为在 three.js 中名称的 camel-case 形式。

该代码与下方 three.js 原生代码效果相同：

```js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.querySelector('#canvas-container').appendChild(renderer.domElement);

const mesh = new THREE.Mesh();
mesh.geometry = new THREE.BoxGeometry();
mesh.material = new THREE.MeshPhongMaterial();

scene.add(mesh);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
```

> When you mount a mesh component, Fiber is creating a new THREE.Mesh object, and the same is done for geometry and material. Then, geometry and material are attached to their parent.

## 数据

分为构造函数参数和属性，使用组件的 prop 传入。

对于构造函数参数，通过 名字为 args 的 prop 传入，args 为一个 array。

例如 `const geometry = new THREE.BoxGeometry(2, 2, 2)` => `<boxGeometry args={[2, 2, 2]} />`

原 three.js 对象的属性，也通过 fiber 组件 的 prop 传递。prop 命名为属性名。

例如设置光源：

```js
<ambientLight intensity={0.1} />
```

等同于：

```js
const light = new THREE.AmbientLight();
light.intensity = 0.1;
```

> the last fundamental concept of Fiber: how React props work on THREE objects. When you set any prop on a Fiber component, it will set the property of the same name on the three.js object.

还有一些类的 shortcuts 方法，例如 `.set()` 方法，也是通过组件 prop 来设置，因为其实就是一些数据设置。

```js
const light = new THREE.DirectionalLight()
light.position.set(0, 0, 5)
light.color.set('red')

//Which is the same as the following in JSX:

<directionalLight
  // we are setting the position
  position={[0, 0, 5]}
  // we are setting the color
  color="red"
/>
```

## 事件与交互

网格需要对用户交互做出反应。

和 jsx 一样，也是使用 `onClick` 来对鼠标点击事件作出响应。

同样，我们也可以设置状态值，来动态响应。如：

```js
const [active, setActive] = useState(false)

...

<mesh scale={active ? 1.5 : 1} onClick={() => setActive(!active)} ref={myMesh}>
  <boxGeometry />
  <meshPhongMaterial color="royalblue" />
</mesh>
```

这里做了三件事情：

- Attached a click handler to our mesh
- Added some state to track if the mesh is currently active
- Changed the scale based on that state

其它的事件例如 hover，可以使用 `onPointerOver` 和 `onPointerOut`。

## 加载模型

这里讲述如何在 react-three-fiber 里加载模型，以最通用的三种模型格式（ `GLTF`、`FBX`、和 `OBJ` ）为例。

### GLTF

方法一：

```js
// react-three-fiber 模型加载 hooks
import { useLoader } from '@react-three/fiber';
// three.js 专用 GLTF 加载器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Scene() {
  const gltf = useLoader(GLTFLoader, './Poimandres.gltf');
  return (
    <Suspense fallback={null}>
      <primitive object={gltf.scene} />
    </Suspense>
  );
}
```

方法二：

使用 react-three-fiber 提供的 hook

```js
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

function Scene() {
  const fbx = useGLTF('Poimandres.gltf');
  return <primitive object={fbx} />;
}
```

### OBJ

```js
import React from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useLoader } from '@react-three/fiber';

function Scene() {
  const obj = useLoader(OBJLoader, 'Poimandres.obj');
  return <primitive object={obj} />;
}
```

```js
import React from 'react';
import { useOBJ } from '@react-three/drei';
function Scene() {
  const fbx = useOBJ('Poimandres.fbx');
  return <primitive object={fbx} />;
}
```

### FBX

```js
import React from 'react';
import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

function Scene() {
  const fbx = useLoader(FBXLoader, 'Poimandres.fbx');
  return <primitive object={fbx} />;
}
```

```js
import React from 'react';
import { useFBX } from '@react-three/drei';
function Scene() {
  const fbx = useFBX('Poimandres.fbx');
  return <primitive object={fbx} />;
}
```

## 加载纹理 Textures

在 three.js 中可以使用 texture 来自定义生成 material。

和加载模型一样，texture 也有两种加载方式。

首先是配合 three.js 的 `TextureLoader` ：

```js
import React from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

function Scene() {
const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(TextureLoader, [
  'PavingStones092_1K_Color.jpg',
  'PavingStones092_1K_Displacement.jpg',
  'PavingStones092_1K_Normal.jpg',
  'PavingStones092_1K_Roughness.jpg',
  'PavingStones092_1K_AmbientOcclusion.jpg',
])
  return (
    <>
      <mesh>
        <sphereGeometry args={[1, 100, 100]} />
        <meshStandardMaterial
          displacementScale={0.2}
          map={colorMap}
          displacementMap={displacementMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          aoMap={aoMap}
        />
      </mesh>
    </>
  );
```

第二种是使用 react-three-fiber 的自定义 hook `useTexture`

```js
import { useTexture } from "@react-three/drei";

...

const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useTexture([
  'PavingStones092_1K_Color.jpg',
  'PavingStones092_1K_Displacement.jpg',
  'PavingStones092_1K_Normal.jpg',
  'PavingStones092_1K_Roughness.jpg',
  'PavingStones092_1K_AmbientOcclusion.jpg',
])
```

## 基础动画

### useFrame

`useFrame` 是一个 Fiber hook，可以让我们在 fiber 的渲染循环的每一帧更新的时候都执行特定代码。

> 值得一提的是，Fiber hooks 仅能在以 `<Canvas />` 为 parent 节点的时候被调用。

使用示例如下：

```js
import { useFrame } from '@react-three/fiber';

function MyAnimatedBox() {
  useFrame(() => {
    console.log("Hey, I'm executing every frame!");
  });
  return (
    <mesh>
      <boxGeometry />
      <meshBasicMaterial color='royalblue' />
    </mesh>
  );
}
```

而且 Fiber scene 的 state 值会作为参数传入。

```js
useFrame(({ clock }) => {
  const a = clock.getElapsedTime();
  console.log(a); // the value will be 0 at scene initialization and grow each frame
});
```

> clock is a three.js Clock object, from which we are getting the total elapsed time, which will be key for our animations.

### useRef

通过 setState 来更新组件状态，并通过 props 改变 mesh，这看起来很好，但是在处理连续更新时，效果并不理想（因为 react 的的非即时更新）。因为我们想在每一帧直接改变网格。

首先，我们须通过 useRef React 钩子获得对 mesh 的引用：

```js
import React, { useRef } from 'react';

function MyAnimatedBox() {
  const myMesh = useRef<THREE.Mesh>(null!);
  return (
    <mesh ref={myMesh}>
      <boxGeometry args={[2, 2, 2]}/>
      <meshBasicMaterial color='royalblue' />
    </mesh>
  );
}
```

myMesh 可以获得对实际上的 three.js mesh 对象的引用。现在就可以在 useFrame 中自由改变它，而不必担心 React。

```js
useFrame(({ clock }) => {
  myMesh.current.rotation.x = clock.getElapsedTime();
});
```

总结一下就是：

- 从传递给 useFrame 的参数中解构 clock，它是 Fiber scene 的 state。
- 通过网格对象的引用 myMesh.current 访问 rotation.x 属性。
- 将时间相关值赋值给 x 轴上的 rotation。

## React Spring

先前说过可以使用 useFrame 创建微型动画，以及通过 onClick 等事件监听对用户交互做出反应，但还没有了解如何以创建动画的方式来更改 mesh props。

为此，我们将使用 react-spring。react-spring 是基于 spring physics（弹簧物理）的动画库。其与 React Three Fiber 可很好配合，因为维护者相同。并且它还有专为配合 React Three Fiber 使用的导出。

首先讲一下 react-spring 的概念。其动画方式和 CSS 过滤这些并不相同，而是像它的名字 “弹簧”，动画方式取决于质量、张力和摩擦等因素，这正很适合 3D 。

### 使用 React Spring

首先安装 `@react-spring/three` 包，导入相应方法。

```js
import { useSpring, animated } from '@react-spring/three';
```

首先介绍一下

- useSpring，将值转换为动画值的钩子
- animated，一个组件，用于代替 DOM 或 Mesh，若使用 react-spring 来制作动画，那么就需要使用 animation.mesh 而不是 mesh

让我么创建第一个弹簧，并在用户单击时将其绑定到我们的 mesh 上。

```js
const springs = useSpring({ scale: active ? 1.5 : 1 });
```

在这里创建一个名为 springs 的常量，用来保存动画值。useSpring 本身接受一个参数（类型为对象），其中包含我们想要设置动画的所有内容。这里为缩放比例 scale 根据活动状态，设置值为 1 / 1.5。

我们也可以解构 useSpring 的返回值，只获取我们想要的值。

```js
const { scale } = useSpring({ scale: active ? 1.5 : 1 });
```

现在我们有了这个动画值，将之放到 mesh 中

```js
<animated.mesh scale={scale} onClick={() => setActive(!active)} ref={myMesh}>
  <boxGeometry />
  <meshPhongMaterial color='royalblue' />
</animated.mesh>
```

最后一步是为动画添加一些 wobblier（摇摆不定）的效果，为此我们可以从 react-spring 导入配置对象。

当我们调用 useSpring 钩子时，我们可以为 config 传递该设定值。

```js
import { useSpring, animated, config } from 'react-spring/three';

const { scale } = useSpring({
  scale: active ? 1.5 : 1,
  config: config.wobbly,
});
```

所以总结一下，这一小节就介绍了：

- 了解在 React Three Fiber 中如何使用 react-spring
- props Animate，通过改变 props 来制作动画

## 问题

- 是否会产生多余的开销？会比原生 three.js 慢吗？

  没有额外的开销。组件使用的是 React 之外的渲染循环。

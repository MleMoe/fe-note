# Web 3D 基础介绍

## 基础部件

- scene
  一个微型世界，使用右手坐标系。在其中放置物体，物体存储结构是和 DOM 类似的树结构。
- camera
  拍摄这个世界的摄像机。分为 OrthographicCamera（正交） 和 PerspectiveCamera（透视）
- renderer
  If the scene is a tiny universe, and the camera is a telescope pointed at that universe, then the renderer is an artist who looks through the telescope and draws what they see onto a `<canvas>`

## 可视物体

### Mesh

the Mesh constructor takes two parameters: a geometry and a material.

#### Geometry

The geometry defines the shape of the mesh.

> BufferGeometry 与 Geometry 的区别

#### Material

the material defines how the surface of the mesh looks.

There are other kinds of visible objects, such as lines, and shapes, and sprites, and particles, and so on

## 第一个 three.js App

- Initial Setup
- Create the Scene
- Create the Camera
- Create a Visible Object
- Create the Renderer
- Render the Scene

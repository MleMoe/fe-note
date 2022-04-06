import{_ as e,d as a}from"./app.d1630e5f.js";const r={},t=a('<h1 id="web-3d-\u57FA\u7840\u4ECB\u7ECD" tabindex="-1"><a class="header-anchor" href="#web-3d-\u57FA\u7840\u4ECB\u7ECD" aria-hidden="true">#</a> Web 3D \u57FA\u7840\u4ECB\u7ECD</h1><h2 id="\u57FA\u7840\u90E8\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u57FA\u7840\u90E8\u4EF6" aria-hidden="true">#</a> \u57FA\u7840\u90E8\u4EF6</h2><ul><li>scene \u4E00\u4E2A\u5FAE\u578B\u4E16\u754C\uFF0C\u4F7F\u7528\u53F3\u624B\u5750\u6807\u7CFB\u3002\u5728\u5176\u4E2D\u653E\u7F6E\u7269\u4F53\uFF0C\u7269\u4F53\u5B58\u50A8\u7ED3\u6784\u662F\u548C DOM \u7C7B\u4F3C\u7684\u6811\u7ED3\u6784\u3002</li><li>camera \u62CD\u6444\u8FD9\u4E2A\u4E16\u754C\u7684\u6444\u50CF\u673A\u3002\u5206\u4E3A OrthographicCamera\uFF08\u6B63\u4EA4\uFF09 \u548C PerspectiveCamera\uFF08\u900F\u89C6\uFF09</li><li>renderer If the scene is a tiny universe, and the camera is a telescope pointed at that universe, then the renderer is an artist who looks through the telescope and draws what they see onto a <code>&lt;canvas&gt;</code></li></ul><h2 id="\u53EF\u89C6\u7269\u4F53" tabindex="-1"><a class="header-anchor" href="#\u53EF\u89C6\u7269\u4F53" aria-hidden="true">#</a> \u53EF\u89C6\u7269\u4F53</h2><h3 id="mesh" tabindex="-1"><a class="header-anchor" href="#mesh" aria-hidden="true">#</a> Mesh</h3><p>the Mesh constructor takes two parameters: a geometry and a material.</p><h4 id="geometry" tabindex="-1"><a class="header-anchor" href="#geometry" aria-hidden="true">#</a> Geometry</h4><p>The geometry defines the shape of the mesh.</p><blockquote><p>BufferGeometry \u4E0E Geometry \u7684\u533A\u522B</p></blockquote><h4 id="material" tabindex="-1"><a class="header-anchor" href="#material" aria-hidden="true">#</a> Material</h4><p>the material defines how the surface of the mesh looks.</p><p>There are other kinds of visible objects, such as lines, and shapes, and sprites, and particles, and so on</p><h2 id="\u7B2C\u4E00\u4E2A-three-js-app" tabindex="-1"><a class="header-anchor" href="#\u7B2C\u4E00\u4E2A-three-js-app" aria-hidden="true">#</a> \u7B2C\u4E00\u4E2A three.js App</h2><ul><li>Initial Setup</li><li>Create the Scene</li><li>Create the Camera</li><li>Create a Visible Object</li><li>Create the Renderer</li><li>Render the Scene</li></ul>',14);function h(i,s){return t}var n=e(r,[["render",h],["__file","basic.html.vue"]]);export{n as default};
import{_ as s,r as e,o as p,c as t,a as n,b as r,F as o,d as c,e as l}from"./app.d1630e5f.js";const i={},u=c(`<h1 id="fiber" tabindex="-1"><a class="header-anchor" href="#fiber" aria-hidden="true">#</a> Fiber</h1><h2 id="\u4E3A\u4EC0\u4E48\u8981\u6709-fiber" tabindex="-1"><a class="header-anchor" href="#\u4E3A\u4EC0\u4E48\u8981\u6709-fiber" aria-hidden="true">#</a> \u4E3A\u4EC0\u4E48\u8981\u6709 Fiber</h2><p>React \u7684 diff \u7B97\u6CD5\u867D\u7136\u7ECF\u8FC7\u4F18\u5316\uFF0C\u53EF\u5B83\u5374\u662F\u540C\u6B65\u7684\uFF0Crenderer \u8D1F\u8D23\u64CD\u4F5C DOM \u7684 appendChild \u7B49 API \u4E5F\u662F\u540C\u6B65\u7684\u3002</p><p>\u5982\u679C\u6709\u5927\u91CF\u8282\u70B9\u9700\u8981\u66F4\u65B0\uFF0CJS \u7EBF\u7A0B\u7684\u8FD0\u884C\u65F6\u95F4\u53EF\u80FD\u4F1A\u6BD4\u8F83\u957F\uFF0C\u5728\u8FD9\u6BB5\u65F6\u95F4\u6D4F\u89C8\u5668\u662F\u4E0D\u4F1A\u54CD\u5E94\u5176\u5B83\u4E8B\u4EF6\u3002\u56E0\u4E3A JS \u7EBF\u7A0B\u548C GUI \u7EBF\u7A0B\u662F\u4E92\u65A5\u7684\uFF0CJS \u8FD0\u884C\u65F6\u9875\u9762\u5C31\u4E0D\u4F1A\u54CD\u5E94\u3002\u8FD9\u4E2A\u65F6\u95F4\u592A\u957F\u4E86\uFF0C\u7528\u6237\u5C31\u53EF\u80FD\u770B\u5230\u5361\u987F\uFF0C\u7279\u522B\u662F\u52A8\u753B\u7684\u5361\u987F\u4F1A\u5F88\u660E\u663E\u3002</p><p>\u800C Fiber \u5C31\u662F\u7528\u6765\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898\u7684\uFF0CFiber \u53EF\u4EE5\u5C06\u957F\u65F6\u95F4\u7684\u540C\u6B65\u4EFB\u52A1\u62C6\u5206\u6210\u591A\u4E2A\u5C0F\u4EFB\u52A1\uFF0C\u4ECE\u800C\u8BA9\u6D4F\u89C8\u5668\u80FD\u591F\u62BD\u8EAB\u53BB\u54CD\u5E94\u5176\u5B83\u4E8B\u4EF6\uFF0C\u7B49\u5B83\u7A7A\u4E86\u518D\u56DE\u6765\u7EE7\u7EED\u8BA1\u7B97\uFF0C\u8FD9\u6837\u6574\u4E2A\u8BA1\u7B97\u6D41\u7A0B\u5C31\u663E\u5F97\u5E73\u6ED1\u5F88\u591A\u3002</p><h2 id="\u9700\u8981\u89E3\u51B3\u7684\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#\u9700\u8981\u89E3\u51B3\u7684\u95EE\u9898" aria-hidden="true">#</a> \u9700\u8981\u89E3\u51B3\u7684\u95EE\u9898</h2><p>\u9012\u5F52\u904D\u5386 vDom \u6811\u65F6\uFF0C\u5982\u679C\u6211\u4EEC\u5728\u4E2D\u9014\u67D0\u4E00\u6B65\u505C\u4E0B\u6765\uFF0C\u4E0B\u6B21\u518D\u8C03\u7528\u65F6\u5176\u5B9E\u5E76\u4E0D\u77E5\u9053\u4E0A\u6B21\u5728\u54EA\u91CC\u505C\u4E0B\u6765\u7684\u3002\u6240\u4EE5 vDom \u7684\u6811\u5F62\u7ED3\u6784\u5E76\u4E0D\u6EE1\u8DB3\u4E2D\u9014\u6682\u505C\uFF0C\u4E0B\u6B21\u7EE7\u7EED\u7684\u9700\u6C42\uFF0C\u9700\u8981\u6539\u9020\u6570\u636E\u7ED3\u6784\u3002</p><p>\u53E6\u4E00\u4E2A\u9700\u8981\u89E3\u51B3\u7684\u95EE\u9898\u662F\uFF0C\u62C6\u5206\u4E0B\u6765\u7684\u5C0F\u4EFB\u52A1\u4EC0\u4E48\u65F6\u5019\u6267\u884C\uFF1F\u6211\u4EEC\u7684\u76EE\u7684\u662F\u8BA9\u7528\u6237\u6709\u66F4\u6D41\u7545\u7684\u4F53\u9A8C\uFF0C\u6240\u4EE5\u6211\u4EEC\u6700\u597D\u4E0D\u8981\u963B\u585E\u9AD8\u4F18\u5148\u7EA7\u7684\u4EFB\u52A1\uFF0C\u6BD4\u5982\u7528\u6237\u8F93\u5165\uFF0C\u52A8\u753B\u4E4B\u7C7B\uFF0C\u7B49\u5B83\u4EEC\u6267\u884C\u5B8C\u4E86\u6211\u4EEC\u518D\u8BA1\u7B97\u3002\u90A3\u6211\u600E\u4E48\u77E5\u9053\u73B0\u5728\u6709\u6CA1\u6709\u9AD8\u4F18\u5148\u7EA7\u4EFB\u52A1\uFF0C\u6D4F\u89C8\u5668\u662F\u4E0D\u662F\u7A7A\u95F2\u5462\uFF1F</p><p>\u603B\u7ED3\u4E0B\u6765\uFF0CFiber \u8981\u60F3\u8FBE\u5230\u76EE\u7684\uFF0C\u9700\u8981\u89E3\u51B3\u4E24\u4E2A\u95EE\u9898\uFF1A</p><ul><li>\u65B0\u7684\u4EFB\u52A1\u8C03\u5EA6\uFF0C\u6709\u9AD8\u4F18\u5148\u7EA7\u4EFB\u52A1\u7684\u65F6\u5019\u5C06\u6D4F\u89C8\u5668\u8BA9\u51FA\u6765\uFF0C\u7B49\u6D4F\u89C8\u5668\u7A7A\u4E86\u518D\u7EE7\u7EED\u6267\u884C</li><li>\u65B0\u7684\u6570\u636E\u7ED3\u6784\uFF0C\u53EF\u4EE5\u968F\u65F6\u4E2D\u65AD\uFF0C\u4E0B\u6B21\u8FDB\u6765\u53EF\u4EE5\u63A5\u7740\u6267\u884C\u3002</li></ul><h2 id="\u4EFB\u52A1\u8C03\u5EA6" tabindex="-1"><a class="header-anchor" href="#\u4EFB\u52A1\u8C03\u5EA6" aria-hidden="true">#</a> \u4EFB\u52A1\u8C03\u5EA6</h2><p>\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528 requestIdleCallback \u6765\u5B9E\u73B0\u4EFB\u52A1\u8C03\u5EA6\u3002 requestIdleCallback \u63A5\u6536\u4E00\u4E2A\u56DE\u8C03\uFF0C\u8FD9\u4E2A\u56DE\u8C03\u4F1A\u5728\u6D4F\u89C8\u5668\u7A7A\u95F2\u65F6\u8C03\u7528\u3002</p><p>callback \u51FD\u6570\u4F1A\u63A5\u6536\u5230\u4E00\u4E2A\u540D\u4E3A IdleDeadline \u7684\u53C2\u6570\uFF0C\u8FD9\u4E2A\u53C2\u6570\u53EF\u4EE5\u83B7\u53D6<strong>\u5F53\u524D\u7A7A\u95F2\u65F6\u95F4</strong>\uFF0C\u4EE5\u53CA\u56DE\u8C03\u662F\u5426\u5728\u8D85\u65F6\u65F6\u95F4\u524D\u5DF2\u7ECF\u6267\u884C\u7684\u72B6\u6001\u3002 options \u53EF\u8BBE\u7F6E\u5C5E\u6027 timeout\u3002\u5982\u679C\u6307\u5B9A\u4E86 timeout \u5E76\u5177\u6709\u4E00\u4E2A\u6B63\u503C\uFF0C\u5E76\u4E14\u5C1A\u672A\u901A\u8FC7\u8D85\u65F6\u6BEB\u79D2\u6570\u8C03\u7528\u56DE\u8C03\uFF0C\u90A3\u4E48\u56DE\u8C03\u4F1A\u5728\u4E0B\u4E00\u6B21\u7A7A\u95F2\u65F6\u671F\u88AB\u5F3A\u5236\u6267\u884C\uFF0C\u5C3D\u7BA1\u8FD9\u6837\u5F88\u53EF\u80FD\u4F1A\u5BF9\u6027\u80FD\u9020\u6210\u8D1F\u9762\u5F71\u54CD\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 *
 * <span class="token keyword">@callback</span> \u4E00\u4E2A\u5728\u4E8B\u4EF6\u5FAA\u73AF\u7A7A\u95F2\u65F6\u5373\u5C06\u88AB\u8C03\u7528\u7684\u51FD\u6570\u7684\u5F15\u7528\u3002
 * <span class="token keyword">@options</span> \u914D\u7F6E\u53C2\u6570
 * <span class="token keyword">@return</span> \u4E00\u4E2A ID\uFF0C\u53EF\u4EE5\u628A\u5B83\u4F20\u5165 Window.cancelIdleCallback() \u65B9\u6CD5\u6765\u7ED3\u675F\u56DE\u8C03
 * /
var handle = window.requestIdleCallback(callback[, options])
</span></code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><blockquote><p>\u4F46\u662F\u8FD9\u4E2A API \u8FD8\u5728\u5B9E\u9A8C\u4E2D\uFF0C\u517C\u5BB9\u6027\u4E0D\u597D\uFF0C\u6240\u4EE5 React \u5B98\u65B9\u81EA\u5DF1\u5B9E\u73B0\u4E86\u4E00\u5957\u3002</p></blockquote><p>\u6211\u4EEC\u8FDB\u884C\u4EFB\u52A1\u8C03\u5EA6\u7684\u601D\u60F3\u662F\u5C06\u4EFB\u52A1\u62C6\u5206\u6210\u591A\u4E2A\u5C0F\u4EFB\u52A1\uFF0C requestIdleCallback \u91CC\u9762\u4E0D\u65AD\u7684\u628A\u5C0F\u4EFB\u52A1\u62FF\u51FA\u6765\u6267\u884C\uFF0C\u5F53\u6240\u6709\u4EFB\u52A1\u90FD\u6267\u884C\u5B8C\u6216\u8005\u8D85\u65F6\u4E86\u5C31\u7ED3\u675F\u672C\u6B21\u6267\u884C\uFF0C\u540C\u65F6\u8981\u6CE8\u518C\u4E0B\u6B21\u6267\u884C\uFF0C\u4EE3\u7801\u67B6\u5B50\u5C31\u662F\u8FD9\u6837\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">workLoop</span><span class="token punctuation">(</span><span class="token parameter">deadline</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u76EE\u524D\u6D4F\u89C8\u5668\u662F\u7A7A\u95F2\u7684\uFF0C\u800C\u4E14\u8FD8\u6709\u4E0B\u4E00\u4E2A\u4EFB\u52A1\u6CA1\u6709\u505A\u5B8C</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>nextUnitOfWork <span class="token operator">&amp;&amp;</span> deadline<span class="token punctuation">.</span><span class="token function">timeRemaining</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    nextUnitOfWork <span class="token operator">=</span> <span class="token function">performUnitOfWork</span><span class="token punctuation">(</span>nextUnitOfWork<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// \u5982\u679C\u4EFB\u52A1\u8FD8\u6CA1\u5B8C\uFF0C\u4F46\u662F\u65F6\u95F4\u5230\u4E86\uFF0C\u6211\u4EEC\u9700\u8981\u7EE7\u7EED\u6CE8\u518CrequestIdleCallback</span>
  <span class="token function">requestIdleCallback</span><span class="token punctuation">(</span>workLoop<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// performUnitOfWork\u7528\u6765\u6267\u884C\u4EFB\u52A1\uFF0C\u53C2\u6570\u662F\u6211\u4EEC\u7684\u5F53\u524Dfiber\u4EFB\u52A1\uFF0C\u8FD4\u56DE\u503C\u662F\u4E0B\u4E00\u4E2A\u4EFB\u52A1</span>
<span class="token keyword">function</span> <span class="token function">performUnitOfWork</span><span class="token punctuation">(</span><span class="token parameter">fiber</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token function">requestIdleCallback</span><span class="token punctuation">(</span>workLoop<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>\u4E0A\u9762\u6211\u4EEC\u7684 performUnitOfWork \u5E76\u6CA1\u6709\u5B9E\u73B0\uFF0C\u4F46\u662F\u4ECE\u4E0A\u9762\u7684\u7ED3\u6784\u53EF\u4EE5\u770B\u51FA\u6765\uFF0C\u5B83\u63A5\u6536\u7684\u53C2\u6570\u662F\u4E00\u4E2A\u5C0F\u4EFB\u52A1\uFF0C\u540C\u65F6\u901A\u8FC7\u8FD9\u4E2A\u5C0F\u4EFB\u52A1\u8FD8\u53EF\u4EE5\u627E\u5230\u5B83\u7684\u4E0B\u4E00\u4E2A\u5C0F\u4EFB\u52A1\uFF0CFiber \u6784\u5EFA\u7684\u5C31\u662F\u8FD9\u6837\u4E00\u4E2A\u6570\u636E\u7ED3\u6784\u3002Fiber \u4E4B\u524D\u7684\u6570\u636E\u7ED3\u6784\u662F\u4E00\u68F5\u6811\uFF0C\u7236\u8282\u70B9\u7684 children \u6307\u5411\u4E86\u5B50\u8282\u70B9\uFF0C\u4F46\u662F\u53EA\u6709\u8FD9\u4E00\u4E2A\u6307\u9488\u662F\u4E0D\u80FD\u5B9E\u73B0\u4E2D\u65AD\u7EE7\u7EED\u7684\u3002</p><p>Fiber \u5C31\u662F\u6539\u9020\u4E86\u8FD9\u6837\u4E00\u4E2A\u7ED3\u6784\uFF0C\u52A0\u4E0A\u4E86\u6307\u5411\u7236\u8282\u70B9\u548C sibling \u8282\u70B9\u7684\u6307\u9488\u3002</p><h2 id="\u53C2\u8003" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003" aria-hidden="true">#</a> \u53C2\u8003</h2>`,20),b={href:"https://mp.weixin.qq.com/s/zg2H5t950X3HNthya3pzHw",target:"_blank",rel:"noopener noreferrer"},d=l("\u624B\u5199 React \u7684 Fiber \u67B6\u6784\uFF0C\u6DF1\u5165\u7406\u89E3\u5176\u539F\u7406");function k(m,h){const a=e("ExternalLinkIcon");return p(),t(o,null,[u,n("p",null,[n("a",b,[d,r(a)])])],64)}var _=s(i,[["render",k],["__file","fiber.html.vue"]]);export{_ as default};
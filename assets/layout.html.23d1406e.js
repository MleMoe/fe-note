import{_ as e,r as t,o,c as l,a as n,b as c,F as r,d as s,e as a}from"./app.d1630e5f.js";const i={},u=s(`<h1 id="layout" tabindex="-1"><a class="header-anchor" href="#layout" aria-hidden="true">#</a> layout</h1><h2 id="container" tabindex="-1"><a class="header-anchor" href="#container" aria-hidden="true">#</a> container</h2><p>A component for fixing an element&#39;s width to the current breakpoint.</p><p><code>.container</code> \u8BBE\u7F6E\u5143\u7D20\u7684\u6700\u5927\u5BBD\u5EA6\u4EE5\u5339\u914D\u5F53\u524D\u65AD\u70B9\u7684\u6700\u5C0F\u5BBD\u5EA6\u3002</p><p>\u5982\u679C\u4F60\u66F4\u559C\u6B22\u4E3A\u4E00\u7EC4\u56FA\u5B9A\u7684\u5C4F\u5E55\u5C3A\u5BF8\u8FDB\u884C\u8BBE\u8BA1\uFF0C\u800C\u4E0D\u662F\u5C1D\u8BD5\u9002\u5E94\u5B8C\u5168\u6D41\u7545\u7684 viewports\uFF0C\u8FD9\u5C06\u975E\u5E38\u6709\u7528\u3002</p><div class="language-scss ext-scss line-numbers-mode"><pre class="language-scss"><code><span class="token selector">.container </span><span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-sm </span><span class="token punctuation">{</span>
    <span class="token property">max-width</span><span class="token punctuation">:</span> 640px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-md </span><span class="token punctuation">{</span>
    <span class="token property">max-width</span><span class="token punctuation">:</span> 768px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-lg </span><span class="token punctuation">{</span>
    <span class="token property">max-width</span><span class="token punctuation">:</span> 1024px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-xl </span><span class="token punctuation">{</span>
    <span class="token property">max-width</span><span class="token punctuation">:</span> 1280px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-2xl </span><span class="token punctuation">{</span>
    <span class="token property">max-width</span><span class="token punctuation">:</span> 1536px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>To center a container, use the mx-auto utility:</p><p>To add horizontal padding, use the px-{size} utilities:</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>container mx-auto px-4<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token comment">&lt;!-- ... --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>The container class also includes responsive variants like container-md that allow you to make something behave like a container at only a certain breakpoint and up:</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code><span class="token comment">&lt;!-- Full-width fluid until the \`md\` breakpoint, then lock to container --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>md:container md:mx-auto<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token comment">&lt;!-- ... --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="box-decoration-break" tabindex="-1"><a class="header-anchor" href="#box-decoration-break" aria-hidden="true">#</a> box-decoration-break</h2>`,12),b={href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-decoration-break",target:"_blank",rel:"noopener noreferrer"},k=a("box-decoration-break"),m=a(" \u5C5E\u6027\u7528\u6765\u5B9A\u4E49\u5F53\u5143\u7D20\u8DE8\u591A\u884C\u3001\u591A\u5217\u6216\u591A\u9875\u65F6\uFF0C\u5143\u7D20\u7684\u7247\u6BB5\u5E94\u5982\u4F55\u5448\u73B0\u3002"),d=s(`<blockquote><p>\u5B9E\u9A8C\u6027\u529F\u80FD</p></blockquote><div class="language-scss ext-scss line-numbers-mode"><pre class="language-scss"><code><span class="token selector">.decoration </span><span class="token punctuation">{</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-slice </span><span class="token punctuation">{</span>
    <span class="token property">box-decoration-break</span><span class="token punctuation">:</span> slice<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-clone </span><span class="token punctuation">{</span>
    <span class="token property">box-decoration-break</span><span class="token punctuation">:</span> clone<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><ul><li><p>slice</p><p>\u5143\u7D20\u88AB\u6309\u7167\u76D2\u5B50\u88AB\u5207\u5272\u524D\u7684\u539F\u59CB\u6837\u5F0F\u6E32\u67D3\uFF0C\u4E4B\u540E\uFF0C\u9488\u5BF9\u6BCF\u4E2A\u884C/\u5217/\u9875\u9762\u5C06\u6B64\u5047\u8BBE\u6846\u6E32\u67D3\u6210\u7247\u6BB5\u3002\u8BF7\u6CE8\u610F\uFF0C\u5047\u8BBE\u6846\u5BF9\u4E8E\u6BCF\u4E2A\u7247\u6BB5\u53EF\u4EE5\u662F\u4E0D\u540C\u7684\uFF0C\u56E0\u4E3A\u5982\u679C\u4E2D\u65AD\u53D1\u751F\u5728\u884C\u5185\u65B9\u5411\uFF0C\u5219\u5B83\u4F7F\u7528\u81EA\u5DF1\u7684\u9AD8\u5EA6\uFF0C\u5982\u679C\u4E2D\u65AD\u53D1\u751F\u5728\u5757\u65B9\u5411\uFF0C\u5219\u5B83\u4F7F\u7528\u81EA\u5DF1\u7684\u5BBD\u5EA6\u3002\u6709\u5173\u8BE6\u7EC6\u4FE1\u606F\uFF0C\u8BF7\u53C2\u9605 CSS \u89C4\u8303\u3002</p></li><li><p>clone</p><p>\u6BCF\u4E2A\u6846\u7247\u6BB5\u4E0E\u6307\u5B9A\u7684\u8FB9\u6846\u3001\u586B\u5145\u548C\u8FB9\u8DDD\u72EC\u7ACB\u5448\u73B0\u3002The border-radius\u3001border-image\u3001 box-shadow \u72EC\u7ACB\u5730\u5E94\u7528\u4E8E\u6BCF\u4E2A\u7247\u6BB5,\u6BCF\u4E2A\u7247\u6BB5\u7684\u80CC\u666F\u4E5F\u662F\u72EC\u7ACB\u7ED8\u5236\u7684, \u8FD9\u610F\u5473\u7740\u4F7F\u7528 background-repeat: no-repeat \u7684\u80CC\u666F\u56FE\u7247\u4ECD\u7136\u53EF\u80FD\u91CD\u590D\u591A\u6B21.</p></li></ul><p>\u6307\u5B9A\u7684\u503C\u5C06\u5F71\u54CD\u5143\u7D20\u4EE5\u4E0B\u5C5E\u6027\u7684\u8868\u73B0\uFF1A</p><p>background border border-image box-shadow clip-path margin padding</p><h2 id="box-sizing" tabindex="-1"><a class="header-anchor" href="#box-sizing" aria-hidden="true">#</a> box-sizing</h2><p>Utilities for controlling how the browser should calculate an element&#39;s total size.</p><div class="language-scss ext-scss line-numbers-mode"><pre class="language-scss"><code><span class="token selector">.box </span><span class="token punctuation">{</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-border </span><span class="token punctuation">{</span>
    <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-content </span><span class="token punctuation">{</span>
    <span class="token property">box-sizing</span><span class="token punctuation">:</span> content-box<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>Use box-border to set an element\u2019s box-sizing to <code>border-box</code>, telling the browser to include the element\u2019s borders and padding when you give it a height or width.</p><p>This means a 100px \xD7 100px element with a 2px border and 4px of padding on all sides will be rendered as 100px \xD7 100px, with an internal content area of 88px \xD7 88px.</p><p>Use box-content to set an element\u2019s box-sizing to <code>content-box</code>, telling the browser to add borders and padding on top of the element\u2019s specified width or height.</p><p>This means a 100px \xD7 100px element with a 2px border and 4px of padding on all sides will actually be rendered as 112px \xD7 112px, with an internal content area of 100px \xD7 100px.</p><h2 id="display" tabindex="-1"><a class="header-anchor" href="#display" aria-hidden="true">#</a> display</h2><p>Utilities for controlling the display box type of an element.</p><div class="language-scss ext-scss line-numbers-mode"><pre class="language-scss"><code><span class="token selector">block </span><span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">inline-block </span><span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">inline </span><span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">flex </span><span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">inline-flex </span><span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-flex<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">table </span><span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> table<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">inline-table </span><span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-table<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">table-caption </span><span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> table-caption<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">table-cell </span><span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> table-cell<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">table-column </span><span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> table-column<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">table-column-group </span><span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> table-column-group<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">table-footer-group </span><span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> table-footer-group<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">table-header-group </span><span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> table-header-group<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">table-row-group </span><span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> table-row-group<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">table-row </span><span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> table-row<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">flow-root </span><span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flow-root<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">grid </span><span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> grid<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">inline-grid </span><span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-grid<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">contents </span><span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> contents<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">list-item </span><span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> list-item<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">hidden </span><span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br></div></div><h2 id="float" tabindex="-1"><a class="header-anchor" href="#float" aria-hidden="true">#</a> float</h2><p>Utilities for controlling the wrapping of content around an element.</p><div class="language-scss ext-scss line-numbers-mode"><pre class="language-scss"><code><span class="token selector">.float </span><span class="token punctuation">{</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-right </span><span class="token punctuation">{</span>
    <span class="token property">float</span><span class="token punctuation">:</span> right<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-left </span><span class="token punctuation">{</span>
    <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-none </span><span class="token punctuation">{</span>
    <span class="token property">float</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="clear" tabindex="-1"><a class="header-anchor" href="#clear" aria-hidden="true">#</a> clear</h2><p>Utilities for controlling the wrapping of content around an element.</p><p>\u4F7F\u7528 clear-left \u5C06\u5143\u7D20\u5B9A\u4F4D\u5728\u4EFB\u4F55\u524D\u9762\u7684\u5DE6\u6D6E\u52A8\u5143\u7D20\u4E0B\u65B9\u3002</p><p>\u4F7F\u7528 clear-right \u5C06\u5143\u7D20\u5B9A\u4F4D\u5728\u4EFB\u4F55\u524D\u9762\u7684\u53F3\u6D6E\u52A8\u5143\u7D20\u4E0B\u65B9\u3002</p><p>\u4F7F\u7528 clear-both \u5C06\u5143\u7D20\u5B9A\u4F4D\u5728\u6240\u6709\u524D\u9762\u7684\u6D6E\u52A8\u5143\u7D20\u4E0B\u65B9\u3002</p><div class="language-scss ext-scss line-numbers-mode"><pre class="language-scss"><code><span class="token selector">.clear </span><span class="token punctuation">{</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-left </span><span class="token punctuation">{</span>
    <span class="token property">clear</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-right </span><span class="token punctuation">{</span>
    <span class="token property">clear</span><span class="token punctuation">:</span> right<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-both </span><span class="token punctuation">{</span>
    <span class="token property">clear</span><span class="token punctuation">:</span> both<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-none </span><span class="token punctuation">{</span>
    <span class="token property">clear</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="object-fit" tabindex="-1"><a class="header-anchor" href="#object-fit" aria-hidden="true">#</a> object-fit</h2><p>Utilities for controlling how a replaced element&#39;s content should be resized.</p><p>\u53EF\u4EE5\u7528\u6765\u9002\u914D img</p><div class="language-scss ext-scss line-numbers-mode"><pre class="language-scss"><code><span class="token selector">.object </span><span class="token punctuation">{</span>
<span class="token punctuation">}</span>
<span class="token selector"><span class="token parent important">&amp;</span>-contain </span><span class="token punctuation">{</span>
  <span class="token property">object-fit</span><span class="token punctuation">:</span> contain<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector"><span class="token parent important">&amp;</span>-cover </span><span class="token punctuation">{</span>
  <span class="token property">object-fit</span><span class="token punctuation">:</span> cover<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector"><span class="token parent important">&amp;</span>-fill </span><span class="token punctuation">{</span>
  <span class="token property">object-fit</span><span class="token punctuation">:</span> fill<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector"><span class="token parent important">&amp;</span>-none </span><span class="token punctuation">{</span>
  <span class="token property">object-fit</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector"><span class="token parent important">&amp;</span>-scale-down </span><span class="token punctuation">{</span>
  <span class="token property">object-fit</span><span class="token punctuation">:</span> scale-down<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="object-position" tabindex="-1"><a class="header-anchor" href="#object-position" aria-hidden="true">#</a> object-position</h2><p>Utilities for controlling how a replaced element&#39;s content should be positioned within its container.</p><p>\u4F7F\u7528 object-{side} \u6307\u5B9A\u66FF\u6362\u5143\u7D20\u7684\u5185\u5BB9\u5E94\u5982\u4F55\u5728\u5176\u5BB9\u5668\u4E2D\u5B9A\u4F4D\u3002</p><div class="language-scss ext-scss line-numbers-mode"><pre class="language-scss"><code><span class="token selector">.object </span><span class="token punctuation">{</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-bottom </span><span class="token punctuation">{</span>
    <span class="token property">object-position</span><span class="token punctuation">:</span> bottom<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-center </span><span class="token punctuation">{</span>
    <span class="token property">object-position</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-left </span><span class="token punctuation">{</span>
    <span class="token property">object-position</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-left-bottom </span><span class="token punctuation">{</span>
    <span class="token property">object-position</span><span class="token punctuation">:</span> left bottom<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-left-top </span><span class="token punctuation">{</span>
    <span class="token property">object-position</span><span class="token punctuation">:</span> left top<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-right </span><span class="token punctuation">{</span>
    <span class="token property">object-position</span><span class="token punctuation">:</span> right<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-right-bottom </span><span class="token punctuation">{</span>
    <span class="token property">object-position</span><span class="token punctuation">:</span> right bottom<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-right-top </span><span class="token punctuation">{</span>
    <span class="token property">object-position</span><span class="token punctuation">:</span> right top<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-top </span><span class="token punctuation">{</span>
    <span class="token property">object-position</span><span class="token punctuation">:</span> top<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><h2 id="overflow" tabindex="-1"><a class="header-anchor" href="#overflow" aria-hidden="true">#</a> overflow</h2><p>Utilities for controlling how an element handles content that is too large for the container.</p><div class="language-scss ext-scss line-numbers-mode"><pre class="language-scss"><code><span class="token selector">.overflow </span><span class="token punctuation">{</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-auto </span><span class="token punctuation">{</span>
    <span class="token property">overflow</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-hidden </span><span class="token punctuation">{</span>
    <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-visible </span><span class="token punctuation">{</span>
    <span class="token property">overflow</span><span class="token punctuation">:</span> visible<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-scroll </span><span class="token punctuation">{</span>
    <span class="token property">overflow</span><span class="token punctuation">:</span> scroll<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-x-auto </span><span class="token punctuation">{</span>
    <span class="token property">overflow-x</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-y-auto </span><span class="token punctuation">{</span>
    <span class="token property">overflow-y</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-x-hidden </span><span class="token punctuation">{</span>
    <span class="token property">overflow-x</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-y-hidden </span><span class="token punctuation">{</span>
    <span class="token property">overflow-y</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-x-visible </span><span class="token punctuation">{</span>
    <span class="token property">overflow-x</span><span class="token punctuation">:</span> visible<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-y-visible </span><span class="token punctuation">{</span>
    <span class="token property">overflow-y</span><span class="token punctuation">:</span> visible<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-x-scroll </span><span class="token punctuation">{</span>
    <span class="token property">overflow-x</span><span class="token punctuation">:</span> scroll<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-y-scroll </span><span class="token punctuation">{</span>
    <span class="token property">overflow-y</span><span class="token punctuation">:</span> scroll<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br></div></div><h2 id="position" tabindex="-1"><a class="header-anchor" href="#position" aria-hidden="true">#</a> position</h2><p>Utilities for controlling how an element is positioned in the DOM.</p><p>\u4F7F\u7528 static \u6839\u636E\u6587\u6863\u7684\u6B63\u5E38\u6D41\u6765\u5B9A\u4F4D\u5143\u7D20\u3002 \u4EFB\u4F55\u504F\u79FB\uFF08left right etc.\uFF09\u90FD\u5C06\u88AB\u5FFD\u7565\uFF0C\u5E76\u4E14\u5143\u7D20\u4E0D\u4F1A\u4F5C\u4E3A\u7EDD\u5BF9\u5B9A\u4F4D\u5B50\u5143\u7D20\u7684\u4F4D\u7F6E\u53C2\u8003\u3002</p><p>\u4F7F\u7528 relative \u6839\u636E\u6587\u6863\u7684\u6B63\u5E38\u6D41\u6765\u5B9A\u4F4D\u5143\u7D20\u3002 \u504F\u79FB\u91CF\u662F\u76F8\u5BF9\u4E8E\u5143\u7D20\u7684\u6B63\u5E38\u4F4D\u7F6E\u8BA1\u7B97\u7684\uFF0C\u5143\u7D20\u5C06\u4F5C\u4E3A\u7EDD\u5BF9\u5B9A\u4F4D\u5B50\u5143\u7D20\u7684\u4F4D\u7F6E\u53C2\u8003\u3002</p><p>\u4F7F\u7528 absolute \u5C06\u5143\u7D20\u5B9A\u4F4D\u5728\u6587\u6863\u7684\u6B63\u5E38\u6D41\u4E4B\u5916\uFF0C\u4F7F\u76F8\u90BB\u5143\u7D20\u8868\u73B0\u5F97\u597D\u50CF\u8BE5\u5143\u7D20\u4E0D\u5B58\u5728\u4E00\u6837\u3002 \u504F\u79FB\u91CF\u662F\u76F8\u5BF9\u4E8E\u6700\u8FD1\u7684\u5177\u6709\u975E\u9759\u6001\u4F4D\u7F6E\u7684\u7236\u5143\u7D20\u8BA1\u7B97\u7684\uFF0C\u8BE5\u5143\u7D20\u5C06\u4F5C\u4E3A\u5176\u5B83\u7EDD\u5BF9\u5B9A\u4F4D\u5B50\u5143\u7D20\u7684\u4F4D\u7F6E\u53C2\u8003\u3002</p><p>\u4F7F\u7528 fixed \u76F8\u5BF9\u4E8E\u6D4F\u89C8\u5668\u7A97\u53E3\u5B9A\u4F4D\u5143\u7D20\u3002 \u504F\u79FB\u91CF\u662F\u76F8\u5BF9\u4E8E\u89C6\u53E3\u8BA1\u7B97\u7684\uFF0C\u5143\u7D20\u5C06\u4F5C\u4E3A\u7EDD\u5BF9\u5B9A\u4F4D\u5B50\u9879\u7684\u4F4D\u7F6E\u53C2\u8003\u3002</p><p>\u4F7F\u7528\u7C98\u6027\u5C06\u5143\u7D20\u5B9A\u4F4D\u4E3A\u76F8\u5BF9\u5143\u7D20\uFF0C\u76F4\u5230\u5B83\u8D85\u8FC7\u6307\u5B9A\u7684\u9608\u503C\uFF0C\u7136\u540E\u5C06\u5176\u89C6\u4E3A\u56FA\u5B9A\u5143\u7D20\uFF0C\u76F4\u5230\u5176\u7236\u5143\u7D20\u79BB\u5F00\u5C4F\u5E55\u3002 \u504F\u79FB\u91CF\u662F\u76F8\u5BF9\u4E8E\u5143\u7D20\u7684\u6B63\u5E38\u4F4D\u7F6E\u8BA1\u7B97\u7684\uFF0C\u5143\u7D20\u5C06\u4F5C\u4E3A\u7EDD\u5BF9\u5B9A\u4F4D\u5B50\u5143\u7D20\u7684\u4F4D\u7F6E\u53C2\u8003\u3002</p><div class="language-scss ext-scss line-numbers-mode"><pre class="language-scss"><code><span class="token selector">.static </span><span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> static<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">fixed </span><span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> fixed<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">absolute </span><span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">relative </span><span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">sticky </span><span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> sticky<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>Use the <code>{top|right|bottom|left|inset}-0</code> utilities to anchor absolutely positioned elements against any of the edges of the nearest positioned parent.</p><h2 id="visibile" tabindex="-1"><a class="header-anchor" href="#visibile" aria-hidden="true">#</a> visibile</h2><p>Utilities for controlling the visibility of an element.</p><p>Use invisible to hide an element, but still maintain its place in the DOM, affecting the layout of other elements (compare with .hidden from the display documentation).</p><div class="language-scss ext-scss line-numbers-mode"><pre class="language-scss"><code><span class="token selector">.visible </span><span class="token punctuation">{</span>
  <span class="token property">visibility</span><span class="token punctuation">:</span> visible<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.invisible </span><span class="token punctuation">{</span>
  <span class="token property">visibility</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="z-index" tabindex="-1"><a class="header-anchor" href="#z-index" aria-hidden="true">#</a> z-Index</h2><p>Utilities for controlling the stack order of an element.</p><div class="language-scss ext-scss line-numbers-mode"><pre class="language-scss"><code><span class="token selector">.z </span><span class="token punctuation">{</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-0 </span><span class="token punctuation">{</span>
    <span class="token property">z-index</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-10 </span><span class="token punctuation">{</span>
    <span class="token property">z-index</span><span class="token punctuation">:</span> 10<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-20 </span><span class="token punctuation">{</span>
    <span class="token property">z-index</span><span class="token punctuation">:</span> 20<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-30 </span><span class="token punctuation">{</span>
    <span class="token property">z-index</span><span class="token punctuation">:</span> 30<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-40 </span><span class="token punctuation">{</span>
    <span class="token property">z-index</span><span class="token punctuation">:</span> 40<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-50 </span><span class="token punctuation">{</span>
    <span class="token property">z-index</span><span class="token punctuation">:</span> 50<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-auto </span><span class="token punctuation">{</span>
    <span class="token property">z-index</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div>`,51);function h(g,y){const p=t("ExternalLinkIcon");return o(),l(r,null,[u,n("p",null,[n("a",b,[k,c(p)]),m]),d],64)}var f=e(i,[["render",h],["__file","layout.html.vue"]]);export{f as default};

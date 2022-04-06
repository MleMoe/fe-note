import{_ as n,d as s}from"./app.d1630e5f.js";const a={},p=s(`<h1 id="\u7EC4\u4EF6\u5316\u4EE3\u7801" tabindex="-1"><a class="header-anchor" href="#\u7EC4\u4EF6\u5316\u4EE3\u7801" aria-hidden="true">#</a> \u7EC4\u4EF6\u5316\u4EE3\u7801</h1><h2 id="app-js" tabindex="-1"><a class="header-anchor" href="#app-js" aria-hidden="true">#</a> App.js</h2><p>\u5728 render \u65B9\u6CD5\u4E2D\u4F7F\u7528\u81EA\u5B9A\u4E49\u7EC4\u4EF6\u540D</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> cx <span class="token keyword">from</span> <span class="token string">&#39;classnames&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> createStore <span class="token keyword">from</span> <span class="token string">&#39;@/common/store&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createElement<span class="token punctuation">,</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./diff&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> Header <span class="token keyword">from</span> <span class="token string">&#39;./Header&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> Footer <span class="token keyword">from</span> <span class="token string">&#39;./Footer&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> List <span class="token keyword">from</span> <span class="token string">&#39;./List&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">&#39;@/common/base.css&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">App</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>cacheKey<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">action</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> <span class="token punctuation">{</span> type<span class="token punctuation">,</span> <span class="token operator">...</span>payload <span class="token punctuation">}</span> <span class="token operator">=</span> action<span class="token punctuation">;</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span> payload<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token operator">...</span><span class="token keyword">this</span><span class="token punctuation">.</span>store<span class="token punctuation">.</span>state<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token operator">...</span><span class="token keyword">this</span><span class="token punctuation">.</span>store<span class="token punctuation">.</span>state<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function-variable function">onAdd</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>key <span class="token operator">===</span> <span class="token string">&#39;Enter&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> text <span class="token operator">=</span> e<span class="token punctuation">.</span>currentTarget<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
      <span class="token keyword">const</span> input <span class="token operator">=</span> e<span class="token punctuation">.</span>currentTarget<span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>store<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>
      input<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
      input<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token function-variable function">onRemove</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>store<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token function-variable function">onToggle</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>store<span class="token punctuation">.</span><span class="token function">toggle</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token function-variable function">onEdit</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> item <span class="token operator">=</span> e<span class="token punctuation">.</span>currentTarget<span class="token punctuation">.</span>parentNode<span class="token punctuation">.</span>parentNode<span class="token punctuation">;</span>
    <span class="token keyword">const</span> input <span class="token operator">=</span> item<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;.edit&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> value <span class="token operator">=</span> input<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
    item<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&#39;editing&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    input<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
    input<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    input<span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token function-variable function">onUpdate</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">e<span class="token punctuation">,</span> id</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> item <span class="token operator">=</span> e<span class="token punctuation">.</span>currentTarget<span class="token punctuation">.</span>parentNode<span class="token punctuation">;</span>
    item<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token string">&#39;editing&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>store<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span> e<span class="token punctuation">.</span>currentTarget<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token function-variable function">onToggleAll</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>store<span class="token punctuation">.</span><span class="token function">toggleAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token function-variable function">onClear</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>store<span class="token punctuation">.</span><span class="token function">toggleAll</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token function-variable function">onFilter</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>store<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> filteredList<span class="token punctuation">,</span> leftCount <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>store<span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> filterType<span class="token punctuation">,</span> todoList <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">;</span>

    <span class="token comment">// create</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token operator">&lt;</span>section className<span class="token operator">=</span><span class="token string">&#39;todoapp&#39;</span><span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>Header placeholder<span class="token operator">=</span><span class="token string">&#39;What needs to be done?&#39;</span> onAdd<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>onAdd<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>section
          className<span class="token operator">=</span><span class="token punctuation">{</span><span class="token function">cx</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token literal-property property">main</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token literal-property property">hidden</span><span class="token operator">:</span> <span class="token operator">!</span>todoList<span class="token punctuation">.</span>length<span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
        <span class="token operator">&gt;</span>
          <span class="token operator">&lt;</span>input
            id<span class="token operator">=</span><span class="token string">&#39;toggle-all&#39;</span>
            className<span class="token operator">=</span><span class="token string">&#39;toggle-all&#39;</span>
            checked<span class="token operator">=</span><span class="token punctuation">{</span><span class="token operator">!</span><span class="token punctuation">(</span><span class="token operator">!</span>todoList<span class="token punctuation">.</span>length <span class="token operator">||</span> leftCount<span class="token punctuation">)</span><span class="token punctuation">}</span>
            type<span class="token operator">=</span><span class="token string">&#39;checkbox&#39;</span>
            onChange<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>onToggleAll<span class="token punctuation">}</span>
          <span class="token operator">/</span><span class="token operator">&gt;</span>
          <span class="token operator">&lt;</span>label htmlFor<span class="token operator">=</span><span class="token string">&#39;toggle-all&#39;</span><span class="token operator">&gt;</span>Mark all <span class="token keyword">as</span> complete<span class="token operator">&lt;</span><span class="token operator">/</span>label<span class="token operator">&gt;</span>
          <span class="token operator">&lt;</span>List
            filteredList<span class="token operator">=</span><span class="token punctuation">{</span>filteredList<span class="token punctuation">}</span>
            onEdit<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>onEdit<span class="token punctuation">}</span>
            onToggle<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>onToggle<span class="token punctuation">}</span>
            onRemove<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>onRemove<span class="token punctuation">}</span>
            onUpdate<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>onUpdate<span class="token punctuation">}</span>
          <span class="token operator">/</span><span class="token operator">&gt;</span>
          <span class="token operator">&lt;</span>Footer
            total<span class="token operator">=</span><span class="token punctuation">{</span>todoList<span class="token punctuation">.</span>length<span class="token punctuation">}</span>
            leftCount<span class="token operator">=</span><span class="token punctuation">{</span>leftCount<span class="token punctuation">}</span>
            filterType<span class="token operator">=</span><span class="token punctuation">{</span>filterType<span class="token punctuation">}</span>
            onFilter<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>onFilter<span class="token punctuation">}</span>
            onClear<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>onClear<span class="token punctuation">}</span>
          <span class="token operator">/</span><span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>section<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>section<span class="token operator">&gt;</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br></div></div><h2 id="index-js" tabindex="-1"><a class="header-anchor" href="#index-js" aria-hidden="true">#</a> index.js</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&#39;./App&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createElement<span class="token punctuation">,</span> render <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./diff&#39;</span><span class="token punctuation">;</span>

<span class="token function">render</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>App cacheKey<span class="token operator">=</span><span class="token string">&#39;todo-app-vdom-component&#39;</span> <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> document<span class="token punctuation">.</span>body<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div>`,6);function t(o,e){return p}var l=n(a,[["render",t],["__file","todo-app.html.vue"]]);export{l as default};

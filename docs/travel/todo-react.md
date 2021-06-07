---
sidebarDepth: 3
---

# Todo React

Todo React，是组里前辈给新人开设的课程。前辈讲课超棒，借用一个 uu 的比喻来说，就像是剥洋葱，一层一层给你把 React 讲清楚了。让人叹为观止，是能让我忍不住做笔记好好学习的地步了。

这里就记录我的收获与理解。ps：第一次成稿较为潦草，只讲了大致流程，细节因为时间关系没有详写，以后会继续更新改善（不咕）。

那么就让我们开始吧！

## Todo List

本次 React 学习使用 Todo List 作为示例讲述。Todo List 是一个前端经典学习示例，可以先看下[示例](https://todomvc.com/examples/react/#/)了解一下 Todo List。

> 该示例页面来自 [TodoMVC](https://github.com/tastejs/todomvc)，a project which offers the same Todo application implemented using MVX concepts in most of the popular JavaScript MVX frameworks of today.

### 需求分析

从示例可以看出，一个 Todo List，我们需要实现几个功能：

- 显示事项
- 按条件筛选显示事项
- 增加事项
- 完成事项
- 删除事项
- 更新事项
- 全选/全不选

从数据驱动文档的角度来看，这些功能其实是一些对数据的动作。动作改变数据，再按照数据将网页文档渲染。数据可视化领域有名的 D3.js 便是这种思想（data drive document）。

对于 Todo 数据，我们需要有一种方法来将之存储。在此把 Todo 存在 localStorage 中，并使用单例模式来创建和获取它。

单例模式是一种创建型模式。单例类仅有唯一实例，且自己负责创建自己的实例（无需外部 new ），并提供一个访问它的全局访问点。访问时该单例类判断是否已经有这个单例，如果有则返回，如果没有则创建。

单例模式主要解决：一个全局使用的类频繁地创建与销毁。如果想控制实例数目，节省系统资源的时候，可以使用单例模式。

注意，虽然说是单例类，但是其实函数也可以。

单例模式示例，比如 createStore 函数，若在 localStorage 中有 cacheKey 的存储内容，则返回该相关 state 值，若不存在，则新建。可以注意到 react 组件中也有 state 变量，作用也类似。

```js
function createStore(cacheKey, onChange) {
  return {
    cacheKey,
    state: (cacheKey && loadState(cacheKey)) || {
      filterType: '',
      todoList: [],
    },
  };
}

function loadState(cacheKey) {
  return JSON.parse(localStorage.getItem(cacheKey) || 'null') || undefined;
}
```

### 数据格式

约定数据格式如下：

```ts
interface Todo {
  id: string,
  text: string,
  done: string,
}
// localStorage
{
  [string]: {
    filterType: 'active'|'completed'|null,
    todoList: Array<Todo>,
  }
}
```

### 工具函数

先实现一些必要的工具函数

```js
// utils.js
import $ from 'jquery';

// 增
export function addTodo(todoList, text) {
  return [...todoList, { text, done: false, id: Date.now() }];
}

// 删
export function removeTodo(todoList, id) {
  return todoList.filter((todo) => id !== todo.id);
}

// 更新某项
export function updateTodo(todoList, id, data) {
  return todoList.map((todo) =>
    id === todo.id
      ? {
          ...todo,
          ...data,
        }
      : todo
  );
}

// 根据 id 找到 某项
export function findTodo(todoList, id) {
  return todoList.find((todo) => id === todo.id);
}

// 设置全部状态，全选/全不选
export function toggleTodoList(todoList, done) {
  return todoList.map((todo) => ({ ...todo, done }));
}

// 从 localStorage 加载 Todo List 数据
export function loadState(cacheKey) {
  return JSON.parse(localStorage.getItem(cacheKey) || 'null') || undefined;
}

// 将 Todo List 数据存入 localStorage
export function saveState(cacheKey, state) {
  return localStorage.setItem(cacheKey, JSON.stringify(state));
}

// 判断状态是否有改变
export function isChanged(state, newState) {
  return newState
    ? !Object.keys(newState).every((k) => {
        return Object.is(newState[k], state[k]);
      })
    : false;
}
```

### 数据仓库

在 createStore 中使用这些工具函数

```js
// store.js
import {
  addTodo,
  findTodo,
  removeTodo,
  updateTodo,
  toggleTodoList,
  isChanged,
  loadState,
  saveState,
} from './utils';

export default function createStore(cacheKey, onChange) {
  return {
    cacheKey,

    // 单例模式关键
    state: (cacheKey && loadState(cacheKey)) || {
      filterType: '',
      todoList: [],
    },

    // 根据 this.state.filterType 来筛选显示 Todo
    // get 不需要传参数，通过 .funName 获取 return 值
    get filteredList() {
      return this.state.todoList.filter((todo) => {
        switch (this.state.filterType) {
          case 'active':
            return !todo.done;
          case 'completed':
            return todo.done;
          default:
            return true;
        }
      });
    },

    // 获取未做事项数目
    get leftCount() {
      return this.state.todoList.reduce((prev, todo) => {
        return prev + (todo.done ? 0 : 1);
      }, 0);
    },

    // 设置新 state
    setState(newState) {
      // 判断 有无改变
      if (isChanged(this.state, newState)) {
        // 更新 this.state
        Object.assign(this.state, newState);
        // 更新 localStorage
        this.save();
      }
    },

    // 外部操作分发
    dispatch(type, payload) {
      onChange &&
        onChange({
          type,
          ...payload,
        });
    },

    // 根据 this.state 更新 storage
    save() {
      cacheKey && saveState(cacheKey, this.state);
    },

    // 根据 id 返回 todo item
    find(id) {
      return findTodo(this.state.todoList, id);
    },

    // 根据 id 返回在筛选类别中的 todo item
    findFiltered(id) {
      return findTodo(this.filteredList, id);
    },

    add(text) {
      if (!text) return;
      this.setState({
        todoList: addTodo(this.state.todoList, text),
      });
      const todo = this.state.todoList[this.state.todoList.length - 1];
      // 对外部的响应
      this.dispatch('add', todo);
    },

    remove(id) {
      this.setState({
        todoList: removeTodo(this.state.todoList, id),
      });
      this.dispatch('remove', { id });
    },

    update(id, text) {
      this.setState({
        todoList: updateTodo(this.state.todoList, id, { text }),
      });
      this.dispatch('update', { id, text });
    },

    toggle(id) {
      const done = !findTodo(this.state.todoList, id).done;
      this.setState({
        todoList: updateTodo(this.state.todoList, id, { done }),
      });
      this.dispatch('toggle', { id, done });
    },

    toggleAll(allDone) {
      const done = typeof allDone === 'boolean' ? allDone : !!this.leftCount;
      this.setState({
        todoList: toggleTodoList(this.state.todoList, done),
      });
      this.dispatch('toggleAll', { done });
    },

    filter(filterType) {
      this.setState({ filterType });
      this.dispatch('filter', { filterType });
    },
  };
}
```

内部的数据交互（storage 与 state）已经完备，关键点到了 dispatch 函数，dispatch 函数里使用到的 onChange 函数，是外部传进来的动作，在有数据变动时，我们要使用它作出响应（例如根据更新后的数据来重新渲染页面）。所以在 add 、remove 等函数中都有 `this.dispatch(type, data);` 执行。

### 内容页面

App.js 为主要工作页面。在构造函数中使用 createStore 获取 store 即 todo list 内容。其余逻辑请看下方细分项：reload、template、dom、dom-diff、virtual dom 和 react。

```js
// App.js
import $ from "jquery";
import cx from "classnames";
import createStore from "@/common/store";
export default class App {
  constructor(props = {}) {
    this.props = props;
    this.store = createStore(this.props.cacheKey, (action) => {
      const { type, ...payload } = action;
      console.log(type, payload);
      this.update(action);
    });
  }
  ...
}
```

## reload

### 生成 DOM

在 App 类中加入方法 render ，使用 store 数据生成 DOM 结构

```js
render() {
  const { state, filteredList, leftCount } = this.store;
  const { filterType, todoList } = state;

  // create
  return `<section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo" placeholder="What needs to be done?" autofocus />
    </header>
    <section class="${cx({
      main: true,
      hidden: !todoList.length,
    })}">
      <input id="toggle-all" class="toggle-all" ${
        !todoList.length || leftCount ? "" : "checked"
      } type="checkbox" />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">${filteredList.reduce(
        (items, { id, text, done }) => {
          return (
            items +
            `<li data-id="${id}" class="${cx({ completed: done })}">
          <div class="view">
            <input class="toggle" ${done ? "checked" : ""} type="checkbox" />
            <label>${text}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="${text}" />
        </li>`
          );
        },
        ""
      )}</ul>
      <footer class="footer">
        <span class="todo-count"><strong>${leftCount}</strong> items left</span>
        <ul class="filters">
          <li>
            <a href="#/" class="${cx({
              selected: filterType === "",
            })}">All</a>
          </li>
          <li>
            <a href="#/active" class="${cx({
              selected: filterType === "active",
            })}">Active</a>
          </li>
          <li>
            <a href="#/completed" class="${cx({
              selected: filterType === "completed",
            })}">Completed</a>
          </li>
        </ul>
        <button class="${cx({
          "clear-completed": true,
          hidden: todoList.length === leftCount,
        })}">Clear completed</button>
      </footer>
    </section>
  </section>`;
}
```

### 监听事件

在 App 类中新增方法 mount ，将 render 方法生成的 dom 内容进行事件委托，可以轻松监听事件。

```js
mount() {
  this.node = $(this.render());
  this.bindEvents();
  setTimeout(() => this.node.find('.new-todo')[0].focus());
  return this.node;
}

bindEvents() {
  this.node.on('keyup', '.new-todo', this.onAdd);
  this.node.on('click', 'li .destroy', this.onRemove);
  this.node.on('click', 'li .toggle', this.onToggle);
  this.node.on('dblclick', 'li label', this.onEdit);
  this.node.on('blur', 'li .edit', this.onUpdate);
  this.node.on('click', '.toggle-all', this.onToggleAll);
  this.node.on('click', '.clear-completed', this.onClear);
  this.node.on('click', '.filters a', this.onFilter);
}

onAdd = (e) => {
  if (e.key === 'Enter') {
    const text = e.currentTarget.value;
    this.store.add(text);
    const input = this.node.find('.new-todo')[0];
    input.value = '';
    input.focus();
  }
}

onRemove = (e) => {
  const item = $(e.currentTarget).parents('li').eq(0);
  const id = Number(item.attr('data-id'));
  this.store.remove(id);
}

onToggle = (e) => {
  const item = $(e.currentTarget).parents('li').eq(0);
  const id = Number(item.attr('data-id'));
  this.store.toggle(id);
}

onEdit = (e) => {
  const item = $(e.currentTarget).parents('li').eq(0);
  const input = item.find('.edit')[0];
  const value = input.value;
  item.addClass('editing');
  input.value = '';
  input.focus();
  input.value = value;
}

onUpdate = (e) => {
  const item = $(e.currentTarget).parents('li').eq(0);
  const id = Number(item.attr('data-id'));
  item.removeClass('editing');
  this.store.update(id, e.currentTarget.value);
}

onToggleAll = () => {
  this.store.toggleAll();
}

onClear = () => {
  this.store.toggleAll(false);
}

onFilter = (e) => {
  const type = $(e.currentTarget).attr('href').replace(/^#\//, '');
  this.store.filter(type);
}
```

### 页面刷新

在 store.js 中，数据一有变动，都会调用对应 type 的 `dispatch` 方法，在该方法中都会执行 `onChange` 方法，而我们在 createStore 中传进去的 onChange 参数为函数

```js
(action) => {
  const { type, ...payload } = action;
  console.log(type, payload);
  this.update(action);
})
```

这里都需要调用 `update` 方法，让我们在 APP 类中加入该方法。因为我们把 todo 数据存储到了 localStorage，所以最简单的办法就算重新刷新页面。

```js
update() {
  location.reload();
}
```

### 加入 body

最基础的逻辑已经写好，让我们把内容加入页面，因为我们目前只写了页面内容的 APP 类。
新建 index.js，在其中写入一下内容。其实就算将 APP mount 出来的 dom 内容加入 body 中，事件绑定、动作监听这些事情，APP Class 已经做好了。

```js
import $ from 'jquery';
import App from './App';

function render(component, container) {
  $(container).append(component);
}

render(
  new App({
    cacheKey: 'todo-app-reload',
  }).mount(),
  document.body
);
```

简单来说，使用 reload 方式来写 Todo List，就是通过事件委托，来监听用户动作，在改变数据（state 和 localStorage）后，重新刷新页面。这时， Todo List 从 localStorage 中取出，可以正确渲染页面。

但是有如下缺点：

- 用户一有动作就刷新页面，体验很差。
- 无法保留一些状态，例如文本输入框的内容。
- 事件回调只能通过 data-XXX 获取参数（例如：`id = Number(item.attr('data-id'))` ），很不方便。

## template

我们首先来解决第一个问题，即使用替换 dom 内容的方式，这被称为 template 方式。
只需改变 `update` 方法，改变其页面更新方式即可。重新按照更新后的 Todo 数据生成一份 dom ，再绑定监听事件，将生成的新 dom 内容返回，将原内容替换。

```js
update() {
  this.node.replaceWith(this.mount());
}
```

> 疑问，为什么直接执行 `this.mount()` 不生效，按道理也算对 `this.node` 直接赋值了呀？

```js
mount() {
  this.node = $(this.render());
  this.bindEvents();
  setTimeout(() => this.node.find(".new-todo")[0].focus());
  return this.node;
}
```

## dom

使用 template 方法是直接替换全部 dom 节点，那我们想想可不可以基于传过来的 action 参数，逐各个动作类别作出替换/新增/删除部分 dom 内容呢？这样性能比较好，而且可以保留一些状态，例如文本输入框的内容。
只需要改变 `update` 方法。

```js
update({ type, ...payload }) {
  const { id, done, text, filterType } = payload;
  switch (type) {
    case 'add':
      this.node.find('.todo-list').append(`<li data-id="${id}" class="${cx({ completed: done })}">
        <div class="view">
          <input class="toggle" ${done ? 'checked' : ''} type="checkbox" />
          <label>${text}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${text}" />
      </li>`);
      this.node.find('.todo-count strong').text(this.store.leftCount);
      break;
    case 'remove':
      this.node.find(`.todo-list li[data-id="${id}"]`).remove();
      this.node.find('.todo-count strong').text(this.store.leftCount);
      break;
    case 'update':
      this.node.find(`.todo-list li[data-id="${id}"] label`).text(text);
      this.node.find(`.todo-list li[data-id="${id}"] .edit`).val(text);
      break;
    case 'toggle':
      this.node.find(`.todo-list li[data-id="${id}"]`).toggleClass('completed', done);
      this.node.find(`.todo-list li[data-id="${id}"] .toggle`).prop('checked', done);
      this.node.find('.todo-count strong').text(this.store.leftCount);
      this.node.find('.clear-completed').toggleClass('hidden', this.store.state.todoList.length === this.store.leftCount);
      break;
    case 'toggleAll':
      this.node.find(`.todo-list li`).toggleClass('completed', done);
      this.node.find(`.todo-list li .toggle`).prop('checked', done);
      this.node.find('.todo-count strong').text(this.store.leftCount);
      this.node.find('.clear-completed').toggleClass('hidden', this.store.state.todoList.length === this.store.leftCount);
      break;
    case 'filter':
      this.node.find('.filters a').each((index, node) => {
        $(node).toggleClass('selected', filterType === $(node).attr('href').replace(/^#\//, ''))
      });
      break;
  }
}
```

可是数据与 UI 同步逻辑太复杂，很容易遗漏逻辑，以至于出现 bug。并且同样没有解决事件回调只能通过 data-xxx 获取参数的问题。

## dom-diff

为了避免直接操作 dom 增删改查进行数据 UI 同步过程中的复杂逻辑，我们可以新生成一颗 dom 树，用新的 node 内容来和旧 node 进行比较，在比较过程中发现有更新则替换，

```js
update() {
  diff(this.node[0], $(this.render())[0]);
}
```

新建一个 diff.js，专门用来放置 diff 操作。注意，不仅是节点类别要比较，节点属性也要比较。通过 data-key 值 来判断是否是同一个节点，所以需要在 App Class 的 render 函数中 Todo 节点项增加此属性。对于同一个 data-key，若判断其内容又变，则直接用新节点替换旧节点。

```js
const PROPS = ['className', 'htmlFor', 'value', 'checked'];
const IGNORE_ATTRS = ['class', 'for', 'value', 'checked'];

function findChildIndexByKey(children, value, ignore) {
  return children.findIndex(
    (child, index) => !ignore.includes(index) && child.dataset?.key === value
  );
}

function findChildIndexByType(children, value, ignore) {
  return children.findIndex(
    (child, index) => !ignore.includes(index) && child.nodeName === value
  );
}

function diffChildren(node, newNode) {
  const children = Array.from(node.childNodes);
  const newChildren = Array.from(newNode.childNodes);
  const newChildNodes = [];
  const updated = [];

  newChildren.forEach((newChild) => {
    const key = newChild.dataset?.key;
    const type = newChild.nodeName;

    const index =
      key != null
        ? findChildIndexByKey(children, key, updated)
        : findChildIndexByType(children, type, updated);

    if (index > -1) {
      const child = children[index];
      updated.push(index);
      diff(child, newChild);
      newChildNodes.push(child);
    } else {
      newChildNodes.push(newChild);
    }
  });

  children.forEach((child, index) => {
    if (!updated.includes(index)) {
      diff(child, null);
    }
  });

  newChildNodes.forEach((newChild, index) => {
    const child = node.childNodes[index];
    if (child) {
      if (child !== newChild) {
        node.insertBefore(newChild, child);
      }
    } else {
      node.appendChild(newChild);
    }
  });

  // const max = Math.max(children.length, newChildren.length);
  // for (let i = 0; i < max; i++) {
  //   diff(children[i], newChildren[i], node);
  // }
}

function diffProps(node, newNode) {
  const props = node.getAttributeNames();
  const newProps = newNode.getAttributeNames();
  const allProps = Array.from(new Set([...props, ...newProps]));

  allProps.forEach((prop) => {
    if (IGNORE_ATTRS.includes(prop)) return;

    const hasProp = node.hasAttribute(prop);
    const newHasProp = newNode.hasAttribute(prop);
    const val = node.getAttribute(prop);
    const newVal = newNode.getAttribute(prop);

    if (hasProp && newHasProp) {
      if (val !== newVal) {
        node.setAttribute(prop, newVal);
      }
    } else if (hasProp && !newHasProp) {
      node.removeAttribute(prop);
    } else if (!hasProp && newHasProp) {
      node.setAttribute(prop, newVal);
    }
  });

  PROPS.forEach((prop) => {
    if (node[prop] !== newNode[prop]) {
      node[prop] = newNode[prop];
    }
  });
}

export function diff(node, newNode, parentNode) {
  if (node && newNode) {
    if (node.nodeName === newNode.nodeName) {
      if (node.nodeName === '#text') {
        if (node.textContent !== newNode.textContent) {
          node.textContent = newNode.textContent;
        }
      } else {
        diffProps(node, newNode);
        diffChildren(node, newNode);
      }
    } else {
      node.parentNode.replaceChild(newNode, node);
    }
  } else if (node && !newNode) {
    node.parentNode.removeChild(node);
  } else if (!node && newNode) {
    parentNode && parentNode.appendChild(newNode);
  }
}
```

## virtual dom

重新构造一棵 dom 树的花销较大，而新建一棵 JS Object 树则花销较小。我们可以构造新旧两棵 virtual dom，diff 算法和 diff-dom 一样，在比较过程中进行替换、新增或删除等操作。

React 使用的 JSX 其实也是用 Object 表示 dom 结构的一种写法，也是一种虚拟 dom 的表示。我们也可以在 render 方法里使用 JSX 表示 dom 内容，这样可以直接在 JSX 里绑定事件，也可以直接传参，而无需使用 data-xxx 来获取参数。还可以使用 autoFocus 将输入框自动 focus。并且可以不再依赖 jQuery。

为了使用 JSX ，我们需要配置一下 babel，使用 @babel/preset-react 来解析 JSX。

```json
{
  "presets": [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        "pragma": "createElement",
        "pragmaFrag": "Fragment"
      }
    ],
    "@babel/preset-typescript"
  ]
}
```

使用 JSX 语法更改 render 方法

```js
render() {
  const { state, filteredList, leftCount } = this.store;
  const { filterType, todoList } = state;

  // create
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onKeyUp={this.onAdd}
        />
      </header>
      <section
        className={cx({
          main: true,
          hidden: !todoList.length,
        })}
      >
        <input
          id="toggle-all"
          className="toggle-all"
          checked={!(!todoList.length || leftCount)}
          type="checkbox"
          onChange={this.onToggleAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {filteredList.map(({ id, text, done }) => {
            return (
              <li data-id={id} key={id} className={cx({ completed: done })}>
                <div className="view">
                  <input className="toggle" checked={done} type="checkbox" onChange={() => this.onToggle(id)} />
                  <label onDoubleClick={this.onEdit}>{text}</label>
                  <button className="destroy" onClick={() => this.onRemove(id)}></button>
                </div>
                <input className="edit" value={text} onBlur={(e) => this.onUpdate(e, id)} />
              </li>
            );
          })}
        </ul>
        <footer className="footer">
          <span className="todo-count">
            <strong>{leftCount}</strong> items left
          </span>
          <ul className="filters">
            <li>
              <a href="#/" className={cx({ selected: filterType === '' })} onClick={() => this.onFilter('')}>
                All
              </a>
            </li>
            <li>
              <a
                href="#/active"
                className={cx({ selected: filterType === 'active' })}
                onClick={() => this.onFilter('active')}
              >
                Active
              </a>
            </li>
            <li>
              <a
                href="#/completed"
                className={cx({ selected: filterType === 'completed' })}
                onClick={() => this.onFilter('completed')}
              >
                Completed
              </a>
            </li>
          </ul>
          <button
            className={cx({
              'clear-completed': true,
              hidden: todoList.length === leftCount,
            })}
            onClick={this.onClear}
          >
            Clear completed
          </button>
        </footer>
      </section>
    </section>
  );
}
```

不再使用 jQuery 的事件函数写法，因为不再需要费劲地通过 data-xx 来获取值。

```js
onAdd = (e) => {
  if (e.key === 'Enter') {
    const text = e.currentTarget.value;
    const input = e.currentTarget;
    this.store.add(text);
    input.value = '';
    input.focus();
  }
};

onRemove = (id) => {
  this.store.remove(id);
};

onToggle = (id) => {
  this.store.toggle(id);
};

onEdit = (e) => {
  const item = e.currentTarget.parentNode.parentNode;
  const input = item.querySelector('.edit');
  const value = input.value;
  item.classList.add('editing');
  input.value = '';
  input.focus();
  input.value = value;
};

onUpdate = (e, id) => {
  const item = e.currentTarget.parentNode;
  item.classList.remove('editing');
  this.store.update(id, e.currentTarget.value);
};
```

mount 方法也需作出一些改变

```js
mount() {
  this.vdom = this.render();
  this.node = mount(this.vdom);  // 这是一个辅助函数，根据虚拟 dom 生成真实 dom，下文中会在 diff.js 中实现
  setTimeout(() => this.node.querySelector('.new-todo').focus());
  return this.node;
}
```

下面是 update 方法

```js
update() {
  const vdom = this.render();
  diff(this.vdom, vdom);
  this.vdom = vdom;
}
```

更新后的 diff.js，// 内容有点多，等有空再来详细介绍

```js
const TEXT = Symbol('VDOM_TEXT');
const PROPS = ['className', 'htmlFor', 'value', 'checked'];
const EVENT_MAP = {
  onDoubleClick: 'ondblclick',
};

function findChildIndexBy(children, key, value, ignore) {
  return children.findIndex(
    (child, index) => !ignore.includes(index) && child?.[key] === value
  );
}

function diffChildren(node, newNode) {
  const children = Array.from(node.children);
  const newChildren = Array.from(newNode.children);
  const newChildNodes = [];
  const updated = [];

  newChildren.forEach((newChild) => {
    const key = newChild?.key;
    const type = newChild?.type;

    if (key != null || type != null) {
      const index = findChildIndexBy(
        children,
        key != null ? 'key' : 'type',
        key != null ? key : type,
        updated
      );

      if (index > -1) {
        const child = children[index];
        updated.push(index);
        diff(child, newChild);
      } else {
        mount(newChild);
      }
      newChildNodes.push(newChild.domNode);
    }
  });

  children.forEach((child, index) => {
    if (!updated.includes(index)) {
      diff(child, null);
    }
  });

  newChildNodes.forEach((newChildNode, index) => {
    const domNode = node.domNode;
    const childNode = domNode.childNodes[index];
    if (childNode) {
      if (childNode !== newChildNode) {
        domNode.insertBefore(newChildNode, childNode);
      }
    } else {
      domNode.appendChild(newChildNode);
    }
  });

  // const max = Math.max(children.length, newChildren.length);
  // for (let i = 0; i < max; i++) {
  //   diff(children[i], newChildren[i], node);
  // }
}

function diffProps(node, newNode) {
  const props = Object.keys(node.props || {});
  const newProps = Object.keys(node.props || {});
  const allProps = Array.from(new Set([...props, ...newProps]));

  allProps.forEach((prop) => {
    const hasProp = prop in node.props;
    const newHasProp = prop in newNode.props;
    const val = node.props[prop];
    const newVal = newNode.props[prop];

    if (hasProp && newHasProp) {
      if (val !== newVal) {
        setProp(node.domNode, prop, newVal);
      }
    } else if (hasProp && !newHasProp) {
      setProp(node.domNode, prop, undefined, true);
    } else if (!hasProp && newHasProp) {
      setProp(node.domNode, prop, newVal);
    }
  });
}

export function diff(node, newNode, parentNode) {
  if (node && newNode) {
    if (node.type === newNode.type) {
      if (node.type === TEXT) {
        if (node.text !== newNode.text) {
          node.domNode.textContent = newNode.text;
        }
      } else {
        diffProps(node, newNode);
        diffChildren(node, newNode);
      }
      newNode.domNode = node.domNode;
    } else {
      node.domNode.parentNode.replaceChild(newNode.domNode, mount(newNode));
    }
  } else if (node && !newNode) {
    node.domNode.parentNode.removeChild(node.domNode);
  } else if (!node && newNode) {
    parentNode && parentNode.domNode.appendChild(mount(newNode));
  }

  if (node) {
    delete node.domNode;
  }
}

// 知识点：reduce
export function createElement(type, allProps, ...allChildren) {
  const { key, ...props } = allProps || {};
  const element = { type, props };

  element.children = allChildren.reduce((prev, child) => {
    child = Array.isArray(child) ? child : [child];
    return prev.concat(
      child.map((c) =>
        c != null && !c.type
          ? {
              type: TEXT,
              text: c.toString(),
            }
          : c
      )
    );
  }, []);

  key != null && (element.key = key);

  return element;
}

function setProp(node, prop, val, remove) {
  if (/^on[A-Z]/.test(prop)) {
    node[EVENT_MAP[prop] || prop.toLowerCase()] = val;
  } else if (PROPS.includes(prop)) {
    node[prop] = val;
  } else {
    node[remove ? 'removeAttribute' : 'setAttribute'](prop, val);
  }
}

export function mount(vdom, parentNode) {
  let domNode;

  if (vdom) {
    const { type, text, props, children } = vdom;
    if (type === TEXT) {
      domNode = document.createTextNode(text);
    } else {
      domNode = document.createElement(type);
      props &&
        Object.keys(props).forEach((prop) =>
          setProp(domNode, prop, props[prop])
        );
      children.forEach((child) => mount(child, domNode));
    }
    vdom.domNode = domNode;
    parentNode && parentNode.appendChild(domNode);
  }

  return domNode;
}
```

## react

如何使用 react 来 Todo List 呢？其实具体逻辑和 vdom 一样，优点也是一样，只是 react 帮我们做了一些封装，代码会简短很多。我们不再需要自己写 diff，只需要写 App.js 和 index.js 就可以了。

```js
import cx from 'classnames';
import createStore from '@/common/store';
import { createElement, Component } from 'react';
import PropTypes from 'prop-types';
import '@/common/base.css';

export default class App extends Component {
  static propTypes = {
    cacheKey: PropTypes.string,
  };

  constructor(props = {}) {
    super(props);
    this.store = createStore(this.props.cacheKey, (action) => {
      const { type, ...payload } = action;
      console.log(type, payload);
      this.setState({
        ...this.store.state,
      });
    });
  }

  onAdd = (e) => {
    if (e.key === 'Enter') {
      const text = e.currentTarget.value;
      const input = e.currentTarget;
      this.store.add(text);
      input.value = '';
      input.focus();
    }
  };

  onRemove = (id) => {
    this.store.remove(id);
  };

  onToggle = (id) => {
    this.store.toggle(id);
  };

  onEdit = (e) => {
    const item = e.currentTarget.parentNode.parentNode;
    const input = item.querySelector('.edit');
    const value = input.value;
    item.classList.add('editing');
    input.value = '';
    input.focus();
    input.value = value;
  };

  onUpdate = (e, id) => {
    const item = e.currentTarget.parentNode;
    item.classList.remove('editing');
    this.store.update(id, e.currentTarget.value);
  };

  onToggleAll = () => {
    this.store.toggleAll();
  };

  onClear = () => {
    this.store.toggleAll(false);
  };

  onFilter = (type) => {
    this.store.filter(type);
  };

  render() {
    const { state, filteredList, leftCount } = this.store;
    const { filterType, todoList } = state;

    // create
    return (
      <section className='todoapp'>
        <header className='header'>
          <h1>todos</h1>
          <input
            className='new-todo'
            placeholder='What needs to be done?'
            autoFocus
            onKeyUp={this.onAdd}
          />
        </header>
        <section
          className={cx({
            main: true,
            hidden: !todoList.length,
          })}
        >
          <input
            id='toggle-all'
            className='toggle-all'
            checked={!(!todoList.length || leftCount)}
            type='checkbox'
            onChange={this.onToggleAll}
          />
          <label htmlFor='toggle-all'>Mark all as complete</label>
          <ul className='todo-list'>
            {filteredList.map(({ id, text, done }) => {
              return (
                <li data-id={id} key={id} className={cx({ completed: done })}>
                  <div className='view'>
                    <input
                      className='toggle'
                      checked={done}
                      type='checkbox'
                      onChange={() => this.onToggle(id)}
                    />
                    <label onDoubleClick={this.onEdit}>{text}</label>
                    <button
                      className='destroy'
                      onClick={() => this.onRemove(id)}
                    ></button>
                  </div>
                  <input
                    className='edit'
                    defaultValue={text}
                    onBlur={(e) => this.onUpdate(e, id)}
                  />
                </li>
              );
            })}
          </ul>
          <footer className='footer'>
            <span className='todo-count'>
              <strong>{leftCount}</strong> items left
            </span>
            <ul className='filters'>
              <li>
                <a
                  href='#/'
                  className={cx({ selected: filterType === '' })}
                  onClick={() => this.onFilter('')}
                >
                  All
                </a>
              </li>
              <li>
                <a
                  href='#/active'
                  className={cx({ selected: filterType === 'active' })}
                  onClick={() => this.onFilter('active')}
                >
                  Active
                </a>
              </li>
              <li>
                <a
                  href='#/completed'
                  className={cx({ selected: filterType === 'completed' })}
                  onClick={() => this.onFilter('completed')}
                >
                  Completed
                </a>
              </li>
            </ul>
            <button
              className={cx({
                'clear-completed': true,
                hidden: todoList.length === leftCount,
              })}
              onClick={this.onClear}
            >
              Clear completed
            </button>
          </footer>
        </section>
      </section>
    );
  }
}
```

index.js 修改

```js
import { createElement } from 'react';
import { render } from 'react-dom';
import App from './App';

const root = document.createElement('div');
document.body.appendChild(root);
render(<App cacheKey='todo-app-react' />, root);
```

## 小结

- reload

  - 暴力刷新页面，体验极差
  - 输入框状态无法保留
  - 使用 jQuery
  - 通过事件委托监听事件
  - 事件回调使用 data-xx 获取数据

- template

  - 解决了 reload 暴力刷新页面的缺点
  - 全部置换 node 内容，花销大
  - 输入框状态无法保留
  - 使用 jQuery
  - 通过事件委托监听事件
  - 事件回调使用 data-xx 获取数据

- dom

  - 解决了 template 全部置换 node 的缺点
  - 直接操作 dom，性能好
  - 输入框状态可以保留
  - 数据与 UI 同步逻辑太复杂，很容易遗漏逻辑
  - 使用 jQuery
  - 通过事件委托监听事件
  - 事件回调使用 data-xx 获取数据

- dom-diff

  - 数据与模板绑定，数据更新则同步到 UI，无需过多 dom 操作
  - 输入框状态可以保留
  - 通过生成一个新的 node 片段，内容多的时候性能差
  - 使用 jQuery
  - 通过事件委托监听事件
  - 事件回调只能通过 data-xxx 获取参数

- vdom

  - 生成 JS Object 树的开销较小
  - 不依赖 jQuery
  - 输入框状态可以保留
  - 可以直接在 JSX 里绑定事件
  - 直接在 JSX 里传参

- react
  - 和 vdom 差不多

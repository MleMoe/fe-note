# 组件拆分

App 的 render 方法用来生成需挂载的虚拟 dom。其中一个问题是，整个 App 的全部内容都放于此，不利于复用。为此，我们可以拆分组件。可拆出：Header、List、Todo、Footer。
组件间会有一些共同逻辑，所以可以定义一个 parent class Component。
共同逻辑可以有：

- 初始化 props
- 设置/更新状态

## Component

```js
class Updater {
  constructor(vdom) {
    this.vdom = vdom;
  }

  update() {
    diff(this.vdom, this.vdom);
  }
}

export class Component {
  constructor(props = {}) {
    this.props = props;
  }

  setState(nextState) {
    if (isChanged(this.state, nextState)) {
      this.nextState = { ...this.state, ...nextState };
      this.updater.update();
    }
  }
}
```

## Header

```js
import { createElement, createRef, Component } from './diff';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.inputRef = createRef();
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  render() {
    const { onAdd, placeholder } = this.props;

    return (
      <header className='header'>
        <h1>todos</h1>
        <input
          ref={this.inputRef}
          className='new-todo'
          placeholder={placeholder}
          // autoFocus
          onKeyUp={onAdd}
        />
      </header>
    );
  }
}
```

这里提一下 `createRef` 方法，其实就是保持一个引用地址。

```js
export function createRef(current) {
  return { current };
}
```

## Footer

```js
import { createElement } from './diff';
import cx from 'classnames';

export default function Footer({
  total,
  leftCount,
  filterType,
  onFilter,
  onClear,
}) {
  return (
    <footer className='footer'>
      <span className='todo-count'>
        <strong>{leftCount}</strong> items left
      </span>
      <ul className='filters'>
        <li>
          <a
            href='#/'
            className={cx({ selected: filterType === '' })}
            onClick={() => onFilter('')}
          >
            All
          </a>
        </li>
        <li>
          <a
            href='#/active'
            className={cx({ selected: filterType === 'active' })}
            onClick={() => onFilter('active')}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href='#/completed'
            className={cx({ selected: filterType === 'completed' })}
            onClick={() => onFilter('completed')}
          >
            Completed
          </a>
        </li>
      </ul>
      <button
        className={cx({
          'clear-completed': true,
          hidden: total === leftCount,
        })}
        onClick={onClear}
      >
        Clear completed
      </button>
    </footer>
  );
}
```

## List

```js
import { createElement, Component } from './diff';
import Todo from './Todo';

export default class List extends Component {
  render() {
    const { filteredList, ...callbacks } = this.props;

    return (
      <ul className='todo-list'>
        {filteredList.map((todo) => (
          <Todo key={todo.id} {...todo} {...callbacks} />
        ))}
      </ul>
    );
  }
}
```

## Todo

```js
import { createElement, PureComponent } from './diff';
import cx from 'classnames';

export default class List extends PureComponent {
  componentDidMount() {
    console.log('componentDidMount');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  render() {
    const { id, text, done, onEdit, onToggle, onRemove, onUpdate } = this.props;

    return (
      <li data-id={id} key={id} className={cx({ completed: done })}>
        <div className='view'>
          <input
            className='toggle'
            checked={done}
            type='checkbox'
            onChange={() => onToggle(id)}
          />
          <label onDoubleClick={onEdit}>{text}</label>
          <button className='destroy' onClick={() => onRemove(id)}></button>
        </div>
        <input className='edit' value={text} onBlur={(e) => onUpdate(e, id)} />
      </li>
    );
  }
}
```

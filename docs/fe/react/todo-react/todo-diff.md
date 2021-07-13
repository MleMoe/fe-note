# 方法

## diff.js

同样，`<Header/> <Footer/> <List/> <Todo/>` 也是 vdom，而且其 type 为 function，不是文本/元素节点，所以我们需要对 mount 方法做出改造，以顺利转换为正确的 dom 内容。

先给该 vdom 做一些辅助工作，例如创建实例，后续可使用。

```js
function createInstance(vdom) {
  const { type, props } = vdom;
  let instance;

  // 判断是否是一个类组件
  if (type.prototype instanceof Component) {
    instance = new type(props);
  } else {
    // 若是一个函数组件
    instance = new Component(props);
    instance.render = function() {
      return type(this.props);
    };
  }

  // 设置更新句柄
  instance.updater = new Updater(vdom);

  return instance;
}
```

```js
function mount(vdom, parentNode, mountType, oldDomNode) {
  let domNode;

  if (vdom) {
    const { type, ref, text, props, children } = vdom;
    if (type === TEXT) {
      vdom.domNode = domNode = document.createTextNode(text);
      mountDomNode(domNode, parentNode, mountType, oldDomNode);
      attachRef(ref, domNode);
    } else if (typeof type === 'string') {
      vdom.domNode = domNode = document.createElement(type);
      props &&
        Object.keys(props).forEach((prop) =>
          setProp(domNode, prop, props[prop])
        );
      mountDomNode(domNode, parentNode, mountType, oldDomNode);
      attachRef(ref, domNode);
      children.forEach((child) => mount(child, domNode));
    } else {
      vdom.instance = createInstance(vdom);
      vdom.renderVdom = vdom.instance.render();
      vdom.domNode = domNode = mount(
        vdom.renderVdom,
        parentNode,
        mountType,
        oldDomNode
      );
      attachRef(ref, vdom.instance);
      runLifeCycle(vdom, 'componentDidMount');
    }
  }

  return domNode;
}
```

```js
import { isChanged } from '@/common/utils';

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
  const newChildVdoms = [];
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
      }

      newChildVdoms.push(newChild);
    }
  });

  children.forEach((child, index) => {
    if (!updated.includes(index)) {
      diff(child, null);
    }
  });

  newChildVdoms.forEach((newChild, index) => {
    const domNode = node.domNode;
    const newChildNode = newChild.domNode;
    const childNode = domNode.childNodes[index];
    if (newChildNode) {
      if (childNode) {
        if (childNode !== newChildNode) {
          mountDomNode(newChildNode, domNode, 'insert', childNode);
        }
      } else {
        mountDomNode(newChildNode, domNode);
      }
    } else {
      mount(newChild, domNode, 'insert', childNode);
    }
  });

  // const max = Math.max(children.length, newChildren.length);
  // for (let i = 0; i < max; i++) {
  //   diff(children[i], newChildren[i], node);
  // }
}

function shouldUpdate(node, newNode) {
  const instance = node.instance;
  const nextProps = newNode.props;
  const nextState = instance.newState || instance.state;
  return (
    !instance.shouldComponentUpdate ||
    instance.shouldComponentUpdate(nextProps, nextState) !== false
  );
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
      } else if (typeof node.type === 'string') {
        diffProps(node, newNode);
        diffChildren(node, newNode);
      } else {
        const { instance, renderVdom } = node;
        newNode.instance = instance;
        if (shouldUpdate(node, newNode)) {
          const { props, state } = instance;
          newNode.instance.props = newNode.props;
          newNode.instance.state = instance.nextState;
          delete instance.nextState;
          newNode.renderVdom = node.instance.render();
          diff(renderVdom, newNode.renderVdom);
          runLifeCycle(newNode, 'componentDidUpdate', props, state);
        } else {
          newNode.renderVdom = renderVdom;
        }
      }
      newNode.domNode = newNode.domNode || node.domNode;
    } else {
      mount(newNode, parentNode, 'replace', node.domNode);
    }
  } else if (node && !newNode) {
    unmount(node);
  } else if (!node && newNode) {
    mount(newNode, parentNode);
  }

  if (node && node !== newNode) {
    delete node.domNode;
    delete node.instance;
    delete node.renderVdom;
  }
}

function flatten(array) {
  return array.reduce((prev, next) => prev.concat(next), []);
}

export function createRef(current) {
  return { current };
}

export function createElement(type, allProps, ...children) {
  const { key, ref, ...props } = allProps || {};
  const element = { type, props };

  element.children = flatten(children).map((child) => {
    return child != null && !child.type
      ? {
          type: TEXT,
          text: child.toString(),
        }
      : child;
  });

  key != null && (element.key = key);
  ref != null && (element.ref = ref);

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

function attachRef(ref, current) {
  ref && (ref.current = current);
}

function mountDomNode(newDomNode, parentNode, type = 'append', domNode) {
  parentNode = parentNode || domNode?.parentNode;

  if (parentNode) {
    if (type === 'replace') {
      parentNode.replaceChild(newDomNode, domNode);
    } else if (type === 'insert' && domNode) {
      parentNode.insertBefore(newDomNode, domNode);
    } else {
      parentNode.appendChild(newDomNode);
    }
  }
}

function runLifeCycle(vdom, name, ...args) {
  return vdom.instance?.[name]?.(...args);
}

function unmount(vdom) {
  runLifeCycle(vdom, 'componentWillUnmount');
  if (vdom && vdom.domNode) {
    attachRef(vdom, null);
    vdom.domNode.parentNode.removeChild(vdom.domNode);
  }
}
```

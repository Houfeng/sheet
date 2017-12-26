import React from 'react';
import utils, { isElement } from 'ntils';

const TRANSFORM_MATRIX = /matrix\([\-\.\d]+, [\-\.\d]+, [\-\.\d]+, [\-\.\d]+, ([\-\.\d]+), ([\-\.\d]+)\)/;

export default utils;

//检查是否是一个 React 组件
export function isComponent(obj) {
  return obj instanceof React.Component;
}

//检查是否是 JSX 元素
export function isReactElement(obj) {
  if (!obj) return false;
  if (typeof Symbol === 'function' &&
    Symbol.for && Symbol.for('react.element') == obj.$$typeof) {
    return true;
  }
  return ('$$typeof' in obj) &&
    (obj.$$typeof.toString() == 'Symbol(react.element)' ||
      obj.$$typeof.toString() === '60103');
}

export function getStyle(element) {
  return window.getComputedStyle ?
    window.getComputedStyle(element, null) :
    element.currentStyle;
}

export function getTransformOffset(element) {
  let offset = { left: 0, top: 0 };
  let transform = getStyle(element).transform;
  let offsetInfo = TRANSFORM_MATRIX.exec(transform);
  if (offsetInfo && offsetInfo.length > 2) {
    offset = {
      left: parseInt(offsetInfo[1]),
      top: parseInt(offsetInfo[2])
    };
  }
  let parentElement = element.parentElement;
  if (parentElement && parentElement != document.body) {
    let parentOffset = getTransformOffset(parentElement);
    offset.left += parentOffset.left;
    offset.top += parentOffset.top;
    offset.top -= parentElement.scrollTop;
    offset.left -= parentElement.scrollLeft;
  }
  return offset;
}

//获取一个元素的 offset
export function getPositionOffset(element, opts) {
  opts = Object.assign({}, opts);
  if (element == document.body) {
    return { left: 0, top: 0, width: 0, height: 0 };
  }
  let offset = {
    left: parseInt(element.offsetLeft || 0),
    top: parseInt(element.offsetTop || 0)
  };
  if (opts.parent !== false && element.offsetParent) {
    let parentStyle = getStyle(element.offsetParent);
    offset.left += parseInt(parentStyle.borderLeftWidth || 0);
    offset.top += parseInt(parentStyle.borderTopWidth || 0);
    let parentOffset = getPositionOffset(element.offsetParent, opts);
    offset.left += parentOffset.left;
    offset.top += parentOffset.top;
  }
  Object.assign(offset, {
    left: offset.left || 0,
    top: offset.top || 0,
    width: element.offsetWidth || 0,
    height: element.offsetHeight || 0
  });
  return offset;
}

export function getOffset(element, opts) {
  opts = Object.assign({}, opts);
  let positionOffset = getPositionOffset(element, opts);
  if (opts.transform !== false) {
    let transformOffset = getTransformOffset(element, opts);
    positionOffset.left += transformOffset.left;
    positionOffset.top += transformOffset.top;
  }
  return positionOffset;
}

//获取窗口大小
export function getWindowSize() {
  let size = {};
  // 获取窗口宽度
  if (window.innerWidth)
    size.width = window.innerWidth;
  else if ((document.body) && (document.body.clientWidth))
    size.width = document.body.clientWidth;
  // 获取窗口高度
  if (window.innerHeight)
    size.height = window.innerHeight;
  else if ((document.body) && (document.body.clientHeight))
    size.height = document.body.clientHeight;
  // 通过深入 Document 内部对 body 进行检测，获取窗口大小
  if (document.documentElement &&
    document.documentElement.clientHeight &&
    document.documentElement.clientWidth) {
    size.height = document.documentElement.clientHeight;
    size.width = document.documentElement.clientWidth;
  }
  return size;
}

export function isFixed(element) {
  if (!isElement(element)) return false;
  let style = getStyle(element);
  if (style.position == 'fixed') return true;
  if (element.parentNode) return isFixed(element.parentNode);
  return false;
}

//通过 type 查找 jsx 元素
export function findChildren(type, children) {
  const result = [];
  React.Children.forEach(children, child => {
    if (!child) return;
    if (!type || child.type == type) result.push(child);
  });
  return result;
}
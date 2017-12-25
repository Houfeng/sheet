import React, { PureComponent } from 'react';
import * as utils from 'ntils';

const EVENT_NAME = /^on/;

export default class Proxy extends PureComponent {

  oldValues = {};
  events = {};

  componentDidMount() {
    let { target, capture, ...props } = this.props;
    target = target || document;
    target.$proxyStack = target.$proxyStack || [];
    utils.each(props, (name, value) => {
      if (EVENT_NAME.test(name)) {
        let eventName = name.slice(2).toLowerCase();
        target.addEventListener(eventName, value, capture || false);
        this.events[name] = value;
      } else {
        this.oldValues[name] = target[name];
        target[name] = value;
      }
    });
    target.$proxyStack.push(this);
  }

  componentWillUnmount() {
    let { target, capture } = this.props;
    target = target || document;
    target.$proxyStack = target.$proxyStack || [];
    let index = target.$proxyStack.indexOf(this);
    let nextItem = target.$proxyStack[index + 1];
    utils.each(this.oldValues, (name, value) => {
      if (nextItem) {
        nextItem.oldValues[name] = value;
      } else {
        target[name] = value;
      }
    });
    utils.each(this.events, (name, handler) => {
      if (EVENT_NAME.test(name)) {
        let eventName = name.slice(2).toLowerCase();
        target.removeEventListener(eventName, handler, capture || false);
      }
    });
    target.$proxyStack.splice(index, 1);
  }

  render() {
    return <span style={{ display: 'none' }}></span>;
  }

}
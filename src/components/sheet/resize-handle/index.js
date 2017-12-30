import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Proxy from '../proxy';
import './index.less';

export default class ResizeHandle extends PureComponent {

  render() {
    const { type = 'horizontal' } = this.props;
    const names = classNames({
      'resize-handle': true,
      [type]: true
    });
    return <div className={names}
      onClick={event => event.stopPropagation()}
      onMouseDown={this.onMouseDown}>
      <Proxy onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp} />
    </div>;
  }

  onMouseDown = event => {
    const { pageX, pageY } = event;
    const { target, type } = this.props;
    if (target && type) this.initail = target[type];
    this.begin = { x: pageX, y: pageY };
  }

  onMouseMove = event => {
    //this.trigger('onMove', event);
  }

  onMouseUp = event => {
    this.trigger('onEnd', event);
    this.begin = null;
    this.end = null;
    this.initail = null;
  }

  trigger(eventName, event) {
    if (!this.begin) return;
    const { pageX, pageY } = event;
    this.end = { x: pageX, y: pageY };
    const eventHandler = this.props[eventName];
    const result = {
      width: this.end.x - this.begin.x,
      height: this.end.y - this.begin.y,
    };
    if (this.initail) {
      const { target, type } = this.props;
      target[type] = this.initail + result[type];
      if (target[type] < 28) target[type] = 28;
    }
    if (eventHandler) eventHandler(result);
  }

}
import React, { Component } from 'react';

export default class ScrollPanel extends Component {
  render() {
    const { scrollLeft = 0, scrollTop = 0, children, ...others } = this.props;
    return <div {...others} style={{
      transform: `translate3d(${-scrollLeft}px,${-scrollTop}px,0px)`
    }}>{children}</div>;
  }
}
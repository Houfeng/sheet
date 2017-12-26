import React, { Component } from 'react';

export default class ScrollPanel extends Component {
  render() {
    const { scrollLeft = 0, scrollTop = 0, children, ...others } = this.props;
    return <div {...others} style={{
      transform: `translate(${-scrollLeft}px,${-scrollTop}px)`
    }}>{children}</div>;
  }
}
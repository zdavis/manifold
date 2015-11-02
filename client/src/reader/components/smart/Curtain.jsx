import React, { Component } from 'react';
import {connect} from 'react-redux';

export default class CurtainComponent extends Component {

  static propTypes() {
    return {
      raised: React.PropTypes.bool
    };
  }

  componentDidMount() {
    this.updateHeight();
  }

  componentDidUpdate() {
    this.updateHeight();
  }

  updateHeight() {
    if(this.refs.curtain) {
      const height = `${document.body.clientHeight}px`;
      const minHeight = `${window.outerHeight}px`;
      this.refs.curtain.style.height = height;
      this.refs.curtain.style.minHeight = minHeight;
    }
  }

  render() {
    if(this.props.raised) {
      return (
        <div className={'curtain'} ref={'curtain'}>&nbsp;</div>
      );
    } else {
      return null;
    }
  }
}


function mapStateToProps(state) {
  return {
    raised: state.curtain.raised
  };
}

export default connect(mapStateToProps)(CurtainComponent);

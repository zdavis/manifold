import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class TextSection extends Component {

  static propTypes() {
    return {
      doc: React.PropTypes.object
    };
  }

  componentDidMount() {
    this._scrollToAnchor(this._getLocationHash());
  }

  componentDidUpdate() {
    this._scrollToAnchor(this._getLocationHash());
  }

  _getLocationHash() {
    let hash = this.props.locationHash;
    if(hash[0] == '#') hash = hash.substring(1);
    return hash;
  }

  _scrollToAnchor(anchorId) {
    if(anchorId && this.refs.bodyContainer) {
      const node = this.refs.bodyContainer;
      const target = node.querySelector(`#${anchorId}`);
      const top = target.getBoundingClientRect().top;
      const adjustedTop = top - 100;
      window.scroll(0, adjustedTop);
      // if(target) {
      //   target.scrollIntoView();
      // }
    }
  }

  render() {
    let sectionDom = <div />;
    if(this.props.section) {
      sectionDom = (
        <div ref="bodyContainer" dangerouslySetInnerHTML={{__html: this.props.section.body}} />
      );
    }

    return (
      <section className={'reader-document'}>
        {sectionDom}
      </section>
    );
  }


}



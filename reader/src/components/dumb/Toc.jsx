import TextNavBranch from 'components/dumb/TextNavBranch';
import React, { Component } from 'react';

export default class Toc extends Component {

  handleLinkClick(e) {

  }

  render() {
    return (
      <section className={'reader-document'}>
        <h2>{'Table of Contents'}</h2>
        <nav className={'nestedNav'}>
        <TextNavBranch 
            branch={this.props.text.attributes.toc} 
            sections={this.props.sections} 
            handleLinkClick={(e) => e} 
            pushState={this.props.actions.pushState} 
            textId={this.props.text.id} 
        />
        </nav>
      </section>
    );
  }

}
import TextNavBranch from 'components/dumb/TextNavBranch';
import React, { Component } from 'react';
import cn from 'classnames';
import {depthOf} from 'utility/object';

export default class TextNav extends Component {

  navLevel() {
    return depthOf(this.props.text.attributes.toc) - 1;
  }

  handleLinkClick() {
    this.props.actions.toggleTextNav();

  }

  closeTextNav() {
    this.props.actions.toggleTextNav();
  }

  componentDidMount() {
    window.scrollTo(0,0);
    const tocTriggerNode = document.querySelector(`.bar-nav-item-toc`);
    const left = tocTriggerNode.getBoundingClientRect().left;
    this.refs.nav.style.left = `${left}px`;
  }

  render() {
    return (
      <div>
        <div onClick={(e) => this.closeTextNav(e)}className={'curtain'} ref={'curtain'}>&nbsp;</div>
        <nav className={cn('nested-nav', `nested-nav-${this.navLevel()}`)} ref="nav" >
          <TextNavBranch 
              branch={this.props.text.attributes.toc} 
              sections={this.props.sections} 
              handleLinkClick={(e) => this.handleLinkClick(e)} 
              pushState={this.props.actions.pushState} 
              textId={this.props.text.id} 
        /></nav>
      </div>

    );
  }

}
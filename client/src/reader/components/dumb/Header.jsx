import React, { Component } from 'react';
import {Link} from 'react-router';
import cn from 'classnames';


export default class Header extends Component {

  static propTypes() {
    return {
      actions: React.PropTypes.shape({
        clearError: React.PropTypes.func.isRequired,
        toggleTextNav: React.PropTypes.func.idRequired
      }),
      text: React.PropTypes.object
    };
  }

  render() {
    return (
      <header className={'top-bar'} >
        <nav className={'bar-nav'}>
          <ul>
            <li className={'bar-nav-item bar-nav-item-home'}>
              <Link className={'bar-nav-item-trigger'} to={`/`}>{'Home'}</Link>
            </li>
            {(() => {
              if(this.props.text) {
                return (
                  <li className={'bar-nav-item bar-nav-item-title'}>
                    <span className={'bar-nav-item-trigger'}>{this.props.text.attributes.title}</span>
                  </li>
                );
              }
            })()}
            {(() => {
              if(this.props.text) {
                return (
                  <li onClick={this.props.actions.toggleTextNav} className={cn('bar-nav-item', 'bar-nav-item-toc', {active: this.props.active})}>
                    <a className={'bar-nav-item-trigger'} ref={'trigger'} >
                      {'TOC'}
                    </a>
                  </li>
                );
              }
            })()}
            <li className={'bar-nav-item bar-nav-item-search bar-nav-item-broken'}><a className={'bar-nav-item-trigger'}>{'search'}</a></li>
            <li className={'bar-nav-item bar-nav-item-size bar-nav-item-broken'}><a className={'bar-nav-item-trigger'}>{'size'}</a></li>
            <li className={'bar-nav-item bar-nav-item-layers bar-nav-item-broken'}><a className={'bar-nav-item-trigger'}>{'layers'}</a></li>
            <li className={'bar-nav-item bar-nav-item-profile bar-nav-item-broken'}><a className={'bar-nav-item-trigger'}>{'profile'}</a></li>
          </ul>
        </nav>
      </header>
    );
  }
}



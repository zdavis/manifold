import {Route} from 'react-router';
import React, { Component } from 'react';
import {ReduxRouter} from 'redux-router';
import {Provider} from 'react-redux';

import TextList from 'components/smart/TextList';
import Reader from 'components/smart/Reader';

export default class Root extends Component {

  static get propTypes() {
    return {
      store: React.PropTypes.object
    };
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <ReduxRouter>
          <Route component={TextList} onEnter={() => window.scrollTo(0, 0)} path="/" />
          <Route component={Reader} onEnter={() => window.scrollTo(0, 0)} path="/text/:textId" />
          <Route component={Reader} onEnter={() => window.scrollTo(0, 0)} path="/text/:textId/section/:sectionId" />
          <Route component={Reader} onEnter={() => window.scrollTo(0, 0)} path="/text/:textId/toc" />
        </ReduxRouter>
      </Provider>
    );
  }

}


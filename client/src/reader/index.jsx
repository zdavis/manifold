import store from 'reader/store/store.js';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'reader/components/Root';

ReactDOM.render(<Root store={store} />, document.getElementById('root'));


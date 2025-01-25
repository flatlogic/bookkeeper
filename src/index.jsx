import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './containers/App';
import { LayoutProvider } from './components/common/Sidebar/LayoutContext';
import { store } from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <LayoutProvider>
      <App />
    </LayoutProvider>
  </Provider>,
  document.getElementById('root'),
);

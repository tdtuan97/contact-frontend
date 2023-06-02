import React, {Component} from 'react';
import store from './common/store';
import historyCommon from './common/historyCommon';
import {Provider} from 'react-redux';
import {ConnectedRouter} from "connected-react-router";
import AllRoutes from './routes'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import moment from "moment";

import 'antd/dist/antd.less';
import './styles/index.scss';

// Set moment config
moment.updateLocale('en', {
    week: {
        dow : 1, // Monday is the first day of the week.
    }
});

class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <ConnectedRouter history={historyCommon}>
              <I18nextProvider i18n={i18n}>
                  <AllRoutes/>
              </I18nextProvider>
          </ConnectedRouter>
        </Provider>
    );
  }
}

export default App

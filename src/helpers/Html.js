import React, {Component, PropTypes} from 'react';
import { renderToString } from 'react-dom/server';
import Radium, { Style } from 'radium';

import styles from './styles';

@Radium
export default class Html extends Component {
  static propTypes = {
    component: PropTypes.node,
    store: PropTypes.object,
  }

  render() {
    const {store, component} = this.props;
    const content = renderToString(component);

    return (
      <html lang="en-us">
        <head>
          <title>React Seed</title>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet" />
          <Style rules={styles}/>
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{__html: content}}/>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__INITIAL_STATE__=${JSON.stringify(store.getState())};`,
            }}
            charSet="UTF-8"/>
          <script src="/client/bundle.js" />
        </body>
      </html>
    );
  }
}

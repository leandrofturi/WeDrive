import React from 'react';

import Page from '../components/Page';

class NotFound extends React.Component {
  render() {
    return (
      <Page title="NotFound">
        <div>
          <h1>404 Error</h1>
          <h1>Page Not Found</h1>
        </div>
      </Page>
    );
  }
}

export default NotFound
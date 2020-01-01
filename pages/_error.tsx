import React from 'react';
// import Layout from '@components/Layout/Layout';
// import NotFound from '@components/NotFound/NotFound';
// import { ERROR_404, ERROR_500 } from '@constants/errors';
// import withPageBase from './PageBase';

class Error extends React.Component {
  public static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  public render() {
    return (
      <div>
        <p>Temp Not Found Page - Add Not Found Component After PageBase setup</p>
      </div>
    );
  }

  /*/
  render() {
    return (
      <div className="error-page">
        <div className="container">
          <div className="content">
            {this.props.statusCode === 404 ? (
              <NotFound {...ERROR_404} />
            ) : (
              <NotFound {...ERROR_500} />
            )}
          </div>
        </div>
      </div>
    );
  }
  /*/
}

export default Error;
/*
export default withPageBase(Error, {
  layoutProps: {
    title: '| Page Not Found',
  },
});
*/

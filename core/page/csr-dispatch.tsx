import { Dispatch, AnyAction } from 'redux';

/*/
Use Case:
1.  You want to make one time API call through redux dispatch only at Client Side when page loaded:
    So you calling it at componentDidMount.
2.  Then you use Router.push for the SAME PAGE, triggering CSR:
    And you need the same redux dispatch to be called.
    Problem is componentDidMount will not be called as it is already mounted.
3.  So you rely on getInitialProps to make the call:
    - But even putting !isServer and make the call will also cause issue:
      Because componentDidMount will call during change page. (From previous to current)
    - And SSR getIntialProps dispatch will not update client side redux state
      when it is being rendered
4.  An do not want ot have the followings:
    - Do not want SSR "awaitSagaExec", the blocking await async saga being call.
    - Do not want troublesome handling at componentDidUpdate

Solution:
1. Router.push (non shallow render) will trigger getIntialProps.
2. So since it is !isServer, redux dispatch will call, making the api call.
3. isServer is also added to pageProps, hence at client side we will know if it is an SSR render
4. componentDidMount will not trigger the same call during CSR with !isServer flag
/*/

export default function csrOneTimeDispatch(
  isServer: boolean,
  isFromGetInitialProps: boolean,
  dispatch: Dispatch,
  actions: AnyAction[]
) {
  // both condition are mutually exclusive
  if ((!isServer && isFromGetInitialProps) || (isServer && !isFromGetInitialProps)) {
    for (const action of actions) {
      dispatch(action);
    }
  }
}

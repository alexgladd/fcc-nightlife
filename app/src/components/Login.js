import React from 'react';
import { Redirect } from 'react-router';
import QueryString from 'query-string';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import LoginButton from './LoginButton';
import { oauthAuthenticate } from '../actions/user';
import oauth from '../util/oauth';


class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      oauthButtons: [
        oauth.clients.facebook
      ]
    };

    this.handleOauthLogin = this.handleOauthLogin.bind(this);
    this.renderLoginButtons = this.renderLoginButtons.bind(this);
  }

  handleOauthLogin(network) {
    const { serverState } = this.props;
    // redirect to network's oauth page
    window.location.href = oauth.oauthUrl(network, serverState.random);
  }

  componentDidMount() {
    const { location, match, finishOauth } = this.props;

    const query = QueryString.parse(location.search);
    if (query.code && match.params.network) {
      // finish oauth authentication
      const network = match.params.network;

      if (network === oauth.clients.facebook) {
        finishOauth(network, query.code, { redirectUri: oauth.oauthRedirectUrl(network) });
      } else {
        finishOauth(network, query.code);
      }
    }
  }

  renderLoginButtons() {
    const { oauthButtons } = this.state;

    return oauthButtons.map((network, idx) => {
      return (
        <LoginButton name={network} onClick={() => this.handleOauthLogin(network)} key={idx}/>
      );
    });
  }

  render() {
    const { user } = this.props;

    if (user) {
      return <Redirect to="/" />;
    } else {
      return (
        <Grid container direction="column" alignItems="center" spacing={16}>
          <Grid item xs={12}>
            <Typography variant="headline" color="inherit">
              Login
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="inherit">
              Log in with Facebook to let people know you're attending an event!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            { this.renderLoginButtons() }
          </Grid>
        </Grid>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  serverState: state.serverState
});

const mapDispatchToProps = (dispatch) => ({
  finishOauth(network, code, extras) { dispatch(oauthAuthenticate(network, code, extras)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

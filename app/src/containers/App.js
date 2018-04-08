import React from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/user';
import CssBaseline from 'material-ui/CssBaseline';
import { withStyles } from 'material-ui/styles';
import Header from '../components/Header';
import AuthHome from '../components/AuthHome';
import Login from '../components/Login';
import Profile from '../components/Profile';

const styles = theme => ({
  appContent: {
    margin: theme.spacing.unit * 4
  }
});

const PublicHome = () => (
  <div>
    <h2>Unauthenticated Home</h2>
    <p>This is the public homepage that shows up for unauthenticated users</p>
  </div>
)

const FourOhFour = () => (
  <div>
    <h2>Whoops...</h2>
    <p>Looks like you're lost! Click <Link to="/">here</Link> to go home.</p>
  </div>
)

class App extends React.Component {
  render() {
    const { classes, user, logout, history } = this.props;

    return (
      <div>
        <CssBaseline />
        
        <Header user={user} onLogout={() => { logout(); history.push('/'); }} />

        <div className={classes.appContent}>
          <Switch>
            { // home route
              user ?
              <Route exact path="/" render={props => (<AuthHome user={user} {...props} />)} /> :
              <Route exact path="/" component={PublicHome} />
            }

            { /* login and oauth routes */ }
            <Route path="/login/:network?" component={Login} />

            { // profile route
              user &&
              <Route exact path="/profile" render={props => (<Profile user={user} {...props} />)} />
            }

            { /* no match route */ }
            <Route component={FourOhFour} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  logout() { dispatch(logoutUser()); }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App)));

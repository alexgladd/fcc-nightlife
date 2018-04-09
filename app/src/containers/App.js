import React from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/user';
import CssBaseline from 'material-ui/CssBaseline';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Home from './Home';
import Header from '../components/Header';
import Login from '../components/Login';
import Profile from '../components/Profile';

const styles = theme => ({
  appContent: {
    margin: theme.spacing.unit * 4
  }
});

const FourOhFour = () => (
  <div>
    <Typography variant="headline" color="inherit">
      Whoops...
    </Typography>
    <Typography color="inherit">
      Looks like you're lost! Click <Link to="/">here</Link> to go home.
    </Typography>
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
            { /* home route */ }
            <Route exact path="/" render={props => (<Home user={user} {...props} />)} />

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

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  title: {
    paddingRight: theme.spacing.unit * 4
  },
  navLink: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    textDecoration: 'none'
  }
});

class Header extends React.Component {
  render () {
    const { classes, user, onLogout } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.title}>
              Nightlife
            </Typography>
            <Typography variant="subheading" color="inherit" className={classes.navLink} component={Link} to="/">
              Home
            </Typography>
            <div className={classes.flex}></div>
            { user ?
              <Button color="inherit" onClick={() => onLogout()}>Logout</Button> :
              <Button color="inherit" component={Link} to="/login">Login</Button>
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired
};

export default withStyles(styles)(Header);

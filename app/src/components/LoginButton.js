import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faGithub, faFacebook/*, faGoogle*/ } from '@fortawesome/fontawesome-free-brands';
import { faArrowAltCircleRight } from '@fortawesome/fontawesome-free-solid';
import oauth from '../util/oauth';

const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit
  }
});

const LoginButton = ({classes, name, onClick}) => {
  let icon;
  switch (name) {
    case oauth.clients.github:
      icon = faGithub;
      break;

    case oauth.clients.facebook:
      icon = faFacebook;
      break;

    default:
      icon = faArrowAltCircleRight;
  }

  return (
    <Button variant="raised" color="primary" onClick={onClick}>
      <FontAwesomeIcon icon={icon} className={classes.icon} />
      Log in with {name.charAt(0).toUpperCase() + name.slice(1)}
    </Button>
  );
}

LoginButton.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(LoginButton);

import React from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faGithub, faYelp } from '@fortawesome/fontawesome-free-brands';

const styles = theme => ({
  footer: {
    marginTop: theme.spacing.unit * 3
  },
  [theme.breakpoints.down('sm')]: {
    yelpFooter: {
      textAlign: 'center'
    },
    githubFooter: {
      textAlign: 'center'
    }
  },
  [theme.breakpoints.up('sm')]: {
    yelpFooter: {
      textAlign: 'right'
    },
    githubFooter: {
      textAlign: 'left'
    }
  }
});

const Footer = ({ classes }) => (
  <Grid container justify="center" spacing={16} className={classes.footer}>
    <Grid item xs={12} sm={6}>
      <Typography color="inherit" className={classes.yelpFooter}>
        Using the yelp <FontAwesomeIcon icon={faYelp} /> <a
          href="https://www.yelp.com/developers/documentation/v3">Fusion API</a>
      </Typography>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Typography color="inherit" className={classes.githubFooter}>
        Created by <a href="https://github.com/alexgladd/fcc-nightlife">Alex Gladd <FontAwesomeIcon
          icon={faGithub} /></a>
      </Typography>
    </Grid>
  </Grid>
);

export default withStyles(styles)(Footer);

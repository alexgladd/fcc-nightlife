import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faYelp } from '@fortawesome/fontawesome-free-brands';

const styles = theme => ({
  cardImg: {
    height: 200
  },
  avatars: {
    display: 'flex'
  },
  avatar: {
    margin: theme.spacing.unit / 2,
    width: 32,
    height: 32
  },
  badge: {
    margin: 16
  },
  yelpBtn: {
    marginLeft: 'auto'
  }
});

const NighlifeEvent = ({ classes, attending, onClick, bar, event }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardMedia className={classes.cardImg}
          image="https://s3-media2.fl.yelpcdn.com/bphoto/9gxoAlEOcbg8OeuB66YFWg/o.jpg"
          title="Bar"/>
        <CardContent>
          <Typography variant="title" gutterBottom>
            Boatyard Bar & Grill
          </Typography>
          <div className={classes.avatars}>
            <Tooltip enterDelay={250} placement="bottom" title="Alex Gladd">
              <Avatar alt="Alex Gladd" className={classes.avatar} src="https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/18813472_10113938906985554_5728429872298731284_n.jpg?oh=2a0df32ef4eece40f49e153f58f9dad8&oe=5ADCD68F" />
            </Tooltip>
            <Tooltip enterDelay={250} placement="bottom" title="John Smith">
              <Avatar className={classes.avatar}>JS</Avatar>
            </Tooltip>
          </div>
        </CardContent>
        <CardActions>
          <Badge color="secondary" badgeContent={6}>
            <Button size="small" color="default">I can't make it</Button>
          </Badge>
          <IconButton className={classes.yelpBtn}>
            <FontAwesomeIcon icon={faYelp}/>
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}

// NighlifeEvent.propTypes = {
//   classes: PropTypes.object.isRequired,
//   attending: PropTypes.bool.isRequired,
//   onClick: PropTypes.func.isRequired,
//   bar: PropTypes.object.isRequired,
//   event: PropTypes.object
// };

export default withStyles(styles)(NighlifeEvent);

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  cardImg: {
    height: 200
  },
  content: {
    flexGrow: 1
  },
  avatars: {
    display: 'flex'
  },
  avatar: {
    margin: theme.spacing.unit / 2,
    width: 32,
    height: 32
  },
  actions: {
    position: 'static'
  },
  badge: {
    margin: 16
  },
  yelpBtn: {
    marginLeft: 'auto'
  }
});

const NighlifeEvent = ({ classes, disabled, attending, onClick, bar, event }) => {
  const createAvatar = (attendee, idx) => {
    if (attendee.userImgUrl) {
      return (
        <Tooltip enterDelay={250} placement="bottom" title={attendee.userName} key={idx}>
          <Avatar alt={attendee.userName} className={classes.avatar} src={attendee.userImgUrl} />
        </Tooltip>
      );
    } else {
      return (
        <Tooltip enterDelay={250} placement="bottom" title={attendee.userName} key={idx}>
          <Avatar className={classes.avatar}>
            { attendee.userName.split(' ').reduce((acc, val) => acc.concat(val[0].toUpperCase()), '') }
          </Avatar>
        </Tooltip>
      );
    }
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card className={classes.card}>
        <CardMedia className={classes.cardImg}
          image={bar.imgUrl}
          title={bar.name}/>
        <CardContent className={classes.content}>
          <Typography variant="title" gutterBottom>
            {bar.name}
          </Typography>
          <div className={classes.avatars}>
            { event && event.attendees.map(createAvatar) }
          </div>
        </CardContent>
        <CardActions className={classes.actions}>
          { attending ?
            <Badge color="secondary" badgeContent={event ? event.attendees.length : 0}>
              <Button size="small" color="default" disabled={disabled} onClick={() => onClick(bar, event)}>
                I can't make it
              </Button>
            </Badge> :
            <Badge color="primary" badgeContent={event ? event.attendees.length : 0}>
              <Button size="small" color="primary" disabled={disabled} onClick={() => onClick(bar, event)}>
                I'll be there!
              </Button>
            </Badge>
          }
          
          <IconButton className={classes.yelpBtn} component={Link} to={bar.url}
            target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faYelp}/>
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}

NighlifeEvent.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  bar: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  attending: PropTypes.bool,
  event: PropTypes.object
};

export default withStyles(styles)(NighlifeEvent);

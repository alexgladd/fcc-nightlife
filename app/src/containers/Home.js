import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Badge from 'material-ui/Badge';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faYelp } from '@fortawesome/fontawesome-free-brands';

const styles = {
  search: {
    width: '100%'
  },
  cardImg: {
    height: 200
  },
  badge: {
    margin: 16
  },
  yelpBtn: {
    marginLeft: 'auto'
  }
};

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: ''
    };

    this.handleLocChange = this.handleLocChange.bind(this);
  }

  handleLocChange(event) {
    this.setState({ location: event.target.value });
  }

  render() {
    const { classes, user } = this.props;
    const { location } = this.state;

    return (
      <div>
        {/* search controls */}
        <Grid container justify="space-around" alignItems="baseline" spacing={16}>
          <Grid item xs={8} sm={8}>
            <TextField id="nightlife-loc" label="Search for nightlife"
              placeholder="Enter your location" margin="normal" className={classes.search}
              value={location} onChange={this.handleLocChange}/>
          </Grid>
          <Grid item xs={4} sm={2}>
            <Button variant="raised" color="secondary" fullWidth={true}>
              Search
            </Button>
          </Grid>
        </Grid>

        {/* search results */}
        <Grid container justify="center" spacing={16}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia className={classes.cardImg}
                image="https://s3-media2.fl.yelpcdn.com/bphoto/9gxoAlEOcbg8OeuB66YFWg/o.jpg"
                title="Bar"/>
              <CardContent>
                <Typography variant="title" gutterBottom>
                  Boatyard Bar & Grill
                </Typography>
              </CardContent>
              <CardActions>
                <Badge color="secondary" badgeContent={6}>
                  <Button size="small" color="primary">Attend</Button>
                </Badge>
                <IconButton className={classes.yelpBtn}>
                  <FontAwesomeIcon icon={faYelp}/>
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object
};

export default withStyles(styles)(Home);

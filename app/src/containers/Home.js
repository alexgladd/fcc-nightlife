import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import NightlifeEvent from '../components/NightlifeEvent';

const styles = {
  search: {
    width: '100%'
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
          <NightlifeEvent />
          <NightlifeEvent />
          <NightlifeEvent />
          <NightlifeEvent />
          <NightlifeEvent />
          <NightlifeEvent />
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

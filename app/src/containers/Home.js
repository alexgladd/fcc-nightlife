import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import NightlifeEvent from '../components/NightlifeEvent';
import { nightlifeSearch } from '../actions/search';

const styles = {
  search: {
    width: '100%'
  }
};

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: '',
      date: moment().format('YYYY-MM-DD')
    };

    this.handleLocChange = this.handleLocChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.renderNightlifeCard = this.renderNightlifeCard.bind(this);
  }

  handleLocChange(event) {
    this.setState({ location: event.target.value });
  }

  handleSearch() {
    this.props.searchForNightlife(this.state.location, this.state.date);
  }

  componentDidMount() {
    this.setState({ location: this.props.searchLocation });
  }

  renderNightlifeCard(result, idx) {
    const { user } = this.props;

    if (user && result.event && result.event.attendees.findIndex(a => a.userId === user.id) >= 0) {
      // current user is attending this event
      return (
        <NightlifeEvent attending bar={result.bar} event={result.event} key={idx}
          onClick={() => console.log('Skipping!')} />
      );
    } else {
      // current user is not attending this event
      return (
        <NightlifeEvent bar={result.bar} event={result.event ? result.event : null} key={idx}
          onClick={() => console.log('Attending!')} />
      );
    }
  }

  render() {
    const { classes, searchResults } = this.props;
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
            <Button variant="raised" color="secondary" fullWidth={true}
              disabled={location.length < 1} onClick={this.handleSearch}>
              Search
            </Button>
          </Grid>
        </Grid>

        {/* search results */}
        <Grid container justify="center" spacing={16}>
          { searchResults.map(this.renderNightlifeCard) }
        </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object
};

const mapStateToProps = (state) => ({
  searchLocation: state.search.location,
  searchResults: state.search.results
});

const mapDispatchToProps = (dispatch) => ({
  searchForNightlife(location, date) { dispatch(nightlifeSearch(location, date)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));

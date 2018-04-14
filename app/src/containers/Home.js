import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import Typography from 'material-ui/Typography';
import NightlifeEvent from '../components/NightlifeEvent';
import { SearchStatus, nightlifeSearch } from '../actions/search';
import api from '../util/api';

const styles = theme => ({
  search: {
    marginBottom: theme.spacing.unit * 3
  },
  searchInput: {
    width: '100%'
  },
  loginNotice: {
    textAlign: 'center'
  }
});

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: '',
      date: moment().format('YYYY-MM-DD'),
      searching: false,
      showError: false,
      barClicked: null
    };

    this.handleLocChange = this.handleLocChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAttendClick = this.handleAttendClick.bind(this);
    this.handleSkipClick = this.handleSkipClick.bind(this);
    this.renderNightlifeCard = this.renderNightlifeCard.bind(this);
  }

  handleLocChange(event) {
    this.setState({ location: event.target.value });
  }

  handleSearch() {
    this.props.searchForNightlife(this.state.location, this.state.date);
  }

  handleAttendClick(bar, event) {
    this.setState({ barClicked: bar.id });

    let body;
    if (event) {
      body = { event: { id: event.id } };
    } else {
      body = { date: this.state.date, bar };
    }

    api.postAttendingEvent(this.props.user, body).then(result => {
      //console.log('Attend request successful');
      this.handleSearch();
    }).catch(err => {
      console.error('Attend request error', err);
      this.setState({ barClicked: null });
    });
  }

  handleSkipClick(bar, event) {
    this.setState({ barClicked: bar.id });

    api.deleteAttendingEvent(this.props.user, event).then(result => {
      //console.log('Skip request successful');
      this.handleSearch();
    }).catch(err => {
      console.error('Skip request error', err);
      this.setState({ barClicked: null });
    });
  }

  componentDidMount() {
    this.setState({ location: this.props.searchLocation }, () => {
      if (this.props.searchResults.length === 0 && this.state.location.length > 0) this.handleSearch();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchStatus } = this.props;
    const { searching } = this.state;

    if (prevProps.searchStatus !== SearchStatus.requested && searchStatus === SearchStatus.requested) {
      // search started
      this.setState({ searching: true });
    } else if (searching && searchStatus !== SearchStatus.requested) {
      // search finished
      let newState = { searching: false, barClicked: null };

      if (searchStatus === SearchStatus.error) {
        newState = { ...newState, showError: true };
      }

      this.setState(newState);
    }
  }

  renderNightlifeCard(result, idx) {
    const { user } = this.props;
    const { barClicked } = this.state;
    
    const isClicked = barClicked === result.bar.id;

    if (user && result.event && result.event.attendees.findIndex(a => a.userId === user.id) >= 0) {
      // current user is attending this event
      return (
        <NightlifeEvent attending bar={result.bar} event={result.event} key={idx}
          disabled={isClicked}
          onClick={this.handleSkipClick} />
      );
    } else {
      // current user is not attending this event
      return (
        <NightlifeEvent bar={result.bar} event={result.event ? result.event : null} key={idx}
          disabled={isClicked || !user}
          onClick={this.handleAttendClick} />
      );
    }
  }

  render() {
    const { classes, user, searchResults } = this.props;
    const { location, searching, showError } = this.state;

    return (
      <div>
        {/* search controls */}
        <Grid container justify="space-around" alignItems="baseline" spacing={16} className={classes.search}>
          <Grid item xs={8} sm={8}>
            <TextField id="nightlife-loc" label="Search for nightlife"
              placeholder="Enter your location" margin="normal" className={classes.searchInput}
              value={location} onChange={this.handleLocChange}/>
          </Grid>
          <Grid item xs={4} sm={2}>
            <Button variant="raised" color="secondary" fullWidth={true}
              disabled={searching || location.length < 1} onClick={this.handleSearch}>
              Search
            </Button>
          </Grid>

          { !user &&
            <Grid item xs={12}>
              <Typography variant="subheading" color="error" className={classes.loginNotice}>
                <Link to="/login">Log in</Link> to let others know where you'll be tonight!
              </Typography>
            </Grid>
          }
        </Grid>

        {/* search results */}
        <Grid container justify="center" spacing={16}>
          { searchResults.map(this.renderNightlifeCard) }
        </Grid>

        {/* error snackbar */}
        <Snackbar open={showError} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          autoHideDuration={4000} onClose={() => this.setState({ showError: false })}
          message="Sorry, there was a problem searching for nightlife" />
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
  searchResults: state.search.results,
  searchStatus: state.search.status
});

const mapDispatchToProps = (dispatch) => ({
  searchForNightlife(location, date) { dispatch(nightlifeSearch(location, date)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));

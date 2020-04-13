import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import Grid from '@material-ui/core/Grid';
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import DateFnsAdapter from "@date-io/date-fns";

const dateFns = new DateFnsAdapter();

class MyDateTimePicker extends React.Component {

  constructor(props) {
    super(props);

    const [fromDate, toDate] = this.props.dates;
    this.state = {
      fromDate: fromDate,
      toDate: toDate
    };
  }

  minDateMessage(fromDate) {
    return fromDate ? dateFns.format(fromDate, "yyyy/MM/dd HH:mm") : 'the from date';
  }

  render() {
    return (
      <React.Fragment>
        <Grid item>
          <KeyboardDateTimePicker
            variant="inline"
            label="From"
            value={this.state.fromDate}
            onChange={(fromDate) => console.log("from", fromDate) || this.setState({ fromDate })}
            format="yyyy/MM/dd HH:mm"
          />
        </Grid>

        <Grid item>
          <KeyboardDateTimePicker
            variant="inline"
            // ampm={false} // for am/pm
            label="Till"
            value={this.state.toDate}
            minDate={this.state.fromDate}
            minDateMessage={`value cannot be before ${this.minDateMessage(this.state.fromDate)}`}
            onChange={(toDate) => console.log("to", toDate) || this.setState({ toDate })}
            onError={(e, v) => console.log("Till", "e", e, "v", v)}
            format="yyyy/MM/dd HH:mm"
          />
        </Grid>

        <Grid item>
          <IconButton aria-label="submit" onClick={() => this.props.submitDates([this.state.fromDate, this.state.toDate])}>
            <DoneIcon />
          </IconButton>
        </Grid>

      </React.Fragment>
    );
  }
}

export default MyDateTimePicker;

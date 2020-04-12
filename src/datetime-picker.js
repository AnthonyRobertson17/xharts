import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import Grid from '@material-ui/core/Grid';
import { DateTimePicker, KeyboardDateTimePicker } from "@material-ui/pickers";

const MyDateTimePicker = ({
  dates = [new Date(), new Date()],
  data,
  metricField,
  submitDates,
  updateDates,
  handleMetricFieldChange
}) => {
  console.log("dates", dates);
  return (
    <React.Fragment>
      <Grid item>
      <DateTimePicker
        variant="inline"
        label="From"
        value={dates[0]}
        onChange={(fromDate) => console.log("from", fromDate) || updateDates([fromDate, dates[1]])}
        format="yyyy/MM/dd HH:mm"
      />
      </Grid>

      <Grid item>
      <KeyboardDateTimePicker
        variant="inline"
        // ampm={false} // for am/pm
        label="Till"
        value={dates[1]}
        onChange={(toDate) => console.log("to", toDate) || updateDates([dates[0], toDate])}
        onError={console.log}
        format="yyyy/MM/dd HH:mm"
      />
      </Grid>

      <Grid item>
      <IconButton aria-label="submit" onClick={() => submitDates()}>
        <DoneIcon />
      </IconButton>
      </Grid>


    </React.Fragment>
  );
}

export default MyDateTimePicker;

import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const Message = ({ error, buckets }) => {
  if (error) {
    return <h1>Something went wrong...</h1>;
  } else if (buckets) {
    return <h1>{buckets[0].value}</h1>;
  }
  return <h1>{"Loading..."}</h1>;
};

const ErrorMessage = () => <h1>Something went wrong...</h1>;



export default ({ type, metricName, data = {}, handleRemovingChart }) => {
  return console.log("single", type, metricName, data) || (
    <Grid item md={6}>
      <Card>
        <CardHeader
          action={
            <IconButton aria-label="close" onClick={() => handleRemovingChart()}>
              <CloseIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Message error={data.error} buckets={data.buckets} />
          <small>
            <strong>{type}</strong>
            {" card for "}
            <strong>{metricName}</strong>
          </small>
        </CardContent>
      </Card>
    </Grid>
  );
}

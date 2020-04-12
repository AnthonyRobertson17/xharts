import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default ({ type, metricName, data, handleRemovingChart }) => {
  return (
    <Grid item md={6}>
      <Card>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <CloseIcon onClick={() => handleRemovingChart()} />
            </IconButton>
          }
        />
        <CardContent>
          <h1>{data && data.length === 1 ? data[0].value : "Loading..."}</h1>
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

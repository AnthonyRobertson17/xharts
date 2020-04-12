import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';

const getMetricTypeOptions = (types) => {
  return types;
}

const getMetricOptions = (data) => {
  return data;
}

const AGGREGATION_TYPE_SINGLE = "single";
const AGGREGATION_TYPE_TIMESERIES = "timeseries";
const AGGREGATION_TYPES = [
  AGGREGATION_TYPE_SINGLE,
  AGGREGATION_TYPE_TIMESERIES
];

class AddCharts extends React.Component {

  state = {
    newMetricType: "",
    newMetricName: "",
    newMetricAggregationType: AGGREGATION_TYPES[0]
  }

  handleNewChart = () => {
    console.log({
      newMetricType: this.state.newMetricType,
      newMetricName: this.state.newMetricName,
      newMetricAggregationType: this.state.newMetricAggregationType
    });
    this.props.handleNewChart({
      newMetricType: this.state.newMetricType,
      newMetricName: this.state.newMetricName,
      newMetricAggregationType: this.state.newMetricAggregationType
    });

    this.setState({
      newMetricType: "",
      newMetricName: ""
    });
  }

  render() {
    return (
      <div>
        <FormGroup row>
          <Autocomplete
            id="new-metric-type-typeahead"
            options={getMetricTypeOptions(this.props.types)}
            style={{ width: 300, marginRight: 10 }}
            value={this.state.newMetricType}
            renderInput={(params) => <TextField {...params} label="Metric Type" variant="outlined" />}
            onChange={(_event, value) => this.setState({ newMetricType: value })}
          />
          <div style={{width: "5px"}}></div>

          <Autocomplete
            id="new-metric-name-typeahead"
            options={getMetricOptions(this.props.metricNames)}
            style={{ width: 300, marginRight: 10 }}
            value={this.state.newMetricName}
            renderInput={(params) => <TextField {...params} label="Metric Name" variant="outlined" />}
            onChange={(_event, value) => this.setState({ newMetricName: value })}
          />
          <div style={{width: "5px"}}></div>

          <Autocomplete
            id="new-metric-aggregation-typeahead"
            options={AGGREGATION_TYPES}
            style={{ width: 300, marginRight: 10 }}
            value={this.state.newMetricAggregationType}
            renderInput={(params) => <TextField {...params} label="Metric Aggregation" variant="outlined" />}
            onChange={(_event, value) => this.setState({ newMetricAggregationType: value })}
          />
          <div style={{width: "5px"}}></div>

          <div style={{width: "5px"}}></div>

          <IconButton
            aria-label="submit"
            disabled={!this.state.newMetricType || !this.state.newMetricName}
            onClick={() => this.handleNewChart()}>
            <DoneIcon />
          </IconButton>

        </FormGroup>
      </div>
    );
  }
}

export default AddCharts;

export {
  AGGREGATION_TYPE_SINGLE,
  AGGREGATION_TYPE_TIMESERIES,
  AGGREGATION_TYPES
};

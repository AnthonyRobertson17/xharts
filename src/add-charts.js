import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import { default as BackendAdapter } from './backend-adapter.js';

const getMetricDataOptions = (metricName) => BackendAdapter.getMetricDataOptions(metricName);

const getMetricNames = (query) => BackendAdapter.getMetricNames(query);

const AGGREGATION_TYPE_SINGLE = "single";
const AGGREGATION_TYPE_TIMESERIES = "timeseries";
const AGGREGATION_TYPES = [
  AGGREGATION_TYPE_SINGLE,
  AGGREGATION_TYPE_TIMESERIES
];

class AddCharts extends React.Component {

  state = {
    metricOptions: [],
    metricDataOptions: [],
    newMetricType: null,
    newMetricName: null,
    newMetricDataPath: null,
    newMetricAggregationType: AGGREGATION_TYPES[0]
  }

  constructor(props) {
    super(props);

    getMetricNames('').then(metricOptions => this.setState({ metricOptions }));
  }

  handleNewChart = () => {
    console.log({
      metricType: this.state.newMetricType,
      metricName: this.state.newMetricName,
      metricDataPath: this.state.newMetricDataPath,
      metricAggregationType: this.state.newMetricAggregationType
    });
    this.props.handleNewChart({
      metricType: this.state.newMetricType,
      metricName: this.state.newMetricName,
      metricDataPath: this.state.newMetricDataPath,
      metricAggregationType: this.state.newMetricAggregationType
    });

    this.setState({
      newMetricType: "",
      newMetricDataPath: "",
      newMetricName: ""
    });
  }

  handleMetricQuery = (query) => {
    getMetricNames(query).then(metricOptions => this.setState({ metricOptions }));
  }

  handleNewMetricName = (newMetricName) => {
    this.setState({ newMetricName });
    getMetricDataOptions(newMetricName).then(metricDataOptions => this.setState({ metricDataOptions }));
  }

  render() {
    return (
      <div>
        <FormGroup row>
          <Autocomplete
            id="new-metric-type-typeahead"
            options={this.props.types}
            style={{ width: 300, marginRight: 10 }}
            value={this.state.newMetricType}
            renderInput={(params) => <TextField {...params} label="Metric Type" variant="outlined" />}
            onChange={(_event, newMetricType) => this.setState({ newMetricType })}
          />
          <div style={{width: "5px"}}></div>

          <Autocomplete
            id="new-metric-name-typeahead"
            options={this.state.metricOptions}
            filterOptions={v => v}
            style={{ width: 300, marginRight: 10 }}
            value={this.state.newMetricName}
            renderInput={(params) => <TextField {...params} onChange={e => this.handleMetricQuery(e.target.value)} label="Metric Name" variant="outlined" />}
            onChange={(_event, newMetricName) => this.handleNewMetricName(newMetricName)}
          />
          <div style={{width: "5px"}}></div>

          <Autocomplete
            id="new-metric-data-typeahead"
            options={this.state.metricDataOptions}
            style={{ width: 300, marginRight: 10 }}
            value={this.state.newMetricDataPath}
            renderInput={(params) => <TextField {...params} label="Data Attr Name" variant="outlined" />}
            onChange={(_event, newMetricDataPath) => this.setState({ newMetricDataPath })}
          />
          <div style={{width: "5px"}}></div>

          <Autocomplete
            id="new-metric-aggregation-typeahead"
            options={AGGREGATION_TYPES}
            style={{ width: 300, marginRight: 10 }}
            value={this.state.newMetricAggregationType}
            renderInput={(params) => <TextField {...params} label="Metric Aggregation" variant="outlined" />}
            onChange={(_event, newMetricAggregationType) => this.setState({ newMetricAggregationType })}
          />

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

import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';

const getMetricTypeOptions = (types) => {
  return types;
}

const getMetricOptions = (data) => {
  return data;
}

function getMetricDataOptions(metricName) {
  return fetch("/metrics/search_parameters?metric_name=" + metricName).then(res => res.json()).then(val => console.log(val.data.parameter_names) || val.data.parameter_names);;
}

function getMetricNames(query) {
  console.log("getMetricNames", query);
  return fetch("/metrics/search_metric_names?q=" + query).then(res => res.json()).then(val => console.log(val.data.metric_names) || val.data.metric_names);
}

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
    newMetricType: "",
    newMetricName: "",
    newMetricDataPath: "",
    newMetricAggregationType: AGGREGATION_TYPES[0]
  }

  constructor(props) {
    super(props);

    getMetricNames('').then(metricOptions => this.setState({ metricOptions }));
  }

  handleNewChart = () => {
    console.log({
      newMetricType: this.state.newMetricType,
      newMetricName: this.state.newMetricName,
      newMetricDataPath: this.state.newMetricDataPath,
      newMetricAggregationType: this.state.newMetricAggregationType
    });
    this.props.handleNewChart({
      newMetricType: this.state.newMetricType,
      newMetricName: this.state.newMetricName,
      newMetricDataPath: this.state.newMetricDataPath,
      newMetricAggregationType: this.state.newMetricAggregationType
    });

    this.setState({
      newMetricType: "",
      newMetricDataPath: "",
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
            options={this.state.metricOptions}
            filterOptions={v => v}
            style={{ width: 300, marginRight: 10 }}
            value={this.state.newMetricName}
            renderInput={(params) => <TextField {...params} onChange={e => getMetricNames(e.target.value).then(metricOptions => this.setState({ metricOptions }))} label="Metric Name" variant="outlined" />}
            onChange={(_event, newMetricName) => {
              this.setState({ newMetricName });
              getMetricDataOptions(newMetricName).then(metricDataOptions => this.setState({ metricDataOptions }));
            }}
          />
          <div style={{width: "5px"}}></div>

          <Autocomplete
            id="new-metric-data-typeahead"
            options={this.state.metricDataOptions}
            style={{ width: 300, marginRight: 10 }}
            value={this.state.newMetricDataPath}
            renderInput={(params) => <TextField {...params} label="Data Attr Name" variant="outlined" />}
            onChange={(_event, value) => this.setState({ newMetricDataPath: value })}
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

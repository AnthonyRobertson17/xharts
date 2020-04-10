import React from 'react';
import './App.css';
import BackendAdapter from './backend-adapter.js';
import MetricFieldTypeahead from './metric-field-typeahead.js';
import LineGraph from './line-graph.js';
import SingleMetricChart from './single-metric-chart.js';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      metricField: "",
      countData: {}
    };
  }

  parseQueryParams(paramString) {
    return paramString.split("&").filter(v => !!v).reduce((params, keyVal) => {
      const [key, val] = keyVal.split("=");
      params[key] = val;
      return params;
    }, {});
  }

  componentDidMount() {
    console.log("Loading Metrics START");

    console.log("query params", window.location.search);

    const params = this.parseQueryParams(window.location.search.slice(1));

    console.log("query params", params);

    BackendAdapter.getFilteredData(params).then(res => {
      console.log("Loading Metrics DONE", res.data);
      this.setState({
        data: res.data,
        isLoading: false,
        dates: [
          new Date(params.start_datetime || Date()),
          new Date(params.end_datetime || Date())
        ],
      });
    });

    BackendAdapter.queryCount(params).then(res => {
      console.log("Loading Count DONE", res.data);
      this.setState({ countData: res.data });
    });
  }

  updateDates(dates) {
    console.log(dates);
    this.setState({ dates });
  }

  submitDates() {
    console.log(`### Filtering for dates: ${this.state.dates}`);
    const startDatetime = this.state.dates[0].toISOString().slice(0, -5);
    const endDatetime = this.state.dates[1].toISOString().slice(0, -5);

    // the pushedState isn't utilized by the app yet...but it _could_ be
    window.history.pushState(
      { startDatetime, endDatetime },
      "XHARTS",
      `?start_datetime=${startDatetime}&end_datetime=${endDatetime}`
    );

    BackendAdapter.getFilteredData({ dates: this.state.dates }).then(res => {
      console.log("Filtering done", res.data);
      this.setState({ data: res.data });
    });
  }

  handleMetricFieldChange(metricField) {
    this.setState({ metricField });
  }

  render() {
    console.log("### APP RENDER");
    return (
      <div className="App">
        <h1>XHARTS</h1>
        <div className="container">
          <ButtonToolbar>
            <DateTimeRangePicker
              onChange={(dates) => this.updateDates.bind(this)(dates)}
              value={this.state.dates}
            />
            <Button
              style={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                marginRight: '5px'
              }}
              variant="primary"
              onClick={() => this.submitDates()}
            >
              Filter Dates
            </Button>
            <MetricFieldTypeahead
              data={this.state.data}
              value={this.state.metricField}
              handleMetricFieldChange={e => this.handleMetricFieldChange(e)}
            />
          </ButtonToolbar>
        </div>
        <div className="container">
          <LineGraph data={this.state.data} metricField={this.state.metricField} />
        </div>
        <div className="container">
          <div className="row">
            <SingleMetricChart type={"count"} data={this.state.countData.buckets} />
            <SingleMetricChart type={"count"} data={[6]} />
            <SingleMetricChart type={"count"} data={[9]} />
            <SingleMetricChart type={"count"} data={[9]} />
            <SingleMetricChart type={"count"} data={[9]} />
            <SingleMetricChart type={"count"} data={[9]} />
            <SingleMetricChart type={"count"} data={[9]} />
          </div>
        </div>
        <div style={{height: 150}}></div>
      </div>
    );
  }
}

export default App;

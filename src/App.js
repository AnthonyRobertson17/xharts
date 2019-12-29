import React from 'react';
import './App.css';
import BackendAdapter from './backend-adapter.js';
import MetricFieldTypeahead from './metric-field-typeahead.js';
import LineGraph from './line-graph.js';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      metricField: ""
    };
  }

  componentDidMount() {
    console.log("Loading Metrics START");
    BackendAdapter.getInitialData().then(res => {
      console.log("Loading Metrics DONE", res.data);
      this.setState({
        data: res.data,
        isLoading: false,
        startDate: null,
        endDate: null,
        dates: [new Date(), new Date()],
      });
    });
  }

  updateDates(dates) {
    console.log(dates);
    this.setState({ dates });
  }

  submitDates() {
    console.log(`### Filtering for dates: ${this.state.dates}`);
    BackendAdapter.getFilteredData({ dates: this.state.dates }).then(res => {
      console.log("Filtering done", res.data);
      this.setState({ data: res.data });
    });
  }

  handleMetricFieldChange(event) {
    this.setState({ metricField: event.target.value });
  }

  render() {
    console.log("### APP RENDER");
    return (
      <div className="App">
        <h1>This is a test app</h1>
        <div>
          <DateTimeRangePicker
            onChange={(dates) => this.updateDates.bind(this)(dates)}
            value={this.state.dates}
          />
          <button onClick={() => this.submitDates()}>Filter Dates</button>
          <MetricFieldTypeahead
            data={this.state.data}
            value={this.state.metricField}
            handleMetricFieldChange={e => this.handleMetricFieldChange(e)}
          />
        </div>
        <div>
          <LineGraph data={this.state.data} metricField={this.state.metricField} />
        </div>
      </div>
    );
  }
}

export default App;

import React from 'react';
import './App.css';
import BackendAdapter from './backend-adapter.js';
import MetricFieldTypeahead from './metric-field-typeahead.js';
import LineGraph from './line-graph.js';
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
        <h1>XHARTS</h1>
        <div class="container">
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
        <div>
          <LineGraph data={this.state.data} metricField={this.state.metricField} />
        </div>
      </div>
    );
  }
}

export default App;

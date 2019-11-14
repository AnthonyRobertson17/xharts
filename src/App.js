import React from 'react';
import './App.css';
import BackendAdapter from './backend-adapter.js'
import LineGraph from './line-graph.js'
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true
    };
  }

  componentDidMount() {
    console.log("START");
    BackendAdapter.getAllData().then(res => {
      console.log("DONE", res.data);
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
  }

  render() {
    return (
      <div className="App">
        <h1>This is a test app</h1>
        <div>
          <DateTimeRangePicker
            onChange={(dates) => this.updateDates.bind(this)(dates)}
            value={this.state.dates}
          />
          <button onClick={this.submitDates.bind(this)}>Filter Dates</button>
        </div>
        <div>
          <LineGraph/>
        </div>
      </div>
    );
  }
}

export default App;

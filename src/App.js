import React from 'react';
import {DateRangePicker} from 'react-dates'
import 'react-dates/lib/css/_datepicker.css';
import './App.css';
import BackendAdapter from './backend-adapter.js'
import LineGraph from './line-graph.js'
import 'react-dates/initialize';

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
      });
    });
  }

  render() {
    return (
      <div className="App">
        <h1>This is a test app</h1>
        <div>
          <DateRangePicker
            startDate={this.state.startDate}
            startDateId="your_unique_start_date_id"
            endDate={this.state.endDate}
            endDateId="your_unique_end_date_id"
            onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
            focusedInput={this.state.focusedInput}
            onFocusChange={focusedInput => this.setState({ focusedInput })}
          />
        </div>
        <div>
          <LineGraph/>
        </div>
      </div>
    );
  }
}

export default App;

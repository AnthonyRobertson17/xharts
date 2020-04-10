import React from 'react';
import './App.css';
import BackendAdapter from './backend-adapter.js';
import AddCharts from './add-charts.js';
import { default as MetricFieldTypeahead, getMetricNamesFromData } from './metric-field-typeahead.js';
import LineGraph from './line-graph.js';
import SingleMetricChart from './single-metric-chart.js';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

class App extends React.Component {

  chartTypes = ["count", "max", "avg", "min"]

  constructor(props) {
    super(props);

    const chartsJson = window.localStorage.getItem("charts");
    let charts = [];

    console.log("chartsJson", chartsJson);
    try {
      let chartsTemp = JSON.parse(chartsJson);
      console.log("chartsTemp.length", chartsTemp.length);
      charts = chartsTemp;
    } catch (e) {
      console.error("woa, charts could not be retrieved due to malformed JSON...", chartsJson);
      console.log("resetting chartsJson");
      window.localStorage.setItem("charts", "[]");
    }

    this.state = {
      data: [],
      isLoading: true,
      metricField: "",
      countData: {},
      metricNames: [],
      charts: charts,
      chartData: new Array(charts.length).fill(0)
    };
  }

  parseQueryParams(paramString) {
    return paramString.split("&").filter(v => !!v).reduce((params, keyVal) => {
      const [key, val] = keyVal.split("=");
      params[key] = val;
      return params;
    }, {});
  }

  getQueryParams() {
    console.log("query params", window.location.search);
    return this.parseQueryParams(window.location.search.slice(1));
  }

  componentDidMount() {
    console.log("Loading Metrics START");

    const params = this.getQueryParams();

    console.log("query params", params);

    BackendAdapter.getFilteredData(params).then(res => {
      console.log("Loading Metrics DONE", res.data);

      let metricNames = getMetricNamesFromData(res.data);

      this.setState({
        data: res.data,
        isLoading: false,
        dates: [
          new Date(params.start_datetime || Date()),
          new Date(params.end_datetime || Date())
        ],
        metricNames
      });
    });

    this.state.charts.map((chartParams, idx) => {
      this.refreshChartAtIdx({ idx, chartParams }, params);
    });
  }

  refreshChartAtIdx({ idx, chartParams }, params) {
    params =  params || this.getQueryParams();

    const chartQueryParams = { ...params, ...chartParams };

    if (idx >= this.state.chartData.length) console.warn("this is a race condition...");

    BackendAdapter.queryCount(chartQueryParams).then(res => {
      console.log("Loading Count DONE", res.data);
      const chartDataEntry = {
        metricType: chartParams.metricType,
        metricName: chartParams.metricName,
        data: res.data
      };

      this.setState(prevState => {
        let newChartData = [...prevState.chartData];

        if (idx >= newChartData.length) console.error("this is undefined territory", newChartData);

        newChartData[idx] = chartDataEntry;

        return {
          ...prevState,
          chartData: newChartData
        }
      });
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

      let metricNames = getMetricNamesFromData(res.data);

      this.setState({ data: res.data, metricNames });
    });
  }

  handleMetricFieldChange(metricField) {
    this.setState({ metricField });
  }

  handleNewChart({ newMetricType, newMetricName }) {
    const newChart = { metricType: newMetricType, metricName: newMetricName };
    console.log("adding new Chart", newChart);
    this.setState(prevState => ({
      ...prevState,
      charts: [...prevState.charts, newChart],
      chartData: [...prevState.chartData, 0],
    }));

    let charts = JSON.parse(window.localStorage.getItem("charts"));
    charts.push(newChart);
    window.localStorage.setItem("charts", JSON.stringify(charts));

    // async load chart data
    this.refreshChartAtIdx({ idx: charts.length - 1, chartParams: newChart });
  }

  render() {
    console.log("### APP RENDER", this.chartTypes);
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
          <div className="row m-2">
            <AddCharts charts={this.state.charts} types={this.chartTypes} metricNames={this.state.metricNames} handleNewChart={(newChart) => this.handleNewChart(newChart)} />
          </div>
          <div className="row">
            {this.state.chartData.map(chart =>
              <SingleMetricChart type={chart.metricType} metricName={chart.metricName} data={(chart.data || {}).buckets} />
            )}
          </div>
        </div>
        <div style={{height: 150}}></div>
      </div>
    );
  }
}

export default App;

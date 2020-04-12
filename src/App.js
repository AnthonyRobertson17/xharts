import React from 'react';
import './App.css';
import { default as BackendAdapter, dateToQuery } from './backend-adapter.js';
import { default as AddCharts, AGGREGATION_TYPE_SINGLE } from './add-charts.js';
import { default as MetricFieldTypeahead, getMetricNamesFromData } from './metric-field-typeahead.js';
import LineGraph from './line-graph.js';
import SingleMetricChart from './single-metric-chart.js';
import TimeseriesMetricChart from './timeseries-metric-chart.js';

import Navbar from './navbar.js';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import DateTimePicker from './datetime-picker.js';
import Typography from '@material-ui/core/Typography';

class App extends React.Component {

  chartTypes = ["count", "max", "avg", "min"]

  constructor(props) {
    super(props);

    const chartsJson = window.localStorage.getItem("charts");
    let charts = [];

    console.log("chartsJson", chartsJson);
    try {
      let chartsTemp = JSON.parse(chartsJson);
      if (!chartsTemp || typeof chartsTemp !== "object") throw Error("yucky");
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
    let params = this.parseQueryParams(window.location.search.slice(1));
    params.startDatetime = params.start_datetime;
    params.endDatetime = params.end_datetime;
    return params;
  }

  componentDidMount() {
    this.refreshAll();
  }

  refreshAll() {
    const params = this.getQueryParams();

    console.log("refreshAll w/ query params:", params);

    BackendAdapter.getFilteredData(params).then(res => {
      let metricNames = getMetricNamesFromData(res.data);

      this.setState({
        data: res.data,
        isLoading: false,
        dates: [
          new Date(params.start_datetime + "Z" || Date()),
          new Date(params.end_datetime + "Z" || Date())
        ],
        metricField: params.q || "",
        metricNames
      });
    });

    this.state.charts.forEach((chartParams, idx) => {
      this.refreshChartAtIdx({ idx, chartParams }, params);
    });
  }

  refreshChartAtIdx({ idx, chartParams }, params) {
    params =  params || this.getQueryParams();

    const chartQueryParams = { ...params, ...chartParams };

    if (idx >= this.state.chartData.length) console.warn("this is a race condition...");

    BackendAdapter.queryCount(chartQueryParams).then(res => {
      const chartDataEntry = {
        metricType: chartParams.metricType,
        metricName: chartParams.metricName,
        metricAggregationType: chartParams.metricAggregationType,
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
    const startDatetime = dateToQuery(this.state.dates[0]);
    const endDatetime = dateToQuery(this.state.dates[1]);

    // the pushedState isn't utilized by the app yet...but it _could_ be
    window.history.pushState(
      { startDatetime, endDatetime, q: this.state.metricField },
      "XHARTS",
      `?start_datetime=${startDatetime}&end_datetime=${endDatetime}${this.state.metricField ? "&q=" + this.state.metricField : ""}`
    );

    // BackendAdapter.getFilteredData({ startDatetime, endDatetime }).then(res => {
    //   console.log("Filtering done", res.data);

    //   let metricNames = getMetricNamesFromData(res.data);

    //   this.setState({ data: res.data, metricNames });
    // });
    this.refreshAll();
  }

  handleMetricFieldChange(metricField) {
    this.setState({ metricField });
  }

  handleNewChart({ newMetricType, newMetricName, newMetricAggregationType }) {
    const newChart = {
      metricType: newMetricType,
      metricName: newMetricName,
      metricAggregationType: newMetricAggregationType
    };
    console.log("adding new Chart", newChart);
    this.setState(prevState => ({
      ...prevState,
      charts: [...prevState.charts, newChart],
      chartData: [...prevState.chartData, 0],
    }));

    let charts = JSON.parse(window.localStorage.getItem("charts"));
    charts.push(newChart);
    window.localStorage.setItem("charts", JSON.stringify(charts));

    this.refreshChartAtIdx({ idx: charts.length - 1, chartParams: newChart });
  }

  handleRemovingChart(idx) {
    let charts = JSON.parse(window.localStorage.getItem("charts"));
    charts = [...charts.slice(0, idx), ...charts.slice(idx + 1)];

    this.setState(prevState => {
      return {
        ...prevState,
        charts,
        chartData: [...prevState.chartData.slice(0, idx), ...prevState.chartData.slice(idx + 1)]
      }
    });

    window.localStorage.setItem("charts", JSON.stringify(charts));
  }

  render() {
    return (
      <div className="App">
        <Navbar>
          <MetricFieldTypeahead
            data={this.state.data}
            value={this.state.metricField}
            handleMetricFieldChange={e => this.handleMetricFieldChange(e)}
          />
          <DateTimePicker
            theme={"navbar"}
            dates={this.state.dates}
            data={this.state.data}
            metricField={this.state.metricField}
            updateDates={dates => this.updateDates(dates)}
            submitDates={() => this.submitDates()}
            handleMetricFieldChange={this.handleMetricFieldChange.bind(this)}
          />
        </Navbar>

        <Container>
          <Grid
            container
            spacing={2}
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
          </Grid>
        </Container>

        <Container style={{marginTop: "20px"}}>
          <Typography variant="h3" component="h1" style={{textAlign: "left"}}>
            Snapshot
          </Typography>
          {true && <LineGraph data={this.state.data} metricField={this.state.metricField} />}
        </Container>

        <Container style={{marginTop: "20px"}}>
          <Typography variant="h3" component="h1" style={{textAlign: "left"}}>
            Dashboard
          </Typography>

          <Grid
            container
            spacing={2}
            direction="row"
            justify="center"
            alignItems="center"
          >
            {true &&
              <Grid item lg>
                <AddCharts charts={this.state.charts} types={this.chartTypes} metricNames={this.state.metricNames} handleNewChart={(newChart) => this.handleNewChart(newChart)} />
              </Grid>}
          </Grid>

          <Grid container spacing={2}>
            {this.state.chartData.filter(chart => !!chart).map((chart, idx) =>
              chart.metricAggregationType === AGGREGATION_TYPE_SINGLE ?
                <SingleMetricChart key={`idx-${chart.metricType}-${chart.metricName}-${chart.metricAggregationType}`} type={chart.metricType} metricName={chart.metricName} data={(chart.data || {}).buckets} handleRemovingChart={() => this.handleRemovingChart(idx)} />
                : <TimeseriesMetricChart key={`idx-${chart.metricType}-${chart.metricName}-${chart.metricAggregationType}`} type={chart.metricType} metricName={chart.metricName} data={(chart.data || {}).buckets} handleRemovingChart={() => this.handleRemovingChart(idx)} />
            )}
          </Grid>
        </Container>

        <div style={{height: 150}}></div>
      </div>
    );
  }
}

export default App;

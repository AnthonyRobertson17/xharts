import React from 'react';
import { ResponsiveLine } from '@nivo/line'

function formatMetrics(metrics) {
  const formatted = {};
  (metrics || []).forEach(metric => {
    formatted[metric.metric_name] = formatted[metric.metric_name] ||
      {id: metric.metric_name, data: []};

    formatted[metric.metric_name].data.push({
      "x": metric.created_at,
      "y": metric.data.latency
    });
  });

  const results = Object.keys(formatted).map(metric_name => formatted[metric_name]);
  console.log(results);
  return results;
}

const dummyData = [
  {
    "id": 1,
    "metric_name": "who",
    "data": {
      "cloud": "gcp",
      "cluster": "alpha-1",
      "decimal_revision": 9,
      "latency": 9,
      "release": "1911.1.0",
      "revision": 9
    },
    "created_at": "2019-12-24T17:38:39.560041",
    "updated_at": "2019-12-24T17:38:39.560041"
  },
  {
    "id": 2,
    "metric_name": "dat",
    "data": {
      "cloud": "gcp",
      "cluster": "alpha-1",
      "decimal_revision": 9,
      "latency": 9,
      "release": "1911.1.0",
      "revision": 9
    },
    "created_at": "2019-12-24T17:39:15.176718",
    "updated_at": "2019-12-24T17:39:15.176718"
  },
  {
    "id": 3,
    "metric_name": "who",
    "data": {
      "cloud": "gcp",
      "cluster": "alpha-1",
      "decimal_revision": 9,
      "latency": 10,
      "release": "1911.1.0",
      "revision": 9
    },
    "created_at": "2019-12-24T17:39:39.376640",
    "updated_at": "2019-12-24T17:39:39.376640"
  },
  {
    "id": 4,
    "metric_name": "who",
    "data": {
      "cloud": "gcp",
      "cluster": "alpha-1",
      "decimal_revision": 9,
      "latency": 3,
      "release": "1911.1.0",
      "revision": 9
    },
    "created_at": "2019-12-24T17:40:42.498604",
    "updated_at": "2019-12-24T17:40:42.498604"
  },
  {
    "id": 5,
    "metric_name": "who",
    "data": {
      "cloud": "gcp",
      "cluster": "alpha-1",
      "decimal_revision": 9,
      "latency": 4,
      "release": "1911.1.0",
      "revision": 9
    },
    "created_at": "2019-12-24T17:41:04.491320",
    "updated_at": "2019-12-24T17:41:04.491320"
  },
  {
    "id": 6,
    "metric_name": "who",
    "data": {
      "cloud": "gcp",
      "cluster": "alpha-1",
      "decimal_revision": 9,
      "latency": 3,
      "release": "1911.1.0",
      "revision": 9
    },
    "created_at": "2019-12-24T17:41:09.888987",
    "updated_at": "2019-12-24T17:41:09.888987"
  },
  {
    "id": 7,
    "metric_name": "who",
    "data": {
      "cloud": "gcp",
      "cluster": "alpha-1",
      "decimal_revision": 9,
      "latency": 8,
      "release": "1911.1.0",
      "revision": 9
    },
    "created_at": "2019-12-24T17:41:13.688332",
    "updated_at": "2019-12-24T17:41:13.688332"
  },
  {
    "id": 8,
    "metric_name": "who",
    "data": {
      "cloud": "gcp",
      "cluster": "alpha-1",
      "decimal_revision": 9,
      "latency": 4,
      "release": "1911.1.0",
      "revision": 9
    },
    "created_at": "2019-12-24T17:41:40.985647",
    "updated_at": "2019-12-24T17:41:40.985647"
  },
  {
    "id": 9,
    "metric_name": "dat",
    "data": {
      "cloud": "gcp",
      "cluster": "alpha-1",
      "decimal_revision": 9,
      "latency": 5,
      "release": "1911.1.0",
      "revision": 9
    },
    "created_at": "2019-12-24T17:41:47.353822",
    "updated_at": "2019-12-24T17:41:47.353822"
  },
  {
    "id": 10,
    "metric_name": "who",
    "data": {
      "cloud": "gcp",
      "cluster": "alpha-1",
      "decimal_revision": 9,
      "latency": 9,
      "release": "1911.1.0",
      "revision": 9
    },
    "created_at": "2019-12-24T17:41:58.921534",
    "updated_at": "2019-12-24T17:41:58.921534"
  }
];

const METRIC_DATETIME_FORMAT = "%Y-%m-%dT%H:%M:%S.%f";
const TIME_DISPLAY_FORMAT = "%H:%M:%S";

const MyResponsiveLine = ({ graphData }) => (
  <ResponsiveLine
    data={graphData}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{
      type: 'time',
      format: METRIC_DATETIME_FORMAT,
      precision: "second"
    }}
    yScale={{
      type: 'linear',
      stacked: false,
      min: 'auto',
      max: 'auto'
    }}
    xFormat={"time:" + TIME_DISPLAY_FORMAT}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 1,
      legend: 'Time',
      format: TIME_DISPLAY_FORMAT
    }}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Latency',
      legendOffset: -40,
      legendPosition: 'middle'
    }}
    colors={{ scheme: 'nivo' }}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabel="y"
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: 'square',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1
            }
          }
        ]
      }
    ]}
  />
);

class LineGraph extends React.Component {

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(prevProps, prevState, snapshot);
  }

  render() {
    const { data } = this.props;
    console.log(this.props);
    dummyData && data && console.log(data, formatMetrics(data));
    return (
      <div style={{ height: '400px' }}>
        <MyResponsiveLine graphData={formatMetrics(data)} />
      </div>
    )
  }
}

export default LineGraph;

import React from 'react';
import { ResponsiveLine } from '@nivo/line'
import get from 'lodash/get';

function formatMetrics(metrics, metricField) {
  const formatted = {};

  metrics.forEach(metric => {
    formatted[metric.metric_name] = formatted[metric.metric_name] ||
      {id: metric.metric_name, data: []};

    formatted[metric.metric_name].data.push({
      "x": metric.created_at,
      "y": get(metric.data, metricField, -1)
    });
  });

  const results = Object.keys(formatted).map(metric_name => formatted[metric_name]);
  console.log(results);
  return results;
}

const METRIC_DATETIME_FORMAT = "%Y-%m-%dT%H:%M:%S.%f";
const TIME_DISPLAY_FORMAT = "%H:%M:%S";

const MyResponsiveLine = ({ graphData, metricField }) => (
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
      legendPosition: 'middle',
      legendOffset: 35,
      format: TIME_DISPLAY_FORMAT
    }}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: `Metric Field: ${metricField}`,
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
  render() {
    const { data, metricField } = this.props;
    return (
      <div style={{ height: '400px' }}>
        <MyResponsiveLine graphData={formatMetrics(data, metricField)} metricField={metricField} />
      </div>
    )
  }
}

export default LineGraph;

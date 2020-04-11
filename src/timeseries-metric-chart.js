import React from 'react';
import { ResponsiveLine } from '@nivo/line'

function firstIndexOfDisimilarity(str1, str2) {
  let idx = 0

  while (idx < str1.length && idx < str2.length) {
    if (str1[idx] !== str2[idx]) break;
    idx++;
  }

  if (idx === Math.min(str1.length, str2.length)) {
    return false;
  }

  return idx;
}

const MyResponsiveLine = ({ data, yAxisLabel, xFormatter }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 10, right: 30, bottom: 50, left: 50 }}
    xScale={{ type: 'point' }}
    yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: 'bottom',
      format: xFormatter,
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 270,
      legend: 'time/bucket',
      legendOffset: 26,
      legendPosition: 'middle'
    }}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: yAxisLabel,
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
    enableGridX={false}
    // enableGridY={false}
  />
);

const prepareData = (ndata) => {
  const processed = ndata.map(datum => ({
    ...datum,
    data: datum.data.map(bucket =>
      ({ x: bucket.bucket, y: bucket.value })
    )
  }));

  console.log("prepareData", processed);
  return processed;
};

const graphWrapper = (data) => {

  let lastIdx = firstIndexOfDisimilarity(data.data[0].bucket, data.data[data.data.length - 1].bucket);

  if (lastIdx === false) lastIdx = data.data[0].bucket.length - 6;

  return (
    <div style={{minHeight: "150px", height: "150px"}}>
      <MyResponsiveLine
        data={prepareData([data])}
        yAxisLabel={`${data.type} for ${data.id}`}
        xFormatter={(val) => val.slice(lastIdx)}
      />
    </div>
  );
};

export default ({ type, metricName, data, handleRemovingChart }) => {
  return (
    <div className="col-md-6 mb-4">
      <div className="card">
        <span
          style={{textAlign: "right", cursor: "pointer"}}
          className="pt-2 pr-2"
          onClick={() => handleRemovingChart()}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </span>
        <div className="card-body">
          <div>{data && graphWrapper({ id: metricName, color: "hsl(72, 70%, 50%)", type, data })}</div>
          <small>
            <strong>{type}</strong>
            {" graph for "}
            <strong>{metricName}</strong>
          </small>
        </div>
      </div>
    </div>
  );
}

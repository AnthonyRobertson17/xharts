import React from 'react';

export default ({ type, metricName, data }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <div className="card-body">
          <h1>{data && data.length === 1 ? data[0] : "Loading..."}</h1>
          <small>
            <strong>{type}</strong>
            {" chart for "}
            <strong>{metricName}</strong>
          </small>
        </div>
      </div>
    </div>
  );
}

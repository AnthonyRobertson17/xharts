import React from 'react';

export default ({ type, metricName, data, handleRemovingChart }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <span
          style={{textAlign: "right", cursor: "pointer"}}
          className="pt-2 pr-2"
          onClick={() => handleRemovingChart()}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </span>
        <div className="card-body">
          <h1>{!!data ? "THIS IS TIME SERIES DATA: " + JSON.stringify(data) : "Loading Timeseries..."}</h1>
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

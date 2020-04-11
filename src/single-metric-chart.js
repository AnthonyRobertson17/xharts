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
          <i class="fa fa-times" aria-hidden="true"></i>
        </span>
        <div className="card-body">
          <h1>{data && data.length === 1 ? data[0].value : "Loading..."}</h1>
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


        // <span
        //   style={{textAlign: "right", cursor: "pointer", fontSize: "2rem"}}
        //   className="pr-3"
        //   onClick={() => handleRemovingChart()}
        // >
        //   ×
        // </span>

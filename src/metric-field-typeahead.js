import React from 'react';
// import { Typeahead } from 'react-typeahead';
// import Autosuggest from 'react-autosuggest';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import flattenDeep from 'lodash';

const DEFAULT_OPTIONS = ['John', 'Paul', 'George', 'Ringo'];

function getKeysFromObj(obj) {
  const results = Object.keys(obj).map(key => {
    if (typeof(obj[key]) === "object") {
      return getKeysFromObj(obj[key]);
    }
    return key;
  })

  return flattenDeep(results);
}

function getOptionsFromData(data) {
  const options = new Set();
  console.log("getOptionsFromData", data);
  data.forEach(metric => {
    getKeysFromObj(metric.data).forEach(k => options.add(k));
  });

  console.log(Array.from(options));
  return Array.from(options);
}

class MetricFieldTypeahead extends React.PureComponent {
  render() {
    return (
      <div style={{ display: "inline-block" }}>
      <Typeahead
        onChange={value =>
          this.props.handleMetricFieldChange({
            target: { value }
          })
        }
        options={getOptionsFromData(this.props.data)}
      />
      </div>
    );
  }
}

export default MetricFieldTypeahead;

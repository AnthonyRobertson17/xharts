import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import flattenDeep from 'lodash/flattenDeep';
import InputGroup from 'react-bootstrap/InputGroup';

function getKeysFromObj(obj) {
  const results = Object.keys(obj).map(key => {
    if (typeof(obj[key]) === "object") {
      return getKeysFromObj(obj[key]).map(subKey => `${key}.${subKey}`);
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
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">Metric Fieldname</InputGroup.Text>
        </InputGroup.Prepend>
        <Typeahead
          onChange={value =>
            this.props.handleMetricFieldChange(value[0])
          }
          options={getOptionsFromData(this.props.data)}
        />
      </InputGroup>
    );
  }
}

export default MetricFieldTypeahead;

export { getOptionsFromData as getMetricNamesFromData };

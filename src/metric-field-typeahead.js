import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import flattenDeep from 'lodash/flattenDeep';

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

  data.forEach(metric => {
    getKeysFromObj(metric.data).forEach(k => options.add(k));
  });

  return Array.from(options);
}

class MetricFieldTypeahead extends React.PureComponent {
  render() {
    return (
      <Autocomplete
        id="main-chart-metric-field-typeahead"
        options={getOptionsFromData(this.props.data)}
        style={{ width: 300, marginRight: 10 }}
        value={this.props.value}
        renderInput={(params) => <TextField {...params} label="Metric Name Input" variant="outlined" />}
        onChange={(_event, value) =>
          this.props.handleMetricFieldChange(value)
        }
      />
    );
  }
}

export default MetricFieldTypeahead;

export { getOptionsFromData as getMetricNamesFromData };

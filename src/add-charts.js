import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const getMetricTypeOptions = (types) => {
  return types;
}

const getMetricOptions = (data) => {
  return data;
}

const AGGREGATION_TYPE_SINGLE = "single";
const AGGREGATION_TYPE_TIMESERIES = "timeseries";
const AGGREGATION_TYPES = [
  AGGREGATION_TYPE_SINGLE,
  AGGREGATION_TYPE_TIMESERIES
];

class AddCharts extends React.Component {

  state = {
    newMetricType: "",
    newMetricName: "",
    newMetricAggregationType: AGGREGATION_TYPES[0]
  }

  handleNewChart = () => {
    console.log({
      newMetricType: this.state.newMetricType,
      newMetricName: this.state.newMetricName,
      newMetricAggregationType: this.state.newMetricAggregationType
    });
    this.props.handleNewChart({
      newMetricType: this.state.newMetricType,
      newMetricName: this.state.newMetricName,
      newMetricAggregationType: this.state.newMetricAggregationType
    });

    this.clearInputFields();
  }

  // THIS IS A HACK BECAUSE THE TYPEAHEAD LIBRARY DOES NOT EXPOSE A
  // PROGRAMATIC WAY TO CLEAR THE STUPID INPUT FIELDS
  clearInputFields = () => {
    setTimeout(() => {
      const typeBtn = document.querySelector(".metric-type .close");
      typeBtn.click();

      const nameBtn = document.querySelector(".metric-name .close");
      nameBtn.click();
    });
  }

  render() {
    return (
      <div>
        <InputGroup>
          <Typeahead
            id="metric-type-typeahead"
            className="metric-type"
            clearButton
            onChange={value =>
              this.setState({ newMetricType: value[0] })
            }
            options={getMetricTypeOptions(this.props.types)}
          />
          <div style={{width: "5px"}}></div>
          <Typeahead
            id="metric-name-typeahead"
            className="metric-name"
            clearButton
            onChange={value =>
              this.setState({ newMetricName: value[0] })
            }
            options={getMetricOptions(this.props.metricNames)}
          />
          <div style={{width: "5px"}}></div>
          <Form.Control as="select" onChange={(e) => this.setState({ newMetricAggregationType: e.target.value })}>
            {AGGREGATION_TYPES.map(selection => <option key={selection}>{selection}</option>)}
          </Form.Control>
          <div style={{width: "5px"}}></div>
          <Button
            variant="primary"
            disabled={!this.state.newMetricType || !this.state.newMetricName}
            onClick={() => this.handleNewChart()}
          >
            <i className="fa fa-plus" aria-hidden="true"></i>
          </Button>

        </InputGroup>
      </div>
    );
  }
}

export default AddCharts;

export {
  AGGREGATION_TYPE_SINGLE,
  AGGREGATION_TYPE_TIMESERIES,
  AGGREGATION_TYPES
};

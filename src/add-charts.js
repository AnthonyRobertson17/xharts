import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const getTypeOptions = (types) => {
  return types.map((label, id) => ({ id, label }));
}

const getMetricOptions = (data) => {
  return data.map((label, id) => ({ id, label }));
}

class AddCharts extends React.Component {

  state = {
    newMetricType: "",
    newMetricName: ""
  }

  handleNewChart = () => {
    console.log({
      newMetricType: this.state.newMetricType.label,
      newMetricName: this.state.newMetricName.label
    });
    this.props.handleNewChart({
      newMetricType: this.state.newMetricType.label,
      newMetricName: this.state.newMetricName.label
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
          <InputGroup.Prepend>
            <Typeahead
              className="metric-type"
              clearButton
              onChange={value =>
                this.setState({ newMetricType: value[0] })
              }
              options={console.log(this.props) || getTypeOptions(this.props.types)}
            />
          </InputGroup.Prepend>
          <Typeahead
            className="metric-name"
            clearButton
            onChange={value =>
              this.setState({ newMetricName: value[0] })
            }
            options={getMetricOptions(this.props.metricNames)}
          />
          <InputGroup.Append>
            <Button
              variant="primary"
              disabled={!this.state.newMetricType || !this.state.newMetricName}
              onClick={() => this.handleNewChart()}
            >
              Add Metric
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    );
  }
}

export default AddCharts;

import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

// const AddCharts = ({ charts, types }) => {
//   return (
//     <div className="col-md-3">
//       <input value={"nice"} />
//     </div>
//   );
// }

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
  }

  render() {
    return (
      <div>
        <InputGroup>
          <InputGroup.Prepend>
            <Typeahead
              onChange={value =>
                this.setState({ newMetricType: value[0] })
              }
              options={console.log(this.props) || getTypeOptions(this.props.types)}
            />
          </InputGroup.Prepend>
          <Typeahead
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

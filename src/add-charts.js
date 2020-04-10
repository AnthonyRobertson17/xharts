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
  return ["count", "max", "avg", "min"];
}

const getMetricOptions = (data) => {
  return ["version", "latency"];
}

class AddCharts extends React.Component {

  state = {
    newMetricType: "",
    newMetricName: ""
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
              options={getTypeOptions(this.props.types)}
            />
          </InputGroup.Prepend>
          <Typeahead
            onChange={value =>
              this.setState({ newMetricName: value[0] })
            }
            options={getMetricOptions(this.props.types)}
          />
          <InputGroup.Append>
            <Button
              variant="primary"
              disabled={!this.state.newMetricType || !this.state.newMetricName}
              onClick={() => console.log(this.state.newMetricType, this.state.newMetricName)}
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

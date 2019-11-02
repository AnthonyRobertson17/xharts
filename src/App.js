import React from 'react';
// import logo from './logo.svg';
import './App.css';
import BackendAdapter from './backend-adapter.js'
import LineGraph from './line-graph.js'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true
    };
  }

  componentDidMount() {
    console.log("START");
    BackendAdapter.getAllData().then(res => {
      console.log("DONE", res.data);
      this.setState({
        data: res.data,
        isLoading: false
      });
    });
  }

  render() {
    return (
      <div className="App">
        <h1>This is a test app</h1>
        <div>
          <LineGraph/>
        </div>
      </div>
    );
  }
}

export default App;

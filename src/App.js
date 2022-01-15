import React, { Component, PureComponent } from 'react';

class Clock extends PureComponent {
  state = {
    date: new Date(),
  };
  timerId;

  static defaultProps = {
    list: [],
  };

  constructor(props) {
    super(props);

    this.listRef = React.createRef();
  }

  shouldComponentUpdate() {
    return true;
  }

  static getDerivedStateFromProps(props, state) {
    return {};
  }

  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    return (
      <div className="App">
        <h1>Example</h1>
        <h5>{this.state.date.toLocaleTimeString()}</h5>
        <div ref={this.listRef}>Content</div>
      </div>
    );
  }

  tick() {
    console.log(this.state.date.toLocaleTimeString());
    this.setState((prevState) => ({ date: new Date() }));
  }
}

export default class App extends Component {
  state = {
    mounted: true,
  };
  render() {
    return (
      <div className="App">
        <button onClick={() => this.setState({ mounted: !this.state.mounted })}>
          button
        </button>
        {this.state.mounted && <Clock />}
        {false ? <Clock /> : ''}
      </div>
    );
  }
}

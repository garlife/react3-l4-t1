import React, { Component } from 'react';

class Clock extends Component {
  state = {
    date: new Date(),
  };

  timerId;

  static defaultProps = {
    list = [],
  };

  constructor(props) {
    super(props);
    this.list = React.createRef();
  }

  static getDerrivedStateFromProps(props, state) {
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

  componentDidUpdate(prevProps, prevState) {
    // if (this.props.userId !== prevProps.userId) {
    // this.setState((pState) => ({ date: new Date() }));
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
      <>
        <h1>Lesson 5. DateTick</h1>
        <p>{this.state.date.toLocaleTimeString()}</p>
        <div ref={this.listRef}>Content</div>
      </>
    );
  }

  tick() {
    this.setState((prevState) => ({ date: new Date() }));
    //this.state = {date: new Date()};  Don't do like this!
    console.log(this.state.date.toLocaleTimeString());
  }
}

export default class App extends Component {
 list1 = [];
 list2 = [];
 
  render() {
    return (
      <>
        {false ? <Clock /> : ''}
        <Clock list={this.list1} />
        {false ? <Clock /> : ''}
      </>
    );
  }
}

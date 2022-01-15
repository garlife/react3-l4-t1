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
    //this.tick = this.tick.bind(this)
    this.listRef = React.createRef();
  }

  /**
   * Вызывается на этапе монтирования до рендеринга
   * Возможность инициализации стейта
   * вызываеися при изменении пропсов, НО НЕ СТЕЙТА
   */
  static getDerivedStateFromProps(props, state) {
    return {};
  }

  //Остановка выполнения рендеринга
  //Не вызывается при первом рендеринге и forceUpdate
  //Значение по умолчанию - true !!!
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.description !== nextProps.description) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.tick();
    }, 1000);
  }

  /**
   * Снимок состояния до обновления
   */
  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current;
      //верхняя граница бегунка во вьюпорте
      return list.scrollHeight - list.scrollTop;
    }
    return null; //<--- !
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //
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
        <h1>Lection 5 {this.props.description}</h1>
        <p>{this.state.date.toLocaleTimeString()}</p>
      </div>
    );
  }
  //*********/
  tick() {
    this.setState((prevState) => {
      return { date: new Date() }; //Do not forget return!
    });
    console.log(this.props.name + ' ' + this.state.date.toLocaleTimeString());
    //this.state = {date: new Date()} <--WRONG!!!
  }
}

class App extends Component {
  list1 = [];
  list2 = [];
  render() {
    return (
      <>
        {false ? <Clock name="first" /> : ''}
        <Clock name="second" description="LifeCycle" />
        <div ref={this.listRef} list={this.list1}>
          Content
        </div>
      </>
    );
  }
}
export default App;

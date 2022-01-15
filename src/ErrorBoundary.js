import React, { PureComponent } from 'react';

export default class ErrorBoundary extends PureComponent {
  state = {
    hasError: false,
  };

  constructor(props) {
    super(props);
  }

  getDerrivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info){
  try {

    logComponentStatck(info.componentStack);
	}
catch (event){
console.log('error boundary: ', event.massage;
}
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <h1>Error: {error}</h1>;
    }
    const { children } = this.props;
    return children;
  }
  componentStack(log){
    console.log('log: ', new Date.toLocaleTimeString(), log)
  }
}

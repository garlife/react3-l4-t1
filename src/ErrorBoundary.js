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

  render() {
    const { children } = this.props;
    return this.props.children;
  }
}

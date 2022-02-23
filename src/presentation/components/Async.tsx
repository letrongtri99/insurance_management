import React from 'react';
import Loader from './Loader';

const sleep = (m: number) => new Promise((r) => setTimeout(r, m));

export default function asyncComponent(importComponent: any) {
  class AsyncComponent extends React.Component {
    constructor(props: any) {
      super(props);

      this.state = {
        component: null,
      };
    }

    async componentDidMount() {
      await sleep(150);

      const { default: component } = await importComponent();

      this.setState({
        component,
      });
    }

    render() {
      const { component: C } = this.state as any;
      return C ? <C {...this.props} /> : <Loader />;
    }
  }
  return AsyncComponent;
}

import React from 'react';

const WithPopper = (Component: React.ComponentType<any>, popperType: any) => {
  const WrappedComponent: React.FC<any> = (props: any) => {
    if (popperType === 'none') {
      return <Component {...props} />;
    }
    return <Component {...props} placement="bottom-start" />;
  };
  return WrappedComponent;
};

export default WithPopper;

import React from 'react';
import './Loading.scss';

const Loading = () => {
  return (
    <div className="wrapper-loading-icon">
      <img
        src="/static/img/rabbit-care-logo.svg"
        alt="Rabbit Finance"
        style={{ width: '150px' }}
      />
      <div className="lds-rabbit">
        <div className="lds-rabbit__children" />
        <div className="lds-rabbit__children" />
        <div className="lds-rabbit__children" />
      </div>
    </div>
  );
};
export default Loading;

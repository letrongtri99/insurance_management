import React from 'react';
import Slider from '.';

export default {
  title: 'Components/Controls/Slider',
  component: Slider,
};

const Template = (args: any) => <Slider {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  onChange: (e: any) => {
    console.log(e);
  },
  max: 100000,
  step: 10000,
  marks: true,
  value: [10000, 80000],
};

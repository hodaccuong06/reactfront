

import React from 'react'
import { CustomStep } from './styled';
import { Popover, Steps } from 'antd';

const customDot = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }
  >
    {dot}
  </Popover>
);
const StepComponent = ({current = 0, items = []}) => {
  return (
    <Steps current={current} direction="vertical" progressDot={customDot}>
    {items.map((item) => {
      return (
        <CustomStep key={item.title} title={item.title} description={item.description} />
      )
    })}
  </Steps>
  )
}

export default StepComponent

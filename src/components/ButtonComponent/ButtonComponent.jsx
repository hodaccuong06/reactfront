import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';

const CustomButton = styled(Button)`
  && {
    transition: background-color 0.3s, color 0.3s; /* Chuyển động (transition) cho hiệu ứng hover */
    &:hover {
      background-color: rgba(255,169,0,0.5); /* Màu nền khi hover */
      color: white; /* Màu chữ khi hover */
    }
  }
`;

const ButtonComponent = ({ size, styleButton, styleTextButton, textbutton, disabled, ...rests }) => {
  return (
    <CustomButton
      style={{
        ...styleButton,
        background: disabled ? '#ccc' : styleButton.background,
      }}
      size={size}
      {...rests}
    >
      <span style={styleTextButton}>{textbutton}</span>
    </CustomButton>
  );
};

export default ButtonComponent;

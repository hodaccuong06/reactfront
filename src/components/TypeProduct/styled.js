import styled from "styled-components";

export const WrapperType = styled.div`
  padding: 10px 10px;
  cursor: pointer;
  border: 1px outset #000000 ;
  background-color: #FFFFFF;
  box-shadow: 2px 2px;

  &:hover {
    background-color: var(--primary-color);
    color: #fff;
    border-radius: 4px;
  }
`
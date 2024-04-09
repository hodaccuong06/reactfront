import styled from 'styled-components';

export const WrapperContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WrapperListOrder = styled.div`
  /* CSS cho danh sách đơn hàng */
`;

export const WrapperItemOrder = styled.div`
  margin-bottom: 30px;
  width: 100%;
  background-color: rgba(240, 255, 255, 1);
  position: relative;
  margin-top: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.75);
  cursor: alias;
  transition: transform 0.95s ease;

  &:hover {
    transform: scale(1.2); /* Scale lớn hơn khi hover */
  }
`;

export const WrapperHeaderItem = styled.div`
  /* CSS cho phần tiêu đề của mỗi mục đơn hàng */
`;

export const WrapperFooterItem = styled.div`
  /* CSS cho phần chân trang của mỗi mục đơn hàng */
`;

export const WrapperStatus = styled.div`
  /* CSS cho trạng thái đơn hàng */
`;

export const ButtonContainer = styled.div`
  /* CSS cho container của các nút */
`;

export const Button = styled.button`
  /* CSS cho nút */
`;

export const ActionButton = styled.button`
  /* CSS cho nút hành động */
`;


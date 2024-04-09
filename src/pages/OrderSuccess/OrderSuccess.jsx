import React from 'react';
import { WrapperContainer, WrapperInfo, Lable, WrapperItemOrder, WrapperItemOrderInfo, WrapperValue } from './style';
import Loading from '../../components/LoadingComponent/Loading';
import { useLocation } from 'react-router-dom';
import { orderContant } from '../../contant';
import { convertPrice } from '../../utils';

const OrderSuccess = () => {
  const location = useLocation();
  const { state } = location;

  return (
    <div style={{ background: '#f5f5fa', width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Loading isPending={false}>
        <WrapperContainer>
          <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Order Placed Successfully</h2>
          <WrapperInfo>
            <Lable>Payment Method:</Lable>
            <WrapperValue>{orderContant.payment[state?.payment]}</WrapperValue>
          </WrapperInfo>
          <WrapperItemOrderInfo>
            {state.orders?.map((order, index) => (
              <WrapperItemOrder key={index}>
                <img src={order.image} alt={order.name} style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '20px' }} />
                <div>
                  <h3>{order.name}</h3>
                  <p style={{ marginBottom: '10px' }}>Price: {convertPrice(order.price)}</p>
                  <p>Quantity: {order.amount}</p>
                </div>
              </WrapperItemOrder>
            ))}
          </WrapperItemOrderInfo>
          <div style={{ textAlign: 'right', marginTop: '30px' }}>
            <h3>Total: {convertPrice(state?.totalPriceMemo)}</h3>
          </div>
        </WrapperContainer>
      </Loading>
    </div>
  );
};

export default OrderSuccess;

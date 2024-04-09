import React from 'react';
import { WrapperAllPrice, WrapperContentInfo, WrapperHeaderUser, WrapperInfoUser, WrapperItem, WrapperItemLabel, WrapperLabel, WrapperNameProduct, WrapperProduct, WrapperStyleContent } from './style';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import * as OrderService from '../../services/OrderService';
import { useQuery } from '@tanstack/react-query';
import { orderContant } from '../../contant';
import { convertPrice } from '../../utils';
import { useMemo } from 'react';
import Loading from '../../components/LoadingComponent/Loading';
import logo from '../../assets/images/logo.png';

const DetailsOrderPage = () => {
  const params = useParams();
  const location = useLocation();
  const { state } = location;
  const { id } = params;

  const fetchDetailsOrder = async () => {
    const res = await OrderService.getDetailsOrder(id, state?.token);
    return res.data;
  };

  const queryOrder = useQuery({ queryKey: ['orders-details'], queryFn: fetchDetailsOrder }, {
    enabled: id
  });
  const { isLoading , data } = queryOrder;

  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, cur) => {
      return total + (cur.price * cur.amount);
    }, 0);
    return result;
  }, [data]);

  return (
    <Loading isPending={isLoading}>
      <div style={{ width: '100%', minHeight: '100vh', background: '#f5f5fa', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '1270px', width: '100%', padding: '20px' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Order Details</h1>
          <div style={{marginBottom: '30px', marginRight:'-0px', position:'relative'}}>
            <div style={{ flex: '1', marginLeft: '20px' }}>
              <h2>Product List</h2>
              {data?.orderItems?.map((order) => (
                <div key={order._id} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px',  }}>
                  <img src={order.image} alt="Product" style={{ width: '70px', height: '70px', objectFit: 'cover', marginRight: '10px', border: '1px solid #ccc' }} />
                  <div style={{ flex: '1' }}>
                    <p style={{ marginBottom: '5px', fontSize: '18px', fontWeight: 'bold' }}>{order.name}</p>
                    <p style={{ marginBottom: '5px' }}>Price: {convertPrice(order.price)}</p>
                    <p style={{ marginBottom: '5px' }}>Quantity: {order.amount}</p>
                    <p style={{ marginBottom: '5px' }}>Discount: {order.discount ? `${order.discount}%` : '0%'}</p>
                     <p style={{ marginBottom: '5px' }}>Shipping Fee: {data?.shippingPrice}</p>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: '1px solid #ccc', paddingTop: '10px' , width:'890px'}}>
              </div>
            </div>
            <div style={{ flex: '1', marginRight: '20px' , position:'absolute', top:'10px', right:'0px'}}>
              <div style={{ border: '1px solid', width: '300px', paddingLeft: '10px', backgroundColor: 'rgba(192,192,192,0.5)' }}>
                <h2>Recipient Information</h2>
                <div style={{ marginBottom: '20px' }}>
                  <p><strong>Full Name:</strong> {data?.shippingAddress?.fullName}</p>
                  <p><strong>Address:</strong> {`${data?.shippingAddress?.address}, ${data?.shippingAddress?.city}`}</p>
                  <p><strong>Phone:</strong> {data?.shippingAddress?.phone}</p>
                </div>
              </div>
              <div style={{ border: '1px solid', width: '300px', paddingLeft: '10px', backgroundColor: 'rgba(192,192,192,0.5)' }}>
                <div style={{ marginBottom: '20px' }}>
                </div>
                <h2>Payment Method: </h2>
                <div style={{ marginBottom: '20px'}}>
                  <p style={{ fontSize:'17px'}}>{orderContant.payment[data?.paymentMethod]}</p>
                  <p style={{color:'red'}}>{data?.isPaid ? 'Paid' : 'Unpaid'}</p>
                </div>
                <h3 style={{ textAlign: 'right', marginTop: '20px', fontSize:'20px', fontWeight:'50px', marginRight:'10px' }}>Total: {convertPrice(data?.totalPrice)}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default DetailsOrderPage;

import React, { useEffect, useState } from 'react';
import { Col, Pagination, Row } from 'antd';
import { useLocation } from 'react-router-dom';
import * as ProductService from '../../services/ProductService';
import { useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';
import Loading from '../../components/LoadingComponent/Loading';
import CardComponent from '../../components/CardComponent/CardComponent';
import { WrapperProducts } from './style';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import slider1 from '../../assets/images/ss1.webp'
import slider2 from '../../assets/images/ip2.png'
import slider3 from '../../assets/images/ss3.png'
const TypeProductPage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);

  const { state } = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 12,
    total: 1,
  });

  const fetchProductType = async (type, page, limit) => {
    setLoading(true);
    const res = await ProductService.getProductType(type, page, limit);
    if (res?.status === 'OK') {
      setLoading(false);
      setProducts(res?.data);
      setPagination({ ...pagination, total: res?.total - 1 });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state) {
      fetchProductType(state, pagination.page, pagination.limit);
    }
  }, [state, pagination.page, pagination.limit]);

  const onChange = (current) => {
    setPagination({ ...pagination, page: current - 1 });
  };

  return (
    <Loading isPending={loading}>
      <div style={{ width: '100%', background: '#efefef', height: 'auto' }}>
      
        <div style={{ width: '1270px', margin: '0 auto', height: '100%' }}>
          
          <Row style={{ flexWrap: 'nowrap', paddingTop: '10px', height: 'calc(100% - 20px)', marginLeft: '20%' }}>
            <Col span={20} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div >
            <SliderComponent  arrImages={[slider1, slider2, slider3]} />
          </div>
              <WrapperProducts>
                {products
                  ?.filter((pro) => {
                    if (searchDebounce === '') {
                      return pro;
                    } else if (pro?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())) {
                      return pro;
                    }
                  })
                  ?.map((product) => {
                    return (
                      <CardComponent
                        key={product._id}
                        countInStock={product.countInStock}
                        description={product.description}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        rating={product.rating}
                        type={product.type}
                        selled={product.selled}
                        discount={product.discount}
                        id={product._id}
                      />
                    );
                  })}
              </WrapperProducts>
              <Pagination defaultCurrent={1} total={pagination.total - 10} onChange={onChange} style={{ textAlign: 'center', marginTop: '10px' }} />
            </Col>
          </Row>
        </div>
      </div>
    </Loading>
  );
};

export default TypeProductPage;

import { Badge, Button, Col, Popover } from 'antd'
import React from 'react'
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccout, WrapperTextHeader, WrapperTextHeaderSmall } from './style'
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import ButttonInputSearch from '../ButtonInputSearch/ButttonInputSearch';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slides/userSlide'
import { useState } from 'react';
import Loading from '../LoadingComponent/Loading';
import { useEffect } from 'react';
import { searchProduct } from '../../redux/slides/productSlide';


const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [search,setSearch] = useState('')
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const order = useSelector((state) => state.order)
  const [loading, setLoading] = useState(false)
  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }
  const location = useNavigate();
  const isHomePage = location.path === '/';

  const handleLogout = async () => {
    navigate('/')
    setLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  }, [user?.name, user?.avatar])

  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate('profile')}>User information</WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>System management</WrapperContentPopup>
      )}
    {!user?.isAdmin && (
      <WrapperContentPopup onClick={() => handleClickNavigate(`my-order`)}>My order</WrapperContentPopup>
    )} 
      <WrapperContentPopup onClick={() => handleClickNavigate()}>Log out</WrapperContentPopup>
    </div>
  );

  const isLoggedIn = user?.id && user.access_token;

  const handleClickNavigate = (type) => {
    if(type === 'profile') {
      navigate('/profile-user')
    }else if(type === 'admin') {
      navigate('/system/admin')
    }else if(type === 'my-order' ) {
      navigate('/my-order',{ state : {
          id: user?.id,
          token : user?.access_token,

        }
      })
    }else {
      handleLogout()
    }
    setIsOpenPopup(false)
  }

  const onSearch = (e) => {
    setSearch(e.target.value)
    dispatch(searchProduct(e.target.value))
  }

  return (
    <div style={{  heiht: '100%', width: '100%', display: 'flex',background: '#ff0000', justifyContent: 'center' }}>
      <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }}>
        <Col span={5}>
          <WrapperTextHeader to='/' ><img src="https://png.pngtree.com/png-vector/20220722/ourmid/pngtree-hand-and-oil-drip-logo-design-png-image_6033330.png" width="50px" height="50px"></img></WrapperTextHeader>
          {/* <h2 to='/' style={{cursor: 'pointer'}}>HOME</h2> */}
          <WrapperTextHeader to='/' style={{marginLeft:'30px', fontSize:'15px'}}>HOME</WrapperTextHeader>
        </Col>
        {!isHiddenSearch && (
          <Col span={13}>
            <ButttonInputSearch
              size="large"
              bordered={false}
              textbutton="Search"
              placeholder="input search text"
              onChange={onSearch}
              backgroundColorButton="#5a20c1"
            />
          </Col>
        )}
        <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
          <Loading isPending ={loading}>
            <WrapperHeaderAccout>
              {userAvatar ? (
                <img src={userAvatar} alt="avatar" style={{
                  height: '30px',
                  width: '30px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }} />
              ) : (
                <UserOutlined style={{ fontSize: '30px' , color:'#000000'}} />
              )}
              {user?.access_token ? (
                <>
                  <Popover content={content} trigger="click" open={isOpenPopup}>
                    <div style={{ cursor: 'pointer',maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', color:'#000000' }} onClick={() => setIsOpenPopup((prev) => !prev)}>{userName?.length ? userName : user?.email}</div>
                  </Popover>
                </>
              ) : (
                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                  <WrapperTextHeaderSmall style={{color: '#000000'}}>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                  <div>
                    <WrapperTextHeaderSmall  style={{color: '#000000'}}>Tài khoản</WrapperTextHeaderSmall>
                    <CaretDownOutlined style={{color:'#000000'}}/>
                  </div>
                </div>
              )}
            </WrapperHeaderAccout>
          </Loading>
          {!isHiddenCart && !user?.isAdmin && !isHomePage && isLoggedIn && (
            <div onClick={() => navigate('/order')} style={{cursor: 'pointer'}}>
              <Badge count={order?.orderItems?.length} size="small">
                <ShoppingCartOutlined style={{ fontSize: '30px', color:'#000000' }} />
              </Badge>
              <WrapperTextHeaderSmall style={{color:'#000000'}}>Giỏ hàng</WrapperTextHeaderSmall>
            </div>
          )}
        </Col>
      </WrapperHeader>
    </div>
  )
}

export default HeaderComponent
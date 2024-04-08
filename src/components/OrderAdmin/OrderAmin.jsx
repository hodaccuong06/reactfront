import { Button, Form, Space } from 'antd'
import React ,{ useRef } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import Loading from '../LoadingComponent/Loading'
import ModalComponent from '../ModalComponent/ModalComponent'
import { convertPrice, getBase64 } from '../../utils'
import { useEffect } from 'react'
import * as message from '../Message/Message'
import { useQuery } from '@tanstack/react-query'
import * as OrderService from '../../services/OrderService'
import { useState } from 'react'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { orderContant } from '../../contant'
import { useMutationHooks } from '../../hooks/useMutationHook'
import LineChartComponent from './LineChart'

const OrderAdmin = () => {
  const user = useSelector((state) => state?.user)
  const [rowSelected, setRowSelected] = useState('')
  const [isPendingUpdate, setIsPendingUpdate] = useState(false)
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const searchInput = useRef(null);
  const inittial = () => ({
    name: '',
    phone: '',
    address: '',
    paided: '',
    payment: '',
    total: '',
  })
  const [stateProductDetails, setStateProductDetails] = useState(inittial())
  const mutationDeleted = useMutationHooks(
    (data) => {
      console.log('data', data);
      const { id,
        token,
        } = data
      const res = OrderService.deleteOrder(
        id,
        token)
      return res
    },
  )
  const getAllOrders = async () => {
    const res = await OrderService.getAllOrder(user?.access_token)
    console.log('res', res);
    return res
  }

  const fetchGetDetailsOrder = async (rowSelected) => {
    const res = await OrderService.getDetailsOrder(rowSelected)
    if (res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        phone: res?.data?.phone,
        address: res?.data?.address,
        paided: res?.data?.paided,
        payment: res?.data?.payment,
        total: res?.data?.total,
        // countInStock: res?.data?.countInStock,
        // discount: res?.data?.discount
      })
    }
    setIsPendingUpdate(false)
  }

  const { data: dataDeleted, isLoading : isPendingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
  const queryOrder = useQuery({ queryKey: ['orders'], queryFn: getAllOrders })

  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
        {/* <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsProduct} /> */}
      </div>
    )
  }
  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsPendingUpdate(true)
      fetchGetDetailsOrder(rowSelected)
    }
  }, [rowSelected, isOpenDrawer])

  useEffect(() => {
    if (isSuccessDelected && dataDeleted?.status === 'OK') {
      message.success()
      handleCancelDelete()
    } else if (isErrorDeleted) {
      message.error()
    }
  }, [isSuccessDelected])

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
  }

  const handleDeleteOrder = () => {
    // console.log('id', _id);
    mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
      onSettled: () => {
        queryOrder.refetch()
      }
    })
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
  
  };
  // const queryOrder = useQuery({ queryKey: ['orders'], queryFn: getAllOrder })
  const { isPending : isPendingOrders, data: orders } = queryOrder

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      ...getColumnSearchProps('date')
    },
   {
      title: 'User name',
      dataIndex: 'userName',
      ...getColumnSearchProps('userName')
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      ...getColumnSearchProps('phone')
    },
    {
      title: 'Address',
      dataIndex: 'address',
      ...getColumnSearchProps('address')
    },
    {
      title: 'Paided',
      dataIndex: 'isPaid',
      ...getColumnSearchProps('isPaid')
    },
    {
      title: 'Shipped',
      dataIndex: 'isDelivered',
      ...getColumnSearchProps('isDelivered')
    },
    {
      title: 'Payment method',
      dataIndex: 'paymentMethod',
      ...getColumnSearchProps('paymentMethod')
    },
    {
      title: 'Total price',
      dataIndex: 'totalPrice',
      sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
      ...getColumnSearchProps('totalPrice')
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction
    },
  ];
  const dataTable = orders?.data?.length && orders?.data?.map((order) => {
    console.log('usewr', order)
    let newDate = new Date(order.createdAt)
    let date = newDate.getDate();
    let month = newDate.getMonth()+1;
    let year = newDate.getFullYear()
    let DateAll = date+'/'+month+'/'+year
    console.log('DateAll', DateAll)
   console.log("newDate", newDate);
   console.log('month1', month)
   console.log('date/month/year', date+'/'+month+'/'+year)
    return { ...order,date:DateAll, key: order._id, userName: order?.shippingAddress?.fullName, phone: order?.shippingAddress?.phone, address: order?.shippingAddress?.address, paymentMethod: orderContant.payment[order?.paymentMethod],isPaid: order?.isPaid ? 'TRUE' :'FALSE',isDelivered: order?.isDelivered ? 'TRUE' : 'FALSE', totalPrice: convertPrice(order?.totalPrice)}
  })
  
  const currentDate = new Date().toLocaleDateString();
const previousDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleDateString(); // Lấy ngày của hôm qua

const calculateRevenue = () => {
  let revenueToday = 0;
  let revenueYesterday = 0;

  orders?.data?.forEach(order => {
    const orderDate = new Date(order.createdAt).toLocaleDateString();
    if (orderDate === currentDate) {
      revenueToday += order.totalPrice;
   
    }
    if (orderDate === previousDate) {
      revenueYesterday += order.totalPrice;
    }
  });

  return {
    revenueToday,
    revenueYesterday
  };
};
const { revenueToday, revenueYesterday } = calculateRevenue();
  return (
    <div>
      <WrapperHeader>Order management</WrapperHeader>
      <div style={{position:'relative'}}>
      {/* <div style={{height: 200, width:200, display:'inline-block'}}>
        <PieChartComponent data={orders?.data} />
      </div> */}

      <div style={{height: 300, width:400,display:'inline-block'}}>
        <LineChartComponent data={orders?.data}/>
      </div>

     <div style={{ display: 'inline-block', marginLeft: '40px', position: 'absolute', top: '0px' }}>
  <table style={{ borderCollapse: 'collapse', border: '1px solid black' }}>
    <thead>
      <tr>
        <th style={{ border: '1px solid black', padding: '8px' }}>{previousDate}</th>
        <th style={{ border: '1px solid black', padding: '8px' }}>{currentDate}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
          <td style={{ border: '1px solid black', padding: '8px' }}>{revenueYesterday.toLocaleString('vi-VN')}</td>
          <td style={{ border: '1px solid black', padding: '8px' }}>{revenueToday.toLocaleString('vi-VN')}</td>
      </tr>
    </tbody>
  </table>
  </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <TableComponent  columns={columns} isPending ={isPendingOrders} data={dataTable} onRow={(record, rowIndex) => {
          return {
              onClick: event => {
                setRowSelected(record._id)
              }
          };
        }} />
      </div>
      <ModalComponent title="Delete Order" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteOrder}>
      <Loading isPending={isPendingDeleted}>
          <div>Are you sure you want to delete this order?</div>
             </Loading>
      </ModalComponent>
    </div>
  )
} 
export default OrderAdmin
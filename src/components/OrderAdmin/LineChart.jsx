import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { convertDataChart1 } from '../../utils';

const LineChartComponent = (props) => {
    let data = convertDataChart1(props.data, 'createdAt');
  //   console.log('ccdata', data)
  //   function convert(){
  //     let arr = []
  //     for(let i = 0; i < data.length; i++){
  //   console.log('data1', data[i])
  //       let getpv = data[i].pv
  //       let convertPrice = getpv.toLocaleString('vi-VN')
  //       console.log('value', convertPrice)
  //       let obj = {
  //         name: data[i].name,
  //         pv: convertPrice
  //       }
  //       arr.push(obj)
  //     }
  //     return arr
  //   }
  //   let newData = convert()
  //  console.log('newData',newData)
    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
          return (
              <div className="custom-tooltip">
                  <p className="label">Doanh Thu của ngày {`${label} : ${payload[0].value.toLocaleString('vi-VN')} VNĐ`}</p>                  
              </div>
          );
      }
      return null;
  };
  
  return (
    <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="Doanh_Thu" barSize={20} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
  );
};

export default LineChartComponent;
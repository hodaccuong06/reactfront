import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from './style'
import { StarFilled } from '@ant-design/icons'
import logo from '../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'
import { convertPrice } from '../../utils'

const CardComponent = (props) => {
    const { countInStock, description, image, name, price, rating, type, discount, selled, id } = props
    const navigate = useNavigate()
    const handleDetailsProduct = (id) => {
        navigate(`/product-details/${id}`)
    }
    return (
        
        <WrapperCardStyle
            hoverable
            headStyle={{ width: '200px', height: '200px' }}
            style={{ width: 200 , position:'relative'}}
            bodyStyle={{ padding: '10px' }}
            // cover1={<img src="https://cdn.tgdd.vn/2023/12/campaign/Label-Desk-270x106-1.png"/>}
            cover={<img alt="example" src={image} style={{marginTop:'50px'}}/>}
            onClick={() =>  handleDetailsProduct(id)}
        >
            <div>
            <img
                src="https://cdn.tgdd.vn/2023/12/campaign/Label-Desk-270x106-1.png"
                style={{
                    width: '100%',
                    height: '50px',
                    position: 'absolute',
                    top: -1,
                    left: -1,
                    borderTopLeftRadius: '3px'
                }}
            />
            </div>
            <div >
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperReportText>
                <span style={{ marginRight: '4px' }}>
                    <span>{rating} </span> <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
                </span>
                <WrapperStyleTextSell> | Selled {selled || 0}+</WrapperStyleTextSell>
            </WrapperReportText>
            <WrapperPriceText>
                <span style={{ marginRight: '8px' }}>{convertPrice(price)}</span>
                <WrapperDiscountText>
                     -{discount}%
                </WrapperDiscountText>
            </WrapperPriceText>
            </div>
            
        </WrapperCardStyle>
    )
}

export default CardComponent
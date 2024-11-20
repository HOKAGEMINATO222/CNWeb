import { Col, Row, Image } from 'antd'
import React from 'react'
import imageProduct from '../../assets/images/imgsmall.webp'
import imageProductSmall from '../../assets/images/imgsmall1.webp'
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQuantityProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextSell } from './style'
import { PlusOutlined, StarFilled, MinusOutlined } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'

const ProductDetailComponent = () => {
    
    const [quantity, setQuantity] = React.useState(3); // Giá trị mặc định

    const handleIncrease = () => {
        setQuantity(prev => prev + 1); // Tăng số lượng
    };

    const handleDecrease = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1)); // Giảm số lượng nhưng không nhỏ hơn 1
    };

    const handleChange = (value) => {
        if (value > 0) {
            setQuantity(value); // Cập nhật số lượng khi người dùng thay đổi input
        }
    };

    return (
        <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
            <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
                <Image src={imageProduct} alt="image product" preview={false} />
                <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>

                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                    </WrapperStyleColImage>

                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                    </WrapperStyleColImage>

                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                    </WrapperStyleColImage>

                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                    </WrapperStyleColImage>

                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                    </WrapperStyleColImage>

                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                    </WrapperStyleColImage>

                </Row>
            </Col>
            <Col span={14} style={{ paddingLeft: '10px' }}>
                <WrapperStyleNameProduct>GIÀY ĐÁ BÓNG SÂN CỎ NHÂN TẠO TUẤN ANH KAMITO TA11-AS</WrapperStyleNameProduct>
                <div>
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
                    <WrapperStyleTextSell> | Đã bán 1000+ </WrapperStyleTextSell>
                </div>
                <WrapperPriceProduct>
                    <WrapperPriceTextProduct>1.000.000đ</WrapperPriceTextProduct>
                </WrapperPriceProduct>
                <WrapperAddressProduct>
                    <span>Giao đến </span>
                    <span className='address'>4, 99/158/36, Định Công, Hà Nội</span> -
                    <span className='change-address'> Đổi địa chỉ</span>
                </WrapperAddressProduct>
                <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                    <div style={{ marginBottom: '10px' }}>Số lượng</div>
                    <WrapperQuantityProduct>
                        <button style={{ border: 'none', background: 'transparent' }} onClick={handleDecrease} >
                            <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
                        </button>

                        <WrapperInputNumber defaultValue={quantity} onChange={handleChange} size="small" />

                        <button style={{ border: 'none', background: 'transparent' }} onClick={handleIncrease}>
                            <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
                        </button>
                    </WrapperQuantityProduct>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px ' }}>
                    <ButtonComponent
                        border={false}
                        size={40}
                        styleButton={{
                            backgroundColor: 'rgb(255, 57, 69)',
                            height: '48px',
                            width: '220px',
                            border: 'none',
                            boderRadius: '4px'
                        }}
                        textButton={'Mua ngay'}
                        styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: 700 }} >
                    </ButtonComponent>
                    <ButtonComponent
                        size={40}
                        styleButton={{
                            backgroundColor: '#fff',
                            height: '48px',
                            width: '220px',
                            border: '1px solid rgb(13, 92, 182)',
                            boderRadius: '4px'
                        }}
                        textButton={'Thêm vào giỏ hàng'}
                        styleTextButton={{ color: 'rgb(13, 92, 182', fontSize: '15px' }} >
                    </ButtonComponent>
                </div>
            </Col>
        </Row>
    )
}

export default ProductDetailComponent

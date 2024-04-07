import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import './Order.scss';
// import '../style.scss';

const Order = (props) => {
    
    return ( 
        <>
            <div className='background'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-5'>
                            <NavLink to='/mgr/order/show' className="nav-link">
                                <div className="content-left form form-mgr-order" >
                                    <div className='header-form'>
                                        <h4 >
                                            Xem đơn hàng
                                        </h4>
                                    </div>
                                    <div className='body-form'>
                                        <p>Các đơn hàng của cửa hàng</p>
                                    </div>
                                    <div className='form-img-container'>
                                        <div className='form-img'>
                                            <img src='https://booster.io/wp-content/uploads/custom-order-numbers-e1438361586475.png' ></img>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        <div className='col-5'>
                            <NavLink to='/mgr/order/create' className="nav-link">
                                <div className="content-right  form form-create-order">
                                    <div className='header-form'>
                                        <h4>
                                            Tạo đơn hàng
                                        </h4>
                                    </div>
                                    <div className='body-form'>
                                        <p>Tạo đơn hàng cho khách hàng. Những đơn hàng chất lượng nhất</p>
                                    </div>
                                    <div className='form-img-container'>
                                        <div className='form-img'>
                                            <img src='https://booster.io/wp-content/uploads/custom-order-numbers-e1438361586475.png' ></img>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>        
        
        </>
    )
}

export default Order;
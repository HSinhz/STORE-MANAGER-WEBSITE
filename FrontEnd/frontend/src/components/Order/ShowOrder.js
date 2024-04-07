import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';  
import '../style.scss';
import './ShowOrder.scss';
import moment from 'moment';
import Accordion from 'react-bootstrap/Accordion';
import ReactPaginate from 'react-paginate';
import useCheckLogin from '../../utils/checkLogin';
import { getOrderWithPagination, getCustomerById, getProductById, getStatusOrderById, getMethodPaymentById } from '../../services/managerService';
import { toast } from 'react-toastify';
import { values } from 'lodash';

const ShowOrder = () => {
    useCheckLogin();
    const [listOrder, setListOrder] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);
    const [customerData, setCustomerData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [statusOrder, setStatusOrder] = useState([]);
    const [methodPayment, setMethodPayment] = useState([]);
    useEffect(() => {
        const fetchDataOrder = async () => {
            try {
                const response = await getOrderWithPagination(currentPage, currentLimit);
                if (response && response.Success === true) {
                    setTotalPages(response.totalPages);
                    setListOrder(response.allOrder);
                } else {
                    toast.error(response.Mess);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }
        fetchDataOrder();
    }, [currentPage]);

    useEffect(() => {
        const fetchDataForCustomers = async () => {
            const customerDataPromises = listOrder.map(async (order) => {
                try {
                    const response = await getCustomerById(order.CustomerId);
                    if (response && response.Success === true) {
                        return response.Data;
                    } else {
                        toast.error(response.Mess);
                        return null;
                    }
                } catch (error) {
                    console.error('Error fetching customer data:', error);
                    toast.error("Có lỗi vui lòng thử lại sau");
                    return null;
                }
            });

            const resolvedCustomerData = await Promise.all(customerDataPromises);
            setCustomerData(resolvedCustomerData.filter(data => data !== null));
        };
        fetchDataForCustomers();
    }, [listOrder]);
    
    useEffect(() => {
        const fetchDataProduct = async () => {
            const productDataPromises = listOrder.map(async (order) => {
                try {
                    const response = await getProductById(order.ProductId);
                    if (response && response.Success === true) {
                        return response.Product;
                    } else {
                        toast.error(response.Mess);
                        return null;
                    }
                } catch (error) {
                    console.error('Error fetching customer data:', error);
                    toast.error("Có lỗi vui lòng thử lại sau");
                    return null;
                }
            });

            const resolvedProductData = await Promise.all(productDataPromises);
            setProductData(resolvedProductData.filter(data => data !== null));
        }
        fetchDataProduct();
    }, [listOrder])

    useEffect(() => {
        const fetchStatusOrder = async () => {
            const statusOrderPromises = listOrder.map(async (order) => {
                try {
                    const response = await getStatusOrderById(order.Status);
                    if (response && response.Success === true) {
                        return response.allStatus;
                    } else {
                        toast.error(response.Mess);
                        return null;
                    }
                } catch (error) {
                    console.error('Error fetching customer data:', error);
                    toast.error("Có lỗi vui lòng thử lại sau");
                    return null;
                }
            });

            const resolvedOrderStatus = await Promise.all(statusOrderPromises);
            setStatusOrder(resolvedOrderStatus.filter(data => data !== null));
        }
        fetchStatusOrder();
    }, [listOrder])

    useEffect(() => {
        const fetchMethodPayment = async () => {
            const methodPaymentPromises = listOrder.map(async (order) => {
                try {
                    const response = await getMethodPaymentById(order.PaymentMethod);
                    if (response && response.Success === true) {
                        return response.Method;
                    } else {
                        toast.error(response.Mess);
                        return null;
                    }
                } catch (error) {
                    console.error('Error fetching customer data:', error);
                    toast.error("Có lỗi vui lòng thử lại sau");
                    return null;
                }
            });

            const resolvedMethodPayment = await Promise.all(methodPaymentPromises);
            setMethodPayment(resolvedMethodPayment.filter(data => data !== null));
        }
        fetchMethodPayment();
    }, [listOrder])
    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };
    
    return (
        <>
            <div className='backgroud'>
                <div className='container'>
                    <h3 className='mt-3 mb-3'>Danh sách đơn hàng</h3>
                    <Accordion defaultActiveKey="0">
                        { listOrder && listOrder.length > 0 ? 
                            listOrder.map((item, index) => {
                                const localCreatedAt = moment(item.createdAt).local().format('DD-MM-YYYY | hh:mm A');
                                const customer = customerData[index];
                                const product = productData[index];
                                const status = statusOrder[index];
                                const method = methodPayment[index];
                                return (
                                    <Accordion.Item eventKey={index.toString()} key={index}>
                                        <Accordion.Header>
                                            <div className="d-flex align-items-center header-background">
                                                <img className='img-product mx-4' src={product ? product.ImageUrl : 'Loading...'} alt='' />
                                                <div>
                                                    <p className='fw-bold fs-5 mb-1'>Mã hóa đơn: {item._id}</p>
                                                    <p className='fw-bold fw-normal mb-1'>Bán mô hình xe</p>
                                                    <p className='fw-normal mb-1'>{localCreatedAt}</p>
                                                </div>
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div>
                                                <div>
                                                    <div className="row mb-3">
                                                        <div className="col ">Khách hàng: <span className='fw-bold fw-normal'>{customer ? customer.Name : 'Loading...'}</span> </div>
                                                        <div className="col ">Số Điện thoại: <span className='fw-bold fw-normal'>{customer ? customer.Phone : 'Loading...'}</span></div>
                                                        <div className="col">Địa chỉ nhận hàng: <span className='fw-bold fw-normal'>{customer ? customer.Address : 'Loading...'}</span></div>
                                                    </div>
                                                    <div className='mt-3'>Sản phẩm: <span className='fw-bold fw-normal '>{product ? product.Name : 'Loading...'}</span></div>
                                                    <div className='border border-dark mt-3'></div>
                                                    <div className='row'>
                                                        <div className='col mt-3 mb-3'>Tổng cống: <span className='fw-bold fw-normal '>{item.TotalAmount} VNĐ</span></div>
                                                        <div className='col mt-3 mb-3'>PPThanh toán: <span className='fw-bold fw-normal '>{method && method.Name}</span></div>
                                                        <div className='col mt-3 mb-3'>Trạng thái đơn: 
                                                             <span 
                                                                className={status && 
                                                                    status.idstatus === 4 ? 'red fw-bold fw-normal' : (status && status.idstatus === 3) ? 'text-success fw-bold fw-normal' : 'text-primary fw-bold fw-normal'}> 
                                                                 {status ? status.Name : 'Loading...'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className='border border-dark '></div>
                                                    <div className='mt-4'>

                                                    </div>
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                )
                            }) : 
                            <span>Chưa có đơn hàng nào</span>
                        }
                        
                    </Accordion>
                    <div className='order-footer'>
                        <ReactPaginate
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={totalPages}
                            previousLabel="< previous"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShowOrder;

import '../../style.scss';
import './Employee.scss';
import { FaAddressCard, FaPhoneAlt, FaHome, FaBoxOpen, FaRegular, FaCalendarCheck, FaExclamationCircle, FaTimesCircle, FaUserTimes, FaBusinessTime, FaRegCalendarTimes, FaUserClock, FaDollyFlatbed, FaFunnelDollar, FaSlack, FaSearchDollar, FaCommentsDollar, FaDollarSign, FaEnvelope} from 'react-icons/fa'; // Ví dụ: sử dụng biểu tượng từ Font Awesome
import { AiOutlineHome, AiFillStar } from 'react-icons/ai'; // Ví dụ: sử dụng biểu tượng từ Ant Design
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useCheckLogin from '../../../utils/checkLogin';
import {getEmployeeWithId} from '../../../services/managerService';
import { useEffect, useState } from 'react';
import moment from 'moment';
import TotalTime from '../../../utils/totalTime'
const DetailEmplyee = (props) => {
    useCheckLogin();
    const empolyeeID = useParams();
    const [isDataEmployee, setIsDataEmployee] = useState({});
    
    useEffect (() => {
        const fetchDataDetailEmployee = async (empolyeeID) => {
            try {
                let response = await getEmployeeWithId(empolyeeID.employeeId);
                if( response && response.Success === true){
                    setIsDataEmployee(response.Info);
                } 
            } catch (error) {
                console.log(error);
            }
        }
        fetchDataDetailEmployee(empolyeeID)
    }, [])

    return (
        <>
        {
            isDataEmployee ? <div className="background">
            <div className="container ">
                <div className="row justify-content-center" >
                    <div className="p-3 col-md-4 mr-3 form-infor-employee">
                        <div className="row form-employee w-100 d-flex justify-content-center align-items-center">
                            <div className='col-7 text-center '>
                                <img src='https://booster.io/wp-content/uploads/custom-order-numbers-e1438361586475.png' className='img-employee' />
                            </div>
                            <div className='col-5 text-center fw-bold'>
                                {isDataEmployee.Name}
                            </div>
                        </div>
                        <div className='border-radius-10 p-4'>
                            <div className='m-3'>
                                <p> <span className='p-1'><FaEnvelope/></span>  {isDataEmployee.Email}</p>
                                <p><span className='p-1'><FaPhoneAlt/></span>  {isDataEmployee.Phone}</p>
                                <p><span className='p-1'><FaAddressCard/></span>  {isDataEmployee.Address}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="row h-100 w-100">
                            <div class="col-12 border-radius-10 mb-2 w-90 pt-2 pb-2 d-flex flex-column  align-items-center">
                                <div className='fw-bold text-center'>
                                    Tổng đơn hàng
                                </div>
                                <div  className="mt-3">
                                    <FaBoxOpen className='style-fa-icon' />
                                </div>
                                <div className='m-3 text-blue'>
                                    {isDataEmployee.TotalOrder}
                                </div>
                            </div>
                            <div class="col-12 border-radius-10 mt-2 w-90 pt-2 pb-2 d-flex flex-column  align-items-center">
                                <div className='fw-bold text-center'>
                                    Đơn bị hủy
                                </div>                                          
                                <div className="mt-3 ">
                                    <FaExclamationCircle className='style-fa-icon' />
                                </div>
                                <div className='m-3 text-blue'>
                                    {isDataEmployee.OrderCancel}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="row h-100 w-100">
                            <div class="col-12 border-radius-10 mb-2 w-100 pt-2 pb-2 d-flex flex-column  align-items-center">
                                <div className='fw-bold text-center'>
                                    Tổng doanh thu
                                </div>
                                <div className='mt-3'>
                                    <FaDollarSign className='style-fa-icon'/>
                                </div>
                                <div className='m-3 text-blue'>
                                    1.500.000 VNĐ
                                </div>
                            </div>
                            <div class="col-12 border-radius-10 mt-2 mr-2 w-100 pt-2 pb-2 d-flex flex-column align-items-center">
                                <div className='fw-bold text-center'>
                                    Tổng giờ làm việc
                                </div>
                                <div className="mt-3">
                                    <FaUserClock className='style-fa-icon'/>
                                </div>
                                <div className='m-3 text-blue'>
                                    {TotalTime(isDataEmployee.OnlineTotal)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        :
        <>Không có dữ liệu</>
        }
        </>
    )
}

export default DetailEmplyee;

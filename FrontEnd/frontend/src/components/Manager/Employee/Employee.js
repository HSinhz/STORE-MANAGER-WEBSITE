import './Employee.scss';
import { useEffect , useState } from 'react';
import { useHistory } from 'react-router-dom';
import useCheckLogin from '../../../utils/checkLogin';
import {showEmployee, deleteEmloyee} from '../../../services/managerService';
import ReactPaginate from 'react-paginate';
import ModalUser from './CRUDEmployee/ModalUser';
import ModalDeleteEmployee from './CRUDEmployee/ModalDeleteEmployee';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const Employee = () => {
    const history = useHistory();
    const [listEmployee, setListemployee] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimt, setCurrentLimit] = useState(2);
    const [totalPages, setTotalPages] = useState(0);
    // modal create/update
    const [isShowModalEmploy, setIsShowModalEmploy] = useState(false);
    const [dataModalEmploy, setDataModalEmloy] = useState({});
    // modal delete
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [isDataEmployee, setIsDataEmployee] = useState({});
    const [actionModalEmployee, setActionModalEmployee] = useState("");
    useCheckLogin();
    useEffect(() => {
        fetchDataEmployee();
    }, [currentPage]);

    const fetchDataEmployee = async () => {
        let response = await showEmployee(  currentPage, currentLimt);

        if( response && response.Success === true){
            // setListemployee(response.Data);
            setTotalPages(response.totalPages);
            setListemployee(response.allEmployee);
            console.log("Check Response Employee Page  listEmployee>>>>> ", listEmployee)
            
        }
    }
    
    // Phân trang
    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
        await fetchDataEmployee();
    };

    const handleCreateEmployee = () => {
        setIsShowModalEmploy(true);
        setActionModalEmployee("CREATE")

    }

    const handleCloseModalEmploy = async () => {
        setIsShowModalEmploy(false);
        setDataModalEmloy({});
        await fetchDataEmployee();
    }

    const handleOpenModalDelete = (dataemlpoyee) => {
        setIsShowModalDelete(true);
        setIsDataEmployee(dataemlpoyee)
    }

    const handleCloseModalDelete = () => {
        setIsShowModalDelete(false);
        setIsDataEmployee({});
    }

    const handleDeleteEmployee = async () => {
        let response = await deleteEmloyee( isDataEmployee._id);
        console.log("Check response delete user: ", response);
        if( response && response.Success === true ){
            toast.success(response.Mess)
            await fetchDataEmployee();
            setIsShowModalDelete(false);
        } else {
            toast.error('Xóa nhân viên thất bại')
        }
    }

    const handleEditEmloyee = async (dataEmployee) => {
        setDataModalEmloy(dataEmployee);
        setIsShowModalEmploy(true)
        setActionModalEmployee("UPDATE")
    }

    return (  
        <> 
            <div className='background'>
                <div className='container table-employee'>
                    <h1 className='title-header'>Danh sách nhân viên</h1>
                    <div className='mt-4 head-list'> 
                        <input className='input-search' type="text"  placeholder='Tìm theo tên nhân viên' id='search-emp' name='info-search'/>      
                        <button  type="submit"  className="btn btn-primary" onClick={() => handleCreateEmployee()} >Thêm nhân viên</button>
                    </div>
                    <table class="table mt-4">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Mã nhân viên</th>
                                <th scope="col">Tên nhân viên</th>
                                <th scope="col">Số điện thoại</th>
                                <th scope="col">Địa chỉ</th>
                                <th scope="col">Chú ý</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            { listEmployee && listEmployee.length > 0  ? 
                                <>
                                    {listEmployee.map((item , index) => {
                                        return (
                                            <tr key={`row-${index}`}> 
                                                <th> { (currentPage - 1) *currentLimt + index + 1}</th>
                                                <td> {item._id} </td>
                                                <td> {item.Name} </td>
                                                <td> {item.Phone} </td>
                                                <td> {item.Address} </td>
                                                <td> {item.Description} </td>
                                                <td>
                                                    <div className='form-button'>
                                                        <div className=''>
                                                            <button 
                                                                className='btn btn-success mx-3'
                                                                onClick={() => handleEditEmloyee(item)}
                                                            >Cập nhật</button>
                                                        </div>
                                                        <div>
                                                            <button className='btn btn-danger' onClick={() => handleOpenModalDelete(item)}>Xóa nhân viên</button>
                                                        </div>
                                                        <div>
                                                            <NavLink to={`/mgr/employee/${item._id}`} className='nav-link'>Chi tiết</NavLink>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </> :
                                <>
                                    <span >Chưa có nhân viên làm việc ở cửa hàng</span> 
                                </>
                            }
                        </tbody>
                    </table>
                    { totalPages > 0 && 
                    <div className='employee-footer'>
                        
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
                    }
                </div>
            </div>
            
            <ModalUser
                onHide={handleCloseModalEmploy}
                show = {isShowModalEmploy}
                action = {actionModalEmployee}
                dataModalEmploy = {dataModalEmploy}
            />
            <ModalDeleteEmployee 
                title = {"Xác nhận xóa nhân viên"}
                body = {"Bạn có chắc muốn xóa nhân viên : "}
                onHide = {handleCloseModalDelete}
                show = {isShowModalDelete}
                confirmDeleteEmloyee = {handleDeleteEmployee}
                isDataEmployee = {isDataEmployee}
            />
        </> 
    )
}

export default Employee;

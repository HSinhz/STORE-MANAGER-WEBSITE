import {Modal} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import './ModalUser.scss'
import _ from 'lodash';
import { toast } from 'react-toastify';
import { createEmployee, updateEmployee } from '../../../../services/managerService'

const ModalUser = (props) => {

    const {action, dataModalEmploy} = props;

    // State Hóa
    const defaultEmployeeData = {
        Email: '',
        Name: '',
        Gender: '',
        Phone: '',
        Address:'',
        Description: '',
    }

    const validInputsDefault = {
        Email: true,
        Name: true,
        Gender: true,
        Phone: true,
        Address:true,
        Description: true,
    }
    const [employeeData, setEmployeeData] = useState(defaultEmployeeData);
    const [validInputs, setValidInput] = useState(validInputsDefault);

    const handleOnchangeInput = (value, name) => {
        let _employeeData = _.cloneDeep(employeeData);
        _employeeData[name] = value;
        setEmployeeData(_employeeData);
    }

    const validateEmployeeInput = () => {
        setValidInput(validInputsDefault);
        let arr = ['Email', 'Name' , 'Phone' , 'Address'];
        let check = true;
        for( let i = 0 ; i < arr.length; i++){
            if(!employeeData[arr[i]]){
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[arr[i]] = false;
                setValidInput({_validInputs } );
                toast.error(`${arr[i]} không được bỏ trống`);
                check = false;
                break;
            }
        }
        return check;
    }

    const handleConfirmEmployee = async () => {
        let check = validateEmployeeInput();
        if( check === true ){
            console.log("Employee Data: ",employeeData.Email, employeeData.Name, employeeData.Phone, employeeData.Address, employeeData.Description);
            let response = await createEmployee(employeeData.Email, employeeData.Name, employeeData.Phone, employeeData.Address, employeeData.Description);
            console.log('>>> Check response Create Employee: ', response.data.Success);
            if( response.data.Success === true){
                toast.success(response.data.MES)
                props.onHide();
                setEmployeeData(defaultEmployeeData);
            } else {
                toast.error(response.data.MES)
            }
        }
    }

    const handleUpdateEmployee = async () => {
        let check = validateEmployeeInput();
        if( check === true ){
            let response = await updateEmployee( dataModalEmploy._id ,employeeData.Name, employeeData.Phone, employeeData.Address, employeeData.Description);
            if( response ){
                toast.success(response.Mess);
                console.log('>>> Check response Create Employee: ', response);
                props.onHide();
                setEmployeeData(defaultEmployeeData);
            } else {
                toast.error(response.Mess);
            }
        }
    }

    const handleCloseModalEmploy = () => {
        props.onHide();
        setEmployeeData(defaultEmployeeData);
        setValidInput(validInputsDefault)
    }
    useEffect(() => {
        if( action !== "CREATE"){
            setEmployeeData(dataModalEmploy );
        }
    }, [dataModalEmploy])

    return (
        <>
            <Modal size="lg" show={props.show} className='modal-user' onHide={() => handleCloseModalEmploy()}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span>{props.action === 'CREATE' ? "Thêm mới nhân viên" : "Chỉnh sửa nhân viên"}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className='content-body row'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Email <span className='red'>(*)</span> :</label>
                            <input className={validInputs.Email ? 'form-control' : 'form-control is-invalid'} type='email' required value={employeeData.Email}
                                onChange={(event) => handleOnchangeInput( event.target.value, "Email" )}
                                disabled={action === 'CREATE' ? false : true}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Tên nhân viên <span className='red'>(*)</span> :</label>
                            <input className={validInputs.Name ? 'form-control' : 'form-control is-invalid'} type='text' required value={employeeData.Name}
                                onChange={(event) => handleOnchangeInput( event.target.value, "Name" )}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Số điện thoại <span className='red'>(*)</span> :</label>
                            <input className={validInputs.Phone ? 'form-control' : 'form-control is-invalid'} type='text' required value={employeeData.Phone}
                                onChange={(event) => handleOnchangeInput( event.target.value, "Phone" )}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Giới tính <span className='red'>(*)</span> :</label>
                            <select 
                                className={validInputs.Gender ? 'form-select' : 'form-select is-invalid'} 
                                onChange={(event) => handleOnchangeInput( event.target.value, "Gender" )}
                            > 
                                <option value={'1'}>Nam</option>
                                <option value={'2'}>Nữ</option>
                                <option value={'3'}>Khác</option>
                            </select>
                        </div>
                        <div className='col-12 col-sm-12 form-group'>
                            <label>Địa chỉ <span className='red'>(*)</span> :</label>
                            <input className={validInputs.Address ? 'form-control' : 'form-control is-invalid'} type='text' required value={employeeData.Address}
                                onChange={(event) => handleOnchangeInput( event.target.value, "Address" )}
                            />
                        </div>
                        <div className='col-12 col-sm-12 form-group'>
                            <label>Chú ý </label>
                            <input className='form-control' type='text'  value={employeeData.Description}
                                onChange={(event) => handleOnchangeInput( event.target.value, "Description" )}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' 
                        onClick={ action === "CREATE" ? () => handleConfirmEmployee() : () => handleUpdateEmployee()  }> 
                        {action === "CREATE" ? 'Lưu' : 'Cập nhật'} 
                        
                    </Button>
                    <Button variant='secondary' onClick={() => handleCloseModalEmploy()}>Hủy</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalUser;
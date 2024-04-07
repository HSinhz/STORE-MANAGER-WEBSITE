import {Modal} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { createProduct, updateProduct} from '../../../services/managerService';

const ModalProduct = (props) => {
    const {action, dataModalProduct} = props;
    const defaultProductData = {
        Name: '',
        Price: '',
        ImageUrl: '',
        Description: '',
        Category: '',
    }
    const validInputsDefault = {
        Name: true,
        Price: true,
        ImageUrl: true,
        Description: true,
        Category: true
    }
    const [productData, setProductData] = useState(defaultProductData);
    const [validInputs, setValidInput] = useState(validInputsDefault);

    const handleOnchangeInput = (value, name) => {
        let _productData = _.cloneDeep(productData);
        _productData[name] = value;
        setProductData(_productData);
    }

    const validateProductInput = () => {
        setValidInput(validInputsDefault);
        let arr = ['Name', 'Price' , 'ImageUrl' ];
        let check = true;
        for( let i = 0 ; i < arr.length ; i++){
            if( !productData[arr[i]]) {
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[arr[i]] = false;
                setValidInput({_validInputs});
                toast.error(`${arr[i]} không được bỏ trống`);
                check = false;
                break;
            }
        }
        return check;
    }

    const handleConfirmProduct = async () => {
        let check = validateProductInput();
        if( check === true) {
            let response = await createProduct(productData.Name, productData.Price, productData.ImageUrl, productData.Description);
            console.log('>>> Check response Create Product', response.data.Success);
            if( response.data.Success === true){
                toast.success(response.data.Mess)
                props.onHide();
                setProductData(defaultProductData);
            } else {
                toast.error(response.data.Mess)
            }
        }
    }

    const handleCloseModalProduct = () => {
        props.onHide();
        setProductData(defaultProductData);
        setValidInput(validInputsDefault);
    }

    const handleUpdateProduct = async () => {
        let check = validateProductInput();
        console.log("Check dataModalProduct: ", dataModalProduct)
        if( check === true ){
            let response = await updateProduct( dataModalProduct._id, productData.Name, productData.Price, productData.ImageUrl, productData.Description);
            if( response){
                toast.success(response.Mess);
                console.log('>>> Check response Update Employee: ', response);
                props.onHide();
                setProductData(defaultProductData);
            } else {
                toast.error(response.Mess);
            }
        }
    }

    useEffect(() => {
        if( action !== "CREATE") {
            setProductData(dataModalProduct);
        }
    }, [dataModalProduct])
    return (
        <>
            <Modal size="lg" show={props.show} className='modal-user' onHide={() => handleCloseModalProduct()}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span>{props.action === 'CREATE' ? "Thêm mới sản phẩm" : "Chỉnh sửa sản phẩm"}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className='content-body row'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Tên sản phẩm <span className='red'>(*)</span> :</label>
                            <input className={validInputs.Name ? 'form-control' : 'form-control is-invalid'} type='text' required value={productData.Name}
                                onChange={(event) => handleOnchangeInput( event.target.value, "Name" )}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Gái sản phẩm <span className='red'>(*)</span> :</label>
                            <input className={validInputs.Price ? 'form-control' : 'form-control is-invalid'} type='text' required value={productData.Price}
                                onChange={(event) => handleOnchangeInput( event.target.value, "Price" )}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Hình ảnh<span className='red'>(*)</span> :</label>
                            <input className={validInputs.ImageUrl ? 'form-control' : 'form-control is-invalid'} type='text' required value={productData.ImageUrl}
                                onChange={(event) => handleOnchangeInput( event.target.value, "ImageUrl" )}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Danh mục <span className='red'>(*)</span> :</label>
                            <select 
                                className={validInputs.Category ? 'form-select' : 'form-select is-invalid'} 
                                onChange={(event) => handleOnchangeInput( event.target.value, "Category" )}
                            > 
                                <option value={'1'}>Nam</option>
                                <option value={'2'}>Nữ</option>
                                <option value={'3'}>Khác</option>
                            </select>
                        </div>
                        
                        <div className='col-12 col-sm-12 form-group'>
                            <label>Chú ý </label>
                            <input className='form-control' type='text'  value={productData.Description}
                                onChange={(event) => handleOnchangeInput( event.target.value, "Description" )}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' 
                        onClick={ action === "CREATE" ? () => handleConfirmProduct() : () => handleUpdateProduct()  }> 
                        {action === "CREATE" ? 'Lưu' : 'Cập nhật'} 
                        
                    </Button>
                    <Button variant='secondary' onClick={() => handleCloseModalProduct()}>Hủy</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalProduct;
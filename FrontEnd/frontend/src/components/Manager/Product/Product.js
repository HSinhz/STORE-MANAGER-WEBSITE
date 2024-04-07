import './Product.scss'
import { useEffect , useState } from 'react';
import useCheckLogin from '../../../utils/checkLogin';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import {showProduct, deleteProduct} from '../../../services/managerService';
import ModalProduct from './ModalProduct';
import ModalDeleteProduct from './ModalDeleteProduct'

const Product = () => {
    useCheckLogin(); 
    const [listProduct, setListProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimt, setCurrentLimit] = useState(2);
    const [totalPages, setTotalPages] = useState(0);

    // modal create/update product
    const [isShowModalProduct, setIsShowModalProdcut] = useState(false);
    const [dataModalProduct, setDataModalProduct] = useState({});
    const [actionModalProduct, setActionModalProduct] = useState("");

    // modal delete product
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [isDataDeleteProduct, setIsDataDeleteProduct] = useState({});
    
    useEffect(() => {
        
        fetchDataProduct()

    }, [currentPage]);

    const fetchDataProduct = async () => {
        let response = await showProduct(currentPage, currentLimt);
        if( response && response.Success === true){
            console.log("Check Response Product Page >>>>> ", response)
            // setListemployee(response.Data);
            setTotalPages(response.totalPages);
            setListProduct(response.allProduct);
        }
    }

    const handleDeleteProduct = async () => {
        let response = await deleteProduct(isDataDeleteProduct._id);
        if( response && response.Success === true ){
            toast.success(response.Mess);
            await fetchDataProduct();
            setIsShowModalDelete(false);
        } else {
            toast.error('Xóa sản phẩm thất bại')
        }
    }

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
        await fetchDataProduct();
        
    };

    const handleCloseModalProduct = async () => {
        setIsShowModalProdcut(false);
        setDataModalProduct({});
        await fetchDataProduct();
    }

    const handleCreateProduct = () => {
        setIsShowModalProdcut(true);
        setActionModalProduct("CREATE")
    }

    const handleOpenModalDelete = (dataDeleteProduct) => {
        setIsShowModalDelete(true);
        setIsDataDeleteProduct(dataDeleteProduct)
    }

    const handleCloseModalDelete = () => {
        setIsShowModalDelete(false);
        setIsDataDeleteProduct({});
    }

    const handleEditProduct = (dataProduct) => {
        setDataModalProduct(dataProduct);
        setIsShowModalProdcut(true);
        setActionModalProduct("UPDATE");
    }
    return (
        <>
            <div className='background'>
                <div className='container table-product'>
                    <h1 className=''>Danh sách sản phẩm</h1>
                    <div className='mt-4 head-list'> 
                        <input className='input-search' type="text"  placeholder='Tìm theo tên sản phẩm' id='search-emp' name='info-search'/>      
                        <button  type="submit"  className="btn btn-primary"  onClick={() => handleCreateProduct()}>Thêm sản phẩm</button>
                    </div>
                    <table class="table mt-4">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col">Mã sản phẩm</th>
                                <th scope="col">Tên sản phẩm</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Chú ý</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            { listProduct && listProduct.length > 0  ? 
                                <>
                                    {listProduct.map((item , index) => {
                                        return (
                                            <tr key={`row-${index}`}> 
                                                <th> { (currentPage - 1) *currentLimt + index + 1}</th>
                                                <td> <img className='img-product' src={item.ImageUrl}></img> </td>
                                                <td> {item._id} </td>
                                                <td> {item.Name} </td>
                                                <td> {item.Price} </td>
                                                <td> {item.Description} </td>
                                                <td>
                                                    <div className='form-button'>
                                                        <div className=''>
                                                            <button 
                                                                className='btn btn-success mx-3'
                                                                onClick={() => handleEditProduct(item)}
                                                            >Cập nhật</button>
                                                        </div>
                                                        <div>
                                                            <button className='btn btn-danger' onClick={() => handleOpenModalDelete(item)}>Xóa</button>
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

            <ModalProduct
                onHide = {handleCloseModalProduct}
                show = {isShowModalProduct}
                action = {actionModalProduct}
                dataModalProduct = {dataModalProduct}
            />

            <ModalDeleteProduct 
                onHide = {handleCloseModalDelete}
                title = {"Xác nhận xóa sản phẩm"}
                body = {"Bạn có chắc muốn xóa sản phẩm với mã sản phẩm: "}
                show = {isShowModalDelete}
                confirmDeleteProduct = {handleDeleteProduct}
                isDataProduct = {isDataDeleteProduct}
            />
            
        </>
    )
}

export default Product;

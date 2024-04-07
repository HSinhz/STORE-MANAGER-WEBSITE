import {Modal} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const ModalDeleteProduct = ( props ) => {
    return (
        <>
            <Modal show={props.show} onHide={props.onHide}>
                <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <p> {props.body} {props.isDataProduct.Name} </p>
                </Modal.Body>

                <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>Hủy</Button>
                <Button variant="primary" onClick={props.confirmDeleteProduct} >Xóa</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDeleteProduct;

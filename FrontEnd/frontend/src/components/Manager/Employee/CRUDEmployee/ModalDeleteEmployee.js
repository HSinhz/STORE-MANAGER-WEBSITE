import {Modal} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const ModalDeleteEmployee = (props) => {
    return (
        <>
            <Modal show={props.show} onHide={props.onHide}>
                <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <p> {props.body} {props.isDataEmployee.Name} </p>
                </Modal.Body>

                <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>Hủy</Button>
                <Button variant="primary" onClick={props.confirmDeleteEmloyee} >Xóa</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDeleteEmployee;
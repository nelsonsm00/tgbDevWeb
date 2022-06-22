/* IMPORT REACT */
import { Form, Col } from "react-bootstrap";

export default (props) => { 
    return (
        <>
            <Col
                sm={props.sm}
            >
                <Form.Label>{props.texto}</Form.Label>
            </Col>
        </>
    );
}
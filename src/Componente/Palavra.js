/* IMPORT REACT */
import { Col, Row, Container } from "react-bootstrap";

import Letra from "./Letra";

export default (props) => {
    return (
        <Container>
            <Row>   
                <Col className="palavra">
                    {props.palavra.palavra.map((p) => 
                        (<Letra letra={p} />))}    
                </Col>
            </Row>       
        </Container>
    );
}
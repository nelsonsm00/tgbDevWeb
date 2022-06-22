/* IMPORT REACT */
import { Form } from "react-bootstrap";

function renderOption(selected, value, text) {
    if (selected == value) {
        return (
            <option value={value} selected>
                {text}
            </option>
        );
    } else {
        return <option value={value}>{text}</option>;
    }
}

export default (props) => { 
    return (
        <>
            <Form>
                <Form.Control
                    as="select"
                    custom
                    onChange={(e) => props.funcao(e.target.value)}
                >
                    {props.dados.map((d) => renderOption(props.valor, d, d))}
                </Form.Control>
            </Form>
        </>
    );
}
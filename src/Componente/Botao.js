/* IMPORT REACT */
import Button from "react-bootstrap/Button";

function getClassName(className) {
    if (className == "") {
        return "btn btn-info btn-mbl";
    }
    else {
        return "btn " + className;
    }
}

export default (props) => {
    return (
        <>
        {props.ativo
            ? <Button className={getClassName(props.className)} onClick={props.funcao}>
                {props.texto}
              </Button>
            : <Button className={getClassName(props.className)} disabled>
                {props.texto}
              </Button>
        }
        </>
    );
}

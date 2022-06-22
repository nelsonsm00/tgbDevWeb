/* IMPORT PROJETO */
import Botao from './Botao';

function getClassName(props) {
    if (props.letraCorreta)
        return "correta";
    else if (props.posicaoExiste)
        return "posicaoCorreta";
    else if (props.letraIncorreta)
        return "naoExiste";
    else 
        return "naoDigitado";
}

export default (props) => {
    return (
        <Botao 
            ativo={props.ativo}
            className={getClassName(props)}
            texto={props.tecla.toUpperCase()}
            funcao={props.funcao}
        />
    );
}
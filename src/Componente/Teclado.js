/* IMPORT REACT */
import { Col, Row, Container } from "react-bootstrap";
import Botao from "./Botao";

/* IMPORT PROJETO */
import Tecla from "./Tecla";

export default (props) => {
    var teclas = [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ç"],
        ["z", "x", "c", "v", "b", "n", "m"]
    ];
    return (
        <Container>
            
                    {teclas.map((linha) => 
                        (<Row>
                            <Col sm="12" className="linhaTeclado">
                            {linha.map((tecla) => 
                                <Tecla 
                                    tecla={tecla} 
                                    funcao={() => {props.funcaoLetra(tecla)}} 
                                    ativo={props.habilitaLetra}
                                    posicaoExiste={props.posicaoExiste.includes(tecla.toUpperCase())}
                                    letraCorreta={props.letraCorreta.includes(tecla.toUpperCase())}
                                    letraIncorreta={props.letraIncorreta.includes(tecla.toUpperCase())}/>)}
                         </Col>
            </Row>)
                    )}   
            <Row>
                <Col sm="3">
                    <Botao
                        ativo={props.habilitaNovo}
                        className={"operacao"}
                        texto={"NOVO"}
                        funcao={props.funcaoNovo}
                    />
                </Col>
                <Col sm="3">
                    <Botao
                        ativo={true}
                        className={"operacao"}
                        texto={"CONFIG."}
                        funcao={props.funcaoConfiguracao}
                    />
                </Col>
                <Col sm="3">
                    <Botao
                        ativo={props.habilitaApaga}
                        className={"operacao"}
                        texto={"APAGA"}
                        funcao={props.funcaoApaga}
                    />
                </Col>
                <Col sm="3">
                    <Botao
                        ativo={props.habilitaConfere}
                        className={"operacao"}
                        texto={"CONFERE"}
                        funcao={props.funcaoConfere}
                    />
                </Col>
            </Row>
        </Container>
    );
}
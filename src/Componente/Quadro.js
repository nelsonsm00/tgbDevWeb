/* IMPOR REACT */
import { Component } from "react";
import { Col, Row, Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

/* IMPORT PROJETO */
import Palavra from "./Palavra";
import Teclado from './Teclado';
import PalavraObj from "../Classes/PalavraObj";
import Botao from "./Botao";
import ListaPalavaras from "../Classes/ListaPalavras";
import Cache from "../Classes/Cache";
import Select from "./Select";
import Label from "./Label";

const QUANTIDADE_DEFAULT = 6
const TAMANHO_DEFAULT = 5

class Quadro extends Component {
    constructor(props) {
        super(props);   
        
        var palavra = this.geraPalavra();

        this.state = {
            palavra: palavra.toUpperCase(),
            tamanho: TAMANHO_DEFAULT,
            palavrasObjeto: this.geraObjetoPalavra(palavra.toUpperCase(), QUANTIDADE_DEFAULT),
            quantidade: QUANTIDADE_DEFAULT,
            indexDigitavel: 0,
            habilitaApaga: false,
            habilitaLetra: true,
            ganhou: false,
            perdeu: false,
            teclasPosicaoExiste: "",
            teclasLetraCorreta: "",
            teclasLetraIncorreta: "",
            controleModal: {
                show: false
            }
        };   

        /* BIND */
        this.digita = this.digita.bind(this);
        this.apaga = this.apaga.bind(this);
        this.confere = this.confere.bind(this);
        this.novoJogo = this.novoJogo.bind(this);
        this.exibeConfiguracao = this.exibeConfiguracao.bind(this);
        this.setQuantidade = this.setQuantidade.bind(this);
        this.setTamanho = this.setTamanho.bind(this);
    }

    geraObjetoPalavra(palavra, quantidade) {
        var palavras = [];
        for(var i = 0; i < quantidade; i++) {
            var p = new PalavraObj(palavra.length);
            palavras.push(p);
        }
        return palavras;
    }

    geraPalavra(tamanho = TAMANHO_DEFAULT) {
        var listaPalavras = [];
        var indexPalavrasUsadas = [];

        if (tamanho == 5) {
            listaPalavras = ListaPalavaras.palavras5;
            indexPalavrasUsadas = Cache.indexPalavra5.get;
        }
        else if (tamanho == 6) {
            listaPalavras = ListaPalavaras.palavras6;
            indexPalavrasUsadas = Cache.indexPalavra6.get;
        }
        else if (tamanho == 7) {
            listaPalavras = ListaPalavaras.palavras7;
            indexPalavrasUsadas = Cache.indexPalavra7.get;
        }

        if (indexPalavrasUsadas == null || indexPalavrasUsadas == undefined)
            indexPalavrasUsadas = [];
        
        for(var i = 0; i < indexPalavrasUsadas.length; i++) {
            if (indexPalavrasUsadas[i] < listaPalavras.length) {
                listaPalavras[indexPalavrasUsadas[i]] = null;
            }
        }

        var listaPalavrasAux = listaPalavras.filter((palavra) => palavra != null);
        var indexAleatorio = Math.floor(Math.random() * listaPalavrasAux.length);
        var indexOriginal = listaPalavras.findIndex((palavra) => palavra == listaPalavrasAux[indexAleatorio]);
        if (indexOriginal > -1) {
            indexPalavrasUsadas.push(indexOriginal);
            if (tamanho == 5)
                Cache.indexPalavra5.set(indexPalavrasUsadas);            
            else if (tamanho == 6) 
                Cache.indexPalavra6.set(indexPalavrasUsadas);
            else if (tamanho == 7)
                Cache.indexPalavra7.set(indexPalavrasUsadas);
            
            return listaPalavrasAux[indexAleatorio].toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        }
        return "";
    }

    exibeConfiguracao() {
        this.setState({controleModal: {show: true}});
    }

    setQuantidade(quantidade) {
        if (quantidade != null && quantidade != undefined) {
            this.setState({quantidade: quantidade});
        }
    }

    setTamanho(tamanho) {
        if (tamanho != null && tamanho != undefined) {
            this.setState({tamanho: tamanho});
        }
    }

    novoJogo() {
        var palavra = this.geraPalavra(this.state.tamanho);
        if (palavra != null) {
            this.setState({
                palavra: palavra.toUpperCase(),
                palavrasObjeto: this.geraObjetoPalavra(palavra.toUpperCase(), this.state.quantidade),
                indexDigitavel: 0,
                habilitaApaga: false,
                habilitaLetra: true,
                ganhou: false,
                perdeu: false,
                teclasPosicaoExiste: "",
                teclasLetraCorreta: "",
                teclasLetraIncorreta: "",
                controleModal: {
                    show: false
                }
            });
        }
    }

    digita(tecla) {
        if (this.state.habilitaLetra && !this.state.ganhou && !this.state.perdeu) {
            var palavraAux = this.state.palavrasObjeto;
            palavraAux[this.state.indexDigitavel].digita(tecla);   
            this.setState({palavrasObjeto: palavraAux, habilitaLetra: !palavraAux[this.state.indexDigitavel].isCheia(), habilitaApaga: true});
        }
    }

    apaga() {
        if (this.state.habilitaApaga && !this.state.ganhou && !this.state.perdeu) {
            var palavraAux = this.state.palavrasObjeto;
            palavraAux[this.state.indexDigitavel].apaga();  
            this.setState({palavrasObjeto: palavraAux, habilitaLetra: true, habilitaApaga: !palavraAux[this.state.indexDigitavel].isVazia()});
        }
    }

    palavraExiste() {
        return true;

        var listaPalavras = [];
        if (this.state.tamanho == 5) {
            listaPalavras = ListaPalavaras.palavras5;
        }
        else if (this.state.tamanho == 6) {
            listaPalavras = ListaPalavaras.palavras6;
        }
        else if (this.state.amanho == 7) {
            listaPalavras = ListaPalavaras.palavras7;
        }

        var palavraDigitada = this.state.palavrasObjeto[this.state.indexDigitavel].palavraDigitada;
        var index = listaPalavras.findIndex((palavra) => palavra.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "") == palavraDigitada.toUpperCase());
        return index > -1;
    }

    confere() {
        if (this.state.palavrasObjeto[this.state.indexDigitavel].isCheia() && !this.state.ganhou && !this.state.perdeu && this.palavraExiste()) {
            var conferencia = this.state.palavrasObjeto[this.state.indexDigitavel].confere(this.state.palavra);
            if (conferencia) {
                this.setState({ganhou: true, teclasLetraCorreta: this.state.palavra, controleModal: {show: true}});
            }
            else if (this.state.indexDigitavel + 1 >= this.state.quantidade) {
                this.setState({
                    perdeu: true,
                    teclasLetraCorreta: this.state.teclasLetraCorreta + this.state.palavrasObjeto[this.state.indexDigitavel].letrasCorretas(),
                    teclasPosicaoExiste: this.state.teclasPosicaoExiste + this.state.palavrasObjeto[this.state.indexDigitavel].letrasExistePosicao(),
                    teclasLetraIncorreta: this.state.teclasLetraIncorreta + this.state.palavrasObjeto[this.state.indexDigitavel].letrasIncorretas(),
                    controleModal: {show: true}
                });              
            }          
            else {
                this.setState({
                    indexDigitavel: this.state.indexDigitavel + 1, 
                    habilitaLetra: true, 
                    habilitaApaga: false,
                    teclasLetraCorreta: this.state.teclasLetraCorreta + this.state.palavrasObjeto[this.state.indexDigitavel].letrasCorretas(),
                    teclasPosicaoExiste: this.state.teclasPosicaoExiste + this.state.palavrasObjeto[this.state.indexDigitavel].letrasExistePosicao(),
                    teclasLetraIncorreta: this.state.teclasLetraIncorreta + this.state.palavrasObjeto[this.state.indexDigitavel].letrasIncorretas(),
                });
            }  
        }     
    }

    renderModal() {
        if (this.state.perdeu) {
            return (
                <>
                    <Modal
                        show={this.state.controleModal.show}
                        backdrop="static"
                        keyboard={false}
                        dialogClassName={""}
                    >
                        <Modal.Body>
                            {"Você perdeu! A palavra é \"" + this.state.palavra + "\"."}
                        </Modal.Body>
                        <Modal.Footer>
                            <>
                            <Botao
                                ativo={true}
                                className={"novo"}
                                texto={"NOVO"}
                                funcao={this.novoJogo}
                            />
                            <Botao
                                ativo={true}
                                className={"cancelar"}
                                texto={"VOLTAR"}
                                funcao={() => {this.setState({controleModal: {show: false}})}}
                            />
                            </>
                        </Modal.Footer>
                    </Modal>
                </>
            );
        }
        else if (this.state.ganhou) {
            return (
                <>
                    <Modal
                        show={this.state.controleModal.show}
                        backdrop="static"
                        keyboard={false}
                        dialogClassName={""}
                    >
                        <Modal.Body>
                            {"Parabéns! Você ganhou!"}
                        </Modal.Body>
                        <Modal.Footer>
                            <>
                            <Botao
                                ativo={true}
                                className={"novo"}
                                texto={"NOVO"}
                                funcao={this.novoJogo}
                            />
                            <Botao
                                ativo={true}
                                className={"cancelar"}
                                texto={"VOLTAR"}
                                funcao={() => {this.setState({controleModal: {show: false}})}}
                            />
                            </>
                        </Modal.Footer>
                    </Modal>
                </>
            );
        }
        else if (this.state.controleModal.show) {
            return (
                <>
                    <Modal
                        show={this.state.controleModal.show}
                        backdrop="static"
                        keyboard={false}
                        dialogClassName={""}
                    >
                        <Modal.Header>
                            {"CONFIGURAÇÃO"}
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Row>
                                    <Label sm="4" texto="Tentativas: "/>
                                    <Col sm="8">
                                        <Select dados={[6,7,8,9,10]} valor={this.state.quantidade} funcao={this.setQuantidade} />   
                                    </Col>
                                </Row>
                                <hr></hr>
                                <Row>
                                    <Label sm="4" texto="Tamanho: "/>
                                    <Col sm="8">
                                        <Select dados={[5,6,7]} valor={this.state.tamanho} funcao={this.setTamanho} />   
                                    </Col>
                                </Row>
                            </Container>
                        </Modal.Body>
                        <Modal.Footer>
                            <>
                            <Botao
                                ativo={true}
                                className={"cancelar"}
                                texto={"VOLTAR"}
                                funcao={() => {
                                    this.setState({controleModal: {show: false}});
                                    this.novoJogo();
                                }}
                            />
                            </>
                        </Modal.Footer>
                    </Modal>
                </>
            );
        }
        else {
            return(<></>);
        }
    }

    render() {
        return (<>
                <div align="center">
                    {this.renderModal()}
                    <Container>
                        <Row>
                            <Col sm="2">
                            </Col>
                            <Col sm="8">
                                {this.state.palavrasObjeto.map((palavra, index) => (<Palavra palavra={palavra}/>))}
                            </Col>
                            <Col sm="2">
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="2">
                            </Col>
                            <Col sm="8">
                                <Teclado 
                                    funcaoLetra={this.digita} 
                                    funcaoApaga={this.apaga} 
                                    funcaoConfere={this.confere}
                                    funcaoNovo={this.novoJogo}
                                    funcaoConfiguracao={this.exibeConfiguracao}
                                    habilitaNovo={this.state.ganhou || this.state.perdeu}
                                    habilitaApaga={this.state.habilitaApaga}
                                    habilitaLetra={this.state.habilitaLetra}
                                    habilitaConfere={this.state.palavrasObjeto[this.state.indexDigitavel].isCheia()}
                                    letraCorreta={this.state.teclasLetraCorreta}
                                    posicaoExiste={this.state.teclasPosicaoExiste}
                                    letraIncorreta={this.state.teclasLetraIncorreta}
                                />   
                            </Col>
                            <Col sm="2">
                            </Col>
                        </Row>
                    </Container>   
                </div>                 
            </>); 
    }
}

export default Quadro; 
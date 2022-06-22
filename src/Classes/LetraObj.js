class LetraObj {
    constructor() {
        this.exibe = false;
        this.existePosicao = false;
        this.letraCorreta = false;
        this.letraDigitada = "";
    }

    getClassName() {
        var classe = "letra";
        if (!this.exibe) {
            return classe + " naoDigitado";
        }
        else if (this.existePosicao && this.letraCorreta) {
            return classe + " correta";
        }
        else if (this.existePosicao) {
            return classe + " posicaoCorreta";
        }
        else {
            return classe + " naoExiste";
        }
    }

    confere(letra, existePosicao) {
        this.exibe = true;
        this.existePosicao = existePosicao;
        this.letraCorreta = letra == this.letraDigitada;
        return this.letraCorreta;
    }

    digita(letra) {
        this.letraDigitada = letra;
    }
}

export default LetraObj;
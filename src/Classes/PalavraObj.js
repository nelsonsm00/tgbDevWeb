import LetraObj from "./LetraObj";

class PalavraObj {
    constructor(tamanho) {
        this.tamanho = tamanho;
        this.palavraDigitada = "";

        this.palavra = [];
        for (var i = 0; i < this.tamanho; i++) {
            var l = new LetraObj();
            this.palavra.push(l);
        }

        this.posicaoLetraDigitavel = 0;
    }

    confere(palavra) {
        if (palavra.length != this.palavraDigitada.length) {
            throw new Error("Tamanho da palavra incorreto.");
        }
        var resultado = true;
        for (var i = 0; i < this.tamanho; i++) {
            var existePosicao = palavra.includes(this.palavraDigitada.toUpperCase()[i]);
            if (!this.palavra[i].confere(palavra[i], existePosicao))
                resultado = false;
        }        
        return resultado;
    }

    digita(letra) {
        letra = letra.toUpperCase();
        this.palavra[this.posicaoLetraDigitavel].digita(letra);
        this.palavraDigitada += letra;
        this.posicaoLetraDigitavel++;
    }

    apaga() {
        this.palavra[--this.posicaoLetraDigitavel].digita("");
        if (this.posicaoLetraDigitavel == 0) {
            this.palavraDigitada = "";
        }
        else {
            this.palavraDigitada = this.palavraDigitada.substring(0, this.posicaoLetraDigitavel);
        }        
    }

    isCheia() {
        return this.posicaoLetraDigitavel >= this.tamanho;
    }

    isVazia() {
        return this.posicaoLetraDigitavel == 0;
    }

    letrasCorretas() {
        var letras = "";
        for (var i = 0; i < this.tamanho; i++) {
            if (this.palavra[i].letraCorreta)
                letras += this.palavra[i].letraDigitada;
        } 
        return letras;
    }

    letrasExistePosicao() {
        var letras = "";
        for (var i = 0; i < this.tamanho; i++) {
            if (this.palavra[i].existePosicao)
                letras += this.palavra[i].letraDigitada;
        } 
        return letras;
    }

    letrasIncorretas() {
        var letras = "";
        for (var i = 0; i < this.tamanho; i++) {
            if (!this.palavra[i].letraCorreta && !this.palavra[i].existePosicao)
                letras += this.palavra[i].letraDigitada;
        } 
        return letras;
    }
}

export default PalavraObj;
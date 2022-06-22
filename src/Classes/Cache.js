class Cache {

    static indexPalavra5 = {
        set: (value) => {
            localStorage.setItem("indexPalavra5", JSON.stringify(value));
        },
        get: JSON.parse(localStorage.getItem("indexPalavra5"))
    };

    static indexPalavra6 = {
        set: (value) => {
            localStorage.setItem("indexPalavra6", JSON.stringify(value));
        },
        get: JSON.parse(localStorage.getItem("indexPalavra6"))
    };

    static indexPalavra7 = {
        set: (value) => {
            localStorage.setItem("indexPalavra7", JSON.stringify(value));
        },
        get: JSON.parse(localStorage.getItem("indexPalavra7"))
    };    

    static reseta() {
        Cache.indexPalavra5.set([]);
        Cache.indexPalavra6.set([]);
        Cache.indexPalavra7.set([]);        
    }
}

export default Cache;
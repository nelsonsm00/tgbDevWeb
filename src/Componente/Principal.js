import Quadro from "./Quadro";

export default (props) => {
    document.title = "TGB";
    return (
        <div className="principal">
            <div className="titulo">
                <h1>
                    TGB
                </h1>
            </div>
            <Quadro/>
        </div>
    );
}
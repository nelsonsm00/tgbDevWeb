export default (props) => {
    return (
        <div className={props.letra.getClassName()}>
            {props.letra.letraDigitada}
        </div>
    );
}
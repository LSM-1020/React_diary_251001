import "./Button.css"
const Button =({text,type,onClick})=>{ //버튼의 이름text,이벤트 핸들러 onclick

    const btnType = ["positive","negative"].includes(type) ? type:"default";
    //positive-> button의 클래스이름이 Button Button_poistive

    return(
            <button className={["Button",`Button_${btnType}`].join(" ")} onClick={onClick}>{text}</button>
        
    );
}
export default Button;
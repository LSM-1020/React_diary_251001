import { useEffect, useState } from "react";
import "./Editor.css"
import { emotionList, getFormattedDate } from "../util";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import EmotionItem from "./EmotionItem";

//props initData는 입력창 또는 수정창에서 다르게 보여질 입력내용
//수정시-> 기존입력내용 나타나게
//onSubmit-> 작성완료 버튼 클릭시 실행되는 이벤트핸들러 함수
const Editor =({initData, onSubmit})=>{

    // const [date,setDate] = useState();
    // const [emotionId,setEmotionId] = useState(3);
    // const [content,setContent] = useState("");

    const [state,setState] = useState(
        {
            date:getFormattedDate(new Date()),
            emotionId:3,
            content:""
        }
    );



    const handleChangeDate=(e)=>{
        setState({...state, //state분리 후 date를 찾아라
                    date:e.target.value});
    }
    const handleChangeContent=(e)=>{
        setState({...state, //state분리 후 content를 찾아라
                    content:e.target.value});
    }
    const handleSubmit=()=> {
        onSubmit(state);
    }
    const navigate = useNavigate();
    const handleOnGoBack=()=>{
        navigate(-1); //이전 페이지로 이동
    }
    //이미지 클릭 핸들러
    const handleChangeEmotion = (emotionId)=>{
         setState({...state, //state분리 후 emotionId를 찾아라
                    emotionId});
    }
    useEffect(()=>{
        //initData존재여부 확인->참이면 props상위 컴포넌트 전달
        //initData존재하면 일기수정, 존재하지 않으면 새글쓰기
        //initData존재하면 현재 보여지는 내용이 initData의 내용이여함
        if(initData) {
            setState({
                ...initData,
                date : getFormattedDate(new Date(parseInt(initData.date)))
            });
        }
    },[initData]);

    return(
        <div className="Editor">
           <div className="editor_section">
                <h4>오늘의 날짜</h4>
                {/*날짜 입력창*/}
                <div className="input_wrapper">
                    <input type="date" value={state.date} onChange={handleChangeDate} />
                </div>
           </div> 
           <div className="editor_section">
                <h4>오늘의 감정</h4>
                {/*감정 이미지 선택창*/}
                <div className="input_wrapper emotion_list_wrapper">
                    {emotionList.map((item)=>(
                        <EmotionItem key={item.id}{...item} onClick={handleChangeEmotion} isSelected={item.id===state.emotionId}/>

                    ))}
                </div>
           </div>
           <div className="editor_section">
                <h4>오늘의 일기</h4>
                {/*일기 입력 또는 수정창*/}
                 <div className="input_wrapper">
                    <textarea placeholder="오늘하루는 어땠나요?" onChange={handleChangeContent} />              
                </div>
           </div>
           <div className="editor_section bottom_section">
                {/*작성완료, 취소 버튼*/}
                <Button text={"취소하기"} onClick={handleOnGoBack} />
                <Button type={"positive"} text={"작성완료"} onClick={handleSubmit}/>
           </div>
           
        </div>
    );
}
export default Editor;
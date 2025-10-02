import { useContext, useState, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { Navigate, replace, useNavigate } from "react-router-dom";

const useDiary = (id) =>{
    const data =useContext(DiaryStateContext);
    const [diary,setDiary] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        const matchIdary=  data.find((it)=>String(it.id)===String(id));
        //유저가 클릭한 id와 일치하는 일기 찾아서 반환
        if(matchIdary) { //참이면 유저가 보낸 일기id의 일기존재
            setDiary(matchIdary);
        } else { //유저가 보내준 일기의id 존재하지 않음
            alert("해당일기가 존재하지 않습니다")
            navigate("/",{replace: true});
        }
    },[id,data]);



 
    return diary; //유저가 클릭한 id에 해당하는 일기
};
export default useDiary;
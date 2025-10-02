import { useSearchParams } from "react-router-dom";
import Button from "../component/Button";
import Header from "../component/Header";
import Editor from "../component/Editor";
import { useContext, useEffect, useState } from "react";
import {DiaryStateContext} from "../App";
import { getMonthRangeByDate } from "../util";
import DiaryList from "../component/DiaryList";

//context로 설정되어있어서 app에서 보내준 data(일기 배열),oncreate,ondelete사용가능
const Home =() =>{
    const data = useContext(DiaryStateContext); //app에서 보내준 data 가져오기
    //const [searchParams, setSearchParams] = useSearchParams();
    //request.getparameter("memberid")
const [filteredData, setFilteredData] = useState([]);   
const [pivotDate, setPivotDate] = useState(new Date); //오늘 날짜

const headerTitle = `${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+1}월`;

const onIncreaseMonth = ()=>{ //월 증가 이벤트
    setPivotDate(
        new Date(pivotDate.getFullYear(), pivotDate.getMonth()+1)
    );
}
const onDecreaseMonth = ()=>{ //월 감소 이벤트
    setPivotDate(
        new Date(pivotDate.getFullYear(), pivotDate.getMonth()-1)
    );
}
useEffect(()=>{
    if(data.length>=1){
    const{beginTimeStamp,endTimeStamp} =getMonthRangeByDate(pivotDate);
    setFilteredData(
        data.filter(
            (item)=> beginTimeStamp <= item.date&&item.date <= endTimeStamp
        )
    )
      }else {
        setFilteredData([]);
      }
},[data,pivotDate]);

const onSubmit= ()=>{
    alert("작성완료 버튼 클릭")
}
    return (      
        <div>            
            <Header title={headerTitle}                   
                leftChild={<Button  text={"<"} onClick={onDecreaseMonth}/>}
                rightChild={<Button text={">"} onClick={onIncreaseMonth}/>}
                />
           <DiaryList data={filteredData} /> 
           
        </div>
    );
}

export default Home;
import { useState } from "react";
import Button from "./Button";
import "./DiaryList.css";
import { useNavigate } from "react-router-dom";
  const sortOptionList =[
        {value:"latest", name:"최신순"},
        {value:"oldest", name:"오래된 순"}
    ];

const DiaryList =({data})=>{ //data->home에서 넘어온 props->월별로 필터링된 일기들의 배열
    const[sortType, setSortType] = useState("latest");
    const onChangeSortType = (e)=>{
        setSortType(e.target.value)
    };
    const navigate = useNavigate();
    const onClickNew=()=>{ //페이지에 하이퍼링크
        navigate("/new")
    }

    return(
        <div className="DiaryList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <select onChange={onChangeSortType} value={sortType}>
                        {sortOptionList.map((item, idx)=>(
                            <option key={idx} value={item.value}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="right_col">
                    <Button text={"새 일기 쓰기"} type={"positive"} onClick={onClickNew} />
                </div>
            </div>
        </div>
    );
}
export default DiaryList;
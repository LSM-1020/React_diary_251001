import { useNavigate, useParams } from "react-router-dom";
import useDiary from "../hook/useDiary";
import Header from "../component/Header";
import Button from "../component/Button";
import { getFormattedDate } from "../util";
import Viewer from "../component/Viewer";
const Diary =() =>{
    const {id} = useParams();
    const data = useDiary(id);
    const navigate = useNavigate();
    const goBack = ()=>{
        navigate(-1);  
    }
    const goEdit =()=>{
        navigate(`/edit/${id}`);
    }

    if(data) {
        const{date, emotionId, content} = data;
        const title = `${getFormattedDate(new Date(Number(date)))} 기록`;
        return (
                <div>
                    <Header title={title} 
                        leftChild={<Button text={"< 뒤로가기"} onClick={goBack} />} 
                        rightChild={<Button text={"수정하기"} onClick={goEdit}/>}
                    />
                    <Viewer content={content} emotionId={emotionId} />
                    <h2>Diary 페이지입니다</h2>
                    <h3>{id}번 글</h3>
                </div>
            );
    } else {
        return <div>일기를 불러오는 중입니다...</div>
    }



   
}

export default Diary;
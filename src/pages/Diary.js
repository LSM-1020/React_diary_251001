import { useParams } from "react-router-dom";

const Diary =() =>{

    const {id} = useParams();

    return (
        <div>
            <h2>Diary 페이지입니다</h2>
               <h3>{id}번 글</h3>
        </div>
    );
}

export default Diary;
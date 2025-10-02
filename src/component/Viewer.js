import "./Viewer.css";
import {emotionList} from "../util";
const Viewer =({content,emotionId})=>{

    const emotionItem = emotionList.find((item) => emotionId===item.id);

    return(
        <div className="Viewer">
            <section>
                <h4>오늘의 감정</h4>
                <div className="emotion_img-wrapper">
                    <img alt={emotionItem.name} src={emotionItem.img} />
                </div>
            </section>
        </div>
    );
}
export default Viewer;
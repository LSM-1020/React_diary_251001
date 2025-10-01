import { useSearchParams } from "react-router-dom";
import Button from "../component/Button";
import Header from "../component/Header";
import Editor from "../component/Editor";


const Home =() =>{

    //const [searchParams, setSearchParams] = useSearchParams();
    //request.getparameter("memberid")
const onSubmit= ()=>{
    alert("작성완료 버튼 클릭")
}
    return (      
        <div>            
            <Header title={"HOME"}
                leftChild={<Button type={"positive"} text={"긍정버튼"} onClick={()=>{alert("positive")}}/>}
                rightChild={<Button type={"negative"} text={"부정버튼"} onClick={()=>{alert("negative")}}/>}
                />
            <Editor onSubmit={onSubmit}/>
        </div>
    );
}

export default Home;
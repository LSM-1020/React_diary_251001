import './App.css';
import Home from './pages/Home';
import Edit from './pages/Edit';
import New from './pages/New';
import Diary from './pages/Diary';
import { Routes, Route, Link } from 'react-router-dom';
import React, { useEffect, useReducer, useRef, useState} from 'react';
import { type } from '@testing-library/user-event/dist/type';
function reducer(state,action){
  //state는 기존 일기 객체들 들어있는 배열
  switch (action.type) {
    case "CREATE": {
      return [action.data,...state];
      //기존 일기들이 들어있는 배열 맨앞에 새로운 일기객체 삽입
    }
    case "UPDATE": {
      //반복문
      return state.map((item)=>
      String(item.id)===String(action.data.id) ? {...action.data}:item
      );
    }
    case "DELETE": {
      return state.filter((item)=>
      String(item.id)!==String(action.data.id)
      );
    }
     case "INIT": {
      return action.data;
    }
    default:
      return state;
  }
}

export const DiaryStateContext = React.createContext();
//context생성
export const DiaryDispatchContext = React.createContext();
//자식 컴포넌트에 전달할 함수만 분리

function App() {
  const [isDataLoaded, setisDataLoaded] = useState(false);

  const mockData =[
    {
      id:"mock1",
      date: new Date().getTime(),
      content:"mock1이 쓴 일기",
      emotionId: 1
    },
    {
      id:"mock2",
      date: new Date().getTime(),
      content:"mock2이 쓴 일기",
      emotionId: 2
    },
    {
      id:"mock3",
      date: new Date().getTime(),
      content:"mock3이 쓴 일기",
      emotionId: 3
    }
  ]

  useEffect(()=>{
    dispatch({
      type:"INIT",
      data: mockData
    });
    setisDataLoaded(true);
  },[]); //의존성 배열 [빈배열]로 하면, 최초 마운트할때 1번만 실행

  const idRef = useRef(0);
  //const [state,setState] = useState();
  const [data, dispatch] = useReducer(reducer,[]);
  //data->일기 객체들이 들어있는 배열
  const onCreate = (date,content,emotionId)=>{
    dispatch({
        type: "CREATE",
        data: {
          id: idRef.current,
          date: new Date(date).getTime(),
          content,
          emotionId
        }
      });
      idRef.current +=1; //기본키 1씩 늘어남,ID중복 방지  
  };

  const onUpdate = (targetId, date, content, emotionId) =>{
    dispatch({
      type: "UPDATE",
        data: {
          id: targetId, //수정할 일기객체 id
          date: new Date(date).getTime(),
          content,
          emotionId
        }
  });
  };

  const onDelete = (targetId)=>{
    dispatch({
       type: "DELETE",
        data: {
          id: targetId, //삭제할 일기객체 id
        }

    });
  };
  if(isDataLoaded) {
    return (
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{onCreate,onUpdate,onDelete}}>
          <div className="App">
            <div>
              <Link to={"/"}>홈</Link>/
              <Link to={"new"}>일기쓰기</Link>/
              <Link to={"/diary"}>일기보기</Link>/
              <Link to={"/edit"}>일기수정</Link>/
            </div>
            <hr></hr>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/new' element={<New />} />
              <Route path='/diary/:id' element={<Diary />} />
              <Route path='/edit' element={<Edit />} />
            </Routes>  
          </div>
       </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
  } else {
    return <div>데이터를 불러오는 중입니다</div>
  }

}

export default App;

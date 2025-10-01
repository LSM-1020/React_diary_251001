import './App.css';
import Home from './pages/Home';
import Edit from './pages/Edit';
import New from './pages/New';
import Diary from './pages/Diary';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
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
  );
}

export default App;

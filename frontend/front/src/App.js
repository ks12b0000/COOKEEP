import './App.css';

import { Routes, Route } from 'react-router';
import { useSelector } from 'react-redux';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signUp/SignUp';
import Japanese from './pages/category/japanese/Japanese';
import PrivateRoute from './until/PrivateRoute';
import KaKaoLogin from './pages/login/KakaoLogin';
import GoogleLogin from './pages/login/GoogleLogin';
import NaverLogin from './pages/login/NaverLogin';
import Detail from './components/categoryLayout/detail/Detail';
import Chinese from './pages/category/ chinese/ Chinese';
import Western from './pages/category/ western/ Western';
import Diet from './pages/category/ diet/Diet';
import Etc from './pages/category/etc/Etc';
import Vegan from './pages/category/vegan/Vegan';
import Edit from './components/categoryLayout/edit/Edit';
import Korean from './pages/category/korean/Korean';
import Writing from './components/categoryLayout/writing/Writing';
import MyPosts from './pages/myPage/MyPosts';
import MyLikes from './pages/myPage/MyLikes';
import Written from './pages/written/Written';
import NotFound from './pages/notFound/NotFound';
import AllCategory from './pages/category/all/AllCategory';
import SearchList from './components/categoryLayout/searchList/SearchList';
import SearchTag from './components/categoryLayout/searchList/SearchTag';
import MyComments from './pages/myPage/MyComments';
import MyAlarms from './pages/myPage/MyAlarms';
import MyAccount from './pages/myPage/MyAccount';
import MyPageMobile from './pages/myPage/MyPageMobile';
import PopularityDetail from './pages/home/PopularityDetail';
import RankingDetail from './pages/home/RankingDetail';
import ChangeUserinfo from './pages/myPage/ChangeUserinfo';
import MobileCommentList from './components/comment/MobileCommentList';

function App() {
  const user = useSelector(state => state);

  return (
    <>
      {/*라우터관리*/}
      <Routes>
        <Route element={<PrivateRoute />}>
          {/* 마이페이지 */}
          <Route path='/mypage/alarms/:userId' element={<MyAlarms />}></Route>
          <Route path='/mypage/posts/:userId' element={<MyPosts />}></Route>
          <Route path='/mypage/likes/:userId' element={<MyLikes />}></Route>
          <Route
            path='/mypage/comments/:userId'
            element={<MyComments />}
          ></Route>
          <Route path='/mypage/account/:userId' element={<MyAccount />}></Route>
          <Route
            path='/mypage/changeuserinfo/:userId'
            element={<ChangeUserinfo />}
          ></Route>
          {/* 마이페이지 모바일 용 */}
          <Route
            path='/mypage/mobile/:userId'
            element={<MyPageMobile />}
          ></Route>
        </Route>
        {/*더보기페이지*/}
        <Route path='/popularity' element={<PopularityDetail />} />
        <Route path='/rangking' element={<RankingDetail />} />
        {/*카테고리*/}
        <Route path=':category/writing' element={<Writing />}></Route>
        <Route path='/korea/*' element={<Korean />}></Route>
        <Route path='/western' element={<Western />}></Route>
        <Route path='/chinese' element={<Chinese />}></Route>
        <Route path='/japanese' element={<Japanese />}></Route>
        <Route path='/diet' element={<Diet />}></Route>
        <Route path='/vegan' element={<Vegan />}></Route>
        <Route path='/etc' element={<Etc />}></Route>
        <Route path='/all' element={<AllCategory />}></Route>

        <Route path='/category/:id' element={<Detail />} />
        <Route path='/:id/edit' element={<Edit />} />
        <Route path='/written/:userId' element={<Written />} />
        {/*모바일용 댓글 더보기 페이지*/}
        <Route path='/category/comment/:id' element={<MobileCommentList />} />

        {/*검색*/}
        <Route path='/search/:contents' element={<SearchList />} />
        <Route path='/searchTag/:contents' element={<SearchTag />} />
        {/**/}
        <Route path='/login' element={<Login />}></Route>
        <Route path='/callback/kakao' element={<KaKaoLogin />}></Route>
        <Route path='/callback/google' element={<GoogleLogin />}></Route>
        <Route path='/callback/naver' element={<NaverLogin />}></Route>
        <Route path='/sign' element={<SignUp />}></Route>
        <Route path='/notfound' element={<NotFound />} />
        <Route path='/' element={<Home />}></Route>

        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

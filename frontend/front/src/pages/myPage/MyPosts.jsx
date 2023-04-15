import styled from '@emotion/styled';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import AuthHttp from '../../http/authHttp';
import Layout from "../../components/layout/Layout";
import MypageNav from '../../components/mypage/myPageNav';
import { Wrap, Text, BoxWrap, PageWrap } from './MyAlarms';

const authHttp = new AuthHttp();

const MyPosts = () => {
  const params = useParams();
  const { userId } = params;

  const navigate = useNavigate();

  const username = useSelector(
    state => state.persistedReducer.userReducer.username
  );

  const [UserInfo, setUserInfo] = useState([]);

  useEffect(() => {
    onMypage();
  }, []);

  const onMypage = async () => {
    try {
      const res = await authHttp.getMypage(userId);
      setUserInfo(res.data.result);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <Wrap>
      <Text>마이페이지</Text>
      {username === UserInfo.username ? (
        <BoxWrap>
          <MypageNav userNickName={UserInfo.nickname} userName={UserInfo.username} userEmail={UserInfo.email} categoryName='posts' userId={userId}/>
        </BoxWrap>
      ) : 
      (
        navigate('/notfound')
      )}
      </Wrap>
    </Layout>
  );
};

export default MyPosts;
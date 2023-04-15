import styled from '@emotion/styled';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import AuthHttp from '../../http/authHttp';
import Layout from "../../components/layout/Layout";
import MypageNav from '../../components/mypage/myPageNav';

const authHttp = new AuthHttp();

const MyAlarms = () => {
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
      console.log('mypage',res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <Wrap>
      <Text>마이페이지</Text>
      {username === UserInfo.username ? (
        <>           
            <BoxWrap>
              <MypageNav userNickName={UserInfo.nickname} userName={UserInfo.username} userEmail={UserInfo.email} categoryName='alarms' userId={userId} />
              <PageWrap></PageWrap>
            </BoxWrap>
        </>
      ) : 
      (
        navigate('/notfound')
          )}
                  </Wrap>
    </Layout>
  );
};

export const Wrap = styled.div`
  width: 1440px;
  margin: 0 auto;
  height: 73vh;
  margin-bottom: 10vh;

  @media screen and (max-width: 1700px) {
       width: 80%;
    }
`

export const Text = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
  margin-top: 3vh;
  color: #ED3419;
`

export const BoxWrap = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  display: grid;
  grid-template-columns: 25% 73%;
  justify-content: space-between;
`;

export const PageWrap = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid #FF6242;
    border-radius: 10px;
`


export default MyAlarms;

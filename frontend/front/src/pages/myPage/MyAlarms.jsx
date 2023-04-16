import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import AuthHttp from '../../http/authHttp';
import Layout from "../../components/layout/Layout";
import MypageNav from '../../components/mypage/myPageNav';
import { Button, Arrow, DoubleArrow } from '../../components/comment/CommentList'

const authHttp = new AuthHttp();

const MyAlarms = () => {
  const params = useParams();
  const { userId } = params;

  const navigate = useNavigate();

  const username = useSelector(
    state => state.persistedReducer.userReducer.username
  );

  const [UserInfo, setUserInfo] = useState([]);

  const [Alarms, setAlarms] = useState([1,2]);
  const [Page, setPage] = useState([]);
  const [SelectedButton, setSelectedButton] = useState(0);
  const [Count, setCount] = useState(0);
  
  useEffect(() => {
    onMypage();
    getAlarmList();
  }, [SelectedButton]);

  const onMypage = async () => {
    try {
      const res = await authHttp.getMypage(userId);
      setUserInfo(res.data.result);
      console.log('mypage',res);
    } catch (err) {
      console.log(err);
    }
  };

  const getAlarmList = async () => {
    try {
      const res = await authHttp.getAlarmList(
        userId,
        SelectedButton,
      );
      console.log(res);
      setAlarms(res.data.result.list);
      setCount(res.data.result.cnt);
      const arrayLength = res.data.result.total;
      const newArray = new Array(arrayLength).fill(0).map((_, index) => index);
      setPage(newArray);
    } catch (err) {
      console.log(err);
    }
  };

  // 페이지 네이션 함수
  //넘버 버튼으로 페이지 불러오기
  const pageList = (pageNum) => {
    setSelectedButton(pageNum);
  };

  //left arrow 버튼으로 페이지 불러오기
  const leftList = () => {
    if (SelectedButton > 0) {
      setSelectedButton(prev => prev - 1);
    }
  };

  //right arrow 버튼으로 페이지 불러오기
  const rightList = () => {
    if (SelectedButton < Page.length - 1) {
      setSelectedButton(prev => prev + 1);
    }
  };

  //첫 페이지로 이동
  const firstList = () => {
    if (SelectedButton > 0) {
      setSelectedButton(0);
    }
  };

  //마지막 페이지로 이동
  const lastList = () => {
    if (SelectedButton < Page.length - 1) {
      setSelectedButton(Page.length - 1);
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
              <PageWrap>
                <RedIconWrap>
                  <RedIcon>
                    <img src='/image/mypage-alarm-r.png' alt='icon'/>
                  </RedIcon>
                  <IconText>댓글 알림</IconText>
                </RedIconWrap>
                {Alarms.length === 0
                  ?
                  <EmptyText>댓글 알림이 없습니다.</EmptyText>
                  :
                  <>
                    <ContentBox marginTop='30px'></ContentBox>
                    <ContentBox></ContentBox>
                    <ContentBox></ContentBox>
                    <ContentBox></ContentBox>
                    <ContentBox></ContentBox>
                    <ContentBox></ContentBox>
                    <ContentBox></ContentBox>
                    <ContentBox></ContentBox>
                    <Nav>
                    {SelectedButton > 0 && (
                      <Button onClick={() => firstList()}>
                        <DoubleArrow url='/image/double-arrow-left.png' />
                      </Button>
                    )}
                    <Button onClick={() => leftList()}>
                      <Arrow url='/image/arrow-left.png' />
                    </Button>
                    {Page.map((page, i) => (
                      <Button
                        key={i}
                        onClick={() => pageList(page)}
                        aria-current={page === SelectedButton ? 'true' : null}
                      >
                        {page + 1}
                      </Button>
                    ))}
                    <Button onClick={() => rightList()}>
                      <Arrow url='/image/arrow-right.png' />
                    </Button>
                    {SelectedButton < Page.length - 1 && (
                      <Button onClick={() => lastList()}>
                        <DoubleArrow url='/image/double-arrow-right.png' />
                      </Button>
                    )}
                  </Nav>
                  </>
                }
              </PageWrap>
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
    padding: 30px 25px;
    box-sizing: border-box;
    position: relative;
`

export const RedIconWrap = styled.div`
  display: flex;
`

export const RedIcon = styled.div`
  width: 23px;
  height: 23px;
`

export const IconText = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: #FB3B1E;
  margin-left: 6px;
`

export const EmptyText = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: #FB3B1E;
  top: -15px;
`

export const ContentBox = styled.div`
  width: 100%;
  height: 5.8vh;
  border: 1px solid #CED4DA;
  border-radius: 10px;
  margin: 10px 0;
  margin-top: ${props => props.marginTop};
  display: flex;
  justify-content: center;

  &.hover{
    border: 1px solid #FFA590;
  }
`
export const ContentText = styled.div`
  
`

//페이지네이션
export const Nav = styled.nav`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
  top: 90.6%;
  left: 50%;
  transform: translate(-50%, 0);
`;

export default MyAlarms;

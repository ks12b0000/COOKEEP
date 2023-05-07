import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import AuthHttp from '../../http/authHttp';
import Layout from '../../components/layout/Layout';
import MypageNav from '../../components/mypage/myPageNav';
import {
  Button,
  Arrow,
  DoubleArrow,
} from '../../components/comment/CommentList';
import {
  Wrap,
  Text,
  BoxWrap,
  PageWrap,
  RedIconWrap,
  RedIcon,
  IconText,
  EmptyText,
  ContentsWrap,
  ContentsText,
  ContentsBox,
  ContentsArrow,
  Nav,
} from './MyPosts';

const authHttp = new AuthHttp();

const MyAlarms = () => {
  const params = useParams();
  const { userId } = params;

  const navigate = useNavigate();

  const username = useSelector(
    state => state.persistedReducer.userReducer.username
  );

  const [UserInfo, setUserInfo] = useState([]);

  const [Alarms, setAlarms] = useState([]);
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
      console.log(res);
      setUserInfo(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const getAlarmList = async () => {
    try {
      const res = await authHttp.getAlarmList(userId, SelectedButton);
      console.log(res);
      setAlarms(res.data.result.notificationList);
      setCount(res.data.result.total);
      const arrayLength = res.data.result.total;
      const newArray = new Array(arrayLength).fill(0).map((_, index) => index);
      setPage(newArray);
    } catch (err) {
      console.log(err);
    }
  };

  // 페이지 네이션 함수
  //넘버 버튼으로 페이지 불러오기
  const pageList = pageNum => {
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
              <MypageNav
                userNickName={UserInfo.nickname}
                userName={UserInfo.username}
                userEmail={UserInfo.email}
                categoryName='alarms'
                userId={userId}
              />
              <PageWrap>
                <RedIconWrap>
                  <RedIcon>
                    <img src='/image/mypage-alarm-r.png' alt='icon' />
                  </RedIcon>
                  <IconText>댓글 알림</IconText>
                </RedIconWrap>
                {Alarms.length === 0 ? (
                  <EmptyText>댓글 알림이 없습니다.</EmptyText>
                ) : (
                  <>
                    <ContentsWrap>
                      {Alarms.map(alarm => (
                        <ContentsBox
                          onClick={() => {
                            window.open(alarm.notification_url, '_self');
                          }}
                          key={alarm.notification_id}
                        >
                          <ContentsText>{alarm.message}</ContentsText>
                          <ContentsArrow src='/image/mypage-alarms-arrow.png' />
                        </ContentsBox>
                      ))}
                    </ContentsWrap>

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
                )}
              </PageWrap>
            </BoxWrap>
          </>
        ) : (
          navigate('/notfound')
        )}
      </Wrap>
    </Layout>
  );
};

export default MyAlarms;

import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import AuthHttp from '../../http/authHttp';
import Layout from '../../components/layout/Layout';
import MypageNav from '../../components/mypage/myPageNav';
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
} from './MyPosts';
import Pagination from '../../components/mypage/pagination';

const authHttp = new AuthHttp();

const MyAlarms = () => {
  const params = useParams();
  let { userId } = params;
  userId = parseInt(userId);
  const userId2 = useSelector(
    state => state.persistedReducer.userReducer.userId
  );

  const navigate = useNavigate();

  const [UserInfo, setUserInfo] = useState([]);

  const [Alarms, setAlarms] = useState([]);
  const [Page, setPage] = useState([]);
  const [SelectedButton, setSelectedButton] = useState(0);

  useEffect(() => {
    onMypage();
    getAlarmList();

    if (userId !== userId2) {
      navigate('/notfound');
    }
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
      const res = await authHttp.getMypageAlarmList(userId, SelectedButton);
      console.log(res);
      setAlarms(res.data.result.notificationList);
      const arrayLength = res.data.result.total;
      const newArray = new Array(arrayLength).fill(0).map((_, index) => index);
      setPage(newArray);
    } catch (err) {
      console.log(err);
    }
  };

  // 페이지 네이션 함수
  const handlePagination = buttonValue => {
    setSelectedButton(buttonValue);
  };

  return (
    <Layout>
      <Wrap>
        <Text>마이페이지</Text>
        <BoxWrap>
          <MypageNav
            userNickName={UserInfo.nickname}
            userName={UserInfo.username}
            userEmail={UserInfo.email}
            categoryName='alarms'
            userId={userId}
            userImage={UserInfo.user_image}
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
                      <ContentsText>{alarm.title}</ContentsText>
                      <ContentsArrow src='/image/mypage-alarms-arrow.png' />
                    </ContentsBox>
                  ))}
                </ContentsWrap>
                {/* 페이지네이션 */}
                <Pagination
                  handlePagination={handlePagination}
                  Page={Page}
                  SelectedButton={SelectedButton}
                />
              </>
            )}
          </PageWrap>
        </BoxWrap>
      </Wrap>
    </Layout>
  );
};

export default MyAlarms;

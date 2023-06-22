import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
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

  const { ref, inView } = useInView();

  let { userId } = params;
  userId = parseInt(userId);
  const userId2 = useSelector(
    state => state.persistedReducer.userReducer.userId
  );

  const navigate = useNavigate();

  //유저 정보
  const [UserInfo, setUserInfo] = useState([]);

  //알림 리스트
  const [Alarms, setAlarms] = useState([]);

  //페이지 네이션
  const [Page, setPage] = useState([]);
  const [SelectedButton, setSelectedButton] = useState(0);

  //모바일 화면 체크
  const [IsMobile, setIsMobile] = useState(false);

  //모바일 인피니트 스크롤
  const [MoreData, setMoreData] = useState(1);

  //footer 위치
  const [FooterBottom, setFooterBottom] = useState(false);

  //유저 정보 불러오기 & 알림 리스트 불러오기
  useEffect(() => {
    onMypage();
    getAlarmList();

    if (userId !== userId2) {
      navigate('/notfound');
    }
  }, [SelectedButton]);

  //모바일 화면 체크
  useEffect(() => {
    checkIsMobile(); // 초기 로드 시 한 번 실행
    window.addEventListener('resize', checkIsMobile); // 윈도우 크기 변경 시 실행

    return () => {
      window.removeEventListener('resize', checkIsMobile); // 컴포넌트가 unmount 될 때 이벤트 리스너 제거
    };
  }, []);

  //인피니트 스크롤
  useEffect(() => {
    if (inView) {
      getMobileAlarmList();
    }
    console.log('check');
  }, [inView]);

  //유저 정보 불러오기 함수
  const onMypage = async () => {
    try {
      const res = await authHttp.getMypage(userId);
      console.log(res);
      setUserInfo(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  //알림리스트 얻기
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

  //인피니트 스크롤로 알림리스트 얻기
  const getMobileAlarmList = async () => {
    try {
      const res = await authHttp.getMypageAlarmList(userId, MoreData);
      const newAlarms = [...Alarms, ...res.data.result.notificationList];
      setAlarms(newAlarms);
      if (MoreData < res.data.result.total) {
        setMoreData(prev => prev + 1);
      }
      if (newAlarms.length > 9) {
        setFooterBottom(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //모바일 화면 체크 함수
  const checkIsMobile = () => {
    const isMobileDevice = window.matchMedia('(max-width: 760px)').matches;
    setIsMobile(isMobileDevice);
  };

  const checkedAlarm = async (
    e,
    confirmation,
    notification_id,
    notification_url
  ) => {
    e.preventDefault();
    if (confirmation === false) {
      try {
        const res = await authHttp.putCheckedAlarm(notification_id);
        console.log(res);
        window.open(notification_url, '_self');
      } catch (err) {
        alert(err);
      }
    } else {
      window.open(notification_url, '_self');
    }
  };

  // 페이지 네이션 함수
  const handlePagination = buttonValue => {
    setSelectedButton(buttonValue);
  };

  return (
    <Layout>
      <Wrap length={FooterBottom}>
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
                  {Alarms.map((alarm, i) => (
                    <ContentsBox
                      onClick={e => {
                        checkedAlarm(
                          e,
                          alarm.confirmation,
                          alarm.notification_id,
                          alarm.notification_url
                        );
                      }}
                      key={i}
                    >
                      <ContentsText checked={alarm.confirmation}>
                        {alarm.title}
                      </ContentsText>
                      <ContentsArrow
                        checked={alarm.confirmation}
                        src='/image/mypage-alarms-arrow.png'
                      />
                    </ContentsBox>
                  ))}
                </ContentsWrap>
                {IsMobile ? (
                  <div ref={ref}></div>
                ) : (
                  <>
                    {/* 페이지네이션 */}
                    <Pagination
                      handlePagination={handlePagination}
                      Page={Page}
                      SelectedButton={SelectedButton}
                    />
                  </>
                )}
              </>
            )}
          </PageWrap>
        </BoxWrap>
      </Wrap>
    </Layout>
  );
};

export default MyAlarms;

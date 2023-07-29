import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from 'react-responsive';
import styled from '@emotion/styled';
import AuthHttp from '../../../../http/authHttp';

const authHttp = new AuthHttp();

const AlarmModal = () => {
  const userId = useSelector(
    state => state.persistedReducer.userReducer.userId
  );

  const { ref, inView } = useInView();

  const [Alarms, setAlarms] = useState([]);
  const [Page, setPage] = useState(0);
  const [Total, setTotal] = useState(0);

  //모바일 인피니트 스크롤
  const [MoreData, setMoreData] = useState(0);

  const isMobile = useMediaQuery({
    query: '(max-width:760px)',
  });

  useEffect(() => {
    getAlarmList();
  }, [Page]);

  const getAlarmList = async () => {
    try {
      const res = await authHttp.getMainAlarmList(userId, Page);
      console.log(res);
      const newAlarms = [...Alarms, ...res.data.result.notificationList];
      setAlarms(newAlarms);
      setTotal(res.data.result.total);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMobileAlarmList();
  }, [inView]);

  const getMobileAlarmList = async () => {
    try {
      const res = await authHttp.getMainAlarmList(userId, MoreData);
      console.log('mobile', res);
      console.log('moredata', MoreData);
      const newAlarms = [...Alarms, ...res.data.result.notificationList];
      setAlarms(newAlarms);
      if (MoreData < res.data.result.total) {
        setMoreData(prev => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
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
      console.log('이동');
      window.open(notification_url, '_self');
    }
  };

  const addPage = e => {
    e.preventDefault();
    if (Page < Total - 1) {
      setPage(prev => prev + 1);
    }
  };

  //오늘 날짜 구하기
  const currentDate = new Date();

  const year = currentDate.getFullYear(); // 년도
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 +1 필요)
  const day = String(currentDate.getDate()).padStart(2, '0'); // 일

  const formattedDate = `${year}.${month}.${day}`;

  return (
    <ModalWrap>
      <ConentsWrap>
        {Alarms.map(alarm => (
          <ContentsBox
            key={alarm.notification_id}
            onClick={e => {
              checkedAlarm(
                e,
                alarm.confirmation,
                alarm.notification_id,
                alarm.notification_url
              );
            }}
          >
            <RedRound checked={alarm.confirmation} />
            <TextWrap>
              <TitleWrap>
                <Title checked={alarm.confirmation}>{alarm.title}</Title>
              </TitleWrap>
              <SubTitle checked={alarm.confirmation}>{alarm.subTitle}</SubTitle>
              {formattedDate === alarm.createDate ? (
                <Time checked={alarm.confirmation}>{alarm.createTime}</Time>
              ) : (
                <Time checked={alarm.confirmation}>{alarm.createDate}</Time>
              )}
            </TextWrap>
            {/* <ArrowWrap> */}
            <Arrow src='/image/alarm-arrow.png' checked={alarm.confirmation} />
            {/* </ArrowWrap> */}
          </ContentsBox>
        ))}
        {isMobile ? (
          <SeeMoreMobile ref={ref}></SeeMoreMobile>
        ) : (
          <>
            {Page === Total - 1 ? (
              <></>
            ) : (
              <SeeMore onClick={e => addPage(e)}>더보기</SeeMore>
            )}
          </>
        )}
      </ConentsWrap>
    </ModalWrap>
  );
};

const ModalWrap = styled.div`
  position: absolute;
  top: 60px;
  z-index: 1000;
  left: -300px;
  height: 550px;
  width: 400px;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #ff4122;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;

  @media screen and (max-width: 760px) {
    position: fixed;
    width: 100vw;
    height: 94vh;
    top: 60px;
    left: 0;
    z-index: -100;
    border: none;
  }
`;

const ConentsWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  top: 0;
  left: 0;
  cursor: pointer;

  @media screen and (max-width: 760px) {
    /* height: auto; */
  }
`;

const ContentsBox = styled.div`
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 5% 80% 5%;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px 20px 20px;
  box-sizing: border-box;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.1);
  background: #ffffff;
  transition: 0.3s;

  &:hover {
    background: #ffc9bb;
  }

  &:active {
    background: #ffa590;
  }
`;

const RedRound = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: #ff4122;
  background-color: ${props => (props.checked ? '#CED4DA' : '#ff4122')};
`;

const TextWrap = styled.div`
  display: block;
`;

const TitleWrap = styled.div`
  margin-bottom: 5px;
  display: flex;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  margin-bottom: 3px;
  color: ${props => (props.checked ? '#B0B0B0' : '#000000')};
`;

const SubTitle = styled.div`
  font-size: 12px;
  color: ${props => (props.checked ? '#CED4DA' : '#838485')};
  margin-bottom: 12px;
  text-align: left;
`;

const Time = styled.div`
  font-size: 12px;
  color: ${props => (props.checked ? '#CED4DA' : '#838485')};
  text-align: left;
`;

const Arrow = styled.img`
  width: 8px !important ;
  height: 14px !important ;
  opacity: ${props => (props.checked ? '0.3' : '')};
`;

const SeeMore = styled.div`
  font-size: 16px;
  color: #5a5c5f;
  width: 100%;
  text-align: center;
  margin: 30px 0;
  text-decoration: underline;
  cursor: pointer;
`;

const SeeMoreMobile = styled.div`
  padding: 30px;
`;

export default AlarmModal;

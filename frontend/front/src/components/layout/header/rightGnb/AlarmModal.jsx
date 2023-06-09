import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import AuthHttp from '../../../../http/authHttp';
import { useSelector } from 'react-redux';

const authHttp = new AuthHttp();

const AlarmModal = () => {
  const userId = useSelector(
    state => state.persistedReducer.userReducer.userId
  );

  const navigate = useNavigate();

  const [Alarms, setAlarms] = useState([]);
  const [Page, setPage] = useState(0);
  const [Total, setTotal] = useState(0);

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
              <SubTitle>{alarm.subTitle}</SubTitle>
              {formattedDate === alarm.createDate ? (
                <Time>{alarm.createTime}</Time>
              ) : (
                <Time>{alarm.createDate}</Time>
              )}
            </TextWrap>
            {/* <ArrowWrap> */}
            <Arrow src='/image/alarm-arrow.png' checked={alarm.confirmation} />
            {/* </ArrowWrap> */}
          </ContentsBox>
        ))}
        {Page === Total - 1 ? (
          <></>
        ) : (
          <SeeMore onClick={e => addPage(e)}>더보기</SeeMore>
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
  /* overflow-y: scroll; */
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #ff4122;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const ConentsWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  top: 0;
  left: 0;
  cursor: pointer;
`;
const ContentsBox = styled.div`
  width: 370px;
  margin: 0px auto;
  display: grid;
  grid-template-columns: 5% 80% 5%;
  justify-content: space-between;
  align-items: center;
  padding: 20px 5px 20px 15px;
  box-sizing: border-box;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.2);
`;

const RedRound = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: #ff4122;
  background-color: ${props => (props.checked ? '#cccccc' : '#ff4122')};
`;

const TextWrap = styled.div`
  display: block;
`;

const TitleWrap = styled.div`
  margin-bottom: 5px;
  display: flex;
`;

const WelcomeImg = styled.img`
  margin-right: 10px;
  width: 20px !important ;
  height: 20px !important ;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  margin-bottom: 3px;
  opacity: ${props => (props.checked ? '0.4' : '')};
`;

const SubTitle = styled.div`
  font-size: 12px;
  color: #838485;
  margin-bottom: 12px;
  text-align: left;
`;

const Time = styled.div`
  font-size: 12px;
  color: #838485;
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

export default AlarmModal;

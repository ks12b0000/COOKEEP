import Alert from '../atomic/modal/Alert';
import CommentHttp from '../../http/commentHttp';

const commentHttp = new CommentHttp();

const ReplyDelete = ({ offItem, replyId, userId }) => {

  const handleClick = () => {
    // offItem 함수 호출
    offItem(replyId, 'modal');
  };

  //댓글 삭제 기능
  const onDelete = async () => {
    try {
      await commentHttp.deleteReply(replyId, userId);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const Props = {
    body: {
      text: '삭제하시겠습니까?',
      icon: (
        <img src={`${process.env.PUBLIC_URL}/image/modal-icon.png`} alt='' />
      ),
      subText: <>삭제하면 복구가 불가능 합니다.</>,
    },

    buttons: {
      btn: [
        {
          text: '취소',
          onClick: handleClick,
        },
        {
          text: '삭제',
          onClick: onDelete,
        },
      ],
    },
  };

  return (
    <>
      <Alert {...Props} />
    </>
  );
};

export default ReplyDelete;

import { useState } from 'react';
import Alert from '../atomic/modal/Alert';
import CommentHttp from '../../http/commentHttp';
import styled from '@emotion/styled';

const commentHttp = new CommentHttp();

const CommentDelete = ({ changeModal, commentId, userId }) => {
  const [IsDeletesModal, setIsDeleteModal] = useState(false);

  const OffModal = () => {
    setIsDeleteModal(false);
    changeModal(IsDeletesModal);
  };

  //댓글 삭제 기능
  const onDelete = async () => {
    console.log('댓글아이디',commentId,'유저아이디',userId);
    try {
      await commentHttp.deleteComment(commentId, userId);
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
          onClick: OffModal,
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

export default CommentDelete;

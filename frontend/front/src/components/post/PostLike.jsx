import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CategoryHttp from '../../http/categoryHttp';

const PostLike = ({ boardId }) => {
  const categoryHttp = new CategoryHttp();

  const { userId } = useSelector(state => state.persistedReducer.userReducer);
  const { isLoggedIn } = useSelector(
    state => state.persistedReducer.userReducer
  );
  const [IsLiked, setIsLiked] = useState(false);

  useEffect(() => {
    checkIsLiked();
  }, []);

  const checkIsLiked = async () => {
    if (isLoggedIn === true) {
      try {
        const res = await categoryHttp.getisLiked(boardId, userId);
        setIsLiked(res.data.result.like);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {IsLiked === true ? (
        <img src='/image/post-like-fill.png' alt='' />
      ) : (
        <img src='/image/post-like.png' alt='' />
      )}
    </>
  );
};

export default PostLike;

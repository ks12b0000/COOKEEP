import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CategoryHttp from "../../http/categoryHttp";

const PostLike = ({ boardId }) => {
  const categoryHttp = new CategoryHttp();

  const { userId } = useSelector(state => state.persistedReducer.userReducer);
  const [IsLiked, setIsLiked] = useState(false);

  useEffect(() => {
      checkIsLiked();
  }, []);

  // 좋아요 눌렀는지 여부 체크
  const checkIsLiked = async () => {
    try {
      const res = await categoryHttp.getisLiked(boardId, userId);
      setIsLiked(res.data.result.like);
      console.log('post like',res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {IsLiked === true ? (
        <img src='/image/like-fill.png' alt='' />
      ) : (
        <img src='/image/like.png' alt='' />
      )}
    </>
  );
};

export default PostLike;
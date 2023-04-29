import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CategoryHttp from '../../http/categoryHttp';

const PostLike = ({ IsLiked,index }) => {


  return (
    <>
        {IsLiked[index]? <img src='/image/post-like-fill.png' alt='' /> : <img src="/image/post-like.png" alt=""/> }


    </>
  );
};

export default PostLike;

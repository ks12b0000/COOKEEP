

import Http from "./http";

class CategoryHttp extends Http {
  //카테고리 리스트 목록조회
  getCategoryPostList = async (bool, pages, categoryName,allText) => {
    if (bool) {
      try {
        const { data } = await this.axios.get(
          `board/list?category=${categoryName}&page=${pages}&size=20`
        );
        return data;
      } catch (err) {
        throw err;
      }
    }else{
      try {
        const { data } = await this.axios.get(
            `/board/list?category=${categoryName}&${allText}&size=20`
        );
        return data;
      } catch (err) {
        throw err;
      }
    }
  };
  //카테고리 리스트조회
  getCategoryMenu = async () => {
    try {
      const { data } = await this.axios.get('foodCategory/list');
      return data;
    } catch (err) {
      throw err;
    }
  };
  //글 조회
  getBoard = async id => {
    try {
      const { data } = await this.axios.get(`board?board_id=${id}`);
      return data;
    } catch (err) {
      throw err;
    }
  };

  //전제글 목록조회

  getAllBoard = async (page,allText) => {
    try {
      const { data } = await this.axios.get(`/board/all/list?${page ? `page=${page}` : allText} `);
      return data;
    } catch (err) {
      throw err;
    }
  };

  //좋아요 많은순 조회
  getMainLike = async () => {
    try {
      const { data } = await this.axios.get(`/main/best/liked/list`);
      return data;
    } catch (err) {
      throw err;
    }
  };

  //더보기 좋아요 많은순기
  getMainLikeMore = async () => {
    try {
      const { data } = await this.axios.get(`/main/best/liked/list/more`);
      return data;
    } catch (err) {
      throw err;
    }
  };

  //댓글 많은순 조회
  getCommented = async () => {
    try {
      const { data } = await this.axios.get(`/main/best/viewed/list`);
      return data;
    } catch (err) {
      throw err;
    }
  };

  //더보기 댓글많은순 조회
  getCommentedMore =async () => {
    try{
      const {data} = await  this.axios.get(`/main/best/viewed/list/more`);
      return data;
    }catch (err) {
      throw err;
    }
  }
  //배너 조회

  getBanner  = async () =>{
    try {
      const { data } = await this.axios.get(`/main/recommend/board/weekly/list`);
      return data;
    } catch (err) {
      throw err;
    }
  }
  //카테고리 삭제
  deleteCategoryList = async (boardId, userId) => {
    try {
      return await this.axios.delete(
        `auth/board?board_id=${boardId}&user_id=${userId}`
      );
    } catch (err) {
      throw err;
    }
  };

  //글수정
  patchForm = async (boardId, requestBody) => {
    try {
      return await this.axios.patch(`auth/board/${boardId}`, requestBody);
    } catch (err) {
      throw err;
    }
  };

  //좋아요 기능
  postLike = async boardId => {
    try {
      const res = await this.axios.post(`auth/board/like/${boardId}`);
      return res;
    } catch (err) {
      throw err;
    }
  };

  //좋아요 여부 확인
  getisLiked = async (boardId, userId) => {
    try {
        return await this.axios.get(`board/${boardId}/like/${userId}`);
    } catch (err) {
      throw err;
    }
  };

  //좋ㅇ하요 복수 확인
  getisLikeds = async (boardId, userId) => {
    let boardIds= `boardIds=${boardId}`;
    try {
      return await this.axios.get(`/like/${userId}/board?${boardIds}`);
    } catch (err) {
      throw err;
    }
  };
}
export default CategoryHttp;

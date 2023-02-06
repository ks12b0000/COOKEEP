

import Http from "./http";

class CategoryHttp extends Http {
    //카테고리 리스트 목록조회
    getCategoryPostList = async (bool, pages, categoryName) => {
        if (bool) {
            try {
                const { data } = await this.axios.get(`board/list?page=${pages}&category=${categoryName}`);
                return data;
            } catch (err) {
                throw err;
            }
        }
    };
    //카테고리 리스트조회
    getCategoryMenu = async () => {
        try {
           const {data} = await this.axios.get('foodCategory/list');
           return data;
        }
        catch (err) {
            throw err;
        }
    }
    //글 조회
     getBoard = async (id) => {
          try {
              const {data} = await this.axios.get(`board?board_id=${id}`)
              return data;
          }catch (err){
              throw err;
          }
     }

    //카테고리 삭제
    deleteCategoryList = async (boardId,userId) => {
      try {
          return await this.axios.delete(`auth/board?board_id=${boardId}&user_id=${userId}`)
      }catch (err){
         throw  err;
      }
    }


   //글수정
    patchForm =  async(boardId,requestBody) => {
        try {
            return await this.axios.patch(`auth/board/${boardId}`, requestBody);
        }catch (err){
            throw  err;
        }
    }
}
export default CategoryHttp;

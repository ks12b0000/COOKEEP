

import Http from "./http";

class SearchHttp extends Http {
    //자동완성 리스트
    getAutoList = async (params) => {
        try{
            return await  this.axios.get('main/auto/search/list',params)
        }
        catch (err) {
            throw  err;
        }
    }
     //메인탑 10검색 카테괼
    getTopList = async (params) => {
        try{
            return await  this.axios.get('main/auto/search/list',params)
        }
        catch (err) {
            throw  err;
        }
    }


}
export default SearchHttp;

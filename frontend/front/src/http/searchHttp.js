

import Http from "./http";

class SearchHttp extends Http {
    //메인 탑 태그 검색
    getTopTag = async () => {
        try{
            return await  this.axios.get('/main/top10/tag/list')
        }
        catch (err) {
            throw  err;
        }
    }
     //메인탑 10검색 카테괼
    getTopList = async () => {
        try{
                return await  this.axios.get('/main/top10/search/list')
        }
        catch (err) {
            throw  err;
        }
    }


}
export default SearchHttp;

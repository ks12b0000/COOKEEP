

import Http from "./http";

class SearchHttp extends Http {


    //자동완성 검색 가져오기

    getAutoList = async (keyword) => {
        try {
            return await this.axios.get(`/main/search/list?keyword=${keyword}`)
        } catch (err) {
            throw  err;
        }
    }


    //자동 검색어
    getAutoSearch = async (text) => {
        try{
            return await  this.axios.get(`/main/auto/search/list?keyword=${text}`)
        }
        catch (err) {
            throw  err;
        }
    }

    getAutoTag= async (text) => {
        try{
            return await  this.axios.get(`/main/search/tag/list?keyword=${text}`)
        }
        catch (err) {
            throw  err;
        }
    }
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

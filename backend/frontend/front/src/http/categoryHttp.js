

import Http from "./http";

class CategoryHttp extends Http {
    getCategoryList = async (bool, pages, categoryName) => {
        if (bool) {
            try {
                const { data } = await this.axios.get(`board/list?page=${pages}&category=${categoryName}`);
                return data;
            } catch (err) {
                throw err;
            }
        }
    };





}
export default CategoryHttp;

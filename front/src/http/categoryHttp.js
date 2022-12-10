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
    submitWritingForm = async (params) => {
        try {
            const { data } = await this.axios.post("auth/board/write", params);
            return data;
        } catch (err) {
            throw err;
        }
    };
    postLogin = async (params) => {
        try {
            const data = await this.axios.post("user/login", params);
            return data;
        } catch (err) {
            throw err;
        }
    };
}
export default CategoryHttp;

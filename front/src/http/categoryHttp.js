<<<<<<< HEAD
import Http from './http';
=======
import Http from "./http";
>>>>>>> c895c0ef131ad3c7e020e886707b505ecbb5cbed
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
<<<<<<< HEAD

=======
    submitWritingForm = async (params) => {
        try {
            const { data } = await this.axios.post("auth/board/write", params);
            return data;
        } catch (err) {
            throw err;
        }
    };
>>>>>>> c895c0ef131ad3c7e020e886707b505ecbb5cbed
}
export default CategoryHttp;

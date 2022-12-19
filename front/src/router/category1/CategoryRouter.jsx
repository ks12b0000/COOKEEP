<<<<<<< HEAD
import { Route, Routes } from "react-router";
import Detail from "../../components/category1/detail/Detail";
import Writing from "../../components/category1/writing/Writing";
import Category1 from "../../pages/category1/Category1";
import PrivateRoute from "../../until/PrivateRoute";
=======
import { Route, Routes } from "react-router-dom";
import Detail from "../../components/category1/detail/Detail";
import Writing from "../../components/category1/writing/Writing";
import Category1 from "../../pages/category1/Category1";
>>>>>>> c895c0ef131ad3c7e020e886707b505ecbb5cbed

function CategoryRouter() {
    return (
        <>
            <Routes>
<<<<<<< HEAD
                <Route element={<PrivateRoute />}>
                    <Route path="/writing" element={<Writing />} />
                </Route>
                <Route path="*" element={<Category1 />} />
                <Route path="/:id" element={<Detail />} />
=======
                <Route path="*" element={<Category1 />} />
                <Route path="/:id" element={<Detail />} />
                <Route path="/writing" element={<Writing />} />
>>>>>>> c895c0ef131ad3c7e020e886707b505ecbb5cbed
            </Routes>
        </>
    );
}
export default CategoryRouter;

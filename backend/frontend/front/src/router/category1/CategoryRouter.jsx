import { Route, Routes } from "react-router";
import Detail from "../../components/category1/detail/Detail";
import Writing from "../../components/category1/writing/Writing";
import Category1 from "../../pages/category1/Category1";
import PrivateRoute from "../../until/PrivateRoute";

function CategoryRouter() {
    return (
        <>
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route path="/writing" element={<Writing />} />
                </Route>
                <Route path="*" element={<Category1 />} />
                <Route path="/:id" element={<Detail />} />
            </Routes>
        </>
    );
}
export default CategoryRouter;
import { Route, Routes } from "react-router";
import Detail from "../../components/categoryLayout/detail/Detail";
import Writing from "../../components/categoryLayout/writing/Writing";
import Korean from "../../pages/category/korean/Korean";
import PrivateRoute from "../../until/PrivateRoute";

function CategoryRouter() {
    return (
        <>

            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route path="/writing" element={<Writing />} />
                </Route>
                <Route path="*" element={<Korean />} />
            </Routes>
        </>
    );
}
export default CategoryRouter;
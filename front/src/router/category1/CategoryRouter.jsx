import {Route,Routes} from "react-router-dom";
import Detail from "../../components/category1/detail/Detail";
import Writing from "../../components/category1/writing/Writing";
import Category1 from "../../pages/category1/Category1";

function CategoryRouter(){
    return(
        <>
            <Routes>
                <Route path="*" element ={<Category1/>} />
                <Route path="/:id" element={<Detail/>}/>
                <Route path="/writing" element={<Writing/>}/>
            </Routes>
        </>
    )

}
export default CategoryRouter;
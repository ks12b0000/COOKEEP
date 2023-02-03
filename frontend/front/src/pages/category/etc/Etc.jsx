
import Category from "../Category";

function Etc() {

    const Props ={
        title:'기타 컨텐츠',
        categoryName:'기타'
    }
    return (
        <>
            <Category {...Props} />
        </>
    );
}
export default Etc;

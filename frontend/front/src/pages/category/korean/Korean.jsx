
import Category from "../Category";


function Korean() {
    const Props ={
        title:'한식 컨텐츠',
        categoryName:'한식'
    }
    return (
        <>
            <Category {...Props} />
        </>
    );
}
export default Korean;
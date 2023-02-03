import Category from "../Category";

function Diet() {
    const Props ={
        title:'다이어트식콘텐츠',
        categoryName:'다이어트식'
    }
    return (
        <>
            <Category {...Props} />
        </>
    );
}
export default Diet;

import Category from "../Category";

function Diet() {
    const Props ={
        title:'다이어트식',
        categoryName:'다이어트'
    }
    return (
        <>
            <Category {...Props} />
        </>
    );
}
export default Diet;

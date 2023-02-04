import Category from "../Category";


function Japanese() {

    const Props ={
        title:'일식 컨텐츠',
        categoryName:'일식'
    }
    return (
        <>
            <Category {...Props} />
        </>
    );
}
export default Japanese;

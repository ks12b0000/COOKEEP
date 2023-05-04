import Category from "../Category";

function Chinese() {

    const Props ={
        title:'중식',
        categoryName:'중식'
    }
    return (
        <>
            <Category {...Props} />
        </>
    );
}
export default Chinese;

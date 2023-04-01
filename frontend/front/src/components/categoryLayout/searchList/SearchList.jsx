import Header from "../../layout/header/Header";
import {useParams} from "react-router-dom";

function SearchList() {
    const { contents } = useParams();
    console.log(contents);
    return (
        <Header />
    )
}

export default  SearchList;
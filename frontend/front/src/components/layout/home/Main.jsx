
import Popularity from "./popularity/Popularity";
import Ranking from "./ranking/Ranking";
import Header from "../header/Header";
import {color} from "../../../constants/color";


function Main() {
    const headerColor = color.headerColor;
    const isMain = true;
    const Props = {
        color:headerColor,
        isMain
    }
    return (
        <>
            <Header {...Props}/>
            <Popularity />
            <Ranking />
        </>
    );
}

export default Main;

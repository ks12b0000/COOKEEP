import Alert from "../../../atomic/modal/Alert";
import {Route, useNavigate} from "react-router";
import Korean from "../../../../pages/category/korean/Korean";
import Western from "../../../../pages/category/ western/ Western";
import Chinese from "../../../../pages/category/ chinese/ Chinese";
import Japanese from "../../../../pages/category/japanese/Japanese";
import Diet from "../../../../pages/category/ diet/Diet";
import Vegan from "../../../../pages/category/vegan/Vegan";
import Etc from "../../../../pages/category/etc/Etc";
import AllCategory from "../../../../pages/category/all/AllCategory";

function CompletePopup({category, sentence}) {

    const navigation = useNavigate();
    const RouterPath = () => {
        if (category === '한식') {
            return navigation(`/korea`);
        } else if (category === '양식') {
            return navigation(`/western`);
        } else if (category === '중식') {
            return navigation(`/chinese`);
        } else if (category === '일식') {
            return navigation(`/japanese`);
        } else if (category === '다이어트') {
            return navigation(`/diet`);
        } else if (category === '비건') {
            return navigation(`/vegan`);
        } else if (category === '전체') {
            return navigation(`/all`);
        }
        navigation(`/${category}`);
    }
    const Props = {

        body: {
            icon: (
                <img src={`${process.env.PUBLIC_URL}/image/modal-check.png`} alt=""/>
            ),
            text: sentence,
        },
        buttons: {
            btn: [
                {
                    text: '확인',
                    onClick: RouterPath,
                },
            ]
        }
    }
    return <Alert {...Props} />
}

export default CompletePopup;
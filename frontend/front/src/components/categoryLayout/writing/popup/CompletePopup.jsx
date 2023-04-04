import Alert from "../../../atomic/modal/Alert";
import {useNavigate} from "react-router";

function CompletePopup({category}){
    const navigation = useNavigate();
    const RouterPath = () => {
        navigation(`/${category}`);
    }
    const Props = {

        body:{
            icon:(
                <img src={`${process.env.PUBLIC_URL}/image/modal-check.png`} alt=""/>
            ),
            text:'등록이 완료되었습니다.',
        },
        buttons:{
            btn:[
                {
                    text:'확인',
                    onClick:RouterPath,
                },
            ]
        }
    }
    return      <Alert {...Props} />
}
export default CompletePopup;
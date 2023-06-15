import Alert from "../../../atomic/modal/Alert";
import {useNavigate} from "react-router";

function CompletePopup({category, sentence}){
    const navigation = useNavigate();
    const RouterPath = () => {
        navigation(`/${category}`);
    }
    const Props = {

        body:{
            icon:(
                <img src={`${process.env.PUBLIC_URL}/image/modal-check.png`} alt=""/>
            ),
            text: sentence,
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
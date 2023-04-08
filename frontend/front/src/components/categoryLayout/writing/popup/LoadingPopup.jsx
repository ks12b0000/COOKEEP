import Alert from "../../../atomic/modal/Alert";
import ReactLoading from "react-loading";


function LoadingPopup()  {
      const Props ={
          body:{
              icon:(
                  <ReactLoading type="bubbles" color="#ff4c4c"/>
              ),
              text:"잠시만 기다려 주세요"
          },
      }
    return <Alert {...Props} />
}
export default LoadingPopup;
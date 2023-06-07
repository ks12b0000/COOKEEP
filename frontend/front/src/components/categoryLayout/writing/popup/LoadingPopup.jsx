import Alert from '../../../atomic/modal/Alert';
import ReactLoading from 'react-loading';

function LoadingPopup() {
  const Props = {
    body: {
      icon: (
        <div>
          <ReactLoading type='bubbles' color='#ff4c4c' />
        </div>
      ),
      text: '잠시만 기다려 주세요',
    },
  };
  return <Alert {...Props} />;
}
export default LoadingPopup;

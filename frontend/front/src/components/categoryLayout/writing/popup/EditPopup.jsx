import Alert from "../../../atomic/modal/Alert";

function EditPopup({setCreateIsOpen,onSubmit}) {

    const Props = {
        setOpenModal:() => setCreateIsOpen(false),
        body:{
            text:'게시글을 수정하시겠습니까?',
            subText:(
                <>
                    게시글을 수정하고 확인을 누르면 <br/>
                    게시글로 이동합니다.
                </>
            ),
        },
        buttons:{
            btn:[
                {
                    text:'취소',
                    onClick:() => setCreateIsOpen(false)
                },
                {
                    text:'수정',
                    onClick:onSubmit,
                },
            ]
        }
    }
    return      <Alert {...Props} />
}

export default EditPopup;